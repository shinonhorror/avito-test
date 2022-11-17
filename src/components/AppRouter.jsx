import React from "react";
import { Route, Switch } from "react-router-dom";
import { privateRoutes} from "../router/routes";

const AppRouter = () => {
	return (
		<Switch>
			{privateRoutes.map((route) => (
				<Route
					component={route.component}
					path={route.path}
					exact={route.exact}
					key={route.path}
				/>
			))}
		</Switch>
	);
};

export default AppRouter;
