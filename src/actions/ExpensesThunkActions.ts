import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../store/Store';
import { Expense } from '../types/Expense';
import { AppAction } from './AppAction';
import { ExpensesActions } from './ExpensesAction';
import * as API from '../services/Api';
import { AlertActions } from './AlertAction';
import { AlertMessage, MessageType } from '../types/AlertTypes';
import { SSO } from '../types/SSO';

const ExpensesThunkActions = {
   

    fetchExpensesData: (token: string, reportID: string, sortBy?:string) => {
        return (dispatch: ThunkDispatch<AppState, undefined, AppAction>) => {
            return API.fetchExpenses(token, reportID,sortBy).then(
                (response) => {
                    const objArray = response.data;
                    const data: Array<Expense> = [];
                    objArray.forEach((element) => {
                        data.push({
                            description: element.description,
                            id: element.id,
                            amount: element.amount,
                            createdAT: element.createdAT,
                            tstamp: element.tstamp,
                        });
                    });
                    // console.log("fetched data: " + JSON.stringify(data))
                    dispatch(ExpensesActions.fetchActionSuccess(data));
                    
                },
                (error) => {
                    let emsg: string;
                    if (
                        error.response &&
                        error.response.data &&
                        error.response.data.error
                    ) {
                        emsg =
                            'Cannot load the expenses: ' +
                            error.response.data.error;
                    } else {
                        emsg = 'Cannot load the expenses: ' + error.toString();
                    }

                    dispatch(ExpensesActions.fetchError(emsg));
                    const alertMessage: AlertMessage = {
                        content: emsg,
                        show_notification: true,
                        type: MessageType.ERROR,
                    };
                    // remove if any
                    dispatch(AlertActions.addMessage(alertMessage));
                }
            );
        };
    },

    /**
     * delete expenses
     */
    deleteExpense: (token: string, id: number) => {
        return (dispatch: ThunkDispatch<AppState, undefined, AppAction>) => {
            return API.deleteExpense(token, id.toString()).then(
                (_response) => {
                    dispatch(ExpensesActions.deleteActionSuccess());
                },
                (error) => {
                    const emsg = 'Cannot delete the expenses: ' + error.toString();

                    dispatch(ExpensesActions.fetchError(emsg));
                    const alertMessage: AlertMessage = {
                        content: emsg,
                        show_notification: true,
                        type: MessageType.ERROR,
                    };

                    dispatch(AlertActions.addMessage(alertMessage));
                }
            );
        };
    },
    
    addNewExpense: (sso: SSO, reportID: string, newExpense: Expense) => {
        return (dispatch: ThunkDispatch<AppState, undefined, AppAction>) => {
            return API.addNewExpense(sso.token, reportID, newExpense).then(
                (response) => {
                    dispatch(ExpensesActions.addNewExpenseSuccess());
                    const alertMessage: AlertMessage = {
                        content: "Expense successfully added",
                        show_notification: true,
                        type: MessageType.SUCCESS,
                    };
                    dispatch(AlertActions.addMessage(alertMessage));
                },
                (error) => {
                    const emsg = 'Cannot add the expenses: ' + error.toString();

                    dispatch(ExpensesActions.fetchError(emsg));
                    const alertMessage: AlertMessage = {
                        content: emsg,
                        show_notification: true,
                        type: MessageType.ERROR,
                    };
                    dispatch(AlertActions.addMessage(alertMessage));
                }
            );
        };
    },

    fetchOneExpense: (token: string, id: string) => {
        return (dispatch: ThunkDispatch<AppState, undefined, AppAction>) => {
            return API.fetchExpense(token, id).then(
                (response) => {
                    dispatch(
                        ExpensesActions.fetchOneExpenseActionSuccess(
                            response.data
                        )
                    );
                },
                (error) => {
                    const emsg = 'Cannot load expenses from backend: ' + error;

                    dispatch(ExpensesActions.fetchError(emsg));
                    const alertMessage: AlertMessage = {
                        content: emsg,
                        show_notification: true,
                        type: MessageType.ERROR,
                    };
                    dispatch(AlertActions.addMessage(alertMessage));
                }
            );
        };
    },

    updateExpense: (token:string, expense: Expense) => {
        return (dispatch: ThunkDispatch<AppState, undefined, AppAction>) => {
            return API.updateExpense(token, expense).then(
                (_response) => {
                    dispatch(ExpensesActions.addNewExpenseSuccess());
                    const alertMessage: AlertMessage = {
                        content: "Expense successfully updated",
                        show_notification: true,
                        type: MessageType.SUCCESS,
                    };
                    dispatch(AlertActions.addMessage(alertMessage));
                },
                (error) => {
                    const emsg = 'Cannot add the expenses: ' + error.toString();

                    dispatch(ExpensesActions.fetchError(emsg));
                    const alertMessage: AlertMessage = {
                        content: emsg,
                        show_notification: true,
                        type: MessageType.ERROR,
                    };
                    dispatch(AlertActions.addMessage(alertMessage));
                }
            );
        };
    },
};

export default ExpensesThunkActions;
