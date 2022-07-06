import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <>
      <Container>
        <Row>
          <Col className="text-center">
            <p className="display-3">This Page cannot Found</p>
            <p>
              <Link to="/">Go to Home </Link>
            </p>
          </Col>
        </Row>
      </Container>
    </>
  );
}
