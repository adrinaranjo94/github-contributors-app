import { Dispatch } from "redux";
import DashboardServices from "../../services/DashboardServices";
import {
  activateLoading,
  deactivateLoading,
} from "../uiReducer/actionCreators";
import {
  DASHBOARD_FETCH_CONTRIBUTORS,
  DASHBOARD_LOGOUT_CLEANING,
} from "./actionTypes";
import { IContributor, IDashboardAction } from "./types";

export const loadDashboard = (
  contributors: IContributor[],
  count: number
): IDashboardAction => ({
  type: DASHBOARD_FETCH_CONTRIBUTORS,
  payload: { value: { count, contributors } },
});

export const dashboardLogout = (): IDashboardAction => ({
  type: DASHBOARD_LOGOUT_CLEANING,
  payload: { value: "" },
});

export const fetchDashboard = () => {
  return (dispatch: Dispatch) => {
    dispatch(activateLoading());
    DashboardServices.getDashboard()
      .then((response) => {
        const count = response.data.length;
        const contributors = response.data.map((contributor: IContributor) => ({
          login: contributor.login,
          avatar_url: contributor.avatar_url,
          contributions: contributor.contributions,
        }));
        dispatch(loadDashboard(contributors, count));
      })
      .finally(() => {
        dispatch(deactivateLoading());
      });
  };
};
