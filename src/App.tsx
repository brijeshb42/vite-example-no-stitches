import * as React from "react";
import Slider from "@mui/material/Slider";
import { Slider as ZeroSlider } from "./components/Slider/Slider";
// @ts-ignore
import { styled, icss } from "no-stitches/runtime";

const PaddedDiv = styled("div", {
  display: "flex",
  margin: 10,
  padding: 20,
  maxWidth: 800,
  gap: 40,
  border: "1px solid $primaryMain",
});

const HalfDiv = styled("div", {
  width: "50%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const fullWidthCls = icss({
  width: "100%",
});

// const LazySlider = React.lazy(() => import("@mui/material/Slider"));
// const LazyZeroSlider = React.lazy(() =>
//   import("./components/Slider/Slider").then(({ Slider }) => ({
//     default: Slider,
//   }))
// );

export default function App() {
  const showUI = React.useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get("show") ?? "both";
  }, []);
  const [isColorPrimary, setIsColorPrimary] = React.useState(true);
  const [showMarks, setShowMarks] = React.useState(true);

  return (
    <>
      <div>
        <div
          className={icss({
            display: "flex",
            gap: 20,
          })}
        >
          <a href="/?show=both">Render Both</a>
          <a href="/?show=material">Render only material</a>
          <a href="/?show=no-stitches">Render only no-stitches</a>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={isColorPrimary}
              onChange={() => setIsColorPrimary(!isColorPrimary)}
            />
            Toggle Color: {isColorPrimary ? "Primary" : "Secondary"}
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={showMarks}
              onChange={() => setShowMarks(!showMarks)}
            />
            Show marks: {showMarks ? "Yes" : "No"}
          </label>
        </div>
      </div>
      <PaddedDiv>
        {(showUI === "both" || showUI === "material") && (
          <HalfDiv css={showUI === "material" ? fullWidthCls : undefined}>
            <h2>Material</h2>
            <Slider
              aria-label="Small steps"
              defaultValue={50}
              step={2}
              marks={showMarks}
              min={0}
              max={100}
              valueLabelDisplay="auto"
              color={isColorPrimary ? "primary" : "secondary"}
            />
          </HalfDiv>
        )}
        {(showUI === "both" || showUI === "no-stitches") && (
          <HalfDiv css={showUI === "no-stitches" ? fullWidthCls : undefined}>
            <h2>no-stitches</h2>
            <ZeroSlider
              aria-label="Small steps"
              defaultValue={50}
              step={2}
              marks={showMarks}
              min={0}
              max={100}
              valueLabelDisplay="auto"
              color={isColorPrimary ? "primary" : "secondary"}
            />
          </HalfDiv>
        )}
      </PaddedDiv>
    </>
  );
}
