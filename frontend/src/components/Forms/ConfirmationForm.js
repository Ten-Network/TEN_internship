// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "../../componentsCss/confirmationPage.css";
// import api from "../../api/base";

// const ConfirmationForm = ({ formData, onNext, onPrevious }) => {
//   const handlePrevious = e => {
//     e.preventDefault();
//     onPrevious();
//   };
//   const navigate = useNavigate();


//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (window.confirm("Are you sure you want to proceed?")) {
//       try {
//         const response = await api.post("/profile/addprofile", formData);

//         if (response.status !== 200) {
//           alert(
//             response.data?.error?.details
//               ? response.data.error.details[0].message
//               : response.data.error
//           );
//           return;
//         }

//         console.log("Server response:", response.data);
//         alert("Profile created successfully");
//         navigate("/");
//       } catch (error) {
//         if (error.response && error.response.data && error.response.data.error) {
//           // Display specific error message if available
//           alert(error.response.data.error);
//         } else {
//           console.error("Error:", error);
//         }
//       }
//     }
//   };




//   const formatDateString = dateString => {
//     const date = new Date(dateString);
//     const day = String(date.getDate()).padStart(2, "0");
//     const month = String(date.getMonth() + 1).padStart(2, "0");
//     const year = date.getFullYear();
//     return `${day} - ${month} - ${year}`;
//   };

//   const fullName = `${formData.personalInfo.address} ${formData.personalInfo.city}
//    ${formData.personalInfo.state} ${formData.personalInfo.country} ${formData.personalInfo.code}`;

//   return (
//     <div className="con pt-11">
//       <form onSubmit={handleSubmit} className="lastpage">
//         <h1 className="confirm">User Details</h1>
//         <p className="fw-bold">
//           Please review your information before submitting:
//         </p>
//         {/* Render the form data for confirmation */}
//         <div>
//           {formData.personalInfo && formData.personalInfo.firstName && (
//             <div>
//               <div className="midd">
//                 <div className="line"></div>
//                 <h3 className="side-titles">Personal Information</h3>
//                 <div className="line"></div>
//               </div>

//               <div className="block-type">
//                 <div className="details-container">
//                   <span className=" admin-input">First Name:</span>
//                   <span className="user-input">
//                     {formData.personalInfo.firstName}
//                   </span>
//                   {/* {formData.personalInfo.lastName && (
//                     <div> */}
//                   <span className="admin-input"> Last Name:</span>
//                   <span className=" user-input">
//                     {formData.personalInfo.lastName}
//                   </span>
//                   {/* </div>
//                   )} */}

//                   <span className="admin-input">Email Id:</span>
//                   <span className=" user-input">
//                     {formData.personalInfo.email}
//                   </span>
//                   <span className=" admin-input">Phone Number:</span>
//                   <span className=" user-input">
//                     {formData.personalInfo.phone}
//                   </span>
//                 </div>
//                 <span className=" admin-input">Location:</span>
//                 <span className=" user-input">{fullName}</span>
//               </div>
//             </div>
//           )}

//           {formData.education && formData.education.clg.length > 0 && (
//             <div>
//               <div className="midd">
//                 <div className="line"></div>
//                 <h3 className="side-titles">Education</h3>
//                 <div className="line"></div>
//               </div>

//               <div className="block-type">
//                 <div className="details-container">
//                   <span className=" admin-input">College Name:</span>
//                   <span className=" user-input">{formData.education.clg}</span>

//                   <span className=" admin-input">Branch:</span>
//                   <span className=" user-input">
//                     {formData.education.branch}
//                   </span>
//                 </div>
//                 <span className=" admin-input">Education Level:</span>
//                 <span className=" user-input">
//                   {formData.education.educationLevel}
//                 </span>
//                 <br />
//                 <div className="p-3">
//                   <span className=" admin-input ">Start Date:</span>
//                   <span className=" user-input">
//                     {formatDateString(formData.education.startDate)}
//                   </span>
//                   <span className=" admin-input">End Date:</span>
//                   <span className=" user-input">
//                     {formatDateString(formData.education.endDate)}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           )}

//           {formData.workExperienceInfo &&
//             formData.workExperienceInfo.workExperiences.length > 0 && (
//               <div>
//                 <div className="midd">
//                   <div className="line"></div>
//                   <h3 className="side-titles">Work Experience</h3>
//                   <div className="line"></div>
//                 </div>

//                 <div className="block-type">
//                   {formData.workExperienceInfo.workExperiences.map(
//                     (experience, index) => (
//                       <span key={index}>
//                         <div className="details-container">
//                           <span className=" admin-input">Company: </span>
//                           <span className=" user-input">
//                             {experience.company}
//                           </span>

//                           <span className=" admin-input">Position:</span>
//                           <span className=" user-input">
//                             {experience.position}
//                           </span>
//                         </div>

//                         <span className=" admin-input">Type:</span>
//                         <br />
//                         <div className="p-3">
//                           <span className=" user-input">{experience.type}</span>
//                           <span className=" admin-input">Start Date:</span>
//                           <span className=" user-input">
//                             {experience.startDate}
//                           </span>
//                           <span className=" admin-input">End Date:</span>
//                           <span className="user-input">
//                             {experience.endDate}
//                           </span>
//                         </div>
//                       </span>
//                     )
//                   )}
//                 </div>
//               </div>
//             )}
//           {formData.skillset && formData.skillset.skills.length > 0 && (
//             <div>
//               <div className="midd">
//                 <div className="line"></div>
//                 <h3 className="side-titles">User skillset</h3>
//                 <div className="line"></div>
//               </div>

//               <div className="block-type">
//                 <span className="skill-set">
//                   <span className=" admin-input">Skills:</span>
//                 </span>
//                 <div className="multi-skills">
//                   {formData.skillset.skills.map((skill, index) => (
//                     <span className=" user-input" key={index}>
//                       {skill}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           )}
//           <br />

//           {formData.socialMedia &&
//             formData.socialMedia.linkedInUrl.length > 0 && (
//               <div>
//                 <div className="midd">
//                   <div className="line"></div>
//                   <h3 className="side-titles">Social Media links</h3>
//                   <div className="line"></div>
//                 </div>
//                 <div className="block-type">
//                   <div className="media">
//                     {formData.socialMedia.linkedInUrl && (
//                       <span className=" admin-input">
//                         LinkedIn:{" "}
//                         <span className=" user-input">
//                           {formData.socialMedia.linkedInUrl}
//                         </span>
//                       </span>
//                     )}

//                     {formData.socialMedia.githubUrl && (
//                       <span className=" admin-input">
//                         Github:{" "}
//                         <span className=" user-input">
//                           {formData.socialMedia.githubUrl}
//                         </span>
//                       </span>
//                     )}

//                     {formData.socialMedia.portfolioUrl && (
//                       <span className=" admin-input">
//                         Portfolio:{" "}
//                         <span className=" user-input">
//                           {formData.socialMedia.portfolioUrl}
//                         </span>
//                       </span>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             )}
//         </div>
//         <div className="buttons button_space">
//           <button style={{ width: "140px" }} onClick={handlePrevious}>
//             Previous
//           </button>
//           <button type="submit" style={{ width: "140px" }}>
//             Confirm
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default ConfirmationForm;







import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../componentsCss/confirmationPage.css";
import api from "../../api/base";

