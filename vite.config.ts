import { defineConfig, splitVendorChunkPlugin } from "vite";
import react from "@vitejs/plugin-react";
import noStitchesPlugin from "no-stitches/vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    noStitchesPlugin({
      // Add if you are using typescript
      babelOptions: {
        plugins: ["@babel/plugin-transform-typescript"],
      },
      createStitchesConfig: ({ defaultThemeMap }) => ({
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
        theme: {
          colors: {
            background: "white",
            foreground: "black",
          },
        },
      }),
      themes: {
        dark: [
          "dark-theme",
          {
            colors: {
              background: "black",
              foreground: "white",
            },
          },
        ],
      },
    }),
    react(),
    mode === "production" ? splitVendorChunkPlugin() : false,
  ],
  build: {
    minify: false,
    sourcemap: true,
  },
}));
