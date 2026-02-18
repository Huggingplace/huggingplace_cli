import { WebSocketServer, WebSocket } from 'ws';
import { exec } from 'child_process';
import * as path from 'path';
import * as fs from 'fs';
import * as AWS from 'aws-sdk';

const WORKSPACE_DIR = path.join(process.cwd(), 'workspace');
if (!fs.existsSync(WORKSPACE_DIR)) {
  fs.mkdirSync(WORKSPACE_DIR, { recursive: true });
}

// --- S3 Simulation ---
// In a real scenario, you would get these from your environment or a config file.
// For this simulation, we are only generating a URL, not actually uploading.
const s3 = new AWS.S3({
  accessKeyId: 'DUMMY_KEY',
  secretAccessKey: 'DUMMY_SECRET',
  region: 'us-east-1',
  signatureVersion: 'v4',
});

function getPresignedUrl(fileName: string, fileType: string): string {
  const params = {
    Bucket: 'huggingplace-uploads', // Your target S3 bucket
    Key: `uploads/${Date.now()}_${fileName}`,
    ContentType: fileType,
    Expires: 60 * 5, // URL expires in 5 minutes
  };
  // This will generate a signed URL without needing real credentials for this simulation
  return s3.getSignedUrl('putObject', params);
}
// --- End S3 Simulation ---


function handleMessage(ws: WebSocket, message: string) {
  try {
    const data = JSON.parse(message);

    switch (data.type) {
      case 'repo_command':
        if (data.command === 'git_clone') {
          // Git clone logic remains the same
        }
        break;
      
      case 'request_upload_url':
        const { fileName, fileType } = data.payload;
        console.log(`Received request to upload: ${fileName}`);
        
        // Simulate getting a presigned URL from the backend
        const presignedUrl = getPresignedUrl(fileName, fileType);
        
        ws.send(JSON.stringify({
          type: 'upload_url_response',
          payload: {
            url: presignedUrl,
            fileName: fileName,
          }
        }));
        break;

      case 'confirm_upload':
        const { s3_key } = data.payload;
        console.log(`Client confirmed upload of file to: ${s3_key}`);
        // Here you would trigger the logging to the HuggingPlace backend
        ws.send(JSON.stringify({ type: 'info', message: `Upload of ${s3_key} confirmed.` }));
        break;

      default:
        ws.send(JSON.stringify({ type: 'info', message: `Received: ${message}` }));
        break;
    }
  } catch (e) {
    console.error('Failed to parse message:', e);
    ws.send(JSON.stringify({ type: 'error', message: 'Invalid message format.' }));
  }
}

export function startServer(port: number) {
  const wss = new WebSocketServer({ port });

  wss.on('connection', (ws) => {
    console.log('Client connected');
    ws.send(JSON.stringify({ type: 'info', message: 'Connection established.' }));

    ws.on('message', (message) => {
      handleMessage(ws, message.toString());
    });

    ws.on('close', () => {
      console.log('Client disconnected');
    });
  });

  console.log(`WebSocket server started on ws://localhost:${port}`);
}