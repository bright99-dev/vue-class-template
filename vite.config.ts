import { fileURLToPath, URL } from "node:url";
import { execSync } from "child_process";
import { defineConfig } from "vite";
import Vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import Unocss from 'unocss/vite'
import {
  presetAttributify,
  presetIcons,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig(({ mode }) => {
  const getBuildInfo = (info: string) =>
    JSON.stringify(
      {
        commitHash: execSync("git rev-parse --short HEAD").toString().trim(),
        version: execSync(
          `git log -i --pretty=format:%s -P -1 --grep="\\s*(dev|--\\s*v)\\s*+(\\d+\\.)(\\d+\\.)?(\\*|\\d+)*"`
        )
          .toString()
          .trim()
          .match(/(\d+\.)(\d+\.)?(\*|\d+)*/gi)
          ?.find((x) => x),
      }?.[info]
    );

  return {
      define: {
      __BUILD_VERSION__: getBuildInfo("version"),
      __BUILD_COMMIT_HASH__: getBuildInfo("commitHash"),
    },

    plugins: [
      Vue(),
      AutoImport({
        imports: ["vue", "vue-router"],
        dts: "src/auto-imports.d.ts",
        dirs: ["src/constants", "src/utils", "src/services", "src/models", "src/controllers"],
        vueTemplate: true,
      }),
        Components({
      resolvers: [
        ElementPlusResolver({
          importStyle: "sass",
        }),
      ],
    }),
    Unocss({
      presets: [
        presetUno(),
        presetAttributify(),
        presetIcons({
          scale: 1.2,
          warn: true,
        }),
      ],
      transformers: [
        transformerDirectives(),
        transformerVariantGroup(),
      ]
    }),
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    server: {
      host: true,
    },
    build: {
      chunkSizeWarningLimit: 2000,
    },
  };
});
