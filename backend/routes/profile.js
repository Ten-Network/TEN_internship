const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const { Profile } = require("../models/profile");
const {
  personalDetailsValidation,
  personalDetails,
} = require("../models/personalDetails");
const {
  EducationDetailsValidation,
  educationDetails,
} = require("../models/educationalDetails");
const {
  workExperienceValidation,
  workExperienceDetails,
} = require("../models/workExperienceDetails");
const { Skillset, validateSkillset } = require("../models/skillset");
const {
  socialMediaLinksValidation,
  socialMediaLinks,
} = require("../models/socialMediaLinks");

const fetchuser = require("../middlewares/fetchuser");
const { User } = require("./../models/user");

// ! algo:
//* check if user is authenticated and present in the database
//* if yes, Get Data from the frontend
// * validate the data using joi function imported
//* save data in diffenet schemas and
// * save id of each schema object created in a profile schema
// * return responce

router.post("/addprofile", fetchuser, async (request, response, next) => {
  try {
    // * Validating user authentication
    if (!request.user) {
      return response.status(401).json({ error: "User not authenticated" });
    }

    //* Checking if user exist in database
    const user = await User.findById(request.user.id);
    if (!user) {
      return response.status(401).json({ error: "User not found" });
    }

    //* Checking if profile already created or not
    const profile = await Profile.findOne({ user_id: request.user.id });
    if (profile) {
      return response.status(400).json({ error: "Profile already created" });
    }

    const data = request.body;
    console.log("This is the data:", data);

    //* Performing validation

    let { error: personalError, value: personalValue } =
      await personalDetailsValidation(data.personalInfo);
    if (personalError) {
      return response.status(400).json({ error: personalError });
    }
    if (typeof personalValue === "undefined") {
      return response.status(400).json({
        error:
          "Validation failed. Please check your input data for personal details.",
      });
    }
    console.log("Personal profile is validated", personalValue);

    let { error: educationError, value: educationValue } =
      await EducationDetailsValidation(data.education);
    if (educationError) {
      return response.status(400).json({ error: educationError });
    }
    if (typeof educationValue === "undefined") {
      return response.status(400).json({
        error:
          "Validation failed. Please check your input data for education details.",
      });
    }
    console.log("Education profile is validated", educationValue);

    let { error: workError, value: workValue } = await workExperienceValidation(
      data.workExperienceInfo
    );
    if (workError) {
      return response.status(400).json({ error: workError });
    }
    if (typeof workValue === "undefined") {
      return response.status(400).json({
        error:
          "Validation failed. Please check your input data for work experience details.",
      });
    }
    console.log("Work experience profile is validated", workValue);

    let { error: socialError, value: socialValue } =
      await socialMediaLinksValidation(data.socialMedia);
    if (socialError) {
      return response.status(400).json({ error: socialError });
    }
    if (typeof socialValue === "undefined") {
      return response.status(400).json({
        error:
          "Validation failed. Please check your input data for social media links.",
      });
    }
    console.log("Social media profile is validated", socialValue);

    let { error: skillsetError, value: skillsetValue } = await validateSkillset(
      data.skillset
    );
    if (skillsetError) {
      return response.status(400).json({ error: skillsetError });
    }
    if (typeof skillsetValue === "undefined") {
      return response.status(400).json({
        error: "Validation failed. Please check your input data for skillset.",
      });
    }
    console.log("Skillset profile is validated", skillsetValue);

    // * Save data in seperate schemas

    const PersonalDetail = await personalDetails.create({
      FirstName: personalValue.firstName,
      LastName: personalValue.lastName,
      PhoneNumber: personalValue.phone,
      EmailId: personalValue.email,
      Address: personalValue.address,
      State: personalValue.state,
      City: personalValue.city,
      ZipCode: personalValue.code,
    });
    console.log("Profile created", PersonalDetail);
    const education = await educationDetails.create({
      collegeName: educationValue.clg,
      branchOfStudy: educationValue.branch,
      educationLevel: educationValue.educationLevel,
      startDate: educationValue.startDate,
      endDate: educationValue.endDate,
    });
    console.log("Education created", education);

    const work = await workExperienceDetails.create({
      experience: workValue.workExperiences,
    });
    console.log("Work created", work);

    const social = await socialMediaLinks.create({
      githubURL: socialValue.githubUrl,
      linkedinURL: socialValue.linkedInUrl,
      portfolioURL: socialValue.portfolioUrl,
    });
    console.log("Social created", social);

    const skillset = await Skillset.create({
      skillset: skillsetValue.skills,
    });
    console.log("Skillset created", skillset);

    // * creating the profile of user
    const newProfile = await Profile.create({
      user_id: mongoose.Types.ObjectId.createFromHexString(request.user.id),
      personal_details: PersonalDetail._id,
      educational_details: education._id,
      work_experience_details: work._id,
      social_media_links: social._id,
      skillset: skillset._id,
    });

    console.log("Profile created", newProfile);

    return response
      .status(201)
      .json({ msg: "Profile created successfully", newProfile: newProfile });
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
});

router.get("/getprofile", fetchuser, async (request, response, next) => {
  try {
    // * Validating user authentication
    if (!request.user) {
      return response.status(401).json({ error: "User not authenticated" });
    }

    //* Checking if user exist in database
    const user = await User.findById(request.user.id);
    if (!user) {
      return response.status(401).json({ error: "User not found" });
    }

    //* Checking if profile already created or not
    const profile = await Profile.findOne({ user_id: request.user.id });
    if (!profile) {
      return response.status(400).json({ error: "Profile not created" });
    }

    return response.status(200).json({ profile: profile });
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
});



// Update Profile
router.put("/updateprofile", fetchuser, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user_id: req.user.id });
    if (!profile) return res.status(404).json({ error: "Profile not found" });

    const updatedFields = req.body;

    if (updatedFields.personalInfo) {
      const validatedPersonal = await personalDetailsValidation(updatedFields.personalInfo);
      await personalDetails.findByIdAndUpdate(profile.personal_details, validatedPersonal.value);
    }

    if (updatedFields.education) {
      const validatedEducation = await EducationDetailsValidation(updatedFields.education);
      await educationDetails.findByIdAndUpdate(profile.educational_details, validatedEducation.value);
    }

    if (updatedFields.workExperienceInfo) {
      const validatedWork = await workExperienceValidation(updatedFields.workExperienceInfo);
      await workExperienceDetails.findByIdAndUpdate(
        profile.work_experience_details,
        validatedWork.value
      );
    }

    if (updatedFields.skillset) {
      const validatedSkills = await validateSkillset(updatedFields.skillset);
      await Skillset.findByIdAndUpdate(profile.skillset, validatedSkills.value);
    }

    if (updatedFields.socialMedia) {
      const validatedSocial = await socialMediaLinksValidation(updatedFields.socialMedia);
      await socialMediaLinks.findByIdAndUpdate(profile.social_media_links, validatedSocial.value);
    }

    res.status(200).json({ message: "Profile updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

















// const express = require("express");
// const mongoose = require("mongoose");
// const router = express.Router();
// const { Profile } = require("../models/profile");
// const { User } = require("../models/user");
// const fetchuser = require("../middlewares/fetchuser");
// const {
//   personalDetailsValidation,
//   personalDetails,
// } = require("../models/personalDetails");
// const {
//   EducationDetailsValidation,
//   educationDetails,
// } = require("../models/educationalDetails");
// const {
//   workExperienceValidation,
//   workExperienceDetails,
// } = require("../models/workExperienceDetails");
// const { Skillset, validateSkillset } = require("../models/skillset");
// const {
//   socialMediaLinksValidation,
//   socialMediaLinks,
// } = require("../models/socialMediaLinks");

// // Create Profile Endpoint
// router.post("/addprofile", fetchuser, async (req, res) => {
//   const session = await mongoose.startSession();
//   session.startTransaction();

//   try {
//     const user = await User.findById(req.user.id);
//     if (!user) return res.status(401).json({ error: "User not found" });

//     if (await Profile.findOne({ user_id: req.user.id })) {
//       return res.status(400).json({ error: "Profile already exists" });
//     }

//     const { personalInfo, education, workExperienceInfo, skillset, socialMedia } = req.body;

//     // Validate and save data
//     const personalValidated = await personalDetailsValidation(personalInfo);
//     const educationValidated = await EducationDetailsValidation(education);
//     const workValidated = await workExperienceValidation(workExperienceInfo);
//     const skillsValidated = await validateSkillset(skillset);
//     const socialValidated = await socialMediaLinksValidation(socialMedia);

//     const personal = await personalDetails.create([personalValidated.value], { session });
//     const edu = await educationDetails.create([educationValidated.value], { session });
//     const work = await workExperienceDetails.create([workValidated.value], { session });
//     const skills = await Skillset.create([skillsValidated.value], { session });
//     const social = await socialMediaLinks.create([socialValidated.value], { session });

//     const profile = await Profile.create(
//       [
//         {
//           user_id: req.user.id,
//           personal_details: personal[0]._id,
//           educational_details: edu[0]._id,
//           work_experience_details: work[0]._id,
//           skillset: skills[0]._id,
//           social_media_links: social[0]._id,
//         },
//       ],
//       { session }
//     );

//     await session.commitTransaction();
//     session.endSession();

//     return res.status(201).json({ message: "Profile created successfully", profile });
//   } catch (err) {
//     await session.abortTransaction();
//     session.endSession();
//     return res.status(500).json({ error: err.message });
//   }
// });

// // Fetch Profile Endpoint
// router.get("/getprofile", fetchuser, async (req, res) => {
//   try {
//     const profile = await Profile.findOne({ user_id: req.user.id }).populate([
//       "personal_details",
//       "educational_details",
//       "work_experience_details",
//       "skillset",
//       "social_media_links",
//     ]);

//     if (!profile) return res.status(404).json({ error: "Profile not found" });

//     res.status(200).json({ profile });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Update Profile Endpoint
// router.put("/updateprofile", fetchuser, async (req, res) => {
//   try {
//     const profile = await Profile.findOne({ user_id: req.user.id });
//     if (!profile) return res.status(404).json({ error: "Profile not found" });

//     const updatedFields = req.body;

//     if (updatedFields.personalInfo) {
//       const validatedPersonal = await personalDetailsValidation(updatedFields.personalInfo);
//       await personalDetails.findByIdAndUpdate(profile.personal_details, validatedPersonal.value);
//     }

//     if (updatedFields.education) {
//       const validatedEducation = await EducationDetailsValidation(updatedFields.education);
//       await educationDetails.findByIdAndUpdate(profile.educational_details, validatedEducation.value);
//     }

//     if (updatedFields.workExperienceInfo) {
//       const validatedWork = await workExperienceValidation(updatedFields.workExperienceInfo);
//       await workExperienceDetails.findByIdAndUpdate(
//         profile.work_experience_details,
//         validatedWork.value
//       );
//     }

//     if (updatedFields.skillset) {
//       const validatedSkills = await validateSkillset(updatedFields.skillset);
//       await Skillset.findByIdAndUpdate(profile.skillset, validatedSkills.value);
//     }

//     if (updatedFields.socialMedia) {
//       const validatedSocial = await socialMediaLinksValidation(updatedFields.socialMedia);
//       await socialMediaLinks.findByIdAndUpdate(profile.social_media_links, validatedSocial.value);
//     }

//     res.status(200).json({ message: "Profile updated successfully" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });






// module.exports = router;
