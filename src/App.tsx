import * as React from "react";
// @ts-ignore
import { icss, styled, keyframes, css } from "no-stitches/runtime";

const cls = css({
  color: "red",
});

const scaleUp = keyframes({
  "0%": { transform: "scale(1)" },
  "100%": { transform: "scale(1.5)" },
});

const Button = styled("button", ({ theme, dark }: any) => ({
  borderRadius: "9999px",
  fontSize: "13px",
  padding: "10px 15px",
  "&:hover": {
    color: "$foreground",
    animation: `${scaleUp} 200ms`,
  },
  "@bp1": {
    backgroundColor: theme.colors.background.computedValue,
    color: dark.colors.background.computedValue,
  },
  [`& .${cls}`]: {
    color: "blue",
  },
  // [`.${theme}`]: {
  //   marginLeft: 5,
  // },
  variants: {
    variant: {
      primary: {
        backgroundColor: "green",
        "@bp1": {
          backgroundColor: "yellow",
          color: "black",
        },
      },
      secondary: {
        backgroundColor: "blue",
      },
    },
    size: {
      small: {
        padding: 5,
        margin: 10,
        "&:hover": {
          padding: 2.5,
        },
        "@bp2": {},
      },
      medium: {
        padding: 10,
      },
      large: {
        padding: 15,
      },
    },
  },
  defaultVariants: {
    // variant: "primary",
    // size: "medium",
  },
}));

const AnotherButton = styled(Button, {
  color: "red",
  $$shadow: "blueviolet",
  boxShadow: "0 0 0 3px $$shadow",
  "&:hover": {
    $$shadow: "royalblue",
  },
});

const LazyH1 = React.lazy(() => import("./LazyH1"));

export default function App() {
  const [count, setCount] = React.useState(0);
  const size = count % 3 === 0 ? "small" : count % 3 === 1 ? "medium" : "large";
  return (
    <>
      <Button
        variant={count % 2 === 0 ? "secondary" : "primary"}
        type="button"
        size={size}
        css={
          count % 2 === 0
            ? icss({
                color: "white",
              })
            : icss({
                color: "magenta",
              })
        }
        onClick={() => setCount((c) => c + 1)}
      >
        Count {count}
        <span className={cls()}>Color blue</span>
        {/* <Icon>Icon</Icon> */}
      </Button>
      <AnotherButton size="large" type="button">
        Count
      </AnotherButton>
      {count >= 5 && <LazyH1>Hello H1</LazyH1>}
    </>
  );
}
