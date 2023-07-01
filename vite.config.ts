import { defineConfig, splitVendorChunkPlugin } from "vite";
import react from "@vitejs/plugin-react";
import linaria from "@linaria/vite";
import type { DefaultThemeMap, createStitches } from "@stitches/react";

type LinariaPluginOptions = Parameters<typeof linaria>[0];

type CreateStitchesConfigParam = {
  defaultThemeMap: DefaultThemeMap;
};

type StitchesConfig = {
  readableVariantClass?: boolean;
  createStitchesConfig?(
    param: CreateStitchesConfigParam
  ): Parameters<typeof createStitches>[0];
};

type StitchesPluginConfig = LinariaPluginOptions & StitchesConfig;

const stitchesPlugin = (config?: StitchesPluginConfig) => linaria(config);

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    stitchesPlugin({
      displayName: false, // mode !== "production",
      sourceMap: mode === "production",
      readableVariantClass: true,
      preprocessor(_selector, css) {
        // everything is already done. no pre-processing required.
        return css;
      },
      createStitchesConfig({ defaultThemeMap }) {
        return {
          media: {
            bp1: "(min-width: 640px)",
            bp2: "(min-width: 768px)",
            bp3: "(min-width: 1024px)",
          },
          themeMap: {
            ...defaultThemeMap,
          },
          utils: {
            size: (value: string | number) => ({
              width: value,
              height: value,
            }),
          },
        };
      },
      tagResolver(_source, tag) {
        switch (tag) {
          case "styled":
            return "@mui/no-stitches/styled";
          case "css":
            return "@mui/no-stitches/css";
          case "keyframes":
            return "@mui/no-stitches/keyframes";
          default:
            return null;
        }
      },
    }),
    react(),
    mode === "production" ? splitVendorChunkPlugin() : false,
  ],
  build: {
    minify: true,
    sourcemap: true,
  },
}));
