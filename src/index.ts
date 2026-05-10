import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new Server({
  name: "MCP Server",
  version: "1.0.0",
}, {
capabilities: {
    resources: {},
    tools:{}
}
})