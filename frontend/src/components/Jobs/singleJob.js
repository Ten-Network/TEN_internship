import { Card, CardContent, Stack, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import LoadingBox from "../../Component/LoadingBox";
import { jobLoadSingleAction } from "../../redux/actions/jobAction";

import { IoLocationOutline } from "react-icons/io5";
import { MdWorkOutline } from "react-icons/md";

import Button from "@mui/material/Button";
import { userApplyJobAction } from "../../redux/actions/userAction";
import { useTheme } from "@emotion/react";

import "../../scss/singleJob.scss";

const SingleJob = () => {
  const { palette } = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { singleJob, loading } = useSelector(state => state.singleJob);
  const { id } = useParams();
  useEffect(() => {
    dispatch(jobLoadSingleAction(id));
  }, [id]);

  console.log(singleJob);

  const applyForAJob = () => {
    navigate('/applyform')
    dispatch(
      userApplyJobAction({
        jobTitle: singleJob && singleJob.title,
        description: singleJob && singleJob.description,
        category: singleJob && singleJob.category,
        location: singleJob && singleJob.location,
      })
    );
  };

  /**
   *
   * @param {String!} rawString
   * @returns {String}
   */
  function formatStringToHTML(rawString) {
    const lines = rawString.split("\n");
    const htmlLines = lines.map(line => `<p>${line}</p>`).join("");
    return { __html: htmlLines };
  }

  return (
    <Box sx={{ bgcolor: "#fafafa", marginTop: "100px" }}>
      <Box sx={{ height: "100%" }}>
        <Container sx={{ pt: "30px" }}>
          <Stack
            direction={{ xs: "column", sm: "column" }}
            spacing={{ xs: 1, sm: 2, md: 4 }}
          >
            <Box sx={{ p: 2 }}>
              {loading ? (
                <LoadingBox />
              ) : (
                <section className="job__details">
                  <h2 className="job__title">
                    {singleJob && singleJob.role_name}
                  </h2>
                  <div className="side__wrapper">
                    <div
                      style={{
                        display: "flex",
                        gap: "10px",
                        marginBottom: "10px",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "1.5rem",
                        }}
                      >
                        <IoLocationOutline
                          color="blue"
                          style={{ marginRight: ".3rem" }}
                        />
                        {singleJob && singleJob.location},{" "}
                        {singleJob && singleJob.job_type}
                      </span>
                    </div>
                    <span
                      style={{
                        fontSize: "1.5rem",
                      }}
                    >
                      <span
                        style={{
                          color: "blue",
                          display: "inline",
                        }}
                      >
                        <MdWorkOutline style={{ marginRight: ".3rem" }} />
                        Company:{" "}
                      </span>{" "}
                      {singleJob && singleJob.company_name}
                    </span>
                    <div
                      style={{
                        marginTop: ".5rem",
                      }}
                      className="required__skills"
                    >
                      <span
                        style={{
                          fontSize: "1.2rem",
                        }}
                      >
                        <span
                          style={{
                            display: "inline",
                          }}
                        >
                          Skills required:{" "}
                        </span>
                        {singleJob &&
                          singleJob.skills_required.map(skill => (
                            <span
                              style={{
                                backgroundColor: "rgb(0 0 255 / .1)",
                                color: "blue",
                                padding: "5px",
                                borderRadius: "5rem",
                                margin: "0 5px",
                                fontSize: ".8rem",
                              }}
                            >
                              {skill}
                            </span>
                          ))}
                      </span>
                    </div>
                    <div className="extra__details">
                      <span>
                        Salary: {"  "}
                        <span>₹ {singleJob && singleJob.salary} </span>
                      </span>
                      <span>
                        Max number of application allowed: {" "}
                        <span>{singleJob && singleJob.max_applicants}</span>
                      </span>
                      {/* <span>
                        Positions posted: {" "}
                        <span>{singleJob && singleJob.totalpositions}</span>
                      </span> */}
                      <span>
                        Deadline for application: {" "}
                        <span>{singleJob && singleJob.job_deadline}</span>
                      </span>
                    </div>
                    <p
                      style={{
                        color: "gray",
                        marginTop: "10px",
                      }}
                      className="job__description"
                      dangerouslySetInnerHTML={{
                        __html:
                          singleJob &&
                          formatStringToHTML(singleJob.description).__html,
                      }}
                    ></p>
                  </div>
                  <div
                    style={{
                      color: "rgb(0 0 0 / .3)",
                    }}
                    className="side__wrapper__right"
                  >
                    Internship id:
                    <span>{singleJob && singleJob.job_id}</span>
                  </div>
                </section>
              )}
            </Box>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                marginBottom: "2rem",
                marginTop: "-2rem",
                paddingLeft: "2rem",
              }}
            >
              <button id="apply__btn" onClick={applyForAJob}>Apply!</button>
            </div>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};

export default SingleJob;
