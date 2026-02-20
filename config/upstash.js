import { Client as WorkflowClient } from "@upstash/workflow"
import dotenv from "dotenv";

dotenv.config();

export const workflowClient = new WorkflowClient({
    baseUrl: process.env.QSTASH_URL,
    token: process.env.QSTASH_TOKEN,
    currentSigningKey: process.env.QSTASH_CURRENT_SIGNING_KEY,
    nextSigningKey: process.env.QSTASH_NEXT_SIGNING_KEY,
});