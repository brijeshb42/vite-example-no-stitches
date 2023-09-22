import * as React from "react";
import Slider from "@mui/material/Slider";
import { Slider as ZeroSlider } from "./components/Slider/Slider";
import { styled, icss, keyframes } from "no-stitches/runtime";

const bounce = keyframes(({
  'from, 20%, 53%, 80%, to': {
    transform: 'translate3d(0,0,0)',
  },
  '40%, 43%': {
    transform: 'translate3d(0, -30px, 0)',
  },
  '70%': {
    transform: 'translate3d(0, -15px, 0)',
  },
  '90%': {
    transform: 'translate3d(0,-4px,0)',
  },
});

const PaddedDiv = styled("div", {
  display: "flex",
  margin: 10,
  padding: 20,
  maxWidth: 800,
  gap: 40,
  border: "1px solid $primaryMain",
  animation: ${bounce} 1s ease infinite;
});

const HalfDiv = styled("div", {
  width: "50%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

// const LazySlider = React.lazy(() => import("@mui/material/Slider"));
// const LazyZeroSlider = React.lazy(() =>
//   import("./components/Slider/Slider").then(({ Slider }) => ({
//     default: Slider,
//   }))
// );

export default function App() {
  const [value, setValue] = React.useState(50);
  const showUI = React.useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get("show") ?? "both";
  }, []);
  const [isColorPrimary, setIsColorPrimary] = React.useState(true);
  const [size, setSize] = React.useState("medium");
  const [showMarks, setShowMarks] = React.useState(true);
  const [isTrackInverted, setIsTrackInverted] = React.useState(false);
  const [disabled, setDisabled] = React.useState(false);

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
              checked={isTrackInverted}
              onChange={() => setIsTrackInverted(!isTrackInverted)}
            />
            Track type: {isTrackInverted ? "Inverted" : "Normal"}
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={disabled}
              onChange={() => setDisabled(!disabled)}
            />
            Disabled: {disabled ? "Yes" : "No"}
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
        <div>
          <label>
            Change Size:
            <select value={size} onChange={(ev) => setSize(ev.target.value)}>
              <option value="small">Small</option>
              <option value="medium">Medium</option>
            </select>
          </label>
        </div>
      </div>
      <PaddedDiv>
        {(showUI === "both" || showUI === "material") && (
          <HalfDiv
            css={
              showUI === "material"
                ? icss(
                    {
                      width: "100%",
                    },
                    HalfDiv
                  )
                : undefined
            }
          >
            <h2>Material</h2>
            <Slider
              aria-label="Small steps"
              defaultValue={50}
              step={2}
              marks={showMarks}
              min={0}
              max={100}
              valueLabelDisplay="auto"
              size={size as "small" | "medium"}
              color={isColorPrimary ? "primary" : "secondary"}
              track={isTrackInverted ? "inverted" : "normal"}
              disabled={disabled}
              value={value}
              onChange={(ev, val) => setValue(val as number)}
            />
          </HalfDiv>
        )}
        {(showUI === "both" || showUI === "no-stitches") && (
          <HalfDiv
            css={
              showUI === "no-stitches"
                ? icss({
                    width: "100%",
                  })
                : undefined
            }
          >
            <h2>no-stitches</h2>
            <ZeroSlider
              aria-label="Small steps"
              defaultValue={50}
              step={2}
              marks={showMarks}
              min={0}
              max={100}
              valueLabelDisplay="auto"
              size={size as "small" | "medium"}
              color={isColorPrimary ? "primary" : "secondary"}
              track={isTrackInverted ? "inverted" : "normal"}
              disabled={disabled}
              value={value}
              onChange={(ev, val) => setValue(val as number)}
            />
          </HalfDiv>
        )}
      </PaddedDiv>
    </>
  );
}
