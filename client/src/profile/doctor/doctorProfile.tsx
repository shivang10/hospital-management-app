import React, {useEffect, useState} from "react";

import {useMutation, useQuery} from "@apollo/client";

import {getUserDetails} from "../../utils/tokenDetails";
import {GET_DOCTOR_DETAILS, UPDATE_DOCTOR_DETAILS} from "./doctorDetailsGqlQuery";
import {DoctorProfileInterface, gender} from "./doctorProfileInterface";

const DoctorProfile: React.FC = () => {
    const {id, username} = getUserDetails();
    const password = "doctor1";

    const doctorDetailsQuery = useQuery(GET_DOCTOR_DETAILS, {
        variables: {
            username: username,
            password: password
        }
    });

    const [updateDoctor] = useMutation(UPDATE_DOCTOR_DETAILS);

    const [doctorDetails, updateDoctorDetails] = useState<DoctorProfileInterface>({
        name: doctorDetailsQuery?.data?.doctorLogin?.doctor?.name,
        username: doctorDetailsQuery?.data?.doctorLogin?.doctor?.username,
        age: doctorDetailsQuery?.data?.doctorLogin?.doctor?.age,
        address: doctorDetailsQuery?.data?.doctorLogin?.doctor?.address,
        phoneNumber: doctorDetailsQuery?.data?.doctorLogin?.doctor?.phoneNumber,
        gender: doctorDetailsQuery?.data?.doctorLogin?.doctor?.gender,
    });

    useEffect(() => {
        if (doctorDetailsQuery?.data) {
            updateDoctorDetails({
                name: doctorDetailsQuery?.data?.doctorLogin?.doctor?.name,
                username: doctorDetailsQuery?.data?.doctorLogin?.doctor?.username,
                age: doctorDetailsQuery?.data?.doctorLogin?.doctor?.age,
                address: doctorDetailsQuery?.data?.doctorLogin?.doctor?.address,
                phoneNumber: doctorDetailsQuery?.data?.doctorLogin?.doctor?.phoneNumber,
                gender: doctorDetailsQuery?.data?.doctorLogin?.doctor?.gender,
            });
        }
    }, [doctorDetailsQuery?.data]);


    if (doctorDetailsQuery.loading) {
        return <div>Loading</div>;
    }

    if (doctorDetailsQuery.error) {
        return <div>Error</div>;
    }

    const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        updateDoctorDetails({
            ...doctorDetails,
            [event.target.name]: event.target.value,
        });
    };

    const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        updateDoctorDetails({
            ...doctorDetails,
            [event.target.name]: Number(event.target.value),
        });
    };

    const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        updateDoctorDetails({
            ...doctorDetails,
            gender: event.target.value,
        });
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const data = {
            "password": password,
            "input": {
                id,
                ...doctorDetails
            }
        };

        updateDoctor({
            variables: data
        })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div>
            Doctor Profile
            <form onSubmit={handleSubmit}>
                <label className="input-label">Name</label>
                <input
                    name="name"
                    onChange={handleTextChange}
                    type="text"
                    value={doctorDetails.name}
                />
                <div>
                    <label className="input-label">Gender</label>
                    <select onChange={handleSelect} value={doctorDetails.gender}>
                        <option value={gender.Male}>Male</option>
                        <option value={gender.Female}>Female</option>
                        <option value={gender.Other}>Other</option>
                    </select>
                </div>
                <div>
                    <label className="input-label">Age</label>
                    <input
                        name="age"
                        onChange={handleNumberChange}
                        type="number"
                        value={doctorDetails.age}
                        min={1}
                        max={150}
                    />
                </div>
                <div>
                    <label className="input-label">Phone number</label>
                    <input
                        name="phoneNumber"
                        onChange={handleNumberChange}
                        type="number"
                        value={doctorDetails.phoneNumber}
                        min={1000000000}
                        max={9999999999}
                    />
                </div>
                <div>
                    <label className="input-label">Address</label>
                    <input
                        name="address"
                        onChange={handleTextChange}
                        type="text"
                        value={doctorDetails.address}
                    />
                </div>
                <div className="submit-button">
                    <button className="btn-add-16px" type="submit">Update</button>
                </div>
            </form>
        </div>
    );
};

export default DoctorProfile;
