import Scheduler from "./scheduler/scheduler.js";

const app = async () => new Scheduler.start();
app().catch(console.error);
