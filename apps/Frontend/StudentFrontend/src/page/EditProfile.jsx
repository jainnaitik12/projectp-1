import React, { useEffect, useContext, useState } from "react";
import AcademicMarks from "../components/profileEdit/AcademicMarks";
import ContactInformation from "../components/profileEdit/ContactInformation";
import EducationEdit from "../components/profileEdit/EducationEdit";
import ProjectEdit from "../components/profileEdit/ProjectEdit";
import SkillsEdit from "../components/profileEdit/SkillsEdit";
import SocialLinksEdit from "../components/profileEdit/SocialLinksEdit";
import { studentidContext } from "../context/StudentidProvider";

function EditProfile({ student }) {
  const [EditedData, setEditedData] = useState(null); // Initialize with null
  const {studentId} = useContext(studentidContext);

  useEffect(() => {
    try {
      const temp = JSON.parse(localStorage.getItem("studentData"));
      if (temp) {
        setEditedData(temp);
        console.log("Data loaded:", temp);
      }
    } catch (error) {
      console.error("Error loading data:", error);
    }
  }, []); // Keep empty dependency array since we only want to load once

  if (!EditedData) {
    return <div>Loading...</div>; // Add loading state
  }

  return (
    <div>
      <AcademicMarks
        tenthmarks={EditedData?.academics?.tenthMarks}
        twelfthmarks={EditedData?.academics?.twelfthMarks}
        cgpa={EditedData?.academics?.cgpa}
        setEditedData={setEditedData}
      />
      {/*  Not Availabel in backend Data*/}
      <ContactInformation />
      <SocialLinksEdit />
      {/* Not Availabel inn backend Data */}
      <EducationEdit
        initialEducation={EditedData?.education}
        setEditedData={setEditedData}
      />
      <ProjectEdit
        initialProjects={EditedData?.projects}
        setEditedData={setEditedData}
      />
      <SkillsEdit
        initialSkills={EditedData?.skills}
        setEditedData={setEditedData}
      />
    </div>
  );
}

export default EditProfile;
