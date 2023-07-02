# no-stitches

A build-time replacement for [Stitches](https://stitches.dev/) that uses [Linaria](https://github.com/callstack/linaria) as zero-runtime framework and Stitches for the actual CSS generation. It uses Linaria with custom tag processors.

The API is mostly same. Except, you need to import `styled`, `css`, `keyframes` etc from `no-stitches/runtime` instead of `@stitches/react` or `@stitches/core`. Due to the zero-runtime nature, there is an additional API signature to access the Stitches themes. Normally, with Stitches, you'd do this -

```tsx stitches.config.js
// stitches.config.js
import { createStitches } from "@stitches/react";

const { styled, theme, css } = createStitches({
  theme: {
    color: {
      text: "black",
      bakcground: "white",
    },
  },
});

export { styled, theme, css };

// App.tsx
import { styled } from "@stitches/react";

const Button = styled("button", {
  borderRadius: "9999px",
  fontSize: "13px",
  padding: "10px 15px",
});
```

and then import the above in your app code. But with `no-stitches`, you provide the stitches config as build time option. See [vite.config.ts](/vite.config.ts). There is default theme generated through `createStitchesConfig` option and you can also add your other themes in the `themes` options. In your code, you can access the generated themes as a callback argument in your `styled` or `css` function like this -

```tsx App.tsx
import { styled, keyframes } from "no-stitches/runtime";

const Button = styled("button", ({ theme, dark }) => ({
  borderRadius: "9999px",
  fontSize: "13px",
  padding: "10px 15px",
  "&:hover": {
    color: "$foreground",
    animation: `${scaleUp} 200ms`,
  },
  // @bp1 is a media query name added through `createStitchesConfig`
  "@bp1": {
    backgroundColor: theme.colors.background.computedValue,
    color: dark.colors.background.computedValue,
  },
}));
```

### TODOs

- [x] [Variants](https://stitches.dev/docs/variants) as supported directly. So you can add as many variants through the `css` or `styled` APIs.
- [x] `keyframes` is supported as-is
- [x] `globalCss` is supported as-is
- [x] [Overriding Styles](https://stitches.dev/docs/overriding-styles) are supported but there is a change in the API. Instead of directly passing css object to the `css` prop, you need to wrap your css in the `icss` function call imported from `no-stitches/runtime`. [See](/src/App.tsx#L90). There is still a problem of specificity for styled components that extend other styled components. But for 1st level components (that only wrap html element or other non styled-components), it works fine.
- [ ] [Responsive Variants](https://stitches.dev/docs/responsive-styles#responsive-variants) from stitches are not supported yet and might not still be supported in future as well because of how Linaria works (without forking Linaria).
- [ ] Typescript support for the build-time stitches config, themes as well as the callback API for `css` and `styled`

### Running the project

1. Run `yarn install` or `npm install` to install all the dependencies.
2. Run `yarn dev` or `npm run dev` to start the dev server
3. Run `yarn build` or `npm run build` to build the code for production. You can customize the build options in `vite.config.ts` as per your requirements.
