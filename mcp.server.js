import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod'; // Use standard zod library import

// 1. Initialize the modern high-level McpServer
const server = new McpServer({ 
    name: 'greeting-server', 
    version: '1.0.0' 
});

// 2. Register the tool using .tool()
// Note how arguments are passed directly as the second parameter object!
server.tool(
    'addTwoNumbers',
    {
        a: z.number().describe("The first number to add"),
        b: z.number().describe("The second number to add")
    },
    async ({ a, b }) => {
        return {
            content: [{ type: 'text', text: `The sum is: ${a + b}` }]
        };
    }
);

// 3. Start the main transport loop
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
}

main();