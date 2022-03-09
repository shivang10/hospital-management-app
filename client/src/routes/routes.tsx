import React, {lazy, Suspense} from "react";

import {Route, Switch} from "react-router-dom";

import {dashboardRouteLink, homepageRouteLink, loginRouteLink, myProfileRouteLink, signUpRouteLink} from "./routeLinks";

const Login = lazy(() => import("../authentication/login"));
const SignUp = lazy(() => import("../authentication/signup"));
const Homepage = lazy(() => import("../homepage/homepage"));
const Dashboard = lazy(() => import("../dashboard/dashboard"));
const MyUserProfile = lazy(() => import("../profile/profile"));


const Routes: React.FC = () => {
    return (
        <Suspense fallback={<div>Loading</div>}>
            <Switch>
                <Route path={homepageRouteLink} component={Homepage} exact={true}/>
                <Route path={loginRouteLink} component={Login}/>
                <Route path={signUpRouteLink} component={SignUp}/>
                <Route path={dashboardRouteLink} component={Dashboard}/>
                <Route path={myProfileRouteLink} component={MyUserProfile}/>
            </Switch>
        </Suspense>
    );
};

export default Routes;
