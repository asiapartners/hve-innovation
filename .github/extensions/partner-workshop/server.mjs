// Copyright (c) Microsoft Corporation. All rights reserved.
// SPDX-License-Identifier: MIT
import { createServer } from "node:http";
import { createHash, randomUUID } from "node:crypto";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import { homedir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { components, loadWorkshop, roles, steps } from "./content.mjs";

const here = dirname(fileURLToPath(import.meta.url));
export const repoRoot = resolve(here, "../../..");
const activityIds = new Set(steps.flatMap((s) => s.activities.map((a) => a.id)));
const queues = new Map();
const emptyState = () => ({ step: 1, role: "all", completed: [] });
const assets = new Map([
    ["", ["web/index.html", "text/html"]],
    ["app.js", ["web/app.js", "text/javascript"]],
    ["style.css", ["web/style.css", "text/css"]],
    ["d3.min.js", ["vendor/d3.min.js", "text/javascript"]],
    ["marked.js", ["vendor/marked.umd.js", "text/javascript"]],
    ["purify.js", ["vendor/purify.min.js", "text/javascript"]],
    ["handoffs.svg", ["diagrams/handoffs.svg", "image/svg+xml"]],
    ["components.svg", ["diagrams/components.svg", "image/svg+xml"]],
]);

export function validateState(value, partial = false) {
    if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error("Expected a progress object.");
    if (Object.keys(value).some((key) => !["step", "role", "completed"].includes(key))) throw new Error("Unknown progress field.");
    if ((!partial || "step" in value) && (!Number.isInteger(value.step) || value.step < 1 || value.step > 6)) throw new Error("Step must be 1-6.");
    if ((!partial || "role" in value) && !roles.some(([id]) => id === value.role)) throw new Error("Unknown role.");
    if ((!partial || "completed" in value) && (!Array.isArray(value.completed) ||
        value.completed.some((id) => !activityIds.has(id)) || new Set(value.completed).size !== value.completed.length)) {
        throw new Error("Completed activities must be unique known activity IDs.");
    }
    return value;
}

async function loadState(path) {
    try {
        return validateState(JSON.parse(await readFile(path, "utf8")));
    } catch (error) {
        if (error.code === "ENOENT") return emptyState();
        throw new Error(`Cannot read saved workshop progress: ${error.message}`);
    }
}

function updateState(path, patch) {
    validateState(patch, true);
    const operation = (queues.get(path) ?? Promise.resolve()).then(async () => {
        const state = validateState({ ...await loadState(path), ...patch });
        await mkdir(dirname(path), { recursive: true, mode: 0o700 });
        const temporary = `${path}.${randomUUID()}.tmp`;
        await writeFile(temporary, `${JSON.stringify(state)}\n`, { mode: 0o600 });
        await rename(temporary, path);
        return state;
    });
    queues.set(path, operation.then(() => undefined, () => undefined));
    return operation;
}

export async function startServer({ root = repoRoot, stateDirectory, log = console.error } = {}) {
    const workshop = await loadWorkshop(root);
    const key = createHash("sha256").update(root).digest("hex").slice(0, 24);
    const statePath = join(stateDirectory ?? join(process.env.COPILOT_HOME ?? join(homedir(), ".copilot"),
        "extensions/partner-workshop/artifacts"), key, "progress.json");
    await loadState(statePath);
    const token = randomUUID();
    const prefix = `/${token}/`;
    const readable = new Set([
        ...steps.map((s) => `docs/getting-started/${s.file}`),
        "docs/getting-started/samples/FSI/workshop-input/leancanvas.md",
        ...Object.values(components).map(([, path]) => path),
    ]);
    function send(res, status, body, type = "application/json") {
        res.writeHead(status, {
            "Content-Type": `${type}; charset=utf-8`, "Cache-Control": "no-store",
            "X-Content-Type-Options": "nosniff", "Referrer-Policy": "no-referrer",
            "Content-Security-Policy": "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self'; object-src 'none'; base-uri 'none'; form-action 'none'",
        });
        res.end(typeof body === "string" || Buffer.isBuffer(body) ? body : JSON.stringify(body));
    }
    const server = createServer(async (req, res) => {
        try {
            const origin = `http://127.0.0.1:${server.address().port}`;
            if (req.headers.host !== new URL(origin).host ||
                (req.headers.origin && req.headers.origin !== origin) ||
                (req.method !== "GET" && req.headers["sec-fetch-site"] === "cross-site")) {
                send(res, 403, { error: "Cross-origin requests are not allowed." });
                return;
            }
            const url = new URL(req.url, origin);
            if (!url.pathname.startsWith(prefix)) { send(res, 404, { error: "Not found." }); return; }
            const route = url.pathname.slice(prefix.length);
            if (req.method === "GET" && route === "workshop") { send(res, 200, workshop); return; }
            if (req.method === "GET" && route === "state") { send(res, 200, await loadState(statePath)); return; }
            if (req.method === "POST" && route === "state") {
                if (!req.headers["content-type"]?.startsWith("application/json")) {
                    send(res, 415, { error: "Use application/json." }); return;
                }
                let size = 0;
                const chunks = [];
                for await (const chunk of req) {
                    size += chunk.length;
                    if (size > 8192) { send(res, 413, { error: "Progress payload is too large." }); return; }
                    chunks.push(chunk);
                }
                let patch;
                try { patch = validateState(JSON.parse(Buffer.concat(chunks).toString()), true); }
                catch (error) { send(res, 400, { error: error.message }); return; }
                send(res, 200, await updateState(statePath, patch));
                return;
            }
            if (req.method === "GET" && route === "source") {
                const path = url.searchParams.get("path");
                if (!readable.has(path)) { send(res, 404, { error: "Source is not in the workshop inventory." }); return; }
                send(res, 200, await readFile(resolve(root, path)), "text/plain");
                return;
            }
            if (req.method === "GET" && assets.has(route)) {
                const [file, type] = assets.get(route);
                send(res, 200, await readFile(join(here, file)), type);
                return;
            }
            send(res, 404, { error: "Not found." });
        } catch (error) {
            log(`Partner workshop request failed: ${error.message}`);
            if (!res.headersSent) send(res, 500, { error: "Workshop request failed. Inspect the extension log; saved progress was not reset." });
            else res.destroy();
        }
    });
    await new Promise((accept, reject) => {
        server.once("error", reject);
        server.listen(0, "127.0.0.1", accept);
    });
    return {
        url: `http://127.0.0.1:${server.address().port}${prefix}`,
        snapshot: async () => ({ agenda: steps.map(({ id, title, minutes }) => ({ id, title, minutes })),
            progress: await loadState(statePath), components: workshop.components,
            diagrams: ["D3 interactive agenda and component map", "Mermaid handoff flow", "PlantUML component ownership"] }),
        update: (patch) => updateState(statePath, patch),
        close: () => new Promise((accept, reject) => server.close((error) => error ? reject(error) : accept())),
    };
}
