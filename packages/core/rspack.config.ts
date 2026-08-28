import { defineConfig } from "@rspack/cli";

export default defineConfig({
  entry: "./src/index.ts",
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  target: "web",
  externals: {
    axios: "axios",
  },
  output: {
    clean: true,
    filename: "index.js",
    library: { type: "modern-module" },
  },
  resolve: {
    extensions: ["...", ".ts", ".tsx"],
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        loader: "builtin:swc-loader",
        options: {
          jsc: {
            parser: { syntax: "typescript", tsx: true },
          },
        },
      },
    ],
  },
});
