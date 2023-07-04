import * as React from "react";
import Slider from "@mui/material/Slider";
import { Slider as ZeroSlider } from "./components/Slider/Slider";
// @ts-ignore
import { styled } from "no-stitches/runtime";

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

export default function App() {
  const [isColorPrimary, setIsColorPrimary] = React.useState(true);
  const [showMarks, setShowMarks] = React.useState(true);

  return (
    <>
      <div>
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
        <HalfDiv>
          <h2>Material</h2>
          <Slider
            aria-label="Small steps"
            defaultValue={0.00000005}
            step={0.00000001}
            marks={showMarks}
            min={-0.00000005}
            max={0.0000001}
            valueLabelDisplay="auto"
            color={isColorPrimary ? "primary" : "secondary"}
          />
        </HalfDiv>
        <HalfDiv>
          <h2>no-stitches</h2>
          <ZeroSlider
            aria-label="Small steps"
            defaultValue={0.00000005}
            step={0.00000001}
            marks={showMarks}
            min={-0.00000005}
            max={0.0000001}
            valueLabelDisplay="auto"
            color={isColorPrimary ? "primary" : "secondary"}
          />
        </HalfDiv>
      </PaddedDiv>
    </>
  );
}
