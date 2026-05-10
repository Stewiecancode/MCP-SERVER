import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { mime, z } from "zod";

const server = new Server({
  name: "MCP Server",
  version: "1.0.0",
}, {
capabilities: {
    resources: {},
    tools:{},
}
})

const ListResourcesRequestSchema = z.object({});
const ReadResourceContentRequestSchema = z.object({});

// List available resources
server.setRequestHandler(ListResourcesRequestSchema, async () => {
  return {
  resources: [
    {
      uri: "file:///Users/Documents/MCP-SERVER/logs.txt",
      name: "Application Logs.txt",
      mimeType: "text/plain",
    },
  ]};
});

//Read resource content
server.setRequestHandler(ReadResourceContentRequestSchema, async ( request ) => {
    const uri  = request.params.uri;
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

//.. read file code
async function readLogFile() {
  try{
  
  } catch (error) {

  }
}