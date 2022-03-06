import React, {useState} from "react";

import {useMutation} from "@apollo/client";
import {Link, useLocation} from "react-router-dom";

import {UserSignupDetailsInterface} from "./authInterface";
import {CREATE_DOCTOR_MUTATION, CREATE_USER_MUTATION} from "./signUpGqlQuery";

const validationInitialState = {
    name: "",
    username: "",
    password: "",
};

const SignUp: React.FC = () => {
    const {hash} = useLocation();

    const [userDetails, setUserDetails] = useState<UserSignupDetailsInterface>({
        name: "",
        username: "",
        password: "",
    });

    const [authErrors, setAuthError] = useState(validationInitialState);

    const [isPatientChecked, setIsPatientChecked] = useState(hash === "#patient");

    const [createUser] = useMutation(CREATE_USER_MUTATION);
    const [createDoctor] = useMutation(CREATE_DOCTOR_MUTATION);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserDetails({
            ...userDetails,
            [event.target.name]: event.target.value
        });
    };

    const validate = (userDetails: UserSignupDetailsInterface) => {
        const errors = {name: "", username: "", age: "", password: "", check: ""};
        if (!userDetails.name) {
            errors.name = "Name is Required";
        } else if (userDetails.name.length > 50) {
            errors.name = "Name should be less than 50 characters";
        }
        if (!userDetails.username) {
            errors.username = "Username is Required";
        } else if (userDetails.username.length > 50) {
            errors.username = "Username should be less than 50 characters";
        }
        if (!userDetails.password) {
            errors.password = "Password is Required";
        } else if (userDetails.password.length > 20) {
            errors.password = "Password should be less than 20 characters";
        } else if (userDetails.password.length < 4) {
            errors.password = "Password should be atleast 4 characters";
        }
        if (errors.name == "" && errors.username == "" && errors.password == "") {
            setAuthError(validationInitialState);
            return true;
        } else {
            setAuthError(errors);
            return false;
        }
    };

    const handleCreateUser = () => {
        if (validate(userDetails)) {
            if (!isPatientChecked) {
                createDoctor({
                    variables: {
                        input: {
                            name: userDetails.name,
                            username: userDetails.username,
                            password: userDetails.password
                        }
                    }
                });
            } else if (isPatientChecked) {
                createUser({
                    variables: {
                        input: {
                            name: userDetails.name,
                            username: userDetails.username,
                            password: userDetails.password
                        }
                    }
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
                        <h2>Sign Up</h2>
                        <div className="login-container">
                            <p>Already have an account?<Link to="login"><strong>Log In</strong></Link></p>
                        </div>
                    </section>
                    <div>
                        <label className="input-label">Name</label><span>{authErrors.name}</span>
                        <input className="input-text-width-100" type="text" placeholder="Name" name="name"
                            onChange={handleChange}/>
                    </div>
                    <div>
                        <label className="input-label">Username</label><span>{authErrors.username}</span>
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
                        <button className="btn-add-16px" onClick={handleCreateUser}>Create Account</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;