/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import "../../pages.css/admin.css";
// import Sidebar from "../../components/Sidebar";
// import AdminDashboardUser from "../../components/Admin/AdminDashboardUser";
// import AdminDashboardJob from "../../components/Admin/AdminDashboardJob";
import AdminDashboardAllJobs from "../../components/Admin/AdminDashboardAllJobs.js";
import AdminDashboardPostJob from "../../components/Admin/AdminDashboardPostJob.js";
import AdminDashboardPostInternship from "../../components/Admin/AdminDashboardPostInternship.js";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Admin() {
  // const [users, setUsers] = useState([]);
  // const [jobs, setJobs] = useState([]);
  const [view, setView] = useState(null);
  const [jobsarr, setJobsarr] = useState([]);
  const [jobDetails, setJobDetails] = useState({
    role_name: "",
    skills_required: [],
    job_type: "",
    location: "",
    description: "",
    company_name: "",
    company_id: "",
    job_deadline: "",
    max_applicants: "",
    totalpositions: "",
    salary: "",
  });
  const [internsarr, setInternsarr] = useState([]);
  const [internDetails, setInternDetails] = useState({
    role_name: "",
    requiredSkills: [],
    internship_Type: "",
    company_Location: "",
    description: "",
    company_Name: "",
    company_Id: "",
    applicationDeadline: "",
    maxNoOfApplicants: "",
    positionsAvailable: "",
    stipend: "",
    duration: "",
  });

  // Post Job
  const PostJob = async jobDetails => {
    try {
      await axios
        .post(`https://interns-f4di.onrender.com/jobs/create`, jobDetails)
        .then(res => {
          console.log(res.data.message);
          toast.success("Job Posted!", {
            position: toast.POSITION.TOP_CENTER,
          });
          setJobDetails({
            role_name: "",
            skills_required: [],
            job_type: "",
            location: "",
            description: "",
            company_name: "",
            company_id: "",
            salary: "",
            job_deadline: "",
            max_applicants: "",
            totalpositions: "",
          });
          window.location.reload(); //temporary used
        })
        .catch(err => {
          console.log(err.response.data);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const deletejob = async jobId => {
    // console.log(jobId);
    if (jobId) {
      await axios
        .delete(`https://interns-f4di.onrender.com/jobs/delete/${jobId}`)
        .then(res => {
          console.log(res.data.message);
          window.location.reload(); //temporary used
        })
        .catch(err => {
          console.log(err.response.data.message);
        });
    } else {
      console.log(`Please SignIn First`);
    }
  };

const updatejob = async (jobId, jobdetail) => {
  console.log("JobID:", jobId);
  console.log("JOB DETAILS:", jobdetail);
  
  try {
    if (jobId) {
      const response = await axios.put(`https://interns-f4di.onrender.com/jobs/${jobId}`, jobdetail);
      console.log(response.data.message);
      toast.success("Job updated successfully!", { position: toast.POSITION.TOP_CENTER });
      setJobsarr(prev => prev.map(job => (job.job_id === jobId ? response.data.updatedJob : job)));
    } else {
      console.log("Invalid job ID.");
    }
  } catch (error) {
    console.error("Error updating job:", error.response?.data || error.message);
    toast.error("Failed to update job.", { position: toast.POSITION.TOP_CENTER });
  }
};


  //GET all Jobs
  useEffect(() => {
    const getdata = async () => {
      console.log("UseEffect is Working.");
      await axios
        .get("https://interns-f4di.onrender.com/jobs/all")
        .then(res => {
          console.log("Job Data : ", res.data);
          setJobsarr(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    };
    getdata();
  }, []); //Error Occurring
  // console.log(jobsarr);

  // Post Internship
  const PostIntern = async internDetails => {
    // console.log(internDetails);
    try {
      await axios
        .post(
          `https://interns-f4di.onrender.com/internships/create`,
          internDetails
        )
        .then(res => {
          console.log(res.data.message);
          alert("Internship Posted!");
          setInternDetails({
            role_name: "",
            requiredSkills: [],
            internship_Type: "",
            company_Location: "",
            description: "",
            company_Name: "",
            company_Id: "",
            applicationDeadline: "",
            maxNoOfApplicants: "",
            positionsAvailable: "",
            stipend: "",
            duration: "",
          });
          window.location.reload(); //temporary used
        })
        .catch(err => {
          console.log(err.response.data);
        });
    } catch (error) {
      console.error(error);
    }
  };

  //Update Internship
  const updateintern = async (internId, interndetail) => {
    console.log(internId, interndetail);
    console.log("InternID : ", interndetail.internship_id);
    console.log("Internship Detials : ", interndetail);
    if (interndetail.internship_id) {
      await axios
        .put(
          `https://interns-f4di.onrender.com/internships/update/${interndetail.internship_id}`,
          interndetail
        )
        .then(res => {
          console.log(res.data.message);
          alert("Internship updated successfully");
          window.location.reload();
        })
        .catch(err => {
          console.log(err.response.data);
        });
    } else {
      console.log(`Please SignIn First`);
    }
    //https://interns-f4di.onrender.com/internships/update/${internId}
  };

  //Delete Internship
  const deleteintern = async internId => {
    // console.log(internId);
    if (internId) {
      await axios
        .delete(
          `https://interns-f4di.onrender.com/internships/delete/${internId}`
        )
        .then(res => {
          console.log(res.data.message);
          window.location.reload(); //temporary used
        })
        .catch(err => {
          console.log(err.response.data.message);
        });
    } else {
      console.log(`Please SignIn First`);
    }
  };

  //GET all Internships
  useEffect(() => {
    const getdata = async () => {
      console.log("Internships UseEffect is Working.");
      await axios
        .get("https://interns-f4di.onrender.com/internships/show/all")
        .then(res => {
          setInternsarr(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    };
    getdata();
  }, []); //Error Occurring
  // console.log("Internships : ");
  // console.log(internsarr);

  return (
    <div className="admin">
      {/* <Sidebar /> */}
      <div className=" adminsidebar">
        <div className="adminsidebarbtns">
          <button className="adminpanelbtn" onClick={() => setView(null)}>
            Home
          </button>
          {/* <button onClick={() => { handleUsers() }}>Users</button> */}
          {/* <button className="adminpanelbtn" onClick={() => setView("users")}>Users</button>
          <button className="adminpanelbtn" onClick={() => setView("jobs")}>Jobs</button> */}
          <button className="adminpanelbtn" onClick={() => setView("postjob")}>
            Post Jobs
          </button>
          <button
            className="adminpanelbtn"
            onClick={() => setView("postInternship")}
          >
            Post Internship
          </button>
        </div>

        {/* {renderView()} */}
        {/* {view === "users" && <div>Users</div>} */}
        {/* {view === "users" && <AdminDashboardUser
          users={users}
          removeUserHandler={removeUserHandler}
          createUserHandler={createUserHandler}
        />}

        {view === "jobs" && <AdminDashboardJob
          jobs={jobs}
          createJobHandler={createJobHandler}
          removeJobHandler={removeJobHandler}
        />} */}

        {view === null && (
          <AdminDashboardAllJobs
            deletejobhandler={deletejob}
            jobsarray={jobsarr}
            updatejobhandler={updatejob}
            deleteinternhandler={deleteintern}
            internsarray={internsarr}
            updateinternhandler={updateintern}
            setView={setView}
          />
        )}
        {view === "postjob" && (
          <AdminDashboardPostJob
            addjobhandler={PostJob}
            jobDetails={jobDetails}
            setJobDetails={setJobDetails}
          />
        )}
        {view === "postInternship" && (
          <AdminDashboardPostInternship
            addinternshiphandler={PostIntern}
            internshipDetails={internDetails}
            setInternshipDetails={setInternDetails}
          />
        )}
      </div>
    </div>
  );
}

export default Admin;
