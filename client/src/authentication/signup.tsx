import React, {useState} from "react";

import {useMutation} from "@apollo/client";

import {UserSignupDetailsInterface} from "./authInterface";
import {CREATE_USER_MUTATION} from "./signUpGqlQuery";

const SignUp: React.FC = () => {

    const [userDetails, setUserDetails] = useState<UserSignupDetailsInterface>({
        name: "",
        username: "",
        age: 0,
        password: "",
    });

    const [userErrors, setUserErrors] = useState({
        name: "",
        username: "",
        age: "",
        password: "",
        check: ""
    });

    const [isDoctorChecked, setIsDoctorChecked] = useState(false);

    const [isPatientChecked, setIsPatientChecked] = useState(false);

    const [isSubmit, setIsSubmit] = useState(false);

    const [createUser] = useMutation(CREATE_USER_MUTATION);

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
        if (!userDetails.age) {
            errors.age = "Age is Required";
        } else if (userDetails.age > 120) {
            errors.age = "Please enter a valid age";
        }
        if(!isDoctorChecked && !isPatientChecked){
            errors.check = "Please select one option";
        }

        if (errors.name == "" && errors.username == "" && errors.password == "" && errors.age == "" && errors.check == "") {
            setIsSubmit(true);
        } else {
            setIsSubmit(false);
        }
        return errors;
    };

    const handleCreateUser = () => {
        setUserErrors(validate(userDetails));
        if(isSubmit){
            if(isDoctorChecked){
                // CREATE DOCTOR USER HERE
            }
            else if(isPatientChecked){
                createUser({
                    variables: {
                        input: {
                            name: userDetails.name,
                            username: userDetails.username,
                            age: Number(userDetails.age),
                            password: userDetails.password
                        }
                    }
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
                        <h2>Sign Up</h2>
                        <div className="login-container">
                            <p>Already have an account?<a href="/login"><strong>Log In</strong></a></p>
                        </div>
                    </section>
                    <div>
                        <label className="input-label">Name</label><span>{userErrors.name}</span>
                        <input className="input-text-width-100" type="text" placeholder="Name" name="name"
                            onChange={handleChange}/>
                    </div>
                    <div>
                        <label className="input-label">Username</label><span>{userErrors.username}</span>
                        <input className="input-text-width-100" type="text" placeholder="UserName" name="username"
                            onChange={handleChange}/>
                    </div>
                    <div>
                        <label className="input-label">Password</label><span>{userErrors.password}</span>
                        <input className="input-text-width-100" type="password" placeholder="Password" name="password"
                            onChange={handleChange}/>
                    </div>
                    <div>
                        <label className="input-label">Age</label><span>{userErrors.age}</span>
                        <input className="input-text-width-100" type="number" placeholder="Age" name="age"
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
                        <span>{userErrors.check}</span>
                    </div>
                    <div className="submit-button">
                        <button className="btn-add-16px" onClick={handleCreateUser}>Create User</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;