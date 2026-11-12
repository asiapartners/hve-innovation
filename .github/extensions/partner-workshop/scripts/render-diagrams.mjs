// Copyright (c) Microsoft Corporation. All rights reserved.
// SPDX-License-Identifier: MIT
import { execFileSync } from "node:child_process";
import { readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { webkit } from "playwright";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
if (!process.env.PLANTUML_JAR || !process.env.MERMAID_SCRIPT) throw new Error("Set PLANTUML_JAR (PlantUML 1.2025.10) and MERMAID_SCRIPT (mermaid@10.9.4/dist/mermaid.min.js) to local renderer files. No diagram is sent to a render service.");
const browser = await webkit.launch(process.env.WEBKIT_EXECUTABLE ? { executablePath: process.env.WEBKIT_EXECUTABLE } : {});
try {
    const page = await browser.newPage();
    await page.route("**/*", (route) => route.abort());
    await page.setContent("<!doctype html><html><body></body></html>");
    await page.addScriptTag({ path: resolve(process.env.MERMAID_SCRIPT) });
    const source = await readFile(resolve(root, "diagrams/handoffs.mmd"), "utf8");
    const svg = await page.evaluate(async (text) => {
        window.mermaid.initialize({
            startOnLoad: false, securityLevel: "strict", theme: "base",
            themeVariables: { background: "#0d1117", primaryColor: "#152b44", primaryTextColor: "#f0f6fc",
                primaryBorderColor: "#4493f8", lineColor: "#79c0ff", secondaryColor: "#161b22",
                tertiaryColor: "#212830", edgeLabelBackground: "#161b22", fontFamily: "sans-serif" },
            flowchart: { htmlLabels: false, curve: "basis" },
        });
        return (await window.mermaid.render("workshopHandoffs", text)).svg;
    }, source);
    await writeFile(resolve(root, "diagrams/handoffs.svg"), svg + "\n");
} finally {
    await browser.close();
}
const diagram = await readFile(resolve(root, "diagrams/components.puml"));
const svg = execFileSync("java", ["-Djava.awt.headless=true", "-jar", resolve(process.env.PLANTUML_JAR),
    "-tsvg", "-pipe", "-charset", "UTF-8"], { input: diagram, maxBuffer: 8 * 1024 * 1024 });
if (!svg.toString().includes("<svg") || svg.toString().includes("Syntax Error")) throw new Error("PlantUML did not render a valid diagram.");
await writeFile(resolve(root, "diagrams/components.svg"), svg);
console.info("Rendered Mermaid and PlantUML locally to committed offline SVGs.");