const ConfirmationForm = ({ formData, onNext, onPrevious }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status

  useEffect(() => {
    const token = sessionStorage.getItem("authToken");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handlePrevious = e => {
    e.preventDefault();
    onPrevious();
  };
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Get the token from sessionStorage
    const token = sessionStorage.getItem("auth-token");
  
    // Check if token exists
    if (!token) {
      alert("Please log in to submit the profile.");
      return;
    }
  
    if (window.confirm("Are you sure you want to proceed?")) {
      try {
        // Include the token in the request headers
        const response = await api.post("/profile/addprofile", formData, {
          headers: {
            Authorization: `Bearer ${token}`, // Attach the token here
          },
        });
  
        if (response.status !== 200) {
          alert(
            response.data?.error?.details
              ? response.data.error.details[0].message
              : response.data.error
          );
          return;
        }
  
        console.log("Server response:", response.data);
        alert("Profile created successfully");
        navigate("/");
      } catch (error) {
        if (error.response && error.response.data && error.response.data.error) {
          // Display specific error message if available
          alert(error.response.data.error);
        } else {
          console.error("Error:", error);
        }
      }
    }
  };
  

  const formatDateString = dateString => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day} - ${month} - ${year}`;
  };

  const fullName = `${formData.personalInfo.address} ${formData.personalInfo.city}
   ${formData.personalInfo.state} ${formData.personalInfo.country} ${formData.personalInfo.code}`;

  return (
    <div className="con pt-11">
      <form onSubmit={handleSubmit} className="lastpage">
        <h1 className="confirm">User Details</h1>
        <p className="fw-bold">
          Please review your information before submitting:
        </p>
        {/* Render the form data for confirmation */}
        <div>
          {formData.personalInfo && formData.personalInfo.firstName && (
            <div>
              <div className="midd">
                <div className="line"></div>
                <h3 className="side-titles">Personal Information</h3>
                <div className="line"></div>
              </div>

              <div className="block-type">
                <div className="details-container">
                  <span className=" admin-input">First Name:</span>
                  <span className="user-input">
                    {formData.personalInfo.firstName}
                  </span>

                  <span className="admin-input"> Last Name:</span>
                  <span className=" user-input">
                    {formData.personalInfo.lastName}
                  </span>

                  <span className="admin-input">Email Id:</span>
                  <span className=" user-input">
                    {formData.personalInfo.email}
                  </span>
                  <span className=" admin-input">Phone Number:</span>
                  <span className=" user-input">
                    {formData.personalInfo.phone}
                  </span>
                </div>
                <span className=" admin-input">Location:</span>
                <span className=" user-input">{fullName}</span>
              </div>
            </div>
          )}

          {formData.education && formData.education.clg.length > 0 && (
            <div>
              <div className="midd">
                <div className="line"></div>
                <h3 className="side-titles">Education</h3>
                <div className="line"></div>
              </div>

              <div className="block-type">
                <div className="details-container">
                  <span className=" admin-input">College Name:</span>
                  <span className=" user-input">{formData.education.clg}</span>

                  <span className=" admin-input">Branch:</span>
                  <span className=" user-input">
                    {formData.education.branch}
                  </span>
                </div>
                <span className=" admin-input">Education Level:</span>
                <span className=" user-input">
                  {formData.education.educationLevel}
                </span>
                <br />
                <div className="p-3">
                  <span className=" admin-input ">Start Date:</span>
                  <span className=" user-input">
                    {formatDateString(formData.education.startDate)}
                  </span>
                  <span className=" admin-input">End Date:</span>
                  <span className=" user-input">
                    {formatDateString(formData.education.endDate)}
                  </span>
                </div>
              </div>
            </div>
          )}

          {formData.workExperienceInfo &&
            formData.workExperienceInfo.workExperiences.length > 0 && (
              <div>
                <div className="midd">
                  <div className="line"></div>
                  <h3 className="side-titles">Work Experience</h3>
                  <div className="line"></div>
                </div>

                <div className="block-type">
                  {formData.workExperienceInfo.workExperiences.map(
                    (experience, index) => (
                      <span key={index}>
                        <div className="details-container">
                          <span className=" admin-input">Company: </span>
                          <span className=" user-input">
                            {experience.company}
                          </span>

                          <span className=" admin-input">Position:</span>
                          <span className=" user-input">
                            {experience.position}
                          </span>
                        </div>

                        <span className=" admin-input">Type:</span>
                        <br />
                        <div className="p-3">
                          <span className=" user-input">{experience.type}</span>
                          <span className=" admin-input">Start Date:</span>
                          <span className=" user-input">
                            {experience.startDate}
                          </span>
                          <span className=" admin-input">End Date:</span>
                          <span className="user-input">
                            {experience.endDate}
                          </span>
                        </div>
                      </span>
                    )
                  )}
                </div>
              </div>
            )}
          {formData.skillset && formData.skillset.skills.length > 0 && (
            <div>
              <div className="midd">
                <div className="line"></div>
                <h3 className="side-titles">User skillset</h3>
                <div className="line"></div>
              </div>

              <div className="block-type">
                <span className="skill-set">
                  <span className=" admin-input">Skills:</span>
                </span>
                <div className="multi-skills">
                  {formData.skillset.skills.map((skill, index) => (
                    <span className=" user-input" key={index}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
          <br />

          {formData.socialMedia &&
            formData.socialMedia.linkedInUrl.length > 0 && (
              <div>
                <div className="midd">
                  <div className="line"></div>
                  <h3 className="side-titles">Social Media links</h3>
                  <div className="line"></div>
                </div>
                <div className="block-type">
                  <div className="media">
                    {formData.socialMedia.linkedInUrl && (
                      <span className=" admin-input">
                        LinkedIn:{" "}
                        <span className=" user-input">
                          {formData.socialMedia.linkedInUrl}
                        </span>
                      </span>
                    )}

                    {formData.socialMedia.githubUrl && (
                      <span className=" admin-input">
                        Github:{" "}
                        <span className=" user-input">
                          {formData.socialMedia.githubUrl}
                        </span>
                      </span>
                    )}

                    {formData.socialMedia.portfolioUrl && (
                      <span className=" admin-input">
                        Portfolio:{" "}
                        <span className=" user-input">
                          {formData.socialMedia.portfolioUrl}
                        </span>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}
        </div>
        <div className="buttons button_space">
          <button style={{ width: "140px" }} onClick={handlePrevious}>
            Previous
          </button>
          <button type="submit" style={{ width: "140px" }}>
            Confirm
          </button>
        </div>
      </form>
    </div>
  );
};

export default ConfirmationForm;
