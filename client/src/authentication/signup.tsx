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
        <div className="auth">
            <div className="title">
                <h1> HOSPITAL MANAGEMENT APPLICATION</h1>
            </div>
            <div className="details">
                <input type="text" placeholder="Name" name="name" onChange={handleChange}/>
                <input type="text" placeholder="UserName" name="username" onChange={handleChange}/>
                <input type="password" placeholder="Password" name="password" onChange={handleChange}/>
                <input type="number" placeholder="Age" name="age" onChange={handleChange}/>
                
                <button onClick={handleCreateUser}>Create User</button>
            </div>  
        </div>
    );
};

export default SignUp;