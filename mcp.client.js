import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

// 1. Setup the transport
const transport = new StdioClientTransport({
    command: 'node',
    args: ['./mcp.server.js']
});

// 2. Initialize the client
const client = new Client({
    name: 'example-client',
    version: '1.0.0'
});

// 3. Connect BEFORE doing anything else
await client.connect(transport);
console.log("Connected to MCP server successfully!");

// 4. Now it's safe to list tools
try {
    const tools = await client.listTools();
    console.log('Available tools:', tools);
} catch (error) {
    console.error('Failed to list tools:', error);
}

// 5. Invoke your tool (Note: standard MCP uses callTool instead of invoke)
try {
    const result = await client.callTool({
        name: 'addTwoNumbers',
        arguments: { a: 5, b: 7 }
    });
    console.log('Result:', result);
} catch (error) {
    console.error('Failed to call tool:', error);
}