import profilePhoto from "../public/profile.webp";
import resume from "../public/LuisZamano_CV_EN_2026.pdf";

export const identity = {
  brandName: "ZLUIS",
  brandSuffix: ".DEV",
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
      { label: "HTTP Clients", locked: false },
      { label: "AI Assisted Development", locked: false },
      { label: "Gradle", locked: true },
    ],
  },
];

export const quests = [
  {
    id: "q1",
    tag: "MAIN QUEST",
    title: "Realtime Game Lobby Service",
    meta: "Node.js · WebSockets · Redis · Docker",
    difficulty: 3,
    stack: ["Node.js", "Socket.io", "Redis", "Docker"],
    problem: "Small indie multiplayer projects had no lightweight way to matchmake players without standing up a heavy backend.",
    goal: "Ship a self-hostable lobby and matchmaking service under 50ms median response time.",
    challenges: "Handling reconnect storms and race conditions when two players joined the same slot simultaneously — solved with Redis-backed atomic locks.",
    lessons: "Learned to design for network jitter first, features second — most bugs came from assuming the happy path.",
    status: "✅ Completed — live, handling ~400 concurrent connections at peak.",
    github: "#",
    demo: "#",
    openByDefault: true,
  },
  {
    id: "q2",
    tag: "SIDE QUEST",
    title: "Infra-as-Code Home Lab",
    meta: "Terraform · Docker · AWS",
    difficulty: 2,
    stack: ["Terraform", "AWS", "GitHub Actions"],
    problem: "Manually configuring cloud resources for side projects was slow and error-prone.",
    goal: "Version-control the entire personal infrastructure so any environment could be rebuilt from a single command.",
    challenges: "State-file drift between environments caused a bad apply early on — added remote state locking to prevent it happening again.",
    status: "✅ Completed — used daily for all personal projects.",
    github: "#",
  },
  {
    id: "q3",
    tag: "DUNGEON",
    title: "Minecraft Server Network (12 nodes)",
    meta: "Java · BungeeCord · Linux · Networking",
    difficulty: 4,
    stack: ["Java", "BungeeCord", "Linux", "Bash"],
    problem: "A community server kept crashing under load with no clear separation between game modes.",
    goal: "Split into a proxied network of 12 independent nodes that could scale and restart independently.",
    challenges: "Cross-node player data sync without a shared database initially caused inventory loss — fixed with a central MySQL-backed data layer.",
    future: "Migrating the proxy layer to Velocity for better performance.",
    status: "✅ Completed — peaked at 300 concurrent players.",
    writeup: "#",
  },
];

export const realms = [
  { name: "GitHub", type: "DEV", stat: "1,900+", label: "contributions this year", url: "#" },
  { name: "LinkedIn", type: "NETWORK", stat: "500+", label: "professional connections", url: "#" },
  { name: "Steam", type: "GAMING", stat: "2,100 hrs", label: "logged across 40+ titles", url: "#" },
  { name: "League of Legends", type: "GAMING", stat: "Diamond II", label: "current ranked tier", url: "#" },
  { name: "Minecraft", type: "GAMING / DEV", stat: "6 yrs", label: "running self-hosted servers", url: "#" },
  { name: "Discord", type: "COMMUNITY", stat: "3", label: "dev communities moderated", url: "#" },
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
  body: "Open to backend, infrastructure, and platform engineering roles. Always happy to talk about distributed systems, game networking, or why your Minecraft server keeps lagging.",
  links: [
    { label: "Email", value: "luisisaurozamano@gmail.com", href: "mailto:luisisaurozamano@gmail.com" },
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
];
