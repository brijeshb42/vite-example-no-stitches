import { useState } from "react";
import { styled, keyframes } from "@stitches/react";
import { icx } from "./runtime";

const scaleUp = keyframes({
  "0%": { transform: "scale(1)" },
  "100%": { transform: "scale(1.5)" },
});

const Button = styled("button", {
  borderRadius: "9999px",
  fontSize: "13px",
  padding: "10px 15px",
  "&:hover": {
    color: "white",
    animation: `${scaleUp} 200ms`,
  },
  "@bp1": {
    backgroundColor: "green",
  },
  // "&::before": {
  //   content: `''`,
  //   display: "block",
  //   backgroundImage: "linear-gradient(to right, #1fa2ff, #12d8fa, #a6ffcb)",
  //   position: "absolute",
  //   top: "-3px",
  //   left: "-3px",
  //   width: "calc(100% + 6px)",
  //   height: "calc(100% + 6px)",
  //   borderRadius: "inherit",
  //   zIndex: -1,
  // },
  // [`& ${Icon}`]: {
  //   marginLeft: "5px",
  // },
  // [`& ${class1().selector}`]: {
  //   marginRight: "5px",
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
});

const AnotherButton = styled(Button, {
  color: "red",
  $$shadow: "blueviolet",
  boxShadow: "0 0 0 3px $$shadow",
  "&:hover": {
    $$shadow: "royalblue",
  },
});

export default function App() {
  const [count, setCount] = useState(0);
  const size = count % 3 === 0 ? "small" : count % 3 === 1 ? "medium" : "large";
  return (
    <>
      <Button
        variant={count % 2 === 0 ? "secondary" : "primary"}
        type="button"
        size={size}
        css={icx({
          color: "white",
        })}
        onClick={() => setCount((c) => c + 1)}
      >
        Count {count}
        {/* <Icon>Icon</Icon> */}
      </Button>
      <AnotherButton size="large" type="button">
        Count
      </AnotherButton>
    </>
  );
}
