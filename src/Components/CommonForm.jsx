
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './CommonForm.css'
import * as Yup from "yup"
const CommonForm = () => {
    const { sport } = useParams();
    const [formData, setFormData] = useState({
        sapId: "",
        location: "",
        lob: "",
        teamLeader: "",
        teamMembers: sport === "chess" || sport === "tabletennis" || sport === "tennis" ? '' : Array(5).fill(''),
    });

    const [errors, setErrors] = useState({})
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await validationSchema.validate(formData, { abortEarly: false });
            console.log("Form Submitted", formData);
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
        location: Yup.string().required("Location is Required"),
        lob: Yup.string().required("Department is Required"),
        sapId: Yup.number()
            .typeError("SAP ID must be a number")
            .positive("SAP ID must be a positive number")
            .integer("SAP ID must be an integer")
            .min(10000000, "SAP ID must be an 8-digit number")
            .max(99999999, "SAP ID must be an 8-digit number")
            .required("SAP ID is required"),
        // individualSport:Yup.boolean(),
        teamMembers: sport === "chess" || sport === "tabletennis" || sport === "tennis"
            ? Yup.string().required('At least one team member is required')
            : Yup.array().of(Yup.string().required("Team member is required")),
    };

    if (!(sport === "chess" || sport === "tabletennis" || sport === "tennis")) {
        commonSchema.teamLeader = Yup.string().required("Team leader is required")
    }
    const validationSchema = Yup.object().shape(commonSchema);


    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });

    };



    useEffect(() => {
        console.log(errors);
    }, [])
    const handleTeamMembers = (event, index) => {

        const { value } = event.target;
        const newTeamMembers = [...formData.teamMembers]; 
        newTeamMembers[index] = value; 
        setFormData({
            ...formData,
            teamMembers: newTeamMembers, 
        });

    }

    return (
        <div>

            <form className="form" onSubmit={handleSubmit}>
                <h1 className="signup">{sport}</h1>
                <div className="form-group">
                    <label className='lbl' >SAP ID:</label>
                    <br />
                    <input type='number' value={formData.sapId} onChange={handleChange} name='sapId'  placeholder='Sap ID' />
                    {errors.sapId && <div className="error">{errors.sapId}</div>}
                </div>


                <div>
                    <label className='lbl' >Location:</label>
                    <br />
                    <select name="location" value={formData.location} onChange={handleChange}>
                        <option value="">Select</option>
                        <option value="Noida 126">Noida 126</option>
                        <option value="Bengaluru-Jini 2">Bengaluru-Jini 2"</option>
                        <option value="Chennai-Sholinganallur">Chennai-Sholinganallur</option>
                        <option value="Lucknow">Lucknow</option>
                    </select>
                    {errors.location && <div className="error">{errors.location}</div>}
                </div>
                <div>
                    <label className='lbl' >LOB (Department):</label>
                    <br />
                    <select name="lob" value={formData.lob} onChange={handleChange}>
                        <option value="">Select</option>
                        <option value="APME Growth Markets">APME Growth Markets</option>
                        <option value="Digital Buissness">Digital Buissness</option>
                        <option value="Digital Foundation">Digital Foundation</option>
                        <option value="DPO">DPO</option>
                        <option value="ERS">ERS</option>
                        <option value="GIC">GIC</option>
                        <option value="Sales">Sales</option>
                    </select>
                    {errors.lob && <div className="error">{errors.lob}</div>}
                </div>



                <div className="form-group">
                    {sport === "chess" || sport === "tabletennis" || sport === "tennis" ? <></> :
                        <>
                            <label className='lbl' >Team Captain Name:</label>
                            <br/>
                            <input name='teamLeader' type="text" value={formData.teamLeader} onChange={handleChange} placeholder='Team Captain' />
                            {errors.teamLeader && <div className="error">{errors.teamLeader}</div>}
                        </>
                    }
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
                                <input
                                    type="text"
                                    name="teamMembers"
                                    value={member}
                                    onChange={(event) => handleTeamMembers(event, index)}
                                    placeholder={`Team Member ${index+1}`}
                                />
                                {errors && errors[`teamMembers[${index}]`] && (
                                    <div className="error">{errors[`teamMembers[${index}]`]}</div>
                                )}
                            </div>
                        ))

                    )}

                </div>
                <button className="form--submit" type="submit">Submit</button>
            </form>
        </div>
    );
};

export default CommonForm;
