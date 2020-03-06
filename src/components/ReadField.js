import React, { useContext } from "react";
import { FieldsContext } from "./DocumentAndSubmit";
import { Form } from "react-bootstrap";
import ErrorMessage from "./ErrorMessage";

import "../styles/styles.css";

export default props => {
  const fieldsContext = useContext(FieldsContext);
  // make it write field
  const handelClick = () => {
    if (!props.readOnly) {
      fieldsContext.setIsSubmited(false);
      fieldsContext.setEditField(props.indexId);
      fieldsContext.setvalidationPassed({});
    }
  };
  return (
    <Form.Group
      className={props.textCenter ? "text-center" : ""}
      onClick={() => {
        props.submit ? handelClick() : null;
      }}
    >
      <small>
        {" "}
        <strong>{props.label + ": "}</strong>
        {props.value}
        {props.value === false && "✖"}
        {props.value === true && "✅"}
      </small>
      {props.subtext && props.writeChapter ? (
        <Form.Text className="text-muted">{props.subtext}</Form.Text>
      ) : null}
      {props.error ? (
        <ErrorMessage showMinMax={props.showMinMax} error={props.error} />
      ) : null}
    </Form.Group>
  );
};
