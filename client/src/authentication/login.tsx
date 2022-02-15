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
        <div>
            <div className="auth">
                <div className="title">
                    <h1> HOSPITAL MANAGEMENT APPLICATION</h1>
                </div>
                <div className="details">
                    <input type="text" placeholder="UserName" name="username" onChange={handleChange}/>

                    <input type="password" placeholder="Password" name="password" onChange={handleChange}/>

                    <button onClick={handleLogin}>Login</button>
                </div>
            </div>
        </div>
    );
};

export default Login;