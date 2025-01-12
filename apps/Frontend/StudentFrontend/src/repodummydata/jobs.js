const jobs = [
    {
        id: 1,
        company: 'Tech Corp',
        title: 'Software Engineer',
        description: 'Looking for talented software engineers to join our innovative team...',
        requirements: ['React', 'Node.js', 'MongoDB'],
        eligibility: {
            departments: ['CSE', 'IT'],
            minCGPA: 7.5,
            batch: 2024
        },
        salary: {
            ctc: 1200000,
            breakup: 'Base: 800000, Benefits: 400000'
        },
        rounds: [
            {
                name: 'Technical Round',
                description: 'DSA and System Design',
                date: new Date('2024-04-01'),
                venue: 'Online'
            }
        ],
        numberOfPositions: 5,
        status: 'open',
        applicationDeadline: new Date('2024-03-30'),
        analytics: {
            views: 150,
            applications: 45,
            shortlisted: 20,
            selected: 5
        }
    },
    {
        id: 2,
        company: 'Finance Plus',
        title: 'Data Analyst',
        description: 'Seeking data analysts for our quantitative trading team...',
        requirements: ['Python', 'SQL', 'Machine Learning'],
        eligibility: {
            departments: ['CSE', 'IT', 'ECE', 'EEE'],
            minCGPA: 8.0,
            batch: 2024
        },
        salary: {
            ctc: 1500000,
            breakup: 'Base: 1000000, Benefits: 500000'
        },
        rounds: [
            {
                name: 'Technical Assessment',
                description: 'Python and Statistics',
                date: new Date('2024-04-05'),
                venue: 'Online'
            }
        ],
        numberOfPositions: 3,
        status: 'open',
        applicationDeadline: new Date('2024-04-02'),
        analytics: {
            views: 200,
            applications: 60,
            shortlisted: 15,
            selected: 0
        }
    },
    {
        id: 3,
        company: 'Cloud Systems Inc',
        title: 'DevOps Engineer',
        description: 'Join our cloud infrastructure team...',
        requirements: ['AWS', 'Docker', 'Kubernetes'],
        eligibility: {
            departments: ['CSE', 'IT'],
            minCGPA: 7.0,
            batch: 2024
        },
        salary: {
            ctc: 1800000,
            breakup: 'Base: 1200000, Benefits: 600000'
        },
        rounds: [
            {
                name: 'Technical Interview',
                description: 'Cloud Architecture and DevOps',
                date: new Date('2024-04-10'),
                venue: 'Hybrid'
            }
        ],
        numberOfPositions: 2,
        status: 'closed',
        applicationDeadline: new Date('2024-03-25'),
        analytics: {
            views: 180,
            applications: 40,
            shortlisted: 10,
            selected: 2
        }
    },
    {
        id: 4,
        company: 'AI Solutions',
        title: 'Machine Learning Engineer',
        description: 'Build next-gen AI solutions...',
        requirements: ['Python', 'TensorFlow', 'Computer Vision'],
        eligibility: {
            departments: ['CSE', 'IT', 'ECE'],
            minCGPA: 8.5,
            batch: 2024
        },
        salary: {
            ctc: 2000000,
            breakup: 'Base: 1400000, Benefits: 600000'
        },
        rounds: [
            {
                name: 'Technical Round',
                description: 'ML Algorithms and System Design',
                date: new Date('2024-04-15'),
                venue: 'Online'
            }
        ],
        numberOfPositions: 4,
        status: 'open',
        applicationDeadline: new Date('2024-04-10'),
        analytics: {
            views: 250,
            applications: 80,
            shortlisted: 25,
            selected: 0
        }
    },
    {
        id: 5,
        company: 'Mobile Tech',
        title: 'Android Developer',
        description: 'Create cutting-edge mobile applications...',
        requirements: ['Kotlin', 'Android SDK', 'Firebase'],
        eligibility: {
            departments: ['CSE', 'IT'],
            minCGPA: 7.0,
            batch: 2024
        },
        salary: {
            ctc: 1000000,
            breakup: 'Base: 700000, Benefits: 300000'
        },
        rounds: [
            {
                name: 'Coding Round',
                description: 'Android Development',
                date: new Date('2024-04-20'),
                venue: 'Online'
            }
        ],
        numberOfPositions: 6,
        status: 'open',
        applicationDeadline: new Date('2024-04-15'),
        analytics: {
            views: 120,
            applications: 30,
            shortlisted: 12,
            selected: 0
        }
    }
];
export default jobs;