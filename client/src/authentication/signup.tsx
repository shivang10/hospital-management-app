import React, {useState} from "react";

import { gql, useMutation } from "@apollo/client";

import { UserSignupDetailsInterface } from "./authInterface";

const CREATE_USER_MUTATION = gql`
    mutation CreateUser($input: CreateUserInput!){
        createUser(input: $input) {
            name
        }
    }
`;

const SignUp: React.FC = () => {

    const [userDetails, setUserDetails] = useState<UserSignupDetailsInterface>({
        name: "",
        username: "",
        age: 0,
        password: ""
    });

    const [createUser] = useMutation(CREATE_USER_MUTATION);

    const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        setUserDetails({
            ...userDetails,
            [event.target.name]: event.target.value
        });
    };

    const handleCreateUser = () => {
        createUser({
            variables:{
                input: {
                    name: userDetails.name,
                    username: userDetails.username,
                    age: Number(userDetails.age),
                    password: userDetails.password
                }
            }
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
                        <h2>Sign Up</h2>
                        <div className="login-container">
                            <p>Already have an account?<a href="/login"><strong>Log In</strong></a></p>
                        </div>
                    </section>
                    <div>
                        <label className="input-label">Name</label>
                        <input className="input-text-width-100" type="text" placeholder="Name" name="name" onChange={handleChange}/>
                    </div>
                    <div>
                        <label className="input-label">Username</label>
                        <input className="input-text-width-100" type="text" placeholder="UserName" name="username" onChange={handleChange}/>
                    </div>
                    <div>
                        <label className="input-label">Password</label>
                        <input className="input-text-width-100" type="password" placeholder="Password" name="password" onChange={handleChange}/>
                    </div>
                    <div>
                        <label className="input-label">Age</label>
                        <input className="input-text-width-100" type="number" placeholder="Age" name="age" onChange={handleChange}/>
                    </div>
                    <button className="btn-add-16px" onClick={handleCreateUser}>Create User</button>
                </div>
            </div>  
        </div>
    );
};

export default SignUp;