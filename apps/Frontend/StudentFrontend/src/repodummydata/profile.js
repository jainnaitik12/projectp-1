const dummyStudentData = {
    name: "Tim Payne",
    age: 21,
    email: "tim.123@example.com",
    phone: "123-456-7890",
    // Add academic marks
    cgpa: 8.5,
    tenthMarks: 95,
    twelfthMarks: 92,
    // Add verification details
    verificationStatus: "verified", // can be "pending", "verified", or "rejected"
    verificationDate: "2024-02-15",
    education: [
      {
        institution: "University of Example",
        degree: "Bachelor of Science in Computer Science",
        year: "2023",
      },
    ],
    skills: ["JavaScript", "React", "Node.js", "MongoDB"],
    projects: [
      {
        title: "Portfolio Website",
        description: "A personal portfolio website to showcase my work.",
        link: "https://example.com/portfolio",
      },
    ],
    experience: [
      {
        company: "Example Corp",
        position: "Intern",
        duration: "Summer 2022",
        description: "Assisted in developing web applications using React.",
      },
    ],
    links: {
      linkedin: "https://linkedin.com/in/johndoe",
      codeforces: "https://codeforces.com/profile/johndoe",
      codechef: "https://www.codechef.com/users/johndoe",
      leetcode: "https://leetcode.com/johndoe",
    },
  };
  
  export default dummyStudentData;