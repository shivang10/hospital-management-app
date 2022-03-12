import jwtDecode from "jwt-decode";

import {TokenInterface} from "./tokenInterface";

export const getUserDetails = () => {
    const token = localStorage.getItem("token");
    let userDetails = {
        iat: -1,
        id: "",
        type: "",
        username: "",
        password: ""
    };
    let tokenContent: TokenInterface;

    if (token) {
        tokenContent = jwtDecode<TokenInterface>(token);
        userDetails = {
            iat: tokenContent["iat"],
            id: tokenContent["id"],
            type: tokenContent["type"],
            username: tokenContent["username"],
            password: tokenContent["password"]
        };
    }
    return userDetails;
};
