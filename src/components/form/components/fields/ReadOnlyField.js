import React, { useContext, useEffect, useCallback, useState } from "react";
import { DocumentDateContext } from "components/form/Form";
import Math from "components/form/functions/math";
import ReadField from "components/form/components/fields/ReadField";
import objectPath from "object-path";

import "styles/styles.css";

export default ({ resetState, backendData, ...props }) => {
  const [value, setValue] = useState("");
  const { documentDate, renderFunction } = useContext(DocumentDateContext);

  const math = useCallback(
    (data = documentDate.current) => {
      const getValueFromMath = props.setValueByIndex
        ? props.repeatStep + 1
        : Math[props.math](
            data,
            props.repeatStepList,
            props.decimal ? props.decimal : 0
          );
      if (
        objectPath.get(documentDate.current, props.path) !== getValueFromMath
      ) {
        setValue(getValueFromMath);
      }
    },
    [
      props.setValueByIndex,
      documentDate,
      props.decimal,
      props.math,
      props.path,
      props.repeatStep,
      props.repeatStepList
    ]
  );

  useEffect(() => {
    renderFunction[`${props.label}-${props.repeatStepList}-ReadOnly`] = math;
    return () => {
      delete renderFunction[`${props.label}-${props.repeatStepList}-ReadOnly`];
    };
  }, [math, renderFunction, props.label, props.repeatStepList]);

  useEffect(() => {
    setValue(objectPath.get(backendData, props.path));
  }, [backendData, props.path]);

  return (
    <ReadField {...props} key={props.indexId} readOnly={true} value={value} />
  );
};
