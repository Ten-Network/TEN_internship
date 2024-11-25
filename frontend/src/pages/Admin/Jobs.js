// // /* eslint-disable no-unused-vars */
// // import React, { useState, useEffect } from "react";
// // import axios from "axios";
// // import styles from './jobs.module.css';
// // import api from "../../api/base";
// // import JobList from "../../components/Jobs/JobList";

// // function Jobs() {
// //   const [jobs, setJobs] = useState([]);
// //   const [currentJob, setCurrentJob] = useState(null);
// //   // GET all jobs
// //   const retriveJobs = async () => {
// //     // const response = await api.get("/jobs");
// //     const response = await api.get("jobs/show");
// //     return response.data;
// //   };

// //   // ADD job
// //   const addJobHandler = async (job) => {
// //     const request = {
// //       id: job.id,
// //       ...job,
// //     };
// //     const response = await api.post("/jobs", request);
// //     setJobs([...jobs, response.data]);
// //   };

// //   // DELETE job
// //   const removeJobHandler = async (id) => {
// //     await api.delete(`/jobs/${id}`);
// //     const newJobsList = jobs.filter((job) => {
// //       return job.id !== id;
// //     });

// //     setJobs(newJobsList);
// //   };

// //   // update job
// //   const updateJobHandler = async (job) => {
// //     const response = await api.put(`/jobs/${job.id}`, job);
// //     const { id, role, company, location, description, datePosted } =
// //       response.data;
// //     setJobs(
// //       jobs.map((job) => {
// //         return job.id === id ? { ...response.data } : job;
// //       })
// //     );
// //   };

// //   useEffect(() => {
// //     const getAllJobs = async () => {
// //       const allJobs = await retriveJobs();
// //       if (allJobs) setJobs(allJobs);
// //     };

// //     getAllJobs();
// //   }, []);

// //   return (
// //     <div className={styles.jobs}>
// //         <div className="ulist">
// //           <JobList
// //             jobs={jobs}
// //             setCurrentJob={setCurrentJob}
// //             removeJobHandler={removeJobHandler}
// //           />
// //         </div>
// //       {/* {currentJob && <JobDetails job={currentJob} />} */}
// //     </div>
// //   );
// // }

// // export default Jobs;
















// import React, { useState, useEffect } from "react";
// import styles from './jobs.module.css';
// import api from "../../api/base";
// import JobList from "../../components/Jobs/JobList";

// function Jobs() {
//   const [jobs, setJobs] = useState([]);
//   const [currentJob, setCurrentJob] = useState(null);

//   // GET all jobs
//   const retriveJobs = async () => {
//     try {
//       const response = await api.get("/jobs"); // Ensure the endpoint is correct
//       return response.data;
//     } catch (error) {
//       console.error("Error fetching jobs:", error); // Log error
//       return []; // Return empty array if error
//     }
//   };


//   // ADD job
//   const addJobHandler = async (job) => {
//     try {
//       const request = {
//         id: job.id,
//         ...job,
//       };
//       const response = await api.post("/jobs", request);
//       setJobs([...jobs, response.data]);
//     } catch (error) {
//       console.error("Error adding job:", error); // Log error
//     }
//   };

//   // DELETE job
//   const removeJobHandler = async (id) => {
//     try {
//       await api.delete(`/jobs/${id}`);
//       const newJobsList = jobs.filter((job) => job.id !== id);
//       setJobs(newJobsList);
//     } catch (error) {
//       console.error("Error removing job:", error); // Log error
//     }
//   };

//   // Update job
//   const updateJobHandler = async (job) => {
//     try {
//       const response = await api.put(`/jobs/${job.id}`, job);
//       setJobs(
//         jobs.map((job) =>
//           job.id === response.data.id ? { ...response.data } : job
//         )
//       );
//     } catch (error) {
//       console.error("Error updating job:", error); // Log error
//     }
//   };

//   useEffect(() => {
//     const getAllJobs = async () => {
//       const allJobs = await retriveJobs();
//       if (allJobs) setJobs(allJobs);
//     };

//     getAllJobs();
//   }, []);

//   return (
//     <div className={styles.jobs}>
//       <div className="ulist">
//         <JobList
//           jobs={jobs}
//           setCurrentJob={setCurrentJob}
//           removeJobHandler={removeJobHandler}
//         />
//       </div>
//       {/* {currentJob && <JobDetails job={currentJob} />} */}
//     </div>
//   );
// }

// export default Jobs;

import React, { useState, useEffect } from "react";
import styles from './jobs.module.css';
import api from "../../api/base";
import JobList from "../../components/Jobs/JobList";
import { useNavigate } from "react-router-dom";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [currentJob, setCurrentJob] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state
  const navigate = useNavigate();

  // Check if the user is logged in by checking the session token
  useEffect(() => {
    const token = sessionStorage.getItem("authToken");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  // GET all jobs
  const retriveJobs = async () => {
    try {
      const response = await api.get("/jobs");
      return response.data;
    } catch (error) {
      console.error("Error fetching jobs:", error);
      return [];
    }
  };

  // ADD job
  const addJobHandler = async (job) => {
    try {
      const request = {
        id: job.id,
        ...job,
      };
      const response = await api.post("/jobs", request);
      setJobs([...jobs, response.data]);
    } catch (error) {
      console.error("Error adding job:", error);
    }
  };

  // DELETE job
  const removeJobHandler = async (id) => {
    try {
      await api.delete(`/jobs/${id}`);
      const newJobsList = jobs.filter((job) => job.id !== id);
      setJobs(newJobsList);
    } catch (error) {
      console.error("Error removing job:", error);
    }
  };

  // Update job
  const updateJobHandler = async (job) => {
    try {
      const response = await api.put(`/jobs/${job.id}`, job);
      setJobs(
        jobs.map((job) =>
          job.id === response.data.id ? { ...response.data } : job
        )
      );
    } catch (error) {
      console.error("Error updating job:", error);
    }
  };

  // Fetch jobs when logged in state changes
  useEffect(() => {
    if (isLoggedIn) {
      const getAllJobs = async () => {
        const allJobs = await retriveJobs();
        if (allJobs) setJobs(allJobs);
      };

      getAllJobs();
    }
  }, [isLoggedIn]);

  // Redirect to login page if not logged in
  if (!isLoggedIn) {
    navigate("/login");
  }

  return (
    <div className={styles.jobs}>
      <div className="ulist">
        <JobList
          jobs={jobs}
          setCurrentJob={setCurrentJob}
          removeJobHandler={removeJobHandler}
        />
      </div>
      {/* {currentJob && <JobDetails job={currentJob} />} */}
    </div>
  );
}

export default Jobs;
