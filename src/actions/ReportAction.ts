import {ActionType, createAction, createCustomAction} from 'typesafe-actions';
import { Report } from '../types/Report';
import {ActionKeys as C} from "../utils"


export const ReportActions = {
    fetchReportsSuccess: createAction(C.FETCH_REPORTS_SUCCESS)<Array<Report>>(),
    addReportSuccess: createCustomAction(C.ADD_REPORT),
    fetchOneReportSuccess:createAction(C.FETCH_ONE_REPORT_SUCCESS)<Report>(),
};

export type ReportAction = ActionType<typeof ReportActions>;