
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './CommonForm.css'
import * as Yup from "yup"
const CommonForm = () => {
    const { sport } = useParams();
    const[ memberDetails, SetmemberDetails]=useState(false)
    const [formData, setFormData] = useState({
        teamName: "",
        captainName: "",
        // captainSapId: "",
        capgender: "",
        teamMembers: [
            { name: "", sapId: "", gender: "" },
            { name: "", sapId: "", gender: "" },
            { name: "", sapId: "", gender: "" },
            { name: "", sapId: "", gender: "" }
        ],
        location: "",
    });

    const [errors, setErrors] = useState({})
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Errors:", errors);
        if (!memberDetails) {
            // Set error for team member details
            setErrors({ teamMembers: "Team member details are mandatory" });
            return; // Prevent form submission
        }


        try {
            await validationSchema.validate(formData, { abortEarly: false });
            const finalvalue = { ...formData, sport }
            console.log("Form Submitted", finalvalue);
            setErrors({})
        } catch (error) {
            const newErrors = {};

            error.inner.forEach((err) => {
                newErrors[err.path] = err.message;
            });

            setErrors(newErrors);
            console.log(newErrors);
        }
    };

    const commonSchema = {

        teamName: Yup.string().required("Team name is required"),
        captainName: Yup.string().required("Captain name is required"),
        capgender: Yup.string().required("Captain-Gender is required"),
        teamMembers: Yup.array().of(
            Yup.object().shape({
                name: Yup.string().required("Team member name is required"),
                sapId: Yup.number()
                    .typeError("SAP ID must be a number")
                    .positive("SAP ID must be a positive number")
                    .integer("SAP ID must be an integer")
                    .min(10000000, "SAP ID must be an 8-digit number")
                    .max(99999999, "SAP ID must be an 8-digit number")
                    .required("SAP ID is required"),
                gender: Yup.string().required("Gender for Team members is required"),
            })
        ),
        location: Yup.string().required("Location is required"),

    };
    let validationSchema;
    
  commonSchema.teamMembers = commonSchema.teamMembers.test({
    test: function (value) {
        const atLeastOneFemale = value.filter(member => member.gender === 'female').length > 0;
        return atLeastOneFemale;
    },
    message: 'At least one team member must be female',
});


validationSchema = Yup.object().shape(commonSchema);




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
    const handleTeamMemberGenderChange = (event, index) => {
        const { value } = event.target;
        const updatedTeamMembers = [...formData.teamMembers];
        updatedTeamMembers[index].gender = value;
        setFormData({
            ...formData,
            teamMembers: updatedTeamMembers,
        });
        console.log(formData);
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
    function sportValue() {
        if (sport === "chess" || sport === "tabletennis" || sport === "tennis") {
            return true;
        }
        else {
            return false;
        }
    }
    const handleTeamDetails=()=>{
        SetmemberDetails(!memberDetails)
        setErrors({})
      
    }

    return (
        <div className="card">
            <div className="card2">

            <form className="form1" onSubmit={handleSubmit}>
                <h1 className="signup">{sport}</h1>
                <div className="form-group">
                    <label className='lbl'>Team Name:</label>
                    <br />
                    <input type='text' value={formData.teamName} onChange={handleChange} name='teamName' placeholder='Team Name' className='Sport-input' />
                    {errors.teamName && <div className="error">{errors.teamName}</div>}
                </div>

                <div className="form-group">
                    <label className='lbl'>Captain Name:</label>
                    <br />
                    <input type='text' value={formData.captainName} onChange={handleChange} name='captainName' placeholder='Captain Name'  className='Sport-input'/>
                    {errors.captainName && <div className="error">{errors.captainName}</div>}
                </div>

                {/* <div className="form-group">
                    <label className='lbl'>Captain SAP ID:</label>
                    <br />
                    <input type='number' value={formData.captainSapId} onChange={handleChange} name='captainSapId' placeholder='Captain SAP ID' />
                    {errors.captainSapId && <div className="error">{errors.captainSapId}</div>}
                </div> */}
                <div className="mydict">
                    <div className='form-group'>
                    <label className='lbl'>Captain's Gender:</label>
                    </div>
                    <div>
                        <label>
                            <input type="radio" value="male" name="capgender" checked={formData.capgender === "male"} onChange={handleChange} />
                            <span className='gender' >Male</span>
                        </label>
                        <label>
                            <input type="radio" value="female" name="capgender" checked={formData.capgender === "female"} onChange={handleChange}  />
                            <span className='gender' >Female</span>
                        </label>
                        <label>
                            <input type="radio" value="other" name="capgender" checked={formData.capgender === "other"} onChange={handleChange} />
                            <span className='gender' >other</span>
                           
                        </label>
                      
                    </div>
                    {errors && errors.capgender && <div className="error">{errors.capgender}</div>}

                </div>
                <br/>
                <div className='form-group'>
                <label className='lbl'>Team Details:</label>
                <br/>
                <label className="switch">
                <input  type='checkbox' onClick={handleTeamDetails}/>
                </label>
                </div>
                
              
                {errors && errors.teamMembers && <div className="error">{errors.teamMembers}</div>}
                {memberDetails &&  <><div className="form-group">
               
                <label className='lbl'>Team Members:</label>
                </div>
                <div className="team-members-grid">
                
                    {formData?.teamMembers?.map((member, index) => (
                        <div key={index} className='team-member'>
                           
                            <br/>
                            <input type='text' value={member.name} onChange={(e) => handleTeamMemberNameChange(e, index)} name={`teamMembers[${index}].name`} placeholder={"Name"} className='Sport-input'/>
                            {errors && errors[`teamMembers[${index}].name`] && <div className="error">{errors[`teamMembers[${index}].name`]}</div>}
                            <input type='number' value={member.sapId} onChange={(e) => handleTeamMemberSapIdChange(e, index)} name={`teamMembers[${index}].sapId`} placeholder={'sapId'} className='Sport-input'/>
                            {errors && errors[`teamMembers[${index}].sapId`] && <div className="error">{errors[`teamMembers[${index}].sapId`]}</div>}
                            
                            <div className="mydict">
                                {/* <label className='lbl'> Team Member's Gender:</label> */}
                                <div className='form-group'>
                                    <label>
                                        <input type="radio" value="male" name={`teamMembers[${index}].gender`} checked={member.gender === "male"} onChange={(e) => handleTeamMemberGenderChange(e, index)} />
                                        <span className='gender' >Male</span>

                                    </label>

                                    <label>
                                        <input type="radio" value="female" name={`teamMembers[${index}].gender`} checked={member.gender === "female"} onChange={(e) => handleTeamMemberGenderChange(e, index)} />
                                        <span className='gender' >Female</span>
                                    </label>
                                    <label>
                                        <input type="radio" value="other" name={`teamMembers[${index}].gender`} checked={member.gender === "other"} onChange={(e) => handleTeamMemberGenderChange(e, index)} />
                                        <span className='gender' >other</span>
                                    </label>
                                    {errors && errors[`teamMembers[${index}].gender`] && <div className="error">{errors[`teamMembers[${index}].gender`]}</div>}
                                </div>
                            </div>
                          
                        </div>
                    ))}
                    {/* Display the error message for team members */}
                    {/* {errors && errors.teamMembers && typeof errors.teamMembers === 'string' && (
                       
                        <div className="error1">{errors.teamMembers}</div>
                        
                    )} */}
                </div> 
                </> }
                
                <div>
                        <label className='lbl'>Location:</label>
                        <br />
                        <select name="location" value={formData.location} onChange={handleChange} className='Sport-input'>
                            <option value="">Select</option>
                            <option value="Noida 126">Noida 126</option>
                            <option value="Bengaluru-Jini 2">Bengaluru-Jini 2</option>
                            <option value="Chennai-Sholinganallur">Chennai-Sholinganallur</option>
                            <option value="Lucknow">Lucknow</option>
                        </select>
                        {errors.location && <div className="error">{errors.location}</div>}
                    </div>

                

                <button className="form--submit" type="submit">Submit</button>
            </form >
        </div >
        </div>
    );
};

export default CommonForm;