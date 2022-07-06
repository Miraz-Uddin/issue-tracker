import { createContext, useReducer, useState } from "react";
import {
  ADD_ISSUE_STATUS_COUNTER,
  ALL_ISSUE_STATUS_COUNTER,
  DELETE_ISSUE_STATUS_COUNTER,
  UPDATE_ISSUE_STATUS_COUNTER,
} from "../pages/Issue/actions";
import { statusReducer } from "../pages/Issue/statusReducer";

export const IssuesCounterContext = createContext();

const initialState = {
  totalDeletedIssues: 0,
  totalLowPriorityIssues: 0,
  totalMediumPriorityIssues: 0,
  totalHighPriorityIssues: 0,
};

export const IssuesCounterProvider = ({ children }) => {
  const [status, dispatch] = useReducer(statusReducer, initialState);
  const [totalIssueCount, setTotalIssueCount] = useState(0);
  const [newIssueCount, setNewIssueCount] = useState(0);
  const [completedIssueCount, setCompletedIssueCount] = useState(0);
  const [inProgressIssueCount, setInProgressIssueCount] = useState(0);

  const statusCounterOnIssueAdd = (issue) => {
    dispatch({ type: ADD_ISSUE_STATUS_COUNTER, payload: issue });
  };

  const statusCounterOnIssueUpdate = (oldIissue, newIssue) => {
    dispatch({
      type: UPDATE_ISSUE_STATUS_COUNTER,
      payload: newIssue,
      oldIssue: oldIissue,
    });
  };

  const statusCounterOnIssueDelete = (issue) => {
    dispatch({ type: DELETE_ISSUE_STATUS_COUNTER, payload: issue });
  };

  const statusCounterOnPageLoad = (issues) => {
    dispatch({ type: ALL_ISSUE_STATUS_COUNTER, payload: issues });
  };

  const {
    totalDeletedIssues,
    totalLowPriorityIssues,
    totalMediumPriorityIssues,
    totalHighPriorityIssues,
  } = status;

  const value = {
    totalIssueCount,
    setTotalIssueCount,
    newIssueCount,
    setNewIssueCount,
    completedIssueCount,
    setCompletedIssueCount,
    inProgressIssueCount,
    setInProgressIssueCount,
    totalDeletedIssues,
    totalLowPriorityIssues,
    totalMediumPriorityIssues,
    totalHighPriorityIssues,
    statusCounterOnIssueAdd,
    statusCounterOnIssueUpdate,
    statusCounterOnIssueDelete,
    statusCounterOnPageLoad,
  };
  return (
    <IssuesCounterContext.Provider value={value}>
      {children}
    </IssuesCounterContext.Provider>
  );
};
