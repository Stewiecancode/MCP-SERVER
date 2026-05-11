import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import fs from "fs/promises";
import * as path from 'path';

const server = new Server({
    name: "MCP Server",
    version: "1.0.0",
}, {
    capabilities: {
        resources: {},
        tools: {},
    }
});
const ListResourcesRequestSchema = z.object({});
const ReadResourceContentRequestSchema = z.object({ uri: z.string() });
// List available resources
server.setRequestHandler(ListResourcesRequestSchema, async () => {
    return {
        resources: [
            {
                uri: "file:///Users/Documents/MCP-SERVER/logs.txt",
                name: "Application Logs.txt",
                mimeType: "text/plain",
            },
        ]
    };
});
// Read resource content
server.setRequestHandler(ReadResourceContentRequestSchema, async (request) => {
    const uri = request.uri;
    if (uri === "file:///Users/Documents/MCP-SERVER/logs.txt") {
        const logContents = await readLogFile();
        return {
            contents: [
                {
                    uri,
                    mimeType: "text/plain",
                    text: logContents,
                }
            ]
        };
    }
    throw new Error("Resource not found");
});

// read file code

async function readLogFile() {
    try {
        const logPath = path.resolve("file:///Users/Documents/MCP-SERVER/logs.txt");
        // Read  File
        const data = await fs.readFile(logPath, "utf-8");
        return data;
    }
    catch (error) {
        console.error("Error reading log file:", error);
        return "Error reading log file." +
            (error instanceof Error ? error.message : String(error));
    }
}
// start the server using stdio transport
async function main() {
    try {
        const transport = new StdioServerTransport();
        await server.connect(transport);
        console.error("MCP Server is running...");
    }
    catch (error) {
        console.error("Error starting MCP Server:", error);
        process.exit(1);
    }
}
main();
