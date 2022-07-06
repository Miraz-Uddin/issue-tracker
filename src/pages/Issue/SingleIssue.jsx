import { useContext, useState } from "react";
import { Badge, Button, Modal, ProgressBar } from "react-bootstrap";
import { MdDangerous, MdDoneAll, MdOutlineEditNote } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";
import { IssueContext } from "../../context/IssueContext";
export default function SingleIssue({ issue, index }) {
  const { deleteIssue, checkedAsCompletedIssue } = useContext(IssueContext);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [show, setShow] = useState(false);

  const handleClose = (e) => {
    if (e.target.dataset.action === "deleteIssue") {
      if (issue?.issueAuthor?.data?.id == user.id) {
        setShow(false);
        navigate(`/issues`);
        deleteIssue(index, issue?.issueAuthor?.data?.id, issue);
      } else {
        toast.error("You Don't have the Permission to Delete this issue");
        setShow(false);
      }
    } else {
      setShow(false);
    }
  };
  const handleShow = () => setShow(true);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>Delete this Issue ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="danger"
            data-action="deleteIssue"
            onClick={handleClose}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      <tr>
        <td>
          {" "}
          <span className="columText">{index}</span>{" "}
        </td>
        <td>
          {" "}
          <span
            className="columText issueTitle"
            onClick={() => navigate(`view/${index}`)}
          >
            {issue?.issueTitle}
          </span>{" "}
        </td>
        <td>
          <span className="columText">
            <Badge
              bg={`${issue?.issuePriority === "High" ? "danger" : ""}${
                issue?.issuePriority === "Medium" ? "dark" : ""
              }${issue?.issuePriority === "Low" ? "secondary" : ""}`}
              pill
            >
              {issue?.issuePriority}
            </Badge>
          </span>
        </td>
        <td
          style={{
            textDecoration: `${
              issue?.issueStatus === "Completed" ? "line-through" : ""
            }`,
          }}
          className={`${issue?.issueStatus === "New" ? "text-primary" : ""}${
            issue?.issueStatus === "In Progress" ? "text-info" : ""
          }${issue?.issueStatus === "Completed" ? "text-success" : ""}`}
        >
          <span className="columText">{issue?.issueStatus}</span>
        </td>
        <td>
          <span className="columText">
            {" "}
            {/* {format(new Date(issue?.issueEndDate), "MM/dd/yyyy")} */}
            {issue?.issueEndDate}
          </span>
        </td>
        <td>
          <span className="columText">
            {issue?.issueAuthor?.data?.attributes?.username === undefined
              ? "Ghost"
              : issue?.issueAuthor?.data?.attributes?.username}
          </span>
        </td>
        <td>
          <span className="columText">
            {issue?.issueAssignedTo?.data?.attributes?.username === undefined
              ? "Not Assigned"
              : issue?.issueAssignedTo?.data?.attributes?.username}
          </span>
        </td>
        <td style={{ paddingTop: "15px" }}>
          <span className="columText" style={{ width: "auto" }}>
            <ProgressBar
              striped
              variant={`${issue?.issuePercentage == 100 ? "success" : ""}${
                issue?.issuePercentage > 0 && issue?.issuePercentage < 100
                  ? "info"
                  : ""
              }${issue?.issuePercentage < 1 ? "danger" : ""}`}
              now={`${issue?.issuePercentage}`}
              label={`${
                issue?.issuePercentage > 3 ? issue?.issuePercentage : ""
              }${issue?.issuePercentage > 11 ? "%" : ""}`}
            />
          </span>
        </td>
        <td>
          <span className="columText">
            <MdDoneAll
              className="text-success me-2"
              title="Mark the Issue to Complete 100%"
              onClick={() =>
                checkedAsCompletedIssue(
                  index,
                  issue?.issueAuthor,
                  issue?.issueAssignedTo
                )
              }
            />
            <MdOutlineEditNote
              className="text-info me-2"
              title="Edit the Issue"
              onClick={() => navigate(`edit/${index}`)}
            />
            <MdDangerous
              className="text-danger"
              title="Delete the Issue"
              onClick={handleShow}
            />
          </span>
        </td>
      </tr>
    </>
  );
}
