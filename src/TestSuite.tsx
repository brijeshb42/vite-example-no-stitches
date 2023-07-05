import * as React from "react";
// @ts-ignore
import { styled } from "no-stitches/runtime";
import Slider from "@mui/material/Slider";

import { Slider as ZeroSlider } from "./components/Slider/Slider";

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

export function TestSuite() {
  const [materialUpdates, setMaterialUpdates] = React.useState<string[]>([]);
  const [zeroUpdates, setZeroUpdates] = React.useState<string[]>([]);

  const handleRender: React.ProfilerProps["onRender"] = React.useCallback(
    (id, phase, actualDuration, baseDuration, startTime, commitTime) => {
      const str = `${id} - phase: ${phase}, baseDuration: ${baseDuration}, actualDuration: ${actualDuration}`;
      console.log(str);
      // if (id === "material") {
      //   setMaterialUpdates((current) => [...current, str]);
      // } else {
      //   setZeroUpdates((current) => [...current, str]);
      // }
    },
    []
  );

  return (
    <PaddedDiv>
      <HalfDiv>
        <h2>Material</h2>
        <React.Profiler id="material" onRender={handleRender}>
          <Slider
            aria-label="Small steps"
            defaultValue={0.00000005}
            step={0.00000001}
            marks
            min={-0.00000005}
            max={0.0000001}
            valueLabelDisplay="auto"
            color={"primary"}
          />
        </React.Profiler>
        <ul>
          {materialUpdates.map((update, index) => (
            <li key={index}>{update}</li>
          ))}
        </ul>
      </HalfDiv>
      <HalfDiv>
        <h2>no-stitches</h2>
        <React.Profiler id="no-stitches" onRender={handleRender}>
          <ZeroSlider
            aria-label="Small steps"
            defaultValue={0.00000005}
            step={0.00000001}
            marks
            min={-0.00000005}
            max={0.0000001}
            valueLabelDisplay="auto"
            color={"primary"}
          />
        </React.Profiler>
        <ul>
          {zeroUpdates.map((update, index) => (
            <li key={index}>{update}</li>
          ))}
        </ul>
      </HalfDiv>
    </PaddedDiv>
  );
}
