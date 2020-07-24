import React from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import { isStringInstance } from "functions/general";
import DatePicker, {
  CalendarContainer,
  registerLocale
} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import enGB from "date-fns/locale/en-GB";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

registerLocale("enGB", enGB);

function Datetime({ prepend, label, type, repeatStepList, name, ...props }) {
  // const [startDate, setStartDate] = useState(new Date());

  const ExampleCustomInput = ({ value, onClick }) => (
    <InputGroup>
      <Form.Control
        value={value}
        onClick={onClick}
        readOnly
        placeholder="Press to pick date"
      />
      <InputGroup.Append>
        <Button
          style={{ position: "relative", zIndex: 0 }}
          variant="light"
          className="border px-3"
          // onClick={date => setStartDate(new Date())}
          onClick={date => props.onChangeDate(new Date())}
        >
          <FontAwesomeIcon icon="calendar" style={{ width: "1.2em" }} />
          <div className="d-none d-sm-inline ml-1">{" Today"}</div>
        </Button>
      </InputGroup.Append>
      <InputGroup.Append>
        <Button
          style={{ position: "relative", zIndex: 0 }}
          variant="light"
          className="border px-3"
          // onClick={date => setStartDate(null)}
          onClick={date => props.onChangeDate(null)}
        >
          <FontAwesomeIcon icon="times" style={{ width: "1.2em" }} />
        </Button>
      </InputGroup.Append>
    </InputGroup>
  );

  const MyContainer = ({ className, children }) => {
    return (
      <div style={{ position: "relative" }}>
        <CalendarContainer className={className}>
          <div style={{ position: "relative", fontSize: 14 }}>{children}</div>
        </CalendarContainer>
      </div>
    );
  };

  return (
    <Form.Group>
      {/* <div className="text-secondary">
        {prepend && !label && (
          <label htmlFor={`custom-${type}-${label}-${repeatStepList}`}>
            {prepend}
          </label>
        )}
      </div> */}
      <div>
        <DatePicker
          className="w-100"
          readOnly={
            props.readOnlyFields ? props.readOnlyFields : props.readOnly
          }
          autoFocus={props.focus}
          selected={isStringInstance(props.value) ? null : props.value}
          // onChange={date => setStartDate(date)}
          onChange={date => props.onChangeDate(date)}
          customInput={<ExampleCustomInput />}
          dateFormat="dd/MM/yyyy"
          required={props.required}
          locale={enGB}
          showMonthDropdown
          showYearDropdown
          calendarContainer={MyContainer}
          id={`custom-${type}-${label}-${repeatStepList}`}
          name={name}
        />
      </div>
      <Form.Text className="text-muted">{props.subtext}</Form.Text>
      <Form.Control.Feedback type="invalid">
        {props.feedback}
      </Form.Control.Feedback>
    </Form.Group>
  );
}

export default Datetime;
