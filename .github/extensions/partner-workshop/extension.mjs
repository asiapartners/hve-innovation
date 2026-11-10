// Copyright (c) Microsoft Corporation. All rights reserved.
// SPDX-License-Identifier: MIT
import { createCanvas, joinSession } from "@github/copilot-sdk/extension";
import { startServer } from "./server.mjs";

const servers = new Map();
const session = await joinSession({
    canvases: [createCanvas({
        id: "partner-workshop",
        displayName: "Partner workshop",
        description: "Guide all six partner workshop stages with role activities, source prompts, hints, offline diagrams and personal progress.",
        inputSchema: { type: "object", properties: {}, additionalProperties: false },
        actions: [
            {
                name: "get_state",
                description: "Read the workshop agenda, source availability, saved personal progress and diagram inventory.",
                handler: async (ctx) => (await getServer(ctx.instanceId)).snapshot(),
            },
            {
                name: "navigate",
                description: "Focus an agenda step (1-6) and optional role, without completing activities or approving work.",
                inputSchema: {
                    type: "object", required: ["step"], additionalProperties: false,
                    properties: { step: { type: "integer", minimum: 1, maximum: 6 },
                        role: { enum: ["all", "sme", "pm", "design", "technical"] } },
                },
                handler: async (ctx) => (await getServer(ctx.instanceId)).update(ctx.input),
            },
        ],
        open: async (ctx) => {
            const entry = await getServer(ctx.instanceId);
            return { title: "Partner workshop", url: entry.url };
        },
        onClose: async (ctx) => {
            const entry = servers.get(ctx.instanceId);
            if (entry) {
                servers.delete(ctx.instanceId);
                await entry.close();
            }
        },
    })],
});

async function getServer(instanceId) {
    if (!servers.has(instanceId)) {
        servers.set(instanceId, await startServer({
            log: (message) => session.log(message, { level: "error", ephemeral: true }),
        }));
    }
    return servers.get(instanceId);
}
