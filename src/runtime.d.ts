import type { CSS, styled as stStyled } from "@stitches/react";

type OriginalStyledParams = Parameters<typeof stStyled>;
type OriginalStyledCssParam = OriginalStyledParams[1];

type StyledFn = (
  type: OriginalStyledParams[0],
  ...composers: OriginalStyledCssParam[]
) => ReturnType<typeof stStyled>;

export const styled: StyledFn;

export const css: any;

export function icx(css: CSS): CSS;
