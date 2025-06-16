
import { useState, useEffect, useRef, useCallback } from 'react'

interface ChatMessage {
  id: string
  username: string
  message: string
  timestamp: string
  avatar?: string
}

interface UseWebSocketProps {
  username?: string
  avatar?: string
}

export const useWebSocket = ({ username, avatar }: UseWebSocketProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isConnected, setIsConnected] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const wsRef = useRef<WebSocket | null>(null)

  const connect = useCallback(() => {
    if (!username || wsRef.current?.readyState === WebSocket.OPEN) return

    setIsConnecting(true)
    
    try {
      const ws = new WebSocket('wss://ceihcnfngpmrtqunhaey.functions.supabase.co/websocket-chat')
      wsRef.current = ws

      ws.onopen = () => {
        console.log('WebSocket connected')
        setIsConnected(true)
        setIsConnecting(false)
        
        // Send join message
        ws.send(JSON.stringify({
          type: 'join',
          username,
          avatar
        }))
      }

      ws.onmessage = (event) => {
        try {
          const parsed = JSON.parse(event.data)
          if (parsed.type === 'message') {
            setMessages(prev => [...prev, parsed.data])
          }
        } catch (error) {
          console.error('Error parsing message:', error)
        }
      }

      ws.onclose = () => {
        console.log('WebSocket disconnected')
        setIsConnected(false)
        setIsConnecting(false)
      }

      ws.onerror = (error) => {
        console.error('WebSocket error:', error)
        setIsConnected(false)
        setIsConnecting(false)
      }
    } catch (error) {
      console.error('Error creating WebSocket:', error)
      setIsConnecting(false)
    }
  }, [username, avatar])

  const disconnect = useCallback(() => {
    if (wsRef.current) {
      wsRef.current.close()
      wsRef.current = null
    }
  }, [])

  const sendMessage = useCallback((message: string) => {
    if (wsRef.current?.readyState === WebSocket.OPEN && message.trim()) {
      wsRef.current.send(JSON.stringify({
        type: 'message',
        message: message.trim()
      }))
    }
  }, [])

  useEffect(() => {
    return () => {
      disconnect()
    }
  }, [disconnect])

  return {
    messages,
    isConnected,
    isConnecting,
    connect,
    disconnect,
    sendMessage
  }
}
