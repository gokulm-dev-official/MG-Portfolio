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
            title: "AI-Powered Lung Disease Detection Platform",
            category: "web",
            image: "assets/images/project1.png",
            description: "A MERN stack platform for automated Chest X-ray analysis. Integrated a TensorFlow deep learning model for instant classification of COVID-19, Pneumonia, and Tuberculosis.",
            tech: ["MongoDB", "Express.js", "React", "Node.js", "TensorFlow.js", "Tailwind CSS"],
            color: "blue",
            link: "https://intelligent-lung-disease-diagnosis.vercel.app/"
        },
        {
            title: "DataVision-AI",
            category: "web",
            image: "assets/images/project2.png",
            description: "AI platform for automated dataset analysis and insight generation. Performs real-time data summarization, visualization, and PDF report generation using OpenAI API.",
            tech: ["Python", "FastAPI", "Pandas", "Plotly", "TailwindCSS", "OpenAI API"],
            color: "indigo",
            link: "https://advanced-data-vision-max.vercel.app/"
        },
        {
            title: "Hire Ai",
            category: "web",
            image: "assets/images/project5.png",
            description: "Advanced AI recruitment hub featuring automated candidate screening, ATS optimization, and intelligent RAG-powered resume analysis.",
            tech: ["React", "Express.js", "Gemini AI", "MongoDB", "Tailwind CSS"],
            color: "violet",
            link: "https://hire-ai-intelligence-hub.vercel.app/"
        },
        {
            title: "License Plate Detector",
            category: "web",
            image: "assets/images/project3.png",
            description: "Real-time vehicle license plate recognition system using OpenCV for object detection and Tesseract OCR for accurate text extraction from live camera feeds.",
            tech: ["Python", "OpenCV", "Tesseract OCR"],
            color: "pink",
            link: "https://github.com/gokulm-dev-official"
        },
        {
            title: "Rido App",
            category: "mobile",
            image: "assets/images/project4.png",
            description: "3rd Prize Winner at Payoda Hackathon. A ride-sharing safety application with real-time tracking, SOS emergency features, and dual login modules.",
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
            icon: "fa-laptop-code",
            color: "text-purple-500"
        }
    ],
    certifications: [
        {
            title: "Full Stack Web Development",
            issuer: "Accent Techno Soft (ATS)",
            date: "Jan 2026",
            icon: "fa-award",
            color: "text-purple-500",
            image: "assets/certificates/FullStack Intern - ATS.jpg"
        },
        {
            title: "AWS Certified Generative-AI",
            issuer: "Amazon Web Services",
            date: "Oct 2025",
            icon: "fa-aws",
            color: "text-orange-500",
            image: "assets/certificates/Generative-AI-AWS_page-0001.jpg"
        },
        {
            title: "AI & ML - GUVI",
            issuer: "Guvi",
            date: "Dec 2024",
            icon: "fa-guvi",
            color: "text-blue-500",
            image: "assets/certificates/AI&ML - GUVI_page-0001.jpg"
        },
        {
            title: "Python_Basics - Hackerrank",
            issuer: "Hackerrank",
            date: "Sep 2025",
            icon: "fa-hackerrank",
            color: "text-blue-600",
            image: "assets/certificates/python_basic certificate (3).jpg"
        },
        {
            title: "Payoda Hackathon",
            issuer: "Payoda",
            date: "Mar 2025",
            icon: "fa-payoda",
            color: "text-blue-600",
            image: "assets/certificates/PAYODA HACKATHON_page-0001.jpg"
        },
        {
            title: "MERN STACK - BootCamp",
            issuer: "NoviTech R&D Pvt Ltd",
            date: "Aug 2024",
            icon: "fa-novitech",
            color: "text-blue-600",
            image: "assets/certificates/Mern Stack - NoviTech.jpg"
        },
        {
            title: "Java_Basics - Hackerrank",
            issuer: "Hackerrank",
            date: "Sep 2025",
            icon: "fa-hackerrank",
            color: "text-blue-600",
            image: "assets/certificates/java_basic certificate (1).jpg"
        }
    ],
    skills: [
        {
            category: "Programming Languages",
            items: ["Java", "Python", "C", "Dart (Flutter)", "JavaScript", "SQL"],
            icon: "Code"
        },
        {
            category: "Web Technologies (MERN)",
            items: ["HTML", "CSS", "JavaScript", "React.js", "Node.js", "Express.js", "Tailwind CSS"],
            icon: "Layout"
        },
        {
            category: "Database Management",
            items: ["MySQL", "MongoDB"],
            icon: "Database"
        },
        {
            category: "Mobile App Development",
            items: ["Flutter", "Dart"],
            icon: "Smartphone"
        },
        {
            category: "Data Visualization & BI",
            items: ["Power BI", "Tableau", "Plotly", "Recharts"],
            icon: "BarChart3"
        },
        {
            category: "AI & Machine Learning",
            items: ["TensorFlow.js", "OpenCV", "Tesseract OCR", "Pandas"],
            icon: "Brain"
        },
        {
            category: "Other Skills",
            items: ["REST API Integration", "Git & GitHub", "Version Control", "FastAPI", "Spring Boot"],
            icon: "GitBranch"
        },
        {
            category: "Operating Systems",
            items: ["Windows", "Linux", "Ubuntu", "Command Line", "Shell Scripting"],
            icon: "Desktop"
        },
        {
            category: "Soft Skills",
            items: ["Problem-Solving", "Critical Thinking", "Time Management", "Leadership"],
            icon: "Users"
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
            label: "LeetCode Submissions",
            value: 11,
            icon: "fa-code-branch",
            color: "text-yellow-400",
            delay: 200
        }
    ]
};
