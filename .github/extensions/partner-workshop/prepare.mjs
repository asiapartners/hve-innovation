// Copyright (c) Microsoft Corporation. All rights reserved.
// SPDX-License-Identifier: MIT
import { readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { loadWorkshop } from "./content.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const workshop = await loadWorkshop(resolve(here, "../../.."));
for (const file of ["web/index.html", "web/app.js", "web/style.css", "vendor/d3.min.js",
    "vendor/marked.umd.js", "vendor/purify.min.js", "diagrams/handoffs.svg", "diagrams/components.svg"]) {
    const contents = await readFile(resolve(here, file), "utf8");
    if (!contents.length) throw new Error(`Empty canvas asset: ${file}`);
    if (file.endsWith(".svg") && !contents.includes("<svg")) throw new Error(`Invalid SVG: ${file}`);
}
const missing = Object.values(workshop.components).filter((component) => !component.available);
if (missing.length) throw new Error(`Missing HVE components: ${missing.map((c) => c.name).join(", ")}`);
console.info(JSON.stringify({
    canvasId: "partner-workshop", steps: workshop.steps.length,
    minutes: workshop.steps.reduce((sum, step) => sum + step.minutes, 0),
    activities: workshop.steps.reduce((sum, step) => sum + step.activities.length, 0),
    message: "Ready to discover and open the canvas. No workshop artifacts or approvals were created.",
}));
