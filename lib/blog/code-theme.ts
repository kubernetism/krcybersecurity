/**
 * Single-accent syntax theme: electric blue, its tints and neutrals, so code
 * blocks stay inside the site's palette. Every colour clears 4.5:1 on the code
 * panel background (--color-ink-850).
 */
export const codeTheme = {
  name: "kr-electric",
  type: "dark",
  colors: { "editor.foreground": "#dbe5f1", "editor.background": "#0b0f16" },
  // rehype-pretty-code recognises a custom theme by its `tokenColors` key.
  tokenColors: [
    { settings: { foreground: "#dbe5f1", background: "#0b0f16" } },
    { scope: ["comment", "punctuation.definition.comment"], settings: { foreground: "#8592a6", fontStyle: "italic" } },
    { scope: ["keyword", "storage", "keyword.control", "keyword.operator.logical"], settings: { foreground: "#6db3ff" } },
    { scope: ["string", "string.quoted", "markup.inline.raw"], settings: { foreground: "#b7d8ff" } },
    { scope: ["constant", "constant.numeric", "constant.language", "support.constant"], settings: { foreground: "#8ec5ff" } },
    { scope: ["entity.name.function", "support.function", "meta.function-call"], settings: { foreground: "#f2f6fb", fontStyle: "bold" } },
    { scope: ["entity.name.type", "entity.name.class", "support.type", "support.class"], settings: { foreground: "#a8cdff" } },
    { scope: ["variable", "variable.parameter", "meta.definition.variable"], settings: { foreground: "#dbe5f1" } },
    { scope: ["punctuation", "keyword.operator"], settings: { foreground: "#a3afc0" } },
    { scope: ["entity.name.tag", "support.tag"], settings: { foreground: "#6db3ff" } },
    { scope: ["entity.other.attribute-name"], settings: { foreground: "#a8cdff" } },
  ],
};
