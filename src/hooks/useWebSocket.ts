
import { useState, useEffect, useRef, useCallback } from 'react'

declare global {
  interface Window {
    GRAVATAR_API_URL?: string
  }
}

const SUPABASE_FUNCTION_URL =
  window.GRAVATAR_API_URL ||
  import.meta.env.VITE_GRAVATAR_API_URL ||
  'wss://ceihcnfngpmrtqunhaey.supabase.co/functions/v1/websocket-chat'

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
  const [connectionError, setConnectionError] = useState<string | null>(null)
  const wsRef = useRef<WebSocket | null>(null)
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const reconnectAttemptsRef = useRef(0)
  const maxReconnectAttempts = 5

  const connect = useCallback(() => {
    if (!username || wsRef.current?.readyState === WebSocket.OPEN) return

    // Clear any existing reconnect timeout
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current)
      reconnectTimeoutRef.current = null
    }

    setIsConnecting(true)
    setConnectionError(null)
    
    try {
      // Use the correct WebSocket URL
      const ws = new WebSocket(SUPABASE_FUNCTION_URL)
      wsRef.current = ws

      ws.onopen = () => {
        console.log('WebSocket connected successfully')
        setIsConnected(true)
        setIsConnecting(false)
        setConnectionError(null)
        reconnectAttemptsRef.current = 0
        
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
        
        // Handle different close codes
        if (event.code === 1006) {
          setConnectionError('Connection failed - server may be unavailable')
        } else if (event.code !== 1000) {
          setConnectionError(`Connection closed unexpectedly (${event.code})`)
        }
        
        // Attempt to reconnect if it was an unexpected closure and we haven't exceeded max attempts
        if (event.code !== 1000 && username && reconnectAttemptsRef.current < maxReconnectAttempts) {
          reconnectAttemptsRef.current += 1
          const delay = Math.min(1000 * Math.pow(2, reconnectAttemptsRef.current - 1), 10000) // Exponential backoff, max 10s
          
          console.log(`Attempting to reconnect in ${delay}ms (attempt ${reconnectAttemptsRef.current}/${maxReconnectAttempts})`)
          reconnectTimeoutRef.current = setTimeout(() => {
            connect()
          }, delay)
        } else if (reconnectAttemptsRef.current >= maxReconnectAttempts) {
          setConnectionError('Max reconnection attempts reached. Please refresh the page.')
        }
      }

      ws.onerror = (error) => {
        console.error('WebSocket error:', error)
        setIsConnected(false)
        setIsConnecting(false)
        setConnectionError('WebSocket connection error')
      }
    } catch (error) {
      console.error('Error creating WebSocket connection:', error)
      setIsConnecting(false)
      setConnectionError('Failed to create WebSocket connection')
    }
  }, [username, avatar])

  const disconnect = useCallback(() => {
    // Clear reconnect timeout
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current)
      reconnectTimeoutRef.current = null
    }
    
    // Reset reconnect attempts
    reconnectAttemptsRef.current = 0
    
    if (wsRef.current) {
      wsRef.current.close(1000, 'User disconnected')
      wsRef.current = null
    }
    setIsConnected(false)
    setIsConnecting(false)
    setConnectionError(null)
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

  const retryConnection = useCallback(() => {
    reconnectAttemptsRef.current = 0
    setConnectionError(null)
    connect()
  }, [connect])

  useEffect(() => {
    return () => {
      disconnect()
    }
  }, [disconnect])

  return {
    messages,
    isConnected,
    isConnecting,
    connectionError,
    connect,
    disconnect,
    sendMessage,
    retryConnection
  }
}
