import { defineConfig } from "vite";
import { glob } from "glob";
import injectHTML from "vite-plugin-html-inject";
import FullReload from "vite-plugin-full-reload";

export default defineConfig(({ command }) => {
  return {
    define: {
      [command === "serve" ? "global" : "_global"]: {},
    },
    root: "src",
    build: {
      sourcemap: false,

      rollupOptions: {
        // input: glob.sync("./src/*.html"),
        input: glob.sync("./src/index.html"),
        output: {
          manualChunks(id) {
            if (id.includes("node_modules")) {
              return "vendor";
            }
          },
          entryFileNames: "commonHelpers.js",
        },
      },
      outDir: "../dist",
    },
    plugins: [injectHTML(), FullReload(["./src/**/**.html"])],
  };
});
