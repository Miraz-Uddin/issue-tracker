import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import IssueForm from "../../components/IssueForm";
import { IssueContext } from "../../context/IssueContext";
export default function EditIssue() {
  const navigate = useNavigate();
  const { updateIssue, issues } = useContext(IssueContext);
  const { id } = useParams();
  const [issue, setIssue] = useState({
    issueTitle: "",
    issueSubTitle: "",
    issueAssignee: "",
    issueStartDate: new Date(),
    issueEndDate: new Date(),
    issuePriority: "Low",
    issueStatus: "New",
    issuePercentage: "5",
  });
  const issueToEdit = () => {
    const foundIssue = issues.find((issue) => issue.id === +id);
    if (!foundIssue) {
      toast.warn("Issue is not found");
      return navigate("/issues");
    }
    setIssue({
      ...foundIssue.attributes,
      issueStartDate: new Date(foundIssue.attributes.issueStartDate),
      issueEndDate: new Date(foundIssue.attributes.issueEndDate),
      issueDatabaseId: +id,
    });
  };

  useEffect(() => {
    issueToEdit();
  }, [id]);

  const handlingUpdateIssue = (issue) => {
    updateIssue(issue);
  };
  return (
    <>
      <IssueForm updateIssue={handlingUpdateIssue} issue={issue} />
    </>
  );
}
