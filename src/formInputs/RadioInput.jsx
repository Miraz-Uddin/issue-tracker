import { Col, Form, Row } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
export default function RadioInput({
  controlId,
  label,
  name,
  reference,
  onChange,
  toCheck,
  checkValues,
}) {
  return (
    <Form.Group className="mb-3" controlId={controlId} as={Row}>
      <Col xs={3} sm={3} md={2} lg={4}>
        <Form.Label>{label}</Form.Label>
      </Col>
      <Col xs={9} sm={9} md={10} lg={8} className="position-relative">
        <div className="mb-3">
          {checkValues.map((val, index) => {
            return (
              <Form.Check
                key={index}
                inline
                label={val}
                type="radio"
                id={`inline-${name}-radio-${index}`}
                name={name}
                ref={reference}
                value={val}
                onChange={onChange}
                checked={toCheck === val}
              />
            );
          })}
        </div>
      </Col>
    </Form.Group>
  );
}
