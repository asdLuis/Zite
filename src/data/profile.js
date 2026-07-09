import profilePhoto from "../public/profile.webp";
import resume from "../public/LuisZamano_CV_EN_2026.pdf";

export const identity = {
  brandName: "ZLUIS",
  brandSuffix: ".SITE",
  fullName: "Luis Isauro Zámano Morales",
  photo: profilePhoto,
  status: "ONLINE — OPEN TO WORK",
  location: "Querétaro, MX",
  tags: ["Backend", "Infra", "Cloud", "Gamedev", "Networking", "Systems Design", "Management", "ML", "Automation"],
};

export const character = {
  lead: "I'm a software engineer who builds systems and infrastructure the way I used to build strategies in game — methodically, with a plan for when things go wrong. Currently focused on automation and system design, with game development as a side quest that keeps turning into main-quest energy.",
  info: [
    { k: "CLASS", v: "Solutions Engineer" },
    { k: "EDUCATION", v: "B.S. Computer Science, 2026" },
    { k: "LOCATION", v: "Querétaro, Mexico (Remote-friendly)" },
    { k: "AVAILABILITY", v: "Available for full-time opportunities" },
    { k: "WORKING ON", v: "System Building & Cybersecurity" },
    { k: "EXPERIENCE", v: "4 years" },
  ],
  resumeUrl: resume,
};

export const skillTree = [
  {
    code: "BE",
    name: "Backend",
    nodes: [
      { label: "Node.js / Express", locked: false },
      { label: "Python", locked: false },
      { label: "REST APIs", locked: false },
      { label: "Typescript", locked: false },
      { label: "Rust", locked: true },
      { label: "C# / .NET", locked: true },
    ],
  },
  {
    code: "CL",
    name: "Cloud",
    nodes: [
      { label: "AWS (EC2, S3, Lambda)", locked: false },
      { label: "Docker", locked: false },
      { label: "Linux", locked: false },
      { label: "Azure", locked: false },
      { label: "Kubernetes", locked: true },
      { label: "GDP", locked: true },
    ],
  },
  {
    code: "DB",
    name: "Databases",
    nodes: [
      { label: "MySQL", locked: false },
      { label: "PostgreSQL", locked: false },
      { label: "MongoDB", locked: false },
      { label: "SQLServer", locked: true },
      { label: "Redis", locked: true },
      { label: "DynamoDB", locked: true },
    ],
  },
  {
    code: "NW",
    name: "Networking",
    nodes: [
      { label: "TCP/UDP fundamentals", locked: false },
      { label: "Nginx", locked: false },
      { label: "Apache2", locked: false },
      { label: "Cisco", locked: false },
      { label: "Wireshark", locked: false },
      { label: "WebSockets", locked: true },
    ],
  },
  {
    code: "FE",
    name: "Frontend",
    nodes: [
      { label: "HTML / CSS", locked: false },
      { label: "React", locked: false },
      { label: "TypeScript", locked: false },
      { label: "JavaScript", locked: false },
      { label: "Next.js", locked: true },
      { label: "Angular", locked: true },
    ],
  },
  {
    code: "DO",
    name: "DevOps",
    nodes: [
      { label: "Github Actions", locked: false },
      { label: "Linux", locked: false },
      { label: "Docker", locked: false },
      { label: "Jenkins", locked: true },
      { label: "Grafana", locked: true },
      { label: "Terraform", locked: true },
    ],
  },
  {
    code: "GD",
    name: "Game Dev",
    nodes: [
      { label: "Multiplayer netcode basics", locked: false },
      { label: "Unity / C#", locked: false },
      { label: "Blender", locked: false },
      { label: "Vulkan", locked: true },
      { label: "Godot", locked: true },
      { label: "Unreal Engine", locked: true },
    ],
  },
  {
    code: "TL",
    name: "Tooling",
    nodes: [
      { label: "Git / GitHub", locked: false },
      { label: "VSCode / Visual Studio", locked: false },
      { label: "Machine Learning", locked: false },
      { label: "AI Assisted Development", locked: false },
      { label: "SAP / Salesforce", locked: true },
      { label: "Gradle", locked: true },
    ],
  },
];

