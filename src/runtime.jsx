import { forwardRef } from "react";

function cx(...classes) {
  let str = "";

  classes.forEach((cls) => {
    if (!cls) {
      return;
    }
    if (typeof cls === "string") {
      if (str.endsWith(" ") || !str) {
        str += cls;
      } else {
        str += ` ${cls}`;
      }
    }
  });

  return str;
}

function getVariantClasses(props, variants, defaults) {
  const finalProps = props || {};
  const deletableKeys = [];

  const classNames = Object.entries(variants).map(
    ([variantName, variantMap]) => {
      const hasVariantInProps = variantName in finalProps;
      const propVariantValue = finalProps[variantName];
      deletableKeys.push(variantName);
      // delete rest[variantName];
      const defaultVal = variantMap[defaults[variantName]];
      if (hasVariantInProps) {
        return variantMap[propVariantValue] ?? defaultVal;
      } else {
        return defaultVal;
      }
    }
  );

  return {
    classNames,
    deletableKeys,
  };
}

export function styled(tag, options = {}) {
  const { class: initClass, name, variants = {}, defaults = {} } = options;

  const StyledComponent = forwardRef(
    ({ as: asProp, className, ...rest }, ref) => {
      const FinalComponent = asProp ?? tag;
      const { classNames: variantClasses, deletableKeys } = getVariantClasses(
        rest,
        variants,
        defaults
      );
      deletableKeys.forEach((key) => {
        delete rest[key];
      });
      const finalClass = cx(initClass, ...variantClasses, className);
      return <FinalComponent {...rest} className={finalClass} ref={ref} />;
    }
  );

  StyledComponent.displayName = name;

  return StyledComponent;
}

export function css({ class: baseClass, variants, defaults }) {
  return (props) => {
    const { classNames } = getVariantClasses(props, variants, defaults);
    return cx(baseClass, ...classNames);
  };
}

/**
 * @param {import('@stitches/react').CSS} css
 * @returns {import('@stitches/react').CSS}
 */
export function icx(css) {
  return css;
}
