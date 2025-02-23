function getDefaultTasks() {   
    const defaultTasks = [
    {
        id: 1,
        title: "Getting Started",
        descr: "Install DFX.",
        created_at: BigInt(Date.now()) * BigInt(1_000_000),
        state: true,
        is_edited: false,
        is_example: true,
        color: 1
    },
    {
        id: 2,
        title: "React + ICP Integration",
        descr: "Set up React frontend\nCommunicate with canisters using dfinity/agent\nDisplay data dynamically",
        created_at: BigInt(Date.now()) * BigInt(1_000_000),
        state: false,
        is_edited: true,
        is_example: true,
        color: 1
    },
    {
        id: 3,
        title: "Eat a Snake",
        descr: "Try something wild today.",
        created_at: BigInt(Date.now()) * BigInt(1_000_000),
        state: true,
        is_edited: false,
        is_example: true,
        color: 3
    },
    {
        id: 4,
        title: "Managing State in React",
        descr: "Use useState for local state and useEffect for side effects. Consider Zustand for global state management.",
        created_at: BigInt(Date.now()) * BigInt(1_000_000),
        state: false,
        is_edited: true,
        is_example: true,
        color: 1
    },
    {
        id: 5,
        title: "Data Storage on ICP",
        descr: "Store notes using HashMap in Motoko. Sync frontend state.",
        created_at: BigInt(Date.now()) * BigInt(1_000_000),
        state: false,
        is_edited: false,
        is_example: true,
        color: 1
    },
    {
        id: 6,
        title: "Pet a Cat",
        descr: "Good for debugging nerves.",
        created_at: BigInt(Date.now()) * BigInt(1_000_000),
        state: true,
        is_edited: false,
        is_example: true,
        color: 3
    },
    {
        id: 7,
        title: "User Authentication",
        descr: "Implement Internet Identity for login\nSecure Principal IDs\nRestrict access to private notes",
        created_at: BigInt(Date.now()) * BigInt(1_000_000),
        state: false,
        is_edited: true,
        is_example: true,
        color: 1
    },
    {
        id: 8,
        title: "Deploying on ICP",
        descr: "Compile with dfx build and deploy with dfx deploy. Test live on the canister URL.",
        created_at: BigInt(Date.now()) * BigInt(1_000_000),
        state: true,
        is_edited: false,
        is_example: true,
        color: 1
    },
    {
        id: 9,
        title: "Real-Time Updates",
        descr: "Use WebSocket for live updates. Auto-refresh notes without reloading.",
        created_at: BigInt(Date.now()) * BigInt(1_000_000),
        state: false,
        is_edited: true,
        is_example: true,
        color: 1
    },
    {
        id: 10,
        title: "Debugging & Optimization",
        descr: "Debug with React DevTools. Minify bundle for faster load times.",
        created_at: BigInt(Date.now()) * BigInt(1_000_000),
        state: true,
        is_edited: false,
        is_example: true,
        color: 4
    }
]
    return defaultTasks;
}

export default getDefaultTasks;