export const quests = [
  {
    id: "q8",
    tag: "MAIN QUEST",
    title: "Custom Multiplayer RPG & Server Infrastructure",
    meta: "Game Design · DevOps · Community Management",
    difficulty: 5,
    stack: ["Server Administration", "Game Design", "Technical Writing", "Incident Response", "Bungeecord", "Spigot", "MySQL", "Redis"],
    problem: "Fragmented documentation caused painfully slow issue resolution, while a lack of structured gameplay loops led to low user retention and stagnant community growth.",
    goal: "Overhaul the core gameplay loop with a custom RPG system, stabilize infrastructure, and establish a centralized, real-time document control system.",
    challenges: "Balancing deep technical tasks—like managing server resources to maintain 99.8% availability—with designing a complex dungeon system featuring personalized classes, skills, and team-based mechanics.",
    lessons: "Bridging the gap between technical stability and community communication is a massive growth lever. The structured wikis reduced issue resolution time by 90%, while the new gameplay systems drove a 500% increase in players and boosted retention by 200%.",
    status: "Completed",
    writeup: "https://mymetaverse.fandom.com/wiki/Metacity:_Minecraft",
    openByDefault: true
  },
  {
    id: "q1",
    tag: "MAIN QUEST",
    title: "Notary Digital Workflow Platform",
    meta: "Fullstack Web Application",
    difficulty: 5,
    stack: ["React", "Vite", "Node.js", "Express", "MySQL", "AWS", "CI/CD", "UX/UI"],
    problem: "Administrative workflows for notary offices were heavily manual, causing critical information retrieval to take days.",
    goal: "Transform physical processes into a centralized digital system to enable immediate access to records.",
    challenges: "Architecting a robust backend infrastructure while constantly coordinating with non-technical stakeholders to ensure the technical build aligned perfectly with their business logic.",
    lessons: "Learned the value of iterative usability testing and workflow diagrams to bridge the gap between engineering and user experience.",
    status: "Completed",
    front: "https://github.com/asdLuis/notaria38-frontend",
    github: "https://github.com/asdLuis/notaria38-backend",
    openByDefault: false,
  },
  {
    id: "q3",
    tag: "MAIN QUEST",
    title: "ChopChop WebGL Game",
    meta: "Browser-Based 3D Game",
    difficulty: 3,
    stack: ["Unity", "C#", "WebGL", "Agile"],
    problem: "Needed to create an interactive, learning-oriented game capable of running seamlessly in standard web browsers to engage younger audiences.",
    goal: "Design and implement core game systems and mechanics while leading team coordination and Agile task tracking.",
    lessons: "Balanced the deep technical work of Unity scripting with the high-level responsibilities of project planning and acting on user experience insights.",
    status: "Completed",
    demo: "https://kevinchito.itch.io/chopcop",
  },
  {
    id: "q4",
    tag: "MAIN QUEST",
    title: "Source Code Plagiarism Detector",
    meta: "Static Code Analysis",
    difficulty: 4,
    stack: ["Java", "Random Forest", "JPlag", "AST Analysis"],
    problem: "Detecting plagiarism in Java code required more than simple text matching due to variable renaming and structural obfuscation.",
    goal: "Analyze both lexical and structural similarities to effectively identify true plagiarism cases despite dataset limitations.",
    challenges: "Integrating highly diverse feature sets—like Jaccard/cosine similarity, n-grams, and Abstract Syntax Trees (AST)—into a unified Random Forest Classifier.",
    status: "Completed",
    github: "https://colab.research.google.com/drive/1TvVgbglf6w2kP9NAwsy8N0Bo66yAm9vA?usp=sharing",
  },
  {
    id: "q5",
    tag: "MAIN QUEST",
    title: "Nova Drive Automotive Launch (PMO)",
    meta: "Project Management & Strategy",
    difficulty: 3,
    stack: ["Financial Modeling", "Gantt", "ROI Analysis", "Risk Management"],
    problem: "Planning the launch of a new ICE subcompact sedan required rigorous cross-functional coordination and financial forecasting.",
    goal: "Develop an end-to-end launch plan covering resource allocation, quality management, and revenue projection.",
    challenges: "Evaluating potential risks and mathematically projecting their impact on project success and the Bill of Materials (BOM).",
    lessons: "Reinforced the critical importance of data-driven decision-making in a highly structured, corporate industry environment.",
    status: "Completed",
  },
  {
    id: "q6",
    tag: "MAIN QUEST",
    title: "Wushu Kung Fu iOS Wiki",
    meta: "Native iOS Application",
    difficulty: 4,
    stack: ["Swift", "iOS SDK", "MVVM Architecture"],
    problem: "Martial arts knowledge was heavily fragmented, making it hard for practitioners to access reliable, institution-validated technical information.",
    goal: "Design and develop a centralized, scalable digital encyclopedia for mobile devices.",
    status: "Completed",
    github: "https://github.com/Academia-Mexicana-de-Wushu-Queretaro/iOS",
  },
  {
    id: "q7",
    tag: "MAIN QUEST",
    title: "Appix Project Risk Manager",
    meta: "Web Dashboard & Analytics",
    difficulty: 3,
    stack: ["Web Tech", "Dashboarding", "Data Visualization"],
    problem: "Project stakeholders lacked real-time visibility into project progress and potential failure risks.",
    goal: "Develop a web-based dashboard that dynamically classifies project health to enable quick and informed decision-making.",
    lessons: "Learned how to translate abstract concepts (like risk probability and impact) into immediate visual indicators using a traffic light system.",
    status: "Completed",
    github: "https://github.com/asdLuis/AHund-",
  },
  {
    id: "q2",
    tag: "SIDE QUEST",
    title: "Depression Detection ML Model",
    meta: "Machine Learning Classification",
    difficulty: 2,
    stack: ["Python", "TensorFlow", "Keras", "Predictive AI"],
    problem: "Needed a reliable, responsible way to identify depression risk early without acting as a definitive clinical diagnosis tool.",
    goal: "Train a machine learning model to act as a support tool to encourage users to seek professional help.",
    challenges: "Tuning the model to heavily prioritize recall (95%) over raw accuracy (0.82) so that fewer high-risk cases slipped through the cracks.",
    status: "Completed",
    github: "https://github.com/asdLuis/Depression-8-Ball",
  }
];

