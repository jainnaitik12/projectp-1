import React, { useContext } from "react";
import dummyData from "../repodummydata/profile";
import {
  User,
  GraduationCap,
  Code,
  Briefcase,
  Mail,
  Phone,
  Building,
  Calendar,
  Globe,
  Linkedin,
  CheckCircle2,
  Pencil,
} from "lucide-react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import axiosinstance from "../utils/axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { studentidContext } from "../context/StudentidProvider";
import ContactInformation from "../components/profileView/ContactInformation";
import Skills from "../components/profileView/Skills";
import Education from "../components/profileView/Education";
import AcademicMarks from "../components/profileView/AcademicMarks";
import SocialLinks from "../components/profileView/SocialLinks";
import Project from "../components/profileView/Project";
import EditProfile from "./EditProfile";

const Profile = () => {
  const navigate = useNavigate();

  // Dummy data for sections not in object
  const dummyEducation = [
    {
      institute: "Sample University",
      degree: "B.Tech",
      field: "Electronics and Communication",
      year: "2020-2024",
      grade: "8.5",
    },
  ];

  const { email, phone } = dummyData;
  const { studentid } = useParams();

  const [student, setStudent] = useState(null);
  const [cloneStudent, setCloneStudent] = useState(null);
  const [Error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const { Studentid, setStudentId, Studentdata, setStudentdata } =
    useContext(studentidContext);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axiosinstance.get(
          `/api/v1/student/profile/${studentid}`
        );
        setStudent(response.data.data);
        setCloneStudent(response.data.data);
        setStudentdata(response.data.data);
        localStorage.setItem("studentData", JSON.stringify(response.data.data));
        localStorage.setItem("studentId", studentid);
        console.log(response.data.data);
      } catch (error) {
        console.error(error);
        setError(
          error.response?.data?.message || "Failed to fetch student data"
        );
      }
    };
    fetchStudent();
  }, [studentid]);

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div className="max-w-6xl mx-auto p-8 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 min-h-screen animate-pulse">
      {/* Header Skeleton */}
      <div className="bg-gradient-to-r from-blue-500/50 to-purple-600/50 rounded-2xl shadow-xl p-8 mb-8">
        <div className="flex items-center gap-8 mb-6">
          <div className="w-32 h-32 rounded-full bg-gray-300"></div>
          <div className="space-y-4">
            <div className="h-8 w-64 bg-gray-300 rounded"></div>
            <div className="flex gap-3">
              <div className="h-6 w-24 bg-gray-300 rounded-full"></div>
              <div className="h-6 w-32 bg-gray-300 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-gray-300"></div>
              <div className="space-y-2">
                <div className="h-4 w-32 bg-gray-300 rounded"></div>
                <div className="h-3 w-24 bg-gray-300 rounded"></div>
              </div>
            </div>
            <div className="space-y-3">
              {[1, 2, 3].map((j) => (
                <div key={j} className="h-4 w-full bg-gray-300 rounded"></div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Error state
  if (Error) {
    return (
      <div className="max-w-6xl mx-auto p-8 flex items-center justify-center min-h-screen">
        <div className="text-center p-8 bg-red-50 rounded-lg">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Error</h2>
          <p className="text-red-500">{Error}</p>
        </div>
      </div>
    );
  }

  // Loading state
  if (!student) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="max-w-6xl mx-auto p-8 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 min-h-screen">
      {/* Header Card */}

      {isEditing ? (
        <></>
      ) : (
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-xl p-8 mb-8 text-white relative">
          <button
            onClick={() => {
              setIsEditing(!isEditing);
              navigate(`/edit-profile/${studentid}`);
            }}
            className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 rounded-full backdrop-blur-sm transition-all duration-300"
            title="Edit Profile"
          >
            <Pencil className="w-5 h-5 text-white" />
          </button>
          <div className="flex items-center gap-8 mb-6">
            <div className="w-32 h-32 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-2xl ring-4 ring-white/30">
              <User className="w-16 h-16 text-white" />
            </div>
            <div>
              <h1 className="text-5xl font-bold mb-3 text-white">
                {student?.personalInfo?.name}
              </h1>
              <div className="flex items-center gap-3">
                <span className="px-4 py-1.5 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-medium">
                  Student
                </span>
                <span className="px-4 py-1.5 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-medium">
                  {student?.personalInfo?.department}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {isEditing ? (
        <EditProfile student={cloneStudent} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <ContactInformation email={email} phone={phone} />

          {/* Skills */}
          <Skills student={student} />

          {/* Education */}
          <Education education={student?.education || dummyEducation} />

          {/* Academic Marks */}
          <AcademicMarks student={student} />

          {/* Links */}
          <SocialLinks />

          {/* Projects Section - Full Width */}
          <Project student={student} />
        </div>
      )}
    </div>
  );
};

export default Profile;
