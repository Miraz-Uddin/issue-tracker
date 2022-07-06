import { Col, Form, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
export default function DateInput({
  label,
  name,
  value,
  reference,
  error,
  selectedVal,
  minDateVal,
  onChange,
  rangeFrom,
  rangeTo,
  ...rest
}) {
  return (
    <>
      <Form.Group className="mb-3" controlId="issueStartDate" as={Row}>
        <Col xs={3} sm={3} md={4}>
          <Form.Label className="mt-2">{label}</Form.Label>
        </Col>
        <Col xs={9} sm={9} md={8} className="position-relative">
          {" "}
          <DatePicker
            type="date"
            name={name}
            value={value}
            ref={reference}
            isInvalid={!!error}
            selected={selectedVal}
            onChange={onChange}
            startDate={rangeFrom}
            endDate={rangeTo}
            minDate={minDateVal}
            selectsStart
          />
          <Form.Control.Feedback type="invalid" tooltip>
            {error}
          </Form.Control.Feedback>
        </Col>
      </Form.Group>
    </>
  );
}
