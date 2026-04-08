import path from "node:path";
import { fileURLToPath } from "node:url";

import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";

const root = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  plugins: [pluginReact()],
  html: {
    title: "AISaidThat",
  },
  output: {
    assetPrefix: "auto",
  },
  resolve: {
    alias: {
      "@": path.join(root, "src"),
    },
  },
  source: {
    entry: {
      index: "./src/index.tsx",
    },
  },
});
