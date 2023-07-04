import { defineConfig, splitVendorChunkPlugin } from "vite";
import react from "@vitejs/plugin-react";
import noStitchesPlugin from "no-stitches/vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    noStitchesPlugin({
      // Add if you are using typescript
      displayName: true,
      readableVariantClass: true,
      babelOptions: {
        plugins: ["@babel/plugin-transform-typescript"],
      },
      createStitchesConfig: ({ defaultThemeMap }) => ({
        media: {
          xs: "(min-width: 0px)",
          sm: "(min-width: 600px)",
          md: "(min-width: 900px)",
          lg: "(min-width: 1200px)",
          xl: "(min-width: 1536px)",
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
            white: "#fff",
            background: "white",
            foreground: "black",
            primaryMain: "#1976d2",
            secondaryMain: "#9c27b0",
            grey400: "#B2BAC2",
            grey600: "#6F7E8C",
            textSecondary: "#3E5060",
            textPrimary: "#1A2027",
          },
          shadows: {
            "2": "0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)",
          },
          fonts: {
            body2:
              '"IBM Plex Sans",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
          },
          fontSizes: {
            body2: "0.875rem",
          },
          fontWeights: {
            body2: 400,
          },
          letterSpacings: {
            body2: 0,
          },
          lineHeights: {
            body2: 1.5,
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
      tagResolver(source, tag) {
        if (
          source.startsWith("no-stitches") ||
          source.startsWith("@mui/no-stitches")
        ) {
          return `no-stitches/${tag}`;
        }
        return null;
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