export const realms = [
  { name: "GitHub", type: "DEV", stat: "6+", label: "years coding", url: "https://github.com/asdLuis" },
  { name: "Steam", type: "GAMING", stat: "+1,500 hrs", label: "logged across 40+ titles", url: "https://steamcommunity.com/profiles/76561198981314189/" },
  { name: "League of Legends", type: "GAMING", stat: "Master", label: "highest ranked tier", url: "https://op.gg/lol/summoners/lan/zLuis-qwq" },
  { name: "Valorant", type: "GAMING", stat: "26%", label: "headshot percentage", url: "https://op.gg/valorant/profile/zLuis-qwq" },
  { name: "Minecraft", type: "GAMING", stat: "+5,000 hrs", label: "letting creativity run wild", url: "https://sky.shiiyu.moe/stats/zLuis/Pomegranate#Gear" },
  { name: "Discord", type: "COMMUNITY", stat: "3", label: "communities moderated", url: "https://discord.com/users/709945238488123456"},
  { name: "Spotify", type: "MUSIC", stat: "Post Malone", label: "most listened artist", url: "https://open.spotify.com/user/jodarte?si=4a53506fd4c047ae"},
  { name: "LinkedIn", type: "COMMUNITY", stat: "+200", label: "professional connections", url: "https://www.linkedin.com/in/luis-isauro-zámano-morales-49a4b3216"},
  { name: "Super Smash Bros", type: "GAMING", stat: "Isabelle", label: "main fighter", url: "https://www.smashbros.com/en_US/fighter/68.html"},
  { name: "Unity", type: "DEV", stat: "1", label: "games developed", url: "https://kevinchito.itch.io/chopcop"},
];

export const about = {
  paragraphs: [
    "I didn't start with a computer science textbook — I started with a Minecraft server that kept crashing every time more than ten friends joined at once. Fixing it meant learning what a **process** was, what a **port** was, and eventually what an entire **network** was. By the time the server was stable, I'd accidentally taught myself the first year of a CS degree.",
  ],
  pullQuote: "Gaming didn't distract me from engineering. It was the first engineering problem I ever cared enough to solve properly.",
  paragraphs2: [
    "That pattern never really stopped. Every game I've played seriously — Minecraft, League, Valorant — has, at some point, turned into a question about how the thing under the hood actually works. **Why does matchmaking feel unfair sometimes? How does a 12-node server network stay in sync? What does a tick-rate actually do to gameplay feel?** Chasing those questions is how I ended up specializing in backend systems and infrastructure — the parts of engineering that are invisible when they work and very loud when they don't.",
    "My philosophy toward learning is simple: build the thing that's slightly too hard for you right now. I'd rather ship something rough that teaches me how distributed locking actually breaks than read another article about it. That's also why this portfolio looks the way it does — I wanted to build something that was slightly too ambitious, and learn from getting it wrong a few times before it looked right.",
    "Outside of code, I'm still mostly found in front of a screen — just a different kind. Ranked queues, server maintenance for a small Minecraft community I still run, and slowly working through a backlog of systems-design books I keep buying faster than I read them.",
    "Next up: getting better at distributed systems at scale, finishing my CCNA, and eventually shipping a small multiplayer game entirely on infrastructure I built myself.",
  ],
};

export const contact = {
  status: "AVAILABLE",
  heading: "Let's build something.",
  body: "Open to backend, infrastructure, and platform engineering roles. Always happy to talk about ideas, game development, or why your Minecraft server keeps lagging.",
  links: [
    { label: "Email", value: "luisisaurozamano@gmail.com ↗", href: "mailto:luisisaurozamano@gmail.com"},
    { label: "LinkedIn", value: "/in/luisisaurozamano ↗", href: "https://www.linkedin.com/in/luis-isauro-zámano-morales-49a4b3216" },
    { label: "GitHub", value: "/asdLuis ↗", href: "https://github.com/asdLuis" },
    { label: "Discord", value: "zetaLuis ↗", href: " https://discord.com/users/430123140157276161" },
  ],
};

export const navItems = [
  { id: "character", index: "01", label: "Character" },
  { id: "skills", index: "02", label: "Skill Tree" },
  { id: "quests", index: "03", label: "Quest Log" },
  { id: "realms", index: "04", label: "Connected Realms" },
  { id: "contact", index: "05", label: "Contact" },
  { id: 'achievements', index: '06', label: 'Achievements', requiresUnlock: true }
];
