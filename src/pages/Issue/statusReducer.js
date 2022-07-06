import {
  ADD_ISSUE_STATUS_COUNTER,
  ALL_ISSUE_STATUS_COUNTER,
  DELETE_ISSUE_STATUS_COUNTER,
  UPDATE_ISSUE_STATUS_COUNTER,
} from "./actions";

export const statusReducer = (state, action) => {
  const { type, payload, oldIssue } = action;
  const issueStatusPerfectlyCount = (status, attribute, arr) => {
    return arr.filter((obj) => {
      if (obj.attributes[attribute] === status) return true;
      return false;
    }).length;
  };
  switch (type) {
    case ADD_ISSUE_STATUS_COUNTER:
      return {
        totalDeletedIssues: 0,
        totalLowPriorityIssues:
          payload.issuePriority === "Low"
            ? state.totalLowPriorityIssues + 1
            : state.totalLowPriorityIssues,
        totalMediumPriorityIssues:
          payload.issuePriority === "Medium"
            ? state.totalMediumPriorityIssues + 1
            : state.totalMediumPriorityIssues,
        totalHighPriorityIssues:
          payload.issuePriority === "High"
            ? state.totalHighPriorityIssues + 1
            : state.totalHighPriorityIssues,
      };
    case UPDATE_ISSUE_STATUS_COUNTER:
      let deletedIssues = state.totalDeletedIssues;
      let lowPriorityIssues = state.totalLowPriorityIssues;
      let mediumPriorityIssues = state.totalMediumPriorityIssues;
      let highPriorityIssues = state.totalHighPriorityIssues;
      if (oldIssue.issuePriority === "High") {
        if (payload.issuePriority === "Medium") {
          highPriorityIssues--;
          mediumPriorityIssues++;
        }
        if (payload.issuePriority === "Low") {
          highPriorityIssues--;
          lowPriorityIssues++;
        }
      }
      if (oldIssue.issuePriority === "Medium") {
        if (payload.issuePriority === "High") {
          highPriorityIssues++;
          mediumPriorityIssues--;
        }
        if (payload.issuePriority === "Low") {
          lowPriorityIssues++;
          mediumPriorityIssues--;
        }
      }
      if (oldIssue.issuePriority === "Low") {
        if (payload.issuePriority === "Medium") {
          lowPriorityIssues--;
          mediumPriorityIssues++;
        }
        if (payload.issuePriority === "High") {
          lowPriorityIssues--;
          highPriorityIssues++;
        }
      }
      return {
        totalDeletedIssues: deletedIssues,
        totalLowPriorityIssues: lowPriorityIssues,
        totalMediumPriorityIssues: mediumPriorityIssues,
        totalHighPriorityIssues: highPriorityIssues,
      };
      break;
    case DELETE_ISSUE_STATUS_COUNTER:
      return {
        totalDeletedIssues: state.totalDeletedIssues + 1,
        totalLowPriorityIssues:
          payload.issuePriority === "Low"
            ? state.totalLowPriorityIssues - 1
            : state.totalLowPriorityIssues,
        totalMediumPriorityIssues:
          payload.issuePriority === "Medium"
            ? state.totalMediumPriorityIssues - 1
            : state.totalMediumPriorityIssues,
        totalHighPriorityIssues:
          payload.issuePriority === "High"
            ? state.totalHighPriorityIssues - 1
            : state.totalHighPriorityIssues,
      };
      break;
    case ALL_ISSUE_STATUS_COUNTER:
      return {
        totalDeletedIssues: 0,
        totalLowPriorityIssues: issueStatusPerfectlyCount(
          "Low",
          "issuePriority",
          payload
        ),
        totalMediumPriorityIssues: issueStatusPerfectlyCount(
          "Medium",
          "issuePriority",
          payload
        ),
        totalHighPriorityIssues: issueStatusPerfectlyCount(
          "High",
          "issuePriority",
          payload
        ),
      };
      break;
    default:
      break;
  }
};
