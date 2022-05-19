export interface LoggedInType {
	status: string;
	screen: string;
}
export interface LoginPropsType {
	loggedIn: LoggedInType;
	setLoggedIn: ({ status, screen }: LoggedInType) => void;
}
