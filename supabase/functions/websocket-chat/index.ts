
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

serve(async (req) => {
  const { headers } = req
  const upgradeHeader = headers.get("upgrade") || ""

  if (upgradeHeader.toLowerCase() !== "websocket") {
    return new Response("Expected WebSocket connection", { status: 400 })
  }

  const { socket, response } = Deno.upgradeWebSocket(req)

  socket.onopen = () => {
    console.log("New WebSocket connection established")
  }

  socket.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data)
      
      if (data.type === "join") {
        // User joining the chat
        clients.set(socket, { username: data.username, avatar: data.avatar })
        
        // Broadcast user joined message
        const joinMessage: ChatMessage = {
          id: `system_${Date.now()}`,
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
            id: `msg_${Date.now()}`,
            username: clientInfo.username,
            message: data.message,
            timestamp: new Date().toISOString(),
            avatar: clientInfo.avatar
          }
          
          broadcastMessage(chatMessage)
        }
      }
    } catch (error) {
      console.error("Error processing message:", error)
    }
  }

  socket.onclose = () => {
    const clientInfo = clients.get(socket)
    if (clientInfo) {
      // Broadcast user left message
      const leaveMessage: ChatMessage = {
        id: `system_${Date.now()}`,
        username: "System",
        message: `${clientInfo.username} left the chat`,
        timestamp: new Date().toISOString()
      }
      
      clients.delete(socket)
      broadcastMessage(leaveMessage)
    }
  }

  socket.onerror = (error) => {
    console.error("WebSocket error:", error)
    clients.delete(socket)
  }

  return response
})

function broadcastMessage(message: ChatMessage) {
  const messageData = JSON.stringify({ type: "message", data: message })
  
  for (const [client] of clients) {
    try {
      if (client.readyState === WebSocket.OPEN) {
        client.send(messageData)
      }
    } catch (error) {
      console.error("Error sending message to client:", error)
      clients.delete(client)
    }
  }
}
