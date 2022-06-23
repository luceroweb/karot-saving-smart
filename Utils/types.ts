export interface LoggedInType {
  status: string;
  screen: string;
}

export interface SetLoggedInType {
  setLoggedIn: (loggedIn: LoggedInType) => void;
}

export interface LoginPropsType {
  loggedIn: LoggedInType;
  setLoggedIn: ({ status, screen }: LoggedInType) => void;
}

export interface UserDataType {
  firstName: string;
  lastName: string;
  avatar: string;
  email: string;
}

export interface AccountType {
  label: string;
  saved: number;
  goal: number;
  date: number;
  id: string;
}

export interface ExpenseType {
  label: string;
  saved: number;
  goal: number;
  date: number;
  id: string;
}

export interface RemainingBudgetType {
  accountsTotal: number;
  expensesTotal: number;
  totalRemaining: number;
}

export interface AppType {
  modalMode: "add"| "edit";
  accountModalVisibility: boolean;
  expenseModalVisibility: boolean;
  expenseDetailsModalVisiblity: boolean;
}

export interface GlobalStateType {
  app: AppType ;
	user: { data: UserDataType };
	accounts: { list: AccountType[] };
	expenses: { list: ExpenseType[]; selectedId: number };
	budgets: { remaining: RemainingBudgetType };
}

export type RootStackParamList = {
  Login: undefined;
  Overview: undefined;
}