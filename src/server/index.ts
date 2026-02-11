import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { WebStandardStreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js";
import {
  registerAppTool,
  registerAppResource,
  RESOURCE_MIME_TYPE,
} from "@modelcontextprotocol/ext-apps/server";

// Injected at build time
declare const BUNDLED_HTML: string;

const APP_URI = "ui://theme-inspector";

function createServer(): McpServer {
  const server = new McpServer({
    name: "mcp-theme-inspector",
    version: "1.0.0",
  });

  registerAppResource(
    server,
    "Theme Inspector UI",
    APP_URI,
    { description: "Theme Inspector — CSS variable viewer and UI preview" },
    async () => ({
      contents: [
        {
          uri: APP_URI,
          mimeType: RESOURCE_MIME_TYPE,
          text: BUNDLED_HTML,
        },
      ],
    }),
  );

  registerAppTool(
    server,
    "inspect-theme",
    {
      title: "Theme Inspector",
      description:
        "Inspect the current host theme variables and preview UI components.",
      annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
      _meta: { ui: { resourceUri: APP_URI } },
    },
    async () => ({
      content: [{ type: "text" as const, text: "Theme inspector opened." }],
    }),
  );

  return server;
}

export default {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/mcp" || url.pathname === "/mcp/") {
      const server = createServer();
      const transport = new WebStandardStreamableHTTPServerTransport();
      await server.connect(transport);
      return transport.handleRequest(request);
    }

    return new Response("MCP Theme Inspector", { status: 200 });
  },
};
