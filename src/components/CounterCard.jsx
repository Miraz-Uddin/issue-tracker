import { Card, Col } from "react-bootstrap";
export default function CounterCard({ title, counter }) {
  return (
    <>
      <Col xs={6} sm={6} md={4} lg={3} className="mb-3">
        <Card border="primary" className="text-center">
          <Card.Header style={{ fontSize: "2rem" }}>{counter}</Card.Header>
          <Card.Body>
            <Card.Title>{title}</Card.Title>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
}
