module.exports = {
  plugins: ["@babel/plugin-syntax-jsx"],
  presets: [
    [
      "@linaria",
      {
        displayName: true, // mode !== "production",
        sourceMap: true,
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
              size: (value) => ({
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
      },
    ],
  ],
};
