import { defineConfig } from "@rsbuild/core";

export default defineConfig({
  tools: {
    rspack: (config, { appendRules }) => {
      appendRules([
        {
          test: /\.html$/,
          type: "asset/source",
        },
      ]);
    },
  },
});
