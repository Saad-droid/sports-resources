
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './CommonForm.css'
import * as Yup from "yup"
const CommonForm = () => {
    const { sport } = useParams();
    const [formData, setFormData] = useState({
        teamName: "",
        captainName: "",
        captainSapId: "",
        teamMembers: sport === "chess" || sport === "tabletennis" || sport === "tennis" ? '' : [
            { name: "", sapId: "" },
            { name: "", sapId: "" },
            { name: "", sapId: "" },
            { name: "", sapId: "" }
        ],
        location:"",
    });

    const [errors, setErrors] = useState({})
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Errors:", errors);


        try {
            await validationSchema.validate(formData, { abortEarly: false });
          const  finalvalue={...formData, sport}
            console.log("Form Submitted", finalvalue);
        } catch (error) {
            const newErrors = {};

            error.inner.forEach((err) => {
                if (err.path === "teamMembers" && formData.teamMembers.length === 1) {
                    newErrors.teamMembers = err.message;
                } else {
                    newErrors[err.path] = err.message;
                }
            });

            setErrors(newErrors);
            console.log(newErrors);
        }
    };

    const commonSchema = {

        teamName: Yup.string().required("Team name is required"),
        captainName: Yup.string().required("Captain name is required"),
        captainSapId: Yup.number()
            .typeError("Captain SAP ID must be a number")
            .positive("Captain SAP ID must be a positive number")
            .integer("Captain SAP ID must be an integer")
            .min(10000000, "Captain SAP ID must be an 8-digit number")
            .max(99999999, "Captain SAP ID must be an 8-digit number")
            .required("Captain SAP ID is required"),
        teamMembers: sport === "chess" || sport === "tabletennis" || sport === "tennis"
            ? Yup.string().required('At least one team member is required')
            : Yup.array().of(
                Yup.object().shape({
                    name: Yup.string().required("Team member name is required"),
                    sapId: Yup.number()
                        .typeError("SAP ID must be a number")
                        .positive("SAP ID must be a positive number")
                        .integer("SAP ID must be an integer")
                        .min(10000000, "SAP ID must be an 8-digit number")
                        .max(99999999, "SAP ID must be an 8-digit number")
                        .required("SAP ID is required"),
                })
            ),
        location: Yup.string().required("Location is required")
    };

    // if (!(sport === "chess" || sport === "tabletennis" || sport === "tennis")) {
    //     commonSchema.teamLeader = Yup.string().required("Team leader is required")
    // }
    const validationSchema = Yup.object().shape(commonSchema);


    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });

    };


    const handleTeamMemberNameChange = (event, index) => {
        const { value } = event.target;
        const updatedTeamMembers = [...formData.teamMembers];
        updatedTeamMembers[index].name = value;
        setFormData({
            ...formData,
            teamMembers: updatedTeamMembers,
        });
    };

    const handleTeamMemberSapIdChange = (event, index) => {
        const { value } = event.target;
        const updatedTeamMembers = [...formData.teamMembers];
        updatedTeamMembers[index].sapId = value;
        setFormData({
            ...formData,
            teamMembers: updatedTeamMembers,
        });
    };
     function sportValue(){
        if(sport === "chess" || sport === "tabletennis" || sport === "tennis"){
            return true;
        }
        else{
            return false;
        }
     }

    return (
        <div>

            <form className="form" onSubmit={handleSubmit}>
                <h1 className="signup">{sport}</h1>
                <div className="form-group">
                    <label className='lbl'>Team Name:</label>
                    <br />
                    <input type='text' value={formData.teamName} onChange={handleChange} name='teamName' placeholder='Team Name' />
                    {errors.teamName && <div className="error">{errors.teamName}</div>}
                </div>

                <div className="form-group">
                    <label className='lbl'>Captain Name:</label>
                    <br />
                    <input type='text' value={formData.captainName} onChange={handleChange} name='captainName' placeholder='Captain Name' />
                    {errors.captainName && <div className="error">{errors.captainName}</div>}
                </div>

                <div className="form-group">
                    <label className='lbl'>Captain SAP ID:</label>
                    <br />
                    <input type='number' value={formData.captainSapId} onChange={handleChange} name='captainSapId' placeholder='Captain SAP ID' />
                    {errors.captainSapId && <div className="error">{errors.captainSapId}</div>}
                </div>
                <div className="form-group">
                    <label className='lbl'>Team Members:</label>
                    {sport === "chess" || sport === "tabletennis" || sport === "tennis" ? (
                        <div>
                            <input
                                type="text"
                                name='teamMembers'
                                value={formData.teamMembers}
                                placeholder='Your Name'
                                onChange={handleChange}
                            />
                            {errors.teamMembers && <div className="error">{errors.teamMembers}</div>}
                        </div>

                    ) : (

                        formData?.teamMembers?.map((member, index) => (
                            <div key={index}>
                                <input type='text' value={member.name} onChange={(e) => handleTeamMemberNameChange(e, index)} name={`teamMembers[${index}].name`} placeholder={`Team Member ${index + 1} Name`} />
                                {errors && errors[`teamMembers[${index}].name`] && <div className="error">{errors[`teamMembers[${index}].name`]}</div>}
                                <input type='number' value={member.sapId} onChange={(e) => handleTeamMemberSapIdChange(e, index)} name={`teamMembers[${index}].sapId`} placeholder={`Team SapID ${index + 1} SAP ID`} />
                                {errors && errors[`teamMembers[${index}].sapId`] && <div className="error">{errors[`teamMembers[${index}].sapId`]}</div>}
                            </div>
                        ))

                    )}
                    <div>
                        <label className='lbl'>Location:</label>
                        <br />
                        <select name="location" value={formData.location} onChange={handleChange}>
                            <option value="">Select</option>
                            <option value="Noida 126">Noida 126</option>
                            <option value="Bengaluru-Jini 2">Bengaluru-Jini 2</option>
                            <option value="Chennai-Sholinganallur">Chennai-Sholinganallur</option>
                            <option value="Lucknow">Lucknow</option>
                        </select>
                        {errors.location && <div className="error">{errors.location}</div>}
                    </div>

                </div>
                <button className="form--submit" type="submit">Submit</button>
            </form>
        </div>
    );
};

export default CommonForm;
