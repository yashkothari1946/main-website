const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// Path to backend
const backendDir = path.join(__dirname, '../../vybtek-back');
const serverPath = path.join(backendDir, 'server.js');
const envPath = path.join(backendDir, '.env');

console.log("Starting server with .env from:", envPath);

// Start process
const server = spawn('node', [serverPath], {
  cwd: backendDir, // This might fail in the AI environment, but worth a try
  env: { 
    ...process.env,
    DOTENV_CONFIG_PATH: envPath 
  },
  stdio: 'inherit'
});

server.on('error', (err) => {
  console.error("Failed to start server:", err);
});
