
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

interface ChatMessage {
  id: string
  username: string
  message: string
  timestamp: string
  avatar?: string
}

// Store connected clients and their info
const clients = new Map<WebSocket, { username: string; avatar?: string }>()

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const { headers } = req
  const upgradeHeader = headers.get("upgrade") || ""

  if (upgradeHeader.toLowerCase() !== "websocket") {
    return new Response("Expected WebSocket connection", { 
      status: 400,
      headers: corsHeaders 
    })
  }

  const { socket, response } = Deno.upgradeWebSocket(req)

  socket.onopen = () => {
    console.log("New WebSocket connection established")
  }

  socket.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data)
      console.log("Received message:", data)
      
      if (data.type === "join") {
        // User joining the chat
        clients.set(socket, { username: data.username, avatar: data.avatar })
        console.log(`User ${data.username} joined. Total clients: ${clients.size}`)
        
        // Broadcast user joined message
        const joinMessage: ChatMessage = {
          id: `system_${Date.now()}_${Math.random()}`,
          username: "System",
          message: `${data.username} joined the chat`,
          timestamp: new Date().toISOString()
        }
        
        broadcastMessage(joinMessage)
      } else if (data.type === "message") {
        // Regular chat message
        const clientInfo = clients.get(socket)
        if (clientInfo) {
          const chatMessage: ChatMessage = {
            id: `msg_${Date.now()}_${Math.random()}`,
            username: clientInfo.username,
            message: data.message,
            timestamp: new Date().toISOString(),
            avatar: clientInfo.avatar
          }
          
          console.log("Broadcasting message:", chatMessage)
          broadcastMessage(chatMessage)
        } else {
          console.log("Message from unknown client")
        }
      }
    } catch (error) {
      console.error("Error processing WebSocket message:", error)
    }
  }

  socket.onclose = (event) => {
    const clientInfo = clients.get(socket)
    console.log(`WebSocket closed. Code: ${event.code}, Reason: ${event.reason}`)
    
    if (clientInfo) {
      // Broadcast user left message
      const leaveMessage: ChatMessage = {
        id: `system_${Date.now()}_${Math.random()}`,
        username: "System",
        message: `${clientInfo.username} left the chat`,
        timestamp: new Date().toISOString()
      }
      
      clients.delete(socket)
      console.log(`User ${clientInfo.username} left. Total clients: ${clients.size}`)
      broadcastMessage(leaveMessage)
    }
  }

  socket.onerror = (error) => {
    console.error("WebSocket error:", error)
    const clientInfo = clients.get(socket)
    if (clientInfo) {
      console.log(`Removing client ${clientInfo.username} due to error`)
      clients.delete(socket)
    }
  }

  return response
})

function broadcastMessage(message: ChatMessage) {
  const messageData = JSON.stringify({ type: "message", data: message })
  console.log(`Broadcasting to ${clients.size} clients:`, message)
  
  // Create a copy of clients to iterate over
  const clientsToRemove: WebSocket[] = []
  
  for (const [client, clientInfo] of clients) {
    try {
      if (client.readyState === WebSocket.OPEN) {
        client.send(messageData)
      } else {
        // Mark for removal if connection is not open
        clientsToRemove.push(client)
      }
    } catch (error) {
      console.error(`Error sending message to client ${clientInfo.username}:`, error)
      clientsToRemove.push(client)
    }
  }
  
  // Remove dead connections
  for (const client of clientsToRemove) {
    clients.delete(client)
  }
  
  if (clientsToRemove.length > 0) {
    console.log(`Removed ${clientsToRemove.length} dead connections. Active clients: ${clients.size}`)
  }
}
