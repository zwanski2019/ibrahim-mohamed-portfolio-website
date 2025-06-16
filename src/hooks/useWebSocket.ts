
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
      // Use the correct Supabase Edge Function URL format
      const ws = new WebSocket('wss://ceihcnfngpmrtqunhaey.supabase.co/functions/v1/websocket-chat')
      wsRef.current = ws

      ws.onopen = () => {
        console.log('WebSocket connected successfully')
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
          console.error('Error parsing WebSocket message:', error)
        }
      }

      ws.onclose = (event) => {
        console.log('WebSocket disconnected:', event.code, event.reason)
        setIsConnected(false)
        setIsConnecting(false)
        
        // Attempt to reconnect after 3 seconds if it was an unexpected closure
        if (event.code !== 1000 && username) {
          setTimeout(() => {
            console.log('Attempting to reconnect...')
            connect()
          }, 3000)
        }
      }

      ws.onerror = (error) => {
        console.error('WebSocket error:', error)
        setIsConnected(false)
        setIsConnecting(false)
      }
    } catch (error) {
      console.error('Error creating WebSocket connection:', error)
      setIsConnecting(false)
    }
  }, [username, avatar])

  const disconnect = useCallback(() => {
    if (wsRef.current) {
      wsRef.current.close(1000, 'User disconnected')
      wsRef.current = null
    }
    setIsConnected(false)
    setIsConnecting(false)
  }, [])

  const sendMessage = useCallback((message: string) => {
    if (wsRef.current?.readyState === WebSocket.OPEN && message.trim()) {
      wsRef.current.send(JSON.stringify({
        type: 'message',
        message: message.trim()
      }))
      return true
    }
    return false
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
