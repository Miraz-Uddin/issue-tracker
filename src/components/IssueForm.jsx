import { addDays } from "date-fns";
import { useContext, useEffect, useRef, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// import { v4 as uuid } from "uuid";
import { IssueContext } from "../context/IssueContext";
import DateInput from "../formInputs/DateInput";
import RadioInput from "../formInputs/RadioInput";
import TextInput from "../formInputs/TextInput";

export default function IssueForm({
  addIssue,
  updateIssue,
  issue: issueToEdit,
}) {
  const navigate = useNavigate();
  const issueTitleRef = useRef(null);
  const issueSubTitleRef = useRef(null);
  const issueAssignedToRef = useRef(null);
  const issueStartDateRef = useRef(null);
  const issueEndDateRef = useRef(null);
  const issuePriorityRef = useRef(null);
  const issueStatusRef = useRef(null);
  const issuePercentageRef = useRef(null);

  const [issue, setIssue] = useState({
    issueDatabaseId: "",
    issueTitle: "",
    issueSubTitle: "",
    issueAssignedTo: "1",
    issueStartDate: new Date(),
    issueEndDate: addDays(new Date(), 2),
    issuePriority: "Low",
    issueStatus: "New",
    issuePercentage: "0",
  });

  const { loadUsers, usersList } = useContext(IssueContext);

  useEffect(() => {
    if (issueToEdit) {
      const assignedToBefore = issueToEdit?.issueAssignedTo?.data?.id;
      const authorBefore = issueToEdit?.issueAuthor?.data?.id;
      setIssue({
        ...issueToEdit,
        issueAssignedTo: assignedToBefore,
        issueAuthor: authorBefore,
      });
    }
  }, [issueToEdit]);

  useEffect(() => {
    loadUsers();
  }, []);

  const [issueError, setIssueError] = useState({
    issueTitleError: "",
    issueSubTitleError: "",
    issueAssignedToError: "",
    issueStartDateError: "",
    issueEndDateError: "",
    issuePriorityError: "",
    issueStatusError: "",
    issuePercentageError: "",
  });

  const handleChange = (e) => {
    setIssue({
      ...issue,
      [e.target.name]: e.target.value,
    });
    setIssueError({
      ...issueError,
      [e.target.name + "Error"]: "",
    });
  };

  const handleSubmit = (e) => {
    const {
      issueTitle,
      issueSubTitle,
      issueAssignedTo,
      issueStartDate,
      issueEndDate,
      issuePriority,
      issueStatus,
      issuePercentage,
      issueDatabaseId,
    } = issue;
    e.preventDefault();
    if (issueTitle == "") {
      setIssueError({
        ...issueError,
        issueTitleError: "Please Enter Your Issue Title Here",
      });
      issueTitleRef.current.focus();
      toast.error(`Issue Can't be Added`);
    } else if (issueSubTitle == "") {
      setIssueError({
        ...issueError,
        issueSubTitleError: "Please Enter Issue Details Here",
      });
      issueSubTitleRef.current.focus();
      toast.error(`Issue Can't be Added`);
    } else if (issueAssignedTo == "") {
      setIssueError({
        ...issueError,
        issueAssignedToError: "Enter Name whom you have to assign to",
      });
      issueAssignedToRef.current.focus();
      toast.error(`Issue Can't be Added`);
    } else if (issueStartDate == "") {
      setIssueError({
        ...issueError,
        issueStartDateError: "Pick Issue Ressolve Start Date",
      });
      issueStartDateRef.current.focus();
      toast.error(`Issue Can't be Added`);
    } else if (issueEndDate == "") {
      setIssueError({
        ...issueError,
        issueEndDateError: "Pick Issue Ressolve End Date",
      });
      issueEndDateRef.current.focus();
      toast.error(`Issue Can't be Added`);
    } else if (issuePriority == "") {
      setIssueError({
        ...issueError,
        issuePriorityError: "Pick Issue Ressolve End Date",
      });
      issuePriorityRef.current.focus();
      toast.error(`Issue Can't be Added`);
    } else if (issueStatus == "") {
      setIssueError({
        ...issueError,
        issueStatusError: "Pick Issue Ressolve End Date",
      });
      issueStatusRef.current.focus();
      toast.error(`Issue Can't be Added`);
    } else if (issuePercentage == "") {
      setIssueError({
        ...issueError,
        issuePercentageError:
          "Please Drag and determine a percentage of the issue completion",
      });
      issuePercentageRef.current.focus();
      toast.error(`Issue Can't be Added`);
    } else {
      if (issue.issueDatabaseId) {
        updateIssue(issue);
      } else {
        addIssue(issue);
      }
      navigate("/issues");
    }
  };

  const {
    issueTitle,
    issueSubTitle,
    issueAssignedTo,
    issueStartDate,
    issueEndDate,
    issuePriority,
    issueStatus,
    issuePercentage,
    issueDatabaseId,
  } = issue;
  const {
    issueTitleError,
    issueSubTitleError,
    issueAssignedToError,
    issueStartDateError,
    issueEndDateError,
    issuePriorityError,
    issueStatusError,
    issuePercentageError,
  } = issueError;
  return (
    <>
      <Container>
        <Row>
          <Col xs={12} sm={12} md={12} className="m-auto p-5 bg-light">
            <h2 className="text-center mb-3">
              {" "}
              <u>{issueToEdit ? "Edit" : "Add"} Issue</u>{" "}
            </h2>
            <Form onSubmit={handleSubmit}>
              <TextInput
                label="Title"
                type="text"
                name="issueTitle"
                controlId="issueTitle"
                onChange={handleChange}
                value={issueTitle}
                reference={issueTitleRef}
                error={issueTitleError}
                placeholder="Enter Your Issue Title"
              />
              <TextInput
                label="Details"
                type="text"
                name="issueSubTitle"
                controlId="issueSubTitle"
                onChange={handleChange}
                value={issueSubTitle}
                reference={issueSubTitleRef}
                error={issueSubTitleError}
                placeholder="Describe Issue in Detailed Way"
                as="textarea"
              />
              {usersList && (
                <Form.Group
                  className="mb-3"
                  controlId="issueAssignedTo"
                  as={Row}
                >
                  <Col xs={3} sm={3} md={2}>
                    <Form.Label className="mt-2">Assigned to</Form.Label>
                  </Col>
                  <Col xs={9} sm={9} md={10} className="position-relative">
                    <Form.Select
                      name="issueAssignedTo"
                      ref={issueAssignedToRef}
                      value={issueAssignedTo}
                      onChange={handleChange}
                    >
                      {usersList.map((val, index) => (
                        <option value={val.id} key={val.id}>
                          {val.username}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                </Form.Group>
              )}

              <Row>
                <Col xs={12} sm={12} md={6}>
                  <DateInput
                    label="Start"
                    name="issueStartDate"
                    value={issueStartDate}
                    reference={issueStartDateRef}
                    error={issueStartDateError}
                    selectedVal={issueStartDate}
                    minDateVal={new Date()}
                    onChange={(date) =>
                      setIssue({
                        ...issue,
                        issueStartDate: date,
                      })
                    }
                    rangeFrom={issueStartDate}
                    rangeTo={issueEndDate}
                    selectsStart
                  />
                </Col>
                <Col xs={12} sm={12} md={6}>
                  <DateInput
                    label="End"
                    name="issueEndDate"
                    value={issueEndDate}
                    reference={issueEndDateRef}
                    error={issueEndDateError}
                    selectedVal={issueEndDate}
                    minDateVal={issueStartDate}
                    onChange={(date) =>
                      setIssue({
                        ...issue,
                        issueEndDate: date,
                      })
                    }
                    rangeFrom={issueStartDate}
                    rangeTo={issueEndDate}
                    selectsEnd
                  />
                </Col>
              </Row>
              <Row>
                <Col xs={12} sm={12} md={12} lg={6}>
                  <RadioInput
                    controlId="issuePriority"
                    label="Priority"
                    name="issuePriority"
                    reference={issuePriorityRef}
                    onChange={handleChange}
                    toCheck={issuePriority}
                    checkValues={["High", "Medium", "Low"]}
                  />
                </Col>
                <Col xs={12} sm={12} md={12} lg={6}>
                  <RadioInput
                    controlId="issueStatus"
                    label="Status"
                    name="issueStatus"
                    reference={issueStatusRef}
                    onChange={handleChange}
                    toCheck={issueStatus}
                    checkValues={["New", "In Progress", "Completed"]}
                  />
                </Col>
              </Row>
              <Form.Group className="mb-3" controlId="issuePercentage" as={Row}>
                <Col xs={3} sm={3} md={2}>
                  <Form.Label>Completed</Form.Label>
                </Col>
                <Col xs={7} sm={7} md={9} className="position-relative">
                  {" "}
                  <Form.Range
                    name="issuePercentage"
                    onChange={handleChange}
                    value={issuePercentage}
                    ref={issuePercentageRef}
                  />
                  <Form.Control.Feedback type="invalid" tooltip>
                    {issuePercentageError}
                  </Form.Control.Feedback>
                </Col>
                <Col xs={2} sm={2} md={1}>
                  <b
                    className={`${
                      (issuePercentage == 100 && "text-success") ||
                      (issuePercentage < 100 &&
                        issuePercentage > 0 &&
                        "text-info") ||
                      (issuePercentage == 0 && "text-danger")
                    }`}
                  >
                    {issuePercentage} %
                  </b>
                </Col>
              </Form.Group>
              <div className="d-flex justify-content-center">
                <Button variant="primary" type="submit">
                  {issueToEdit ? "Update" : "Submit"} Issue
                </Button>
                <Button
                  className="ms-2"
                  variant="dark"
                  onClick={() => navigate(-1)}
                >
                  Go Back
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}
