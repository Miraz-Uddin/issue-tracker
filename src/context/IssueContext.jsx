import qs from "qs";
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { toast } from "react-toastify";
import useToken from "../hooks/useToken";
import {
  ADD_ISSUE,
  ALL_ISSUE,
  COMPLETE_ISSUE,
  DELETE_ISSUE,
  UPDATE_ISSUE,
} from "../pages/Issue/actions";
import { issueReducer } from "../pages/Issue/issueReducer";
import axiosAPI from "../utils/axiosAPI";
import { AuthContext } from "./AuthContext";
import { IssuesCounterContext } from "./IssuesCounterContext";

export const IssueContext = createContext();

export const IssueProvider = ({ children }) => {
  const initialState = [];
  const {
    setTotalIssueCount,
    setNewIssueCount,
    setCompletedIssueCount,
    setInProgressIssueCount,
    statusCounterOnIssueAdd,
    statusCounterOnIssueUpdate,
    statusCounterOnIssueDelete,
    statusCounterOnPageLoad,
  } = useContext(IssuesCounterContext);

  const { user } = useContext(AuthContext);
  const [issues, dispatch] = useReducer(issueReducer, initialState);
  const [pageNumber, setPageNumber] = useState(1);
  const [issuesListChanged, setissuesListChanged] = useState(false);
  const { token, tokenLoaded } = useToken();
  const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    if (tokenLoaded && token) loadIssues();
  }, [tokenLoaded, token]);

  const loadUsers = async () => {
    const query = qs.stringify(
      {
        pagination: {
          page: pageNumber,
          pageSize: import.meta.env.VITE_PAGE_SIZE,
        },
      },
      {
        encodeValuesOnly: true,
      }
    );
    try {
      const data = await axiosAPI({
        method: "get",
        url: `/users?populate=%2A`,
        config: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      });
      setUsersList(data);
    } catch (e) {
      toast.error("error occured while users loading");
    }
  };

  const loadIssues = async () => {
    const query = qs.stringify(
      {
        pagination: {
          page: pageNumber,
          pageSize: import.meta.env.VITE_PAGE_SIZE,
        },
      },
      {
        encodeValuesOnly: true,
      }
    );
    try {
      const { data, meta } = await axiosAPI({
        method: "get",
        url: `/issues?populate=%2A`,
        config: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      });
      setTotalIssueCount(data.length);
      setNewIssueCount(issueStatusPerfectlyCount("New", "issueStatus", data));
      setCompletedIssueCount(
        issueStatusPerfectlyCount("Completed", "issueStatus", data)
      );
      setInProgressIssueCount(
        issueStatusPerfectlyCount("In Progress", "issueStatus", data)
      );
      statusCounterOnPageLoad(data);
      dispatch({ type: ALL_ISSUE, payload: data });
    } catch (e) {
      toast.error("error occured while issues loading");
    }
  };

  const createIssueInDatabase = async (newIssue) => {
    const query = qs.stringify(
      {
        pagination: {
          page: pageNumber,
          pageSize: import.meta.env.VITE_PAGE_SIZE,
        },
      },
      {
        encodeValuesOnly: true,
      }
    );
    const newData = {
      data: {
        issueAssignedTo: newIssue.issueAssignedTo,
        issueAuthor: user.id,
        issueEndDate: newIssue.issueEndDate,
        issueStartDate: newIssue.issueStartDate,
        issuePercentage: newIssue.issuePercentage,
        issuePriority: newIssue.issuePriority,
        issueStatus: newIssue.issueStatus,
        issueSubTitle: newIssue.issueSubTitle,
        issueTitle: newIssue.issueTitle,
      },
    };
    try {
      const data = await axiosAPI({
        method: "POST",
        url: `/issues`,
        data: newData,
        config: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      });
      setissuesListChanged(true);
      toast.success("New Issue is added");
    } catch (e) {
      setissuesListChanged(false);
      toast.error("New Issue won't Create");
    }
  };

  const updateIssueInDatabase = async (updatedIssue) => {
    const query = qs.stringify(
      {
        pagination: {
          page: pageNumber,
          pageSize: import.meta.env.VITE_PAGE_SIZE,
        },
      },
      {
        encodeValuesOnly: true,
      }
    );
    const updatedData = {
      data: {
        issueAssignedTo: updatedIssue.issueAssignedTo,
        issueAuthor: updatedIssue.issueAuthor,
        issueEndDate: updatedIssue.issueEndDate,
        issueStartDate: updatedIssue.issueStartDate,
        issuePercentage: updatedIssue.issuePercentage,
        issuePriority: updatedIssue.issuePriority,
        issueStatus: updatedIssue.issueStatus,
        issueSubTitle: updatedIssue.issueSubTitle,
        issueTitle: updatedIssue.issueTitle,
      },
    };
    try {
      const data = await axiosAPI({
        method: "PUT",
        url: `/issues/${updatedIssue.issueDatabaseId}`,
        data: updatedData,
        config: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      });
      setissuesListChanged(true);
      toast.success("Issue is Updated");
    } catch (e) {
      setissuesListChanged(false);
      toast.error("Issue won't Update");
    }
  };

  const deleteIssueFromDatabase = async (issueId, willBeDeletedId) => {
    const query = qs.stringify(
      {
        pagination: {
          page: pageNumber,
          pageSize: import.meta.env.VITE_PAGE_SIZE,
        },
      },
      {
        encodeValuesOnly: true,
      }
    );
    try {
      const { data, meta } = await axiosAPI({
        method: "DELETE",
        url: `/issues/${issueId}`,
        config: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      });
      toast.success("Issue is Deleted Successfully");
      setissuesListChanged(true);
    } catch (e) {
      setissuesListChanged(false);
      toast.error("Issue won't Delete");
    }
  };

  const issueStatusPerfectlyCount = (status, attribute, arr) => {
    return arr.filter((obj) => {
      if (obj.attributes[attribute] === status) return true;
      return false;
    }).length;
  };

  const addIssue = (newIssue) => {
    dispatch({ type: ADD_ISSUE, payload: newIssue });
    createIssueInDatabase(newIssue);
    statusCounterOnIssueAdd(newIssue);
    setTotalIssueCount((prevCount) => prevCount + 1);
    if (newIssue.issueStatus === "New") {
      setNewIssueCount((prevCount) => prevCount + 1);
    }
    if (newIssue.issueStatus === "Completed") {
      setCompletedIssueCount((prevCount) => prevCount + 1);
    }
    if (newIssue.issueStatus === "In Progress") {
      setInProgressIssueCount((prevCount) => prevCount + 1);
    }
  };

  const updateIssue = (updatedIssue) => {
    dispatch({ type: UPDATE_ISSUE, payload: updatedIssue });
    updateIssueInDatabase(updatedIssue);
    const beforeUpdatedIssue = issues.filter(
      (issue) => issue.id === updatedIssue.issueDatabaseId
    );
    statusCounterOnIssueUpdate(beforeUpdatedIssue[0], updatedIssue);
    if (
      beforeUpdatedIssue[0].issueStatus === "New" &&
      updatedIssue.issueStatus === "In Progress"
    ) {
      setNewIssueCount((prevCount) => prevCount - 1);
      setInProgressIssueCount((prevCount) => prevCount + 1);
    }
    if (
      beforeUpdatedIssue[0].issueStatus === "New" &&
      updatedIssue.issueStatus === "Completed"
    ) {
      setCompletedIssueCount((prevCount) => prevCount + 1);
      setNewIssueCount((prevCount) => prevCount - 1);
    }
    if (
      beforeUpdatedIssue[0].issueStatus === "In Progress" &&
      updatedIssue.issueStatus === "New"
    ) {
      setNewIssueCount((prevCount) => prevCount + 1);
      setInProgressIssueCount((prevCount) => prevCount - 1);
    }
    if (
      beforeUpdatedIssue[0].issueStatus === "In Progress" &&
      updatedIssue.issueStatus === "Completed"
    ) {
      setCompletedIssueCount((prevCount) => prevCount + 1);
      setInProgressIssueCount((prevCount) => prevCount - 1);
    }
    if (
      beforeUpdatedIssue[0].issueStatus === "Completed" &&
      updatedIssue.issueStatus === "New"
    ) {
      setNewIssueCount((prevCount) => prevCount + 1);
      setCompletedIssueCount((prevCount) => prevCount - 1);
    }
    if (
      beforeUpdatedIssue[0].issueStatus === "Completed" &&
      updatedIssue.issueStatus === "In Progress"
    ) {
      setInProgressIssueCount((prevCount) => prevCount + 1);
      setCompletedIssueCount((prevCount) => prevCount - 1);
    }
  };
  const deleteIssue = (issueId, willBeDeletedId, willBeDeleted) => {
    dispatch({ type: DELETE_ISSUE, payload: issueId });
    deleteIssueFromDatabase(issueId, willBeDeletedId);
    const deletedIssue = willBeDeleted;
    statusCounterOnIssueDelete(deletedIssue);
    setTotalIssueCount((prevCount) => prevCount - 1);
    if (deletedIssue.issueStatus === "New") {
      setNewIssueCount((prevCount) => prevCount - 1);
    }
    if (deletedIssue.issueStatus === "Completed") {
      setCompletedIssueCount((prevCount) => prevCount - 1);
    }
    if (deletedIssue.issueStatus === "In Progress") {
      setInProgressIssueCount((prevCount) => prevCount - 1);
    }
  };
  const checkedAsCompletedIssue = (issueId, creator, assignedTo) => {
    const selectedIssue = issues.find(
      (issue) => issue.id === issueId
    ).attributes;
    if (selectedIssue.issueStatus === "Completed") {
      setissuesListChanged(false);
      toast.info("Nothing to Update");
    } else {
      setCompletedIssueCount((prevCount) => prevCount + 1);
      if (selectedIssue.issueStatus === "New")
        setNewIssueCount((prevCount) => prevCount - 1);
      if (selectedIssue.issueStatus === "In Progress")
        setInProgressIssueCount((prevCount) => prevCount - 1);
      selectedIssue.issuePercentage = "100";
      selectedIssue.issueStatus = "Completed";
      selectedIssue.issueDatabaseId = issueId;
      selectedIssue.issueAssignedTo = selectedIssue.issueAssignedTo?.data?.id;
      selectedIssue.issueAuthor = selectedIssue.issueAuthor?.data?.id;
      updateIssueInDatabase(selectedIssue);
      dispatch({
        type: COMPLETE_ISSUE,
        payload: {
          ...selectedIssue,
          issueAuthor: creator,
          issueAssignedTo: assignedTo,
        },
      });
    }
  };

  const value = {
    issues,
    addIssue,
    updateIssue,
    deleteIssue,
    checkedAsCompletedIssue,
    issuesListChanged,
    loadIssues,
    loadUsers,
    usersList,
  };

  return (
    <IssueContext.Provider value={value}>{children}</IssueContext.Provider>
  );
};
