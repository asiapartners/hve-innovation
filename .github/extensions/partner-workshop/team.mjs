// Copyright (c) Microsoft Corporation. All rights reserved.
// SPDX-License-Identifier: MIT
export const MIN_MEMBERS = 4;
export const MAX_MEMBERS = 8;
export const NAME_LIMIT = 120;
export const HANDLE_LIMIT = 39;

export function emptyTeam() {
    return { name: "", members: Array.from({ length: MIN_MEMBERS }, () => ({ name: "", handle: "" })) };
}

function invalid(field, message) {
    const error = new Error(message);
    error.field = field;
    throw error;
}

function text(value, field, label, limit) {
    if (typeof value !== "string" || value.length > limit || /[\u0000-\u001f\u007f]/u.test(value)) {
        invalid(field, `${label} must be a single line of at most ${limit} characters.`);
    }
    return value.trim();
}

export function validateTeam(value) {
    if (!value || typeof value !== "object" || Array.isArray(value) ||
        Object.keys(value).some((key) => !["name", "members"].includes(key))) {
        invalid("team-name", "Expected a company or team name and a member list.");
    }
    const name = text(value.name, "team-name", "Company or team name", NAME_LIMIT);
    if (!Array.isArray(value.members) || value.members.length < MIN_MEMBERS || value.members.length > MAX_MEMBERS) {
        invalid("team-members", `Keep between ${MIN_MEMBERS} and ${MAX_MEMBERS} member slots.`);
    }
    const handles = new Set();
    const members = Array.from(value.members, (member, index) => {
        const prefix = `team-member-${index}`;
        if (!member || typeof member !== "object" || Array.isArray(member) ||
            Object.keys(member).some((key) => !["name", "handle"].includes(key))) {
            invalid(`${prefix}-name`, `Member ${index + 1} needs name and GitHub handle fields.`);
        }
        const memberName = text(member.name, `${prefix}-name`, `Member ${index + 1}'s name`, NAME_LIMIT);
        const handle = text(member.handle, `${prefix}-handle`, `Member ${index + 1}'s handle`, HANDLE_LIMIT + 1).replace(/^@/, "");
        if (handle && (handle.length > HANDLE_LIMIT || !/^[a-z\d](?:[a-z\d_-]*[a-z\d])?$/i.test(handle))) {
            invalid(`${prefix}-handle`, `Member ${index + 1}: enter a handle of up to ${HANDLE_LIMIT} letters, numbers, hyphens or underscores, not a URL.`);
        }
        if (handle && handles.has(handle.toLowerCase())) {
            invalid(`${prefix}-handle`, `Member ${index + 1}: this GitHub handle is already listed. Use a different handle or leave the slot blank.`);
        }
        if (handle) handles.add(handle.toLowerCase());
        return { name: memberName, handle };
    });
    return { name, members };
}

export function teamContext(team) {
    const members = team.members.filter((member) => member.name || member.handle);
    return [
        `Company / team: ${team.name || "Not entered"}`,
        "Team members:",
        ...members.map((member) => `- ${member.name || "Name not entered"} (${member.handle ? `@${member.handle}` : "Handle not entered"})`),
    ].join("\n");
}
