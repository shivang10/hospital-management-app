import React, {lazy, Suspense} from "react";

import {Route, Switch } from "react-router-dom";

const Login = lazy(() => import("../authentication/login"));
const SignUp = lazy(() => import("../authentication/signup"));
const Homepage = lazy(() => import("../homepage/homepage"));
import { homepageRouteLink, loginRouteLink, signUpRouteLink } from "./routeLinks";



const Routes: React.FC = () => {
    return (
        <Suspense fallback= {<div>Loading</div>}>
            <Switch>
                <Route path={homepageRouteLink} component={Homepage}/>
                <Route path={loginRouteLink} component={Login}/>
                <Route path={signUpRouteLink} component={SignUp}/>
            </Switch>
        </Suspense>
    );
};

export default Routes;