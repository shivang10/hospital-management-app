import React, {useState} from "react";

import {useLazyQuery} from "@apollo/client";
import {Link, useLocation, useHistory} from "react-router-dom";

import {UserLoginDetailsInterface} from "./authInterface";
import {AUTH_DOCTOR_LOGIN, AUTH_USER_LOGIN} from "./loginGqlQuery";

const validationInitialState = {
    username: "",
    password: ""
};

const Login: React.FC = () => {

    const {hash} = useLocation();
    const history = useHistory();

    const [authDetails, setAuthDetails] = useState<UserLoginDetailsInterface>({
        username: "",
        password: ""
    });

    const [authErrors, setAuthErrors] = useState(validationInitialState);

    const [isPatientChecked, setIsPatientChecked] = useState(hash === "#patient");

    const [fetchUser] = useLazyQuery(AUTH_USER_LOGIN);
    const [fetchDoctor] = useLazyQuery(AUTH_DOCTOR_LOGIN);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAuthDetails({
            ...authDetails,
            [event.target.name]: event.target.value
        });
    };

    const validate = (authDetails: UserLoginDetailsInterface) => {
        const errors = {username: "", password: "", check: ""};
        if (!authDetails.username) {
            errors.username = "Username is Required";
        }
        if (!authDetails.password) {
            errors.password = "Password is Required";
        }

        if (errors.username == "" && errors.password == "" && errors.check == "") {
            setAuthErrors(validationInitialState);
            return true;
        } else {
            setAuthErrors(errors);
            return false;
        }
    };

    const handleLogin = () => {
        if (validate(authDetails)) {
            if (!isPatientChecked) {
                fetchDoctor({
                    variables: authDetails
                })
                    .then((res) => {
                        const token = res.data.doctorLogin.token;
                        localStorage.setItem("token", token);
                        history.push("/dashboard");
                    })
                    .catch((err)  => {
                        console.log(err);
                    });
            } else if (isPatientChecked) {
                fetchUser({
                    variables: authDetails,
                })
                    .then((res) => {
                        const token = res.data.userLogin.token;
                        localStorage.setItem("token", token);
                        history.push("/dashboard");
                    })
                    .catch((err)  => {
                        console.log(err);
                    });
            }
        }
    };

    const handlePatientChange = () => {
        setIsPatientChecked(!isPatientChecked);
    };

    return (
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
                            <p>New User?<Link to="signUp"><strong>Sign Up</strong></Link></p>
                        </div>
                    </section>
                    <div>
                        <label className="input-label">UserName</label><span>{authErrors.username}</span>
                        <input className="input-text-width-100" type="text" placeholder="UserName" name="username"
                            onChange={handleChange}/>
                    </div>
                    <div>
                        <label className="input-label">Password</label><span>{authErrors.password}</span>
                        <input className="input-text-width-100" type="password" placeholder="Password" name="password"
                            onChange={handleChange}/>
                    </div>
                    <div>
                        <label className="doctor-checkbox-label">
                            <input className="input-checkbox" type="checkbox" checked={!isPatientChecked}
                                id="doctorCheckbox" name="doctorCheckbox"
                                onChange={handlePatientChange}/>Doctor
                        </label>

                        <label className="patient-checkbox-label">
                            <input className="input-checkbox" type="checkbox" checked={isPatientChecked}
                                id="patientCheckbox" name="patientCheckbox"
                                onChange={handlePatientChange}/>Patient
                        </label>
                    </div>
                    <div className="submit-button">
                        <button className="btn-add-16px" onClick={handleLogin}>Login</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
