import React, {useState} from "react";

import { gql, useMutation } from "@apollo/client";

const CREATE_USER_MUTATION = gql`
    mutation CreateUser($input: CreateUserInput!){
        createUser(input: $input) {
            name
            id
        }
    }
`;

const SignUp: React.FC = () => {

    const [userDetails, setUserDetails] = useState({
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
                input: userDetails
            }
        });
    };

    return(
        <div>
            <div>
                <input type="text" placeholder="Name" name="name" onChange={handleChange}/>

                <input type="text" placeholder="UserName" name="username" onChange={handleChange}/>

                <input type="password" placeholder="Password" name="password" onChange={handleChange}/>

                <input type="number" placeholder="Age" name="age" onChange={handleChange}/>

                <button onClick={handleCreateUser}>Create Uesr</button>
            </div>  
        </div>
    );
};

export default SignUp;