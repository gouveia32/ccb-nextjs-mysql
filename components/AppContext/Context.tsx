import { useCallback, useState } from 'react'
import { v4 as uuid } from 'uuid'
import { createContext } from 'use-context-selector'

type Message = {
  id: string;
  author: string;
  text: string;
}

type Patient = {
  id: string;
  name: string;
}

type ChatContextType = {
  messages: Message[]
  connected: Patient[]
  onNewMessage: (message: Omit<Message, 'id'>) => void
  onPatientConnected: (name: string) => void
}

export const ChatContext = createContext({} as ChatContextType)

export function ChatProvider({ children }) {
  const [messages, setMessages] = useState<Message[]>([])
  const [connected, setConnected] = useState<Patient[]>([])

  const onNewMessage = useCallback(({ author, text }: Omit<Message, 'id'>) => {
    const id = uuid()

    const message = {
      id,
      author,
      text
    }

    setMessages(state => [...state, message]);
  }, []);

  const onPatientConnected = useCallback((name: string) => {
    const id = uuid()

    const patient = {
      id,
      name
    }

    setConnected(state => [...state, patient])
  }, []);

  return (
    <ChatContext.Provider 
      value={{ 
        messages,
        connected,
        onNewMessage,
        onPatientConnected,
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}