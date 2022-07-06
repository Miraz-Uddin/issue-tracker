import { useContext, useEffect } from "react";
import { Container, Row, Table } from "react-bootstrap";
import IssueCounterSection from "../../components/IssueCounterSection";
import { IssueContext } from "../../context/IssueContext";
import SingleIssue from "./SingleIssue";
const Issues = function () {
  const { issues, issuesListChanged, loadIssues } = useContext(IssueContext);
  useEffect(() => {
    loadIssues();
  }, [issuesListChanged]);
  return (
    <>
      <IssueCounterSection />
      <Container fluid>
        <Row>
          {issues && issues.length !== 0 && (
            <Table
              responsive
              bordered
              style={{ backgroundColor: "rgb(232, 232, 232)" }}
            >
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Due Date (Y-M-D)</th>
                  <th>Issue Creator</th>
                  <th>Assigned To</th>
                  <th>Completed</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {issues &&
                  issues.map((issue) => {
                    return (
                      <SingleIssue
                        issue={issue.attributes}
                        index={issue.id}
                        key={issue.id}
                      />
                    );
                  })}
              </tbody>
            </Table>
          )}
        </Row>
      </Container>
    </>
  );
};

export default Issues;
