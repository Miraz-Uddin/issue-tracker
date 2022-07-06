import { useContext, useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  ProgressBar,
  Row,
} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { IssueContext } from "../../context/IssueContext";
export default function ViewIssue() {
  const { issues } = useContext(IssueContext);

  const navigate = useNavigate();
  const { id } = useParams();
  const [issue, setIssue] = useState({});

  const issueToView = () => {
    const foundIssue = issues.find((issue) => issue.id === +id);
    if (!foundIssue) {
      toast.warn("Issue is not found");
      return navigate("/issues");
    }
    setIssue(foundIssue);
  };

  useEffect(() => {
    issueToView();
  }, [id]);
  return (
    <>
      {issue && (
        <Container>
          <Row>
            <Col xs={12} sm={12} md={12} className="m-auto p-5 bg-light">
              <Card>
                <Card.Header className="d-flex justify-content-between issueNo">
                  <ProgressBar
                    striped
                    style={{ width: "100px" }}
                    variant={`${
                      issue?.attributes?.issuePercentage == 100 ? "success" : ""
                    }${
                      issue?.attributes?.issuePercentage > 0 &&
                      issue?.attributes?.issuePercentage < 100
                        ? "info"
                        : ""
                    }${issue?.attributes?.issuePercentage < 1 ? "danger" : ""}`}
                    now={`${issue?.attributes?.issuePercentage}`}
                    label={`${
                      issue?.attributes?.issuePercentage > 3
                        ? issue?.attributes?.issuePercentage
                        : ""
                    }${issue?.attributes?.issuePercentage > 11 ? "%" : ""}`}
                  />
                  <span>Issue No: {issue.id}</span>
                </Card.Header>
                <Card.Body>
                  <blockquote className="blockquote mb-0">
                    <p> {issue?.attributes?.issueSubTitle} </p>
                    <footer className="blockquote-footer">
                      <cite title="Source Title">
                        {issue?.attributes?.issueTitle}
                      </cite>
                    </footer>
                  </blockquote>
                </Card.Body>
                <Card.Footer>
                  <div className="d-flex justify-content-center">
                    <Button
                      className="ms-2"
                      variant="dark"
                      onClick={() => navigate(-1)}
                    >
                      Go Back
                    </Button>
                  </div>
                </Card.Footer>
              </Card>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
}
