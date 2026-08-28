import { defineConfig } from "@rspack/cli";

export default defineConfig({
  entry: "./tailwind.config.js",
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  target: "node",
  output: {
    clean: true,
    filename: "index.js",
    library: { type: "modern-module" },
  },
});
