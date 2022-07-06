import { Col, Form, Row } from "react-bootstrap";
export default function TextInput({
  label,
  type,
  name,
  controlId,
  onChange,
  value,
  reference,
  error,
  placeholder,
  ...rest
}) {
  return (
    <Form.Group className="mb-3" controlId={controlId} as={Row}>
      <Col xs={3} sm={3} md={2}>
        <Form.Label className="mt-2">{label}</Form.Label>
      </Col>
      <Col xs={9} sm={9} md={10} className="position-relative">
        {" "}
        <Form.Control
          type={type}
          placeholder={placeholder}
          name={name}
          onChange={onChange}
          value={value}
          ref={reference}
          isInvalid={!!error}
          {...rest}
        />
        <Form.Control.Feedback type="invalid" tooltip>
          {error}
        </Form.Control.Feedback>
      </Col>
    </Form.Group>
  );
}
