import {
  ADD_ISSUE,
  ALL_ISSUE,
  COMPLETE_ISSUE,
  DELETE_ISSUE,
  UPDATE_ISSUE,
} from "./actions";

export const issueReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case ALL_ISSUE:
      return payload;
    case ADD_ISSUE:
      if (payload.issueStatus === "Completed") payload.issuePercentage = "100";
      if (payload.issueStatus === "New")
        payload.issuePercentage =
          payload.issuePercentage != 0 ? "0" : payload.issuePercentage;
      if (payload.issueStatus === "In Progress")
        payload.issuePercentage =
          payload.issuePercentage == 100
            ? "99"
            : payload.issuePercentage == 0
            ? "1"
            : payload.issuePercentage;
      return [...state, payload];
    case UPDATE_ISSUE:
      const updatedIssuesList = state.map((issue) => {
        if (issue.id === payload.issueDatabaseId) {
          if (payload.issueStatus === "New") payload.issuePercentage = "0";
          if (payload.issueStatus === "In Progress")
            payload.issuePercentage =
              payload.issuePercentage == 0
                ? "1"
                : payload.issuePercentage === "100"
                ? "99"
                : payload.issuePercentage;
          if (payload.issueStatus === "Completed")
            payload.issuePercentage =
              payload.issuePercentage == 0 || payload.issuePercentage != 100
                ? "100"
                : payload.issuePercentage;
          return payload;
        } else {
          return issue;
        }
      });
      return updatedIssuesList;
      break;
    case DELETE_ISSUE:
      return state.filter((issue) => issue.issueId != payload);
    case COMPLETE_ISSUE:
      const latestIssuesList = state.map((issue) => {
        if (issue.id == payload.issueDatabaseId) {
          payload.issueStatus = "Completed";
          payload.issuePercentage = "100";
          issue.attributes = payload;
        }
        return issue;
      });
      return latestIssuesList;
      break;
    default:
      return state;
  }
};
