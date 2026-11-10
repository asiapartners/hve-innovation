// Copyright (c) Microsoft Corporation. All rights reserved.
// SPDX-License-Identifier: MIT
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
await mkdir(resolve(root, "vendor"), { recursive: true });
const hashes = {};
for (const [source, target] of [
    ["d3@7.9.0/dist/d3.min.js", "d3.min.js"],
    ["d3@7.9.0/LICENSE", "d3.LICENSE"],
    ["marked@15.0.12/lib/marked.umd.js", "marked.umd.js"],
    ["marked@15.0.12/LICENSE.md", "marked.LICENSE"],
    ["dompurify@3.4.11/dist/purify.min.js", "purify.min.js"],
    ["dompurify@3.4.11/LICENSE", "dompurify.LICENSE"],
]) {
    const url = `https://cdn.jsdelivr.net/npm/${source}`;
    const bytes = execFileSync("curl", ["--fail", "--location", "--silent", "--show-error", "--max-time", "60", url],
        { maxBuffer: 8 * 1024 * 1024 });
    await writeFile(resolve(root, "vendor", target), bytes);
    hashes[target] = { url, sha512: createHash("sha512").update(bytes).digest("hex") };
}
await writeFile(resolve(root, "vendor/checksums.json"), JSON.stringify(hashes, null, 2) + "\n");
console.info("Copied pinned runtime libraries and their license notices. No runtime network fetches are required.");
