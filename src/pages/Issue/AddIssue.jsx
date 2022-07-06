import { useContext } from "react";
import IssueForm from "../../components/IssueForm";
import { IssueContext } from "../../context/IssueContext";

export default function AddIssue() {
  const { addIssue } = useContext(IssueContext);
  const handlingAddIssue = (issue) => {
    addIssue(issue);
  };
  return (
    <>
      <IssueForm addIssue={handlingAddIssue} />
    </>
  );
}
