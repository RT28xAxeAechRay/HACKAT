import zmq from "zeromq";
import WebSocket from "ws";

const sock = new zmq.Pull();
const wss = new WebSocket.Server({ port: 8786 });

const run = async () => {
  await sock.bind("tcp://*:5555");
  console.log("Listening on port 5555...");
  
  for await (const [msg] of sock) {
    const receivedData = msg.toString();
    console.log("Received:", receivedData);
    
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(receivedData);
      }
    });
  }
};
run().catch(console.error);

