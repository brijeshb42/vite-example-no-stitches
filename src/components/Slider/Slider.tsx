import * as React from "react";
import type { SliderOwnerState, SliderProps } from "@mui/material/Slider";
import useSlider, { valueToPercent } from "@mui/base/useSlider";
import composeClasses from "@mui/base/composeClasses";
import { isHostComponent, useSlotProps } from "@mui/base/utils";
import SliderValueLabel from "@mui/material/Slider/SliderValueLabel";
import { styled } from "no-stitches/runtime";
import clsx from "clsx";

import sliderClasses, { getSliderUtilityClass } from "./sliderClasses";
import {
  createTransition,
  duration,
  getTypography,
  pxToRem,
  shouldSpreadAdditionalProps,
} from "../utils/themeUtils";
import { alpha, lighten, darken } from "../utils/colorManipulator";

function Identity<T = unknown>(x: T) {
  return x;
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const SliderRoot = styled("span", ({ theme }: any) => ({
  borderRadius: 12,
  boxSizing: "content-box",
  display: "inline-block",
  position: "relative",
  cursor: "pointer",
  touchAction: "none",
  WebkitTapHighlightColor: "transparent",
  "@media print": {
    printColorAdjust: "exact",
  },
  [`&.${sliderClasses.disabled}`]: {
    pointerEvents: "none",
    cursor: "default",
    color: theme.colors.grey400.value,
  },
  [`&.${sliderClasses.dragging}`]: {
    [`& .${sliderClasses.thumb}, & .${sliderClasses.track}`]: {
      transition: "none",
    },
  },
  variants: {
    color: {
      primary: {
        color: theme.colors.primaryMain.value,
      },
      secondary: {
        color: theme.colors.secondaryMain.value,
      },
    },
    orientation: {
      horizontal: {
        height: 4,
        width: "100%",
        padding: "13px 0",
        "@media (pointer: coarse)": {
          // Reach 42px touch target, about ~8mm on screen.
          padding: "20px 0",
        },
      },
      vertical: {
        height: "100%",
        width: 4,
        padding: "0 13px",
        // The primary input mechanism of the device includes a pointing device of limited accuracy.
        "@media (pointer: coarse)": {
          // Reach 42px touch target, about ~8mm on screen.
          padding: "0 20px",
        },
      },
    },
    size: {
      small: {},
      medium: {},
    },
    marked: {
      yes: {},
      no: {},
    },
  },
  defaultVariants: {
    color: "primary",
    orientation: "horizontal",
    size: "medium",
    marked: "no",
  },
  compoundVariants: [
    {
      orientation: "horizontal",
      size: "small",
      css: {
        height: 2,
      },
    },
    {
      orientation: "horizontal",
      marked: "yes",
      css: {
        marginBottom: 20,
      },
    },
    {
      orientation: "vertical",
      size: "small",
      css: {
        width: 2,
      },
    },
    {
      orientation: "horizontal",
      marked: "yes",
      css: {
        marginRight: 44,
      },
    },
  ],
}));

const SliderRail = styled("span", {
  display: "block",
  position: "absolute",
  borderRadius: "inherit",
  backgroundColor: "currentColor",
  opacity: 0.38,
  variants: {
    orientation: {
      horizontal: {
        width: "100%",
        height: "inherit",
        top: "50%",
        transform: "translateY(-50%)",
      },
      vertical: {
        height: "100%",
        width: "inherit",
        left: "50%",
        transform: "translateX(-50%)",
      },
    },
    track: {
      inverted: {
        opacity: 1,
      },
      normal: {},
    },
  },
  defaultVariants: {
    orientation: "horizontal",
    track: "normal",
  },
});

const SliderTrack = styled("span", ({ theme }: any) => ({
  display: "block",
  position: "absolute",
  borderRadius: "inherit",
  border: "1px solid currentColor",
  backgroundColor: "currentColor",
  transition: createTransition(["left", "width", "bottom", "height"], {
    duration: duration.shortest,
  }),
  variants: {
    size: {
      small: {
        border: "none",
      },
      medium: {},
    },
    color: {
      primary: {
        // $$trackColor: lighten(theme.colors.primaryMain.value, 0.62),
        $$trackColor: lighten(theme.colors.primaryMain.value, 0.62),
      },
      secondary: {
        // $$trackColor: lighten(theme.colors.secondaryMain.value, 0.62),
        $$trackColor: lighten(theme.colors.secondaryMain.value, 0.62),
      },
    },
    orientation: {
      horizontal: {
        height: "inherit",
        top: "50%",
        transform: "translateY(-50%)",
      },
      vertical: {
        width: "inherit",
        left: "50%",
        transform: "translateX(-50%)",
      },
    },
    track: {
      inverted: {
        backgroundColor: "$$trackColor",
        borderColor: "$$trackColor",
      },
      normal: {},
      none: {
        display: "none",
      },
    },
  },
  defaultVariants: {
    size: "medium",
    color: "primary",
    orientation: "horizontal",
    track: "normal",
  },
}));

const SliderThumb = styled("span", ({ theme }: any) => ({
  position: "absolute",
  width: 20,
  height: 20,
  boxSizing: "border-box",
  borderRadius: "50%",
  outline: 0,
  backgroundColor: "currentColor",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: createTransition(["box-shadow", "left", "bottom"], {
    duration: duration.shortest,
  }),
  "&::before": {
    position: "absolute",
    content: '""',
    borderRadius: "inherit",
    width: "100%",
    height: "100%",
    boxShadow: "$2",
  },
  "&::after": {
    position: "absolute",
    content: '""',
    borderRadius: "50%",
    // 42px is the hit target
    width: 42,
    height: 42,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  [`&:hover, &.${sliderClasses.focusVisible}`]: {
    boxShadow: "0px 0px 0px 8px $$shadowColor",
    "@media (hover: none)": {
      boxShadow: "none",
    },
  },
  [`&.${sliderClasses.active}`]: {
    boxShadow: "0px 0px 0px 14px $$shadowColor",
  },
  [`&.${sliderClasses.disabled}`]: {
    "&:hover": {
      boxShadow: "none",
    },
  },
  variants: {
    color: {
      primary: {
        $$shadowColor: alpha(theme.colors.primaryMain.value, 0.16),
      },
      secondary: {
        $$shadowColor: alpha(theme.colors.secondaryMain.value, 0.16),
      },
    },
    size: {
      small: {
        width: 12,
        height: 12,
        "&:before": {
          boxShadow: "none",
        },
      },
      medium: {},
    },
    orientation: {
      horizontal: {
        top: "50%",
        transform: "translate(-50%, -50%)",
      },
      vertical: {
        left: "50%",
        transform: "translate(-50%, 50%)",
      },
    },
  },
  defaultVariants: {
    color: "primary",
    size: "medium",
    orientation: "horizontal",
  },
}));

const StyledSliderValueLabel = styled(SliderValueLabel, {
  position: "absolute",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "0.25rem 0.75rem",
  zIndex: 1,
  whiteSpace: "nowrap",
  ...getTypography("body2"),
  fontWeight: 500,
  transition: createTransition(["transform"], {
    duration: duration.shortest,
  }),
  backgroundColor: "$grey600",
  borderRadius: 2,
  color: "$white",

  variants: {
    size: {
      small: {
        $$right: "20px",
        fontSize: pxToRem(12),
        padding: "0.25rem 0.5rem",
      },
      medium: {
        $$right: "30px",
      },
    },
    orientation: {
      horizontal: {
        top: "-10px",
        transform: "translateY(-100%) scale(0)",
        transformOrigin: "bottom center",
        "&:before": {
          position: "absolute",
          content: '""',
          width: 8,
          height: 8,
          transform: "translate(-50%, 50%) rotate(45deg)",
          backgroundColor: "inherit",
          bottom: 0,
          left: "50%",
        },

        [`&.${sliderClasses.valueLabelOpen}`]: {
          transform: "translateY(-100%) scale(1)",
        },
      },
      vertical: {
        right: "$$right",
        top: "50%",
        transform: "translateY(-50%) scale(0)",
        transformOrigin: "right center",
        "&:before": {
          position: "absolute",
          content: '""',
          width: 8,
          height: 8,
          transform: "translate(-50%, -50%) rotate(45deg)",
          backgroundColor: "inherit",
          right: -8,
          top: "50%",
        },

        [`&.${sliderClasses.valueLabelOpen}`]: {
          transform: "translateY(-50%) scale(1)",
        },
      },
    },
  },
  defaultVariants: {
    size: "medium",
    orientation: "horizontal",
  },
});

const SliderMark = styled("span", {
  position: "absolute",
  width: 2,
  height: 2,
  borderRadius: 1,
  backgroundColor: "currentColor",
  variants: {
    orientation: {
      horizontal: {
        top: "50%",
        transform: "translate(-1px, -50%)",
      },
      vertical: {
        left: "50%",
        transform: "translate(-50%, 1px)",
      },
    },
    active: {
      yes: {
        backgroundColor: "$white",
        opacity: 0.8,
      },
      no: {},
    },
  },
  defaultVariants: {
    orientation: "horizontal",
    active: "no",
  },
});

const SliderMarkLabel = styled("span", {
  ...getTypography("body2"),
  color: "$textSecondary",
  position: "absolute",
  whiteSpace: "nowrap",
  variants: {
    orientation: {
      horizontal: {
        top: 30,
        transform: "translateX(-50%)",
        "@media (pointer: coarse)": {
          top: 40,
        },
      },
      vertical: {
        left: 36,
        transform: "translateY(50%)",
        "@media (pointer: coarse)": {
          left: 44,
        },
      },
    },
    active: {
      yes: {
        color: "$textPrimary",
      },
    },
  },
  defaultVariants: {
    orientation: "horizontal",
    active: "no",
  },
});

function useUtilityClasses(ownerState: SliderOwnerState) {
  const {
    disabled,
    dragging,
    marked,
    orientation,
    track,
    classes,
    color,
    size,
  } = ownerState;

  const slots = {
    root: [
      "root",
      disabled && "disabled",
      dragging && "dragging",
      marked && "marked",
      orientation === "vertical" && "vertical",
      track === "inverted" && "trackInverted",
      track === false && "trackFalse",
      color && `color${capitalize(color)}`,
      size && `size${capitalize(size)}`,
    ],
    rail: ["rail"],
    track: ["track"],
    mark: ["mark"],
    markActive: ["markActive"],
    markLabel: ["markLabel"],
    markLabelActive: ["markLabelActive"],
    valueLabel: ["valueLabel"],
    thumb: [
      "thumb",
      disabled && "disabled",
      size && `thumbSize${capitalize(size)}`,
      color && `thumbColor${capitalize(color)}`,
    ],
    active: ["active"],
    disabled: ["disabled"],
    focusVisible: ["focusVisible"],
  };

  return composeClasses(slots, getSliderUtilityClass, classes);
}

const Forward = ({ children }: { children?: React.ElementType }) => children;

export const Slider = React.forwardRef<any, SliderProps>(function Slider(
  props,
  ref
) {
  // @TODO - Hardcoded for now. Need to figure out how to access it from theme.
  const isRtl = false;

  const {
    "aria-label": ariaLabel,
    "aria-valuetext": ariaValuetext,
    "aria-labelledby": ariaLabelledby,
    // @ts-ignore
    component = "span",
    components = {},
    componentsProps = {},
    color = "primary",
    classes: classesProp,
    className,
    disableSwap = false,
    disabled = false,
    getAriaLabel,
    getAriaValueText,
    marks: marksProp = false,
    max = 100,
    min = 0,
    name,
    onChange,
    onChangeCommitted,
    orientation = "horizontal",
    size = "medium",
    step = 1,
    scale = Identity,
    slotProps,
    slots,
    tabIndex,
    track = "normal",
    value: valueProp,
    valueLabelDisplay = "off",
    valueLabelFormat = Identity,
    ...other
  } = props;

  const ownerState: SliderOwnerState = {
    ...props,
    // @ts-ignore
    isRtl,
    max,
    min,
    classes: classesProp,
    disabled,
    disableSwap,
    orientation,
    marks: marksProp,
    color,
    size,
    step,
    scale,
    track,
    valueLabelDisplay,
    valueLabelFormat,
  };

  const {
    axisProps,
    getRootProps,
    getHiddenInputProps,
    getThumbProps,
    open,
    active,
    axis,
    focusedThumbIndex,
    range,
    dragging,
    marks,
    values,
    trackOffset,
    trackLeap,
    // getThumbStyle,
  } = useSlider({ ...ownerState, rootRef: ref });

  ownerState.marked = marks.length > 0 && marks.some((mark) => mark.label);
  ownerState.dragging = dragging;
  ownerState.focusedThumbIndex = focusedThumbIndex;

  const classes = useUtilityClasses(ownerState);

  const RootSlot = slots?.root ?? components.Root ?? SliderRoot;
  const RailSlot = slots?.rail ?? components.Rail ?? SliderRail;
  const TrackSlot = slots?.track ?? components.Track ?? SliderTrack;
  const ThumbSlot = slots?.thumb ?? components.Thumb ?? SliderThumb;
  const ValueLabelSlot =
    slots?.valueLabel ?? components.ValueLabel ?? StyledSliderValueLabel;
  const MarkSlot = slots?.mark ?? components.Mark ?? SliderMark;
  const MarkLabelSlot =
    slots?.markLabel ?? components.MarkLabel ?? SliderMarkLabel;
  const InputSlot = slots?.input ?? components.Input ?? "input";

  const rootSlotProps = slotProps?.root ?? componentsProps.root;
  const railSlotProps = slotProps?.rail ?? componentsProps.rail;
  const trackSlotProps = slotProps?.track ?? componentsProps.track;
  const thumbSlotProps = slotProps?.thumb ?? componentsProps.thumb;
  const valueLabelSlotProps =
    slotProps?.valueLabel ?? componentsProps.valueLabel;
  const markSlotProps = slotProps?.mark ?? componentsProps.mark;
  const markLabelSlotProps = slotProps?.markLabel ?? componentsProps.markLabel;
  const inputSlotProps = slotProps?.input ?? componentsProps.input;

  const rootProps = useSlotProps({
    elementType: RootSlot,
    getSlotProps: getRootProps,
    externalSlotProps: rootSlotProps,
    externalForwardedProps: other,
    additionalProps: {
      ...(shouldSpreadAdditionalProps(RootSlot) && {
        as: component,
      }),
    },
    ownerState: {
      ...ownerState,
      // @ts-ignore
      ...rootSlotProps?.ownerState,
    },
    className: [classes.root, className],
  });

  const railProps = useSlotProps({
    elementType: RailSlot,
    externalSlotProps: railSlotProps,
    ownerState,
    className: classes.rail,
  });

  const trackProps = useSlotProps({
    elementType: TrackSlot,
    externalSlotProps: trackSlotProps,
    additionalProps: {
      style: {
        ...axisProps[axis].offset(trackOffset),
        ...axisProps[axis].leap(trackLeap),
      },
    },
    ownerState: {
      ...ownerState,
      // @ts-ignore
      ...trackSlotProps?.ownerState,
    },
    className: classes.track,
  });

  const thumbProps = useSlotProps({
    elementType: ThumbSlot,
    getSlotProps: getThumbProps,
    externalSlotProps: thumbSlotProps,
    ownerState: {
      ...ownerState,
      // @ts-ignore
      ...thumbSlotProps?.ownerState,
    },
    className: classes.thumb,
  });

  const valueLabelProps = useSlotProps({
    elementType: ValueLabelSlot,
    externalSlotProps: valueLabelSlotProps,
    ownerState: {
      ...ownerState,
      // @ts-ignore
      ...valueLabelSlotProps?.ownerState,
    },
    className: classes.valueLabel,
  });

  const markProps = useSlotProps({
    elementType: MarkSlot,
    externalSlotProps: markSlotProps,
    ownerState,
    className: classes.mark,
  });

  const markLabelProps = useSlotProps({
    elementType: MarkLabelSlot,
    externalSlotProps: markLabelSlotProps,
    ownerState,
    className: classes.markLabel,
  });

  const inputSliderProps = useSlotProps({
    elementType: InputSlot,
    getSlotProps: getHiddenInputProps,
    externalSlotProps: inputSlotProps,
    ownerState,
  });

  return (
    <RootSlot
      color={rootProps.ownerState?.color}
      orientation={rootProps.ownerState?.orientation}
      marked={rootProps.ownerState?.marked ? "yes" : "no"}
      size={rootProps.ownerState?.size}
      {...rootProps}
    >
      <RailSlot
        orientation={railProps.ownerState?.orientation}
        track={railProps.ownerState?.track}
        {...railProps}
      />
      <TrackSlot
        orientation={railProps.ownerState?.orientation}
        size={railProps.ownerState?.size}
        color={railProps.ownerState?.color}
        track={railProps.ownerState?.track}
        {...trackProps}
      />
      {marks
        .filter((mark) => mark.value >= min && mark.value <= max)
        .map((mark, index) => {
          const percent = valueToPercent(mark.value, min, max);
          const style = axisProps[axis].offset(percent);

          let markActive;
          if (track === false) {
            markActive = values.indexOf(mark.value) !== -1;
          } else {
            markActive =
              (track === "normal" &&
                (range
                  ? mark.value >= values[0] &&
                    mark.value <= values[values.length - 1]
                  : mark.value <= values[0])) ||
              (track === "inverted" &&
                (range
                  ? mark.value <= values[0] ||
                    mark.value >= values[values.length - 1]
                  : mark.value >= values[0]));
          }

          return (
            <React.Fragment key={index}>
              <MarkSlot
                data-index={index}
                {...markProps}
                style={{ ...style, ...markProps.style }}
                className={clsx(markProps.className, {
                  [classes.markActive]: markActive,
                })}
                orientation={markProps.ownerState?.orientation}
                active={markActive ? "yes" : "no"}
              />
              {mark.label != null ? (
                <MarkLabelSlot
                  aria-hidden
                  data-index={index}
                  {...markLabelProps}
                  style={{ ...style, ...markLabelProps.style }}
                  className={clsx(classes.markLabel, markLabelProps.className, {
                    [classes.markLabelActive]: markActive,
                  })}
                  orientation={markLabelProps.ownerState?.orientation}
                  active={markActive ? "yes" : "no"}
                >
                  {mark.label}
                </MarkLabelSlot>
              ) : null}
            </React.Fragment>
          );
        })}
      {values.map((value, index) => {
        const percent = valueToPercent(value, min, max);
        const style = axisProps[axis].offset(percent);

        const ValueLabelComponent =
          valueLabelDisplay === "off" ? Forward : ValueLabelSlot;

        return (
          /* TODO v6: Change component structure. It will help in avoiding the complicated React.cloneElement API added in SliderValueLabel component. Should be: Thumb -> Input, ValueLabel. Follow Joy UI's Slider structure. */
          <ValueLabelComponent
            key={index}
            {...(!isHostComponent(ValueLabelComponent) && {
              valueLabelFormat,
              valueLabelDisplay,
              value:
                typeof valueLabelFormat === "function"
                  ? valueLabelFormat(scale(value), index)
                  : valueLabelFormat,
              index,
              open:
                open === index ||
                active === index ||
                valueLabelDisplay === "on",
              disabled,
            })}
            {...valueLabelProps}
          >
            <ThumbSlot
              data-index={index}
              {...thumbProps}
              className={clsx(classes.thumb, thumbProps.className, {
                [classes.active]: active === index,
                [classes.focusVisible]: focusedThumbIndex === index,
              })}
              size={thumbProps.ownerState?.size}
              style={{
                ...style,
                // ...getThumbStyle(index),
                ...thumbProps.style,
              }}
            >
              <InputSlot
                data-index={index}
                aria-label={getAriaLabel ? getAriaLabel(index) : ariaLabel}
                aria-valuenow={scale(value)}
                aria-labelledby={ariaLabelledby}
                aria-valuetext={
                  getAriaValueText
                    ? getAriaValueText(scale(value), index)
                    : ariaValuetext
                }
                value={values[index]}
                {...inputSliderProps}
              />
            </ThumbSlot>
          </ValueLabelComponent>
        );
      })}
    </RootSlot>
  );
});
