import React, { useContext, useState, useEffect, useCallback } from "react";
import ReadField from "components/form/components/fields/ReadField";
import objectPath from "object-path";
import { sumFieldInObject } from "functions/general";
import { documentDataContext } from "components/form/Form";
import { Alert } from "react-bootstrap";
import Line from "components/design/Line";

const CustomCoating = props => {
  let layers = 0;
  for (let i = 0; i < props.repeatStepList[0]; i++) {
    layers += Number(
      objectPath.get(
        props.specData,
        `leadEngineers.0.vulcanizationSteps.${i}.data.numberOfLayers`
      )
    );
  }
  layers += props.repeatStepList[1] + 1;

  return (
    <div>
      <b>
        <Line></Line>
        <ReadField
          textCenter={true}
          readOnly={true}
          label={"Step"}
          value={`${props.repeatStepList[0] + 1} of ${
            objectPath.get(props.specData, "leadEngineers.0.vulcanizationSteps")
              .length
          }`}
        />
      </b>
      <b>
        <ReadField
          textCenter={true}
          readOnly={true}
          noLine
          label={"Layer"}
          value={`${layers} of ${sumFieldInObject(
            objectPath.get(
              props.specData,
              "leadEngineers.0.vulcanizationSteps"
            ),
            "numberOfLayers"
          )}`}
        />
        <Line></Line>
      </b>
    </div>
  );
};

const CustomLead = props => {
  const { documentData, renderFunction } = useContext(documentDataContext);
  const [status, setStatus] = useState("danger");
  const [toleranceMin, setToleranceMin] = useState(0);
  const [toleranceMax, setToleranceMax] = useState(0);
  const [layersThickness, setLayersThickness] = useState(0);

  const thickness = useCallback(
    (data = documentData.current) => {
      let toleranceMinTemporary = objectPath.get(
        data,
        "leadEngineers.0.data.toleranceMin",
        0
      );
      let toleranceMaxTemporary = objectPath.get(
        data,
        "leadEngineers.0.data.toleranceMax",
        0
      );
      let layersThicknessTemporary = 0.0;
      let steps = objectPath.get(data, "leadEngineers.0.vulcanizationSteps");
      if (Array.isArray(steps)) {
        steps.forEach(step => {
          step.coatingLayers &&
            step.coatingLayers.forEach(coatingLayer => {
              if (coatingLayer && coatingLayer.data.shrunkThickness) {
                layersThicknessTemporary += Number(
                  coatingLayer.data.shrunkThickness
                );
              }
            });
        });
      }
      layersThicknessTemporary = layersThicknessTemporary * 2.0;
      setStatus(() =>
        toleranceMinTemporary <= layersThicknessTemporary &&
        layersThicknessTemporary <= toleranceMaxTemporary
          ? "success"
          : "warning"
      );
      if (toleranceMinTemporary !== toleranceMin) {
        setToleranceMin(toleranceMinTemporary);
      }
      if (toleranceMaxTemporary !== toleranceMax) {
        setToleranceMax(toleranceMaxTemporary);
      }
      if (layersThicknessTemporary !== layersThickness) {
        setLayersThickness(layersThicknessTemporary);
      }
    },
    [
      documentData,
      setStatus,
      setToleranceMin,
      setToleranceMax,
      setLayersThickness,
      toleranceMin,
      toleranceMax,
      layersThickness
    ]
  );

  useEffect(() => {
    let effectsRenderFunction = renderFunction.current;
    effectsRenderFunction[`${props.repeatStepList}-CustomLead`] = thickness;
    return () => {
      delete effectsRenderFunction[`${props.repeatStepList}-CustomLead`];
    };
  }, [thickness, props.repeatStepList, renderFunction]);

  if (
    props.writeChapter.current &&
    toleranceMin &&
    toleranceMax &&
    layersThickness
  ) {
    return (
      <Alert variant={status} className="">
        <Alert.Heading>
          {status === "warning" && "Uh-oh 😨"}
          {status === "success" && "Nice 😄"}
        </Alert.Heading>
        <div>
          Tolerated total rubber thickness is between <b>{toleranceMin}</b> and{" "}
          <b>{toleranceMax}</b>, and the sum of all layer thicknesses is{" "}
          <b>{layersThickness.toFixed(1)}</b>.
        </div>
      </Alert>
    );
  } else {
    return null;
  }
};

const ActualSteelThickness = props => {
  if (props.repeatStepList[1] === 0) {
    return objectPath
      .get(props.backendData, `operators.0.measurementPointActualTdvs`)
      .map((measurementPointActual, index) => {
        return (
          <ReadField
            key={`${index}-ActualSteelThickness`}
            readOnly={true}
            label={`Measurement Point Actual Steel ${objectPath.get(
              props.specData,
              `leadEngineers.0.data.targetDescriptionValue`
            )}`}
            value={measurementPointActual.data.measurementPointActual}
          />
        );
      });
  }
  return null;
};

const CustomComponents = {
  CustomCoating,
  CustomLead,
  ActualSteelThickness
};

export default CustomComponents;
