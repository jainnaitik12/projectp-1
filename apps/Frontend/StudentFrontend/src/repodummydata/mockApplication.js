export const mockApplications = {
    stats: {
        accepted: 12,
        pending: 15,
        rejected: 4,
    },
    applications: [
        {
            id: 1,
            companyName: "Tech Corp",
            position: "Software Engineer",
            status: "accepted",
            appliedDate: "2024-03-01",
        },
        {
            id: 2,
            companyName: "Digital Solutions",
            position: "Frontend Developer",
            status: "pending",
            appliedDate: "2024-03-10",
        },
        {
            id: 3,
            companyName: "Data Systems",
            position: "Data Analyst",
            status: "rejected",
            appliedDate: "2024-03-05",
        },
    ],
    resumes: [
        {
            id: 1,
            name: "Software_Engineer_Resume_Accenture.pdf",
            date: "2024-03-15",
            size: "245 KB",
            downloadUrl: "/resumes/software_engineer.pdf"
        },
        {
            id: 2,
            name: "Frontend_Developer_Resume_Wipro.pdf",
            date: "2024-03-14",
            size: "198 KB",
            downloadUrl: "/resumes/frontend_developer.pdf"
        },
        {
            id: 3,
            name: "Frontend_Engineer_Resume_Reliance.pdf",
            date: "2024-03-10",
            size: "220 KB",
            downloadUrl: "/resumes/data_analyst.pdf"
        },
        {
            id: 4,
            name: "Backend_Engineer_Resume_Teksinsi.pdf",
            date: "2024-03-10",
            size: "220 KB",
            downloadUrl: "/resumes/data_analyst.pdf"
        },
        {
            id: 5,
            name: "Data_Analyst_Resume_Samsung.pdf",
            date: "2024-03-10",
            size: "220 KB",
            downloadUrl: "/resumes/data_analyst.pdf"
        }
    ]
};