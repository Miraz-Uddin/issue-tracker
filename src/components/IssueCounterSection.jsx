import { useContext } from "react";
import { Container, Row } from "react-bootstrap";
import { IssuesCounterContext } from "../context/IssuesCounterContext";
import CounterCard from "./CounterCard";
export default function IssueCounterSection() {
  const {
    totalIssueCount,
    newIssueCount,
    completedIssueCount,
    inProgressIssueCount,
    totalDeletedIssues,
    totalLowPriorityIssues,
    totalMediumPriorityIssues,
    totalHighPriorityIssues,
  } = useContext(IssuesCounterContext);
  return (
    <>
      <Container>
        <Row className="mt-3">
          <CounterCard title="Newly Created" counter={newIssueCount} />
          <CounterCard title="In Progress" counter={inProgressIssueCount} />
          <CounterCard title="Completed" counter={completedIssueCount} />
          <CounterCard title="Total Issues" counter={totalIssueCount} />
        </Row>
      </Container>
      <Container>
        <Row className="mt-3">
          <CounterCard
            title="Low Priorities"
            counter={totalLowPriorityIssues}
          />
          <CounterCard
            title="Medium Priorities"
            counter={totalMediumPriorityIssues}
          />
          <CounterCard
            title="High Priorities"
            counter={totalHighPriorityIssues}
          />
          <CounterCard title="Deadline Crossed" counter={0} />
        </Row>
      </Container>
    </>
  );
}
