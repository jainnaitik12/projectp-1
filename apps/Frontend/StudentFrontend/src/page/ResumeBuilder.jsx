import React, { useState, useContext  , useEffect} from "react";
import html2pdf from "html2pdf.js";
import { studentidContext } from "../context/StudentidProvider";
import { useNavigate } from "react-router-dom";
import Profile from "./profile";
// Theme constants remain same
const colors = {
  modern: {
    primary: "#2c3e50",
    secondary: "#34495e",
    accent: "#3498db",
    background: "#ecf0f1",
  },
  // ... other color themes remain same
};

const templates = {
  modern: {
    name: "Modern",
    component: ({ Profile }) => (
      <div
        className="bg-white p-8 m-4 min-h-[1100px] max-w-[850px] mx-auto shadow-lg"
        id="resume-content"
      >
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold tracking-wide mb-4 text-[#2c3e50]">
            {Profile?.personalInfo?.name}
          </h1>
          <h2 className="text-xl text-[#34495e]">
            {Profile?.email} | {Profile?.personalInfo?.department} | CGPA: {Profile?.academics?.cgpa}
          </h2>
        </div>

        <div className="grid grid-cols-12 gap-8">
          {/* Left Column */}
          <div className="col-span-4 border-r-2 border-[#3498db] pr-4">
            {/* Skills Section */}
            <h3 className="text-xl font-bold text-[#2c3e50] border-b-2 border-[#3498db] pb-2 mb-4">
              SKILLS
            </h3>
            <div className="flex flex-wrap gap-2 mb-8">
              {Profile.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-[#3498db] text-[#2c3e50] rounded-full font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* Education Section */}
            <h3 className="text-xl font-bold text-[#2c3e50] border-b-2 border-[#3498db] pb-2 mb-4 mt-8">
              EDUCATION
            </h3>
            {Profile.education.map((edu, index) => (
              <div key={index} className="mb-6">
                <h4 className="font-semibold">{edu.degree}</h4>
                <p className="text-[#34495e]">{edu.institution}</p>
                <p>
                  Year: {edu.year} | Score: {edu.score}
                </p>
              </div>
            ))}
          </div>

          {/* Right Column */}
          <div className="col-span-8">
            {/* Experience Section */}
            {Profile?.experience?.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-bold text-[#2c3e50] border-b-2 border-[#3498db] pb-2 mb-6">
                  EXPERIENCE
                </h3>
                {Profile?.experience?.map((exp, index) => (
                  <div key={index} className="mb-8">
                    <h4 className="text-xl text-[#2c3e50]">{exp.title}</h4>
                    <p className="text-[#34495e] mb-2">
                      {exp.company} | {exp.duration}
                    </p>
                    <p>{exp.description}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Projects Section */}
            {Profile?.projects?.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-[#2c3e50] border-b-2 border-[#3498db] pb-2 mb-6">
                  PROJECTS
                </h3>
                {Profile?.projects.map((project, index) => (
                  <div key={index} className="mb-6">
                    <h4 className="text-xl text-[#2c3e50]">{project.title}</h4>
                    <p className="mb-2">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {project.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 text-sm bg-[#3498db] text-[#2c3e50] rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    {project.links && (
                      <div className="flex gap-2">
                        {project.links.map((link, i) => (
                          <a
                            key={i}
                            href={link.url}
                            target="_blank"
                            className="flex items-center gap-1 text-[#2c3e50] hover:underline"
                            rel="noreferrer"
                          >
                            {link.type}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    ),
  },
  // ... other templates converted similarly
};

function ResumeBuilder({}) {
  const [selectedTemplate, setSelectedTemplate] = useState("modern");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [Profile, setProfile] = useState(null);
  const navigate = useNavigate();

  const downloadPDF = () => {
    const element = document.getElementById("resume-content");
    html2pdf()
      .set({
        margin: 0,
        filename: `${Profile?.personalInfo?.name}_resume.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
      })
      .from(element)
      .save();
  };

  const SelectedTemplate = templates[selectedTemplate].component;

  useEffect(() => {
    try {
      const temp = JSON.parse(localStorage.getItem("studentData"));
      if (temp) {
        setProfile(temp);
        console.log("Data loaded:", temp);
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.error("Error loading data:", error);
    }
  }, []);

  return (
    <div className="container mx-auto max-w-7xl">
      <div className="bg-white p-6 mt-8 mb-8 shadow-lg rounded-lg">
        <h2 className="text-2xl mb-4">Resume Builder</h2>

        <div className="space-y-4">
          <div>
            <p className="mb-2">Select Template:</p>
            <div className="flex gap-4">
              {Object.entries(templates).map(([key, template]) => (
                <button
                  key={key}
                  onClick={() => setSelectedTemplate(key)}
                  className={`min-w-[120px] px-4 py-2 rounded-lg capitalize
                    ${
                      selectedTemplate === key
                        ? "bg-blue-600 text-white"
                        : "border border-blue-600 text-blue-600"
                    }`}
                >
                  {template.name}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setPreviewOpen(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              Preview
            </button>
            <button
              onClick={downloadPDF}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg"
            >
              Download PDF
            </button>
          </div>
        </div>
      </div>

      {previewOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="text-xl">Resume Preview</h3>
              <button
                onClick={downloadPDF}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                Download PDF
              </button>
            </div>
            <div className="p-4 max-h-[80vh] overflow-auto">
            {Profile && <SelectedTemplate Profile={Profile} />}
            </div>
            <div className="p-4 border-t">
              <button
                onClick={() => setPreviewOpen(false)}
                className="px-4 py-2 border rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ResumeBuilder;
