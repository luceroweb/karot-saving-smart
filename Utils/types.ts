export interface LoggedInType {
  status: string;
  screen: string;
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
  // ** Change this back to Date
  date: any;
}

export interface ExpenseType {
  label: string;
  saved: number;
  goal: number;
  date: Date;
}

export interface RemainingBudgetType {
  accountsTotal: number;
  expensesTotal: number;
  totalRemaining: number;
}

export interface GlobalStateType {
  user: { data: UserDataType };
  accounts: { list: AccountType[] };
  expenses: { list: ExpenseType[] };
  budgets: { remaining: RemainingBudgetType };
}
