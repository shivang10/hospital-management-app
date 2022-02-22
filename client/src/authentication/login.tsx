import React, {useState} from "react";

import { gql, useLazyQuery } from "@apollo/client";

import { UserLoginDetailsInterface } from "./authInterface";

const AUTH_USER = gql`
    query User($username: String!, $password: String!) {
        user(username: $username, password: $password) {
            username
        }
    }
`;

const Login: React.FC = () => {

    const [authDetails, setAuthDetails] = useState<UserLoginDetailsInterface>({
        username: "",
        password: ""
    });

    const [fetchUser] = useLazyQuery(AUTH_USER);

    const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        setAuthDetails({
            ...authDetails,
            [event.target.name]: event.target.value
        });
    };

    const handleLogin = () => {
        fetchUser({
            variables:{
                username: authDetails.username,
                password: authDetails.password
            },
        });
    };

    return(
        <div className="split-screen">
            <div className="left">
                <section className="heading">
                    <h1>HOSPITAL MANAGEMENT APPLICATION</h1>
                    <p>Over 1000 + trained professional Doctors available.</p>
                </section>
            </div>
            <div className="right">
                <div className="form">
                    <section className="heading">
                        <h2>Log In</h2>
                        <div className="login-container">
                            <p>New User?<a href="/signUp"><strong>Sign Up</strong></a></p>
                        </div>
                    </section>
                    <div>
                        <label className="input-label">UserName</label>
                        <input className="input-text-width-100" type="text" placeholder="UserName" name="username" onChange={handleChange}/>
                    </div>
                    <div>
                        <label className="input-label">Password</label>
                        <input className="input-text-width-100" type="password" placeholder="Password" name="password" onChange={handleChange}/>
                    </div>
                    <div>
                        <input className="input-checkbox" type="checkbox"/>
                    </div>
                    <button className="btn-add-16px" onClick={handleLogin}>Login</button>
                </div>
            </div>
        </div>
    );
};

export default Login;