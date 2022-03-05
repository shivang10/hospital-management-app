import React, {useState} from "react";

import {useLazyQuery} from "@apollo/client";

import {UserLoginDetailsInterface} from "./authInterface";
import {AUTH_USER} from "./loginGqlQuery";

const Login: React.FC = () => {

    const [authDetails, setAuthDetails] = useState<UserLoginDetailsInterface>({
        username: "",
        password: ""
    });

    const [authErrors, setAuthErrors] = useState({
        username: "",
        password: "",
        check: ""
    });

    const [isDoctorChecked, setIsDoctorChecked] = useState(false);

    const [isPatientChecked, setIsPatientChecked] = useState(false);

    const [isSubmit, setIsSubmit] = useState(false);

    const [fetchUser] = useLazyQuery(AUTH_USER);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAuthDetails({
            ...authDetails,
            [event.target.name]: event.target.value
        });
    };

    const validate = (authDetails: UserLoginDetailsInterface) => {
        const errors = {username: "",password: "", check: ""};
        if (!authDetails.username) {
            errors.username = "Username is Required";
        }
        if (!authDetails.password) {
            errors.password = "Password is Required";
        
        }
        if(!isDoctorChecked && !isPatientChecked){
            errors.check = "Please select one option";
        }

        if (errors.username == "" && errors.password == "" && errors.check == "") {
            setIsSubmit(true);
        } else {
            setIsSubmit(false);
        }
        return errors;
    };

    const handleLogin = () => {
        setAuthErrors(validate(authDetails));
        if (isSubmit) {
            if(isDoctorChecked){
                // LOGIN TO DOCTOR HERE
            }
            else if(isPatientChecked){
                fetchUser({
                    variables: {
                        username: authDetails.username,
                        password: authDetails.password
                    },
                });
            }
        }
    };

    const handleDoctorChange = () => {
        setIsDoctorChecked(!isDoctorChecked);
        setIsPatientChecked(isDoctorChecked);
    };

    const handlePatientChange = () => {
        setIsPatientChecked(!isPatientChecked);
        setIsDoctorChecked(isPatientChecked);
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
                            <p>New User?<a href="/signUp"><strong>Sign Up</strong></a></p>
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
                            <input className="input-checkbox" type="checkbox" checked={isDoctorChecked} id="doctorCheckbox" name="doctorCheckbox"
                                onChange={handleDoctorChange}/>Doctor
                        </label>

                        <label className="patient-checkbox-label">
                            <input className="input-checkbox" type="checkbox" checked={isPatientChecked} id="patientCheckbox" name="patientCheckbox"
                                onChange={handlePatientChange}/>Patient
                        </label>
                        <br/>
                        <span>{authErrors.check}</span>
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
