const portfolioData = {
    journey: [
        {
            period: "2023 - 2027",
            title: "B.Tech – Artificial Intelligence and Data Science",
            subtitle: "Excel Engineering College, Namakkal",
            description: "Currently pursuing Bachelor of Technology with a focus on AI and Data Science. Maintaining a CGPA of 8.3/10.",
            highlights: [
                "Focusing on Machine Learning, Deep Learning, and Data Analytics.",
                "Consistently performing well in core CS and AI subjects."
            ],
            tags: ["AI", "Data Science", "Python", "SQL"],
            className: "accent-primary"
        },
        {
            period: "2021 - 2023",
            title: "Higher Secondary Certificate (HSC)",
            subtitle: "Government Higher Secondary School, Thuttampatti",
            description: "Completed higher secondary education with a focus on Science and Mathematics.",
            highlights: [
                "Active participation in school science exhibitions."
            ],
            tags: ["Physics", "Chemistry", "Mathematics"],
            className: "accent-secondary"
        },
        {
            period: "2021",
            title: "Secondary School Leaving Certificate (SSLC)",
            subtitle: "Government Higher Secondary School, Thuttampatti",
            description: "Completed primary education with strong fundamentals.",
            highlights: [],
            tags: ["General Science", "Math"],
            className: "purple-500"
        }
    ],
    projects: [
        {
            title: "Smart Ambulance & Hospital Assistance System",
            category: "web",
            image: "assets/images/project6.png",
            description: "Built an emergency response platform for real-time ambulance requests with live tracking and route navigation via OpenRouteService API. Designed separate modules for patients, drivers, and hospitals with real-time status updates and nearby hospital suggestions.",
            tech: ["React.js", "Spring Boot", "MongoDB"],
            color: "emerald",
            link: "https://github.com/gokulm-dev-official"
        },
        {
            title: "Humanexa — Blood & Helper Donation Platform",
            category: "web",
            image: "assets/images/project7.png",
            description: "Built a platform connecting blood donors and volunteers with people seeking emergency assistance, with search by blood group and location. Implemented secure authentication and responsive dashboards for managing donation requests.",
            tech: ["MongoDB", "Express.js", "React", "Node.js"],
            color: "rose",
            link: "http://65.2.9.159/"
        },
        {
            title: "AI-Based Lung Disease Detection System",
            category: "web",
            image: "assets/images/project1.png",
            description: "Developed a desktop app using a trained CNN model to classify chest X-rays into multiple lung disease categories. Generated PDF diagnostic reports with patient history management and report-sharing features.",
            tech: ["Python", "TensorFlow", "CNN", "React", "Node.js"],
            color: "blue",
            link: "https://intelligent-lung-disease-diagnosis.vercel.app/"
        },
        {
            title: "DataVision-AI",
            category: "web",
            image: "assets/images/project2.png",
            description: "AI platform for automated dataset analysis and insight generation. Performs real-time summarization, visualization, and PDF report generation without manual intervention.",
            tech: ["Python", "FastAPI", "Pandas", "Plotly", "OpenAI API"],
            color: "indigo",
            link: "https://advanced-data-vision-max.vercel.app/"
        },
        {
            title: "Hire AI",
            category: "web",
            image: "assets/images/project5.png",
            description: "Advanced AI recruitment hub featuring automated candidate screening, ATS optimization, and intelligent RAG-powered resume analysis.",
            tech: ["React", "Express.js", "Gemini AI", "MongoDB"],
            color: "violet",
            link: "https://hire-ai-intelligence-hub.vercel.app/"
        },
        {
            title: "Rido App",
            category: "mobile",
            image: "assets/images/project4.png",
            description: "3rd Prize Winner at Payoda Hackathon. A ride-sharing safety application with real-time tracking, SOS emergency features, and dual login modules for secure travel.",
            tech: ["Flutter", "Java", "Spring Boot", "Google Maps API"],
            color: "teal",
            link: "https://github.com/gokulm-dev-official"
        }
    ],
    experience: [
        {
            company: "Accent Techno Soft (ATS)",
            role: "Full Stack Web Development Intern",
            period: "Dec 2025 - Jan 2026",
            location: "Coimbatore, Tamil Nadu",
            description: "Completed intensive internship training in Full Stack Web Development.",
            highlights: [
                "Mastered modern web development phases including frontend and backend integration.",
                "Demonstrated sincerity and proficiency throughout the internship program.",
                "Worked on real-world web application architectures."
            ],
            icon: "fas fa-laptop-code",
            color: "text-purple-500"
        }
    ],
    certifications: [
        {
            title: "AWS Certified Cloud Practitioner",
            issuer: "Amazon Web Services",
            date: "Apr 2026",
            icon: "fab fa-aws",
            color: "text-orange-400",
            image: "assets/certificates/AWS Certified Cloud Practitioner certificate_page-0001.jpg"
        },
        {
            title: "Data Visualization",
            issuer: "TATA",
            date: "Mar 2026",
            icon: "fas fa-award",
            logo: "assets/images/logos/tata.png",
            color: "text-blue-500",
            image: "assets/certificates/Data Visualization - TATA.jpeg"
        },
        {
            title: "Gemini Certificate",
            issuer: "Google/Gemini",
            date: "Feb 2026",
            icon: "fas fa-sparkles",
            logo: "assets/images/logos/gemini.png",
            color: "text-indigo-400",
            image: "assets/certificates/Gemini Certificate.jpeg"
        },
        {
            title: "Python Basics",
            issuer: "Infosys",
            date: "Jan 2026",
            icon: "fab fa-python",
            color: "text-yellow-500",
            image: "assets/certificates/Python Basics - Infosys.jpeg"
        },
        {
            title: "Full Stack Web Development",
            issuer: "Accent Techno Soft (ATS)",
            date: "Jan 2026",
            icon: "fas fa-award",
            color: "text-purple-500",
            image: "assets/certificates/FullStack Intern - ATS.jpg"
        },
        {
            title: "AWS Certified Generative-AI",
            issuer: "Amazon Web Services",
            date: "Oct 2025",
            icon: "fab fa-aws",
            color: "text-orange-500",
            image: "assets/certificates/Generative-AI-AWS_page-0001.jpg"
        },
        {
            title: "AI & ML - GUVI",
            issuer: "Guvi",
            date: "Dec 2024",
            icon: "fas fa-award",
            color: "text-blue-500",
            image: "assets/certificates/AI&ML - GUVI_page-0001.jpg"
        },
        {
            title: "Python_Basics - Hackerrank",
            issuer: "Hackerrank",
            date: "Sep 2025",
            icon: "fab fa-hackerrank",
            color: "text-blue-600",
            image: "assets/certificates/python_basic certificate (3).jpg"
        },
        {
            title: "Payoda Hackathon",
            issuer: "Payoda",
            date: "Mar 2025",
            icon: "fas fa-award",
            color: "text-blue-600",
            image: "assets/certificates/PAYODA HACKATHON_page-0001.jpg"
        },
        {
            title: "MERN STACK - BootCamp",
            issuer: "NoviTech R&D Pvt Ltd",
            date: "Aug 2024",
            icon: "fas fa-award",
            color: "text-blue-600",
            image: "assets/certificates/Mern Stack - NoviTech.jpg"
        },
        {
            title: "Java_Basics - Hackerrank",
            issuer: "Hackerrank",
            date: "Sep 2025",
            icon: "fab fa-hackerrank",
            color: "text-blue-600",
            image: "assets/certificates/java_basic certificate (1).jpg"
        }
    ],
    skills: [
        {
            category: "Languages",
            items: ["Java", "Python", "JavaScript"],
            icon: "Code"
        },
        {
            category: "Frontend",
            items: ["React.js", "HTML5", "CSS3", "Tailwind CSS"],
            icon: "Layout"
        },
        {
            category: "Backend",
            items: ["Spring Boot", "REST APIs", "Node.js", "Express.js"],
            icon: "Server"
        },
        {
            category: "Databases",
            items: ["MySQL", "MongoDB", "Redis"],
            icon: "Database"
        },
        {
            category: "Tools",
            items: ["Git", "GitHub", "Docker", "Linux (Basics)", "Postman"],
            icon: "GitBranch"
        },
        {
            category: "Core Concepts",
            items: ["Object Oriented Programming", "Database Management Systems", "DSA in Java"],
            icon: "Brain"
        }
    ],
    stats: [
        {
            label: "Projects Built",
            value: 5,
            icon: "fa-project-diagram",
            color: "text-accent-primary",
            delay: 0
        },
        {
            label: "GitHub Commits",
            value: 32,
            icon: "fa-github",
            color: "text-purple-400",
            delay: 100
        },
        {
            label: "LeetCode Solved",
            value: 11,
            icon: "fa-code",
            color: "text-yellow-400",
            delay: 200
        },
        {
            label: "LeetCode Streak",
            value: 1,
            icon: "fa-fire",
            color: "text-orange-500",
            delay: 300
        }
    ]
};
