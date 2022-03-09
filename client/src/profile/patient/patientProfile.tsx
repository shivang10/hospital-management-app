import React, {useEffect, useState} from "react";

import {useMutation, useQuery} from "@apollo/client";

import {getUserDetails} from "../../utils/tokenDetails";
import {PATIENT_DETAILS} from "./getPatientDetailsGqlQuery";
import {gender, PatientProfileInterface} from "./profileInterface";
import {UPDATE_PATIENT_DETAILS} from "./updatePatientDetailsGqlQuery";

const PatientProfile: React.FC = () => {
    const {id, username} = getUserDetails();
    const password = "patien1";

    const patientDetailsQuery = useQuery(PATIENT_DETAILS, {
        variables: {
            username: username,
            password: password
        }
    });

    const [updatePatient] = useMutation(UPDATE_PATIENT_DETAILS);

    const [patientDetails, updatePatientDetails] = useState<PatientProfileInterface>({
        name: patientDetailsQuery?.data?.userLogin?.user?.name,
        gender: patientDetailsQuery?.data?.userLogin?.user?.gender,
        age: patientDetailsQuery?.data?.userLogin?.user?.age,
        address: patientDetailsQuery?.data?.userLogin?.user?.address,
        careTakerName: patientDetailsQuery?.data?.userLogin?.user?.careTakerName,
        careTakerNumber: patientDetailsQuery?.data?.userLogin?.user?.careTakerNumber,
        phoneNumber: patientDetailsQuery?.data?.userLogin?.user?.phoneNumber,
        weight: patientDetailsQuery?.data?.userLogin?.user?.weight
    });

    useEffect(() => {
        if (patientDetailsQuery?.data) {
            updatePatientDetails({
                name: patientDetailsQuery?.data?.userLogin?.user?.name,
                gender: patientDetailsQuery?.data?.userLogin?.user?.gender,
                age: patientDetailsQuery?.data?.userLogin?.user?.age,
                address: patientDetailsQuery?.data?.userLogin?.user?.address,
                careTakerName: patientDetailsQuery?.data?.userLogin?.user?.careTakerName,
                careTakerNumber: patientDetailsQuery?.data?.userLogin?.user?.careTakerNumber,
                phoneNumber: patientDetailsQuery?.data?.userLogin?.user?.phoneNumber,
                weight: patientDetailsQuery?.data?.userLogin?.user?.weight
            });
        }
    }, [patientDetailsQuery?.data]);

    if (patientDetailsQuery.loading) {
        return <div>Loading</div>;
    }

    if (patientDetailsQuery.error) {
        return <div>Error</div>;
    }

    const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        updatePatientDetails({
            ...patientDetails,
            [event.target.name]: event.target.value,
        });
    };

    const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        updatePatientDetails({
            ...patientDetails,
            [event.target.name]: Number(event.target.value),
        });
    };

    const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        updatePatientDetails({
            ...patientDetails,
            gender: event.target.value,
        });
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = {
            "password": password,
            "input": {
                id,
                ...patientDetails
            }
        };
        updatePatient({
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
            Patient Profile
            <form onSubmit={handleSubmit}>
                <label className="input-label">Name</label>
                <input
                    name="name"
                    onChange={handleTextChange}
                    type="text"
                    value={patientDetails.name}
                />
                <div>
                    <label className="input-label">Gender</label>
                    <select onChange={handleSelect} value={patientDetails.gender}>
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
                        value={patientDetails.age}
                        min={1}
                        max={150}
                    />
                </div>
                <div>
                    <label className="input-label">Weight</label>
                    <input
                        name="weight"
                        onChange={handleNumberChange}
                        value={patientDetails.weight}
                        type="number"
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
                        value={patientDetails.phoneNumber}
                        min={1000000000}
                        max={9999999999}
                    />
                </div>
                <div>
                    <label className="input-label">Care taker name</label>
                    <input
                        name="careTakerName"
                        onChange={handleTextChange}
                        type="text"
                        value={patientDetails.careTakerName}
                    />
                </div>
                <div>
                    <label className="input-label">Care taker number</label>
                    <input
                        name="careTakerNumber"
                        onChange={handleNumberChange}
                        type="number"
                        value={patientDetails.careTakerNumber}
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
                        value={patientDetails.address}
                    />
                </div>
                <div className="submit-button">
                    <button className="btn-add-16px" type="submit">Update</button>
                </div>
            </form>
        </div>
    );
};

export default PatientProfile;
