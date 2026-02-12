import React, { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowUpRight, Plus } from 'lucide-react'

const SYSTEM_PROMPT =
  'You are a helpful assistant. Always respond in plain text without using markdown, and keep a clear, professional tone.'

const Home = ({ activeSessionId, chatSessions, onUpdateSessionMessages }) => {
  const [input, setInput] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const messagesEndRef = useRef(null)

  const activeSession = useMemo(
    () => chatSessions.find((s) => s.id === activeSessionId) || { messages: [] },
    [chatSessions, activeSessionId],
  )

  const messages = activeSession.messages || []
  const hasMessages = messages.length > 0

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' })
    }
  }, [messages.length])

  const buildConversationText = (nextUserMessage) => {
    const allMessages = [...messages, nextUserMessage]
    return allMessages
      .map((m) => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`)
      .join('\n')
  }

  const handleSend = async () => {
    const trimmed = input.trim()
    if (!trimmed || !activeSessionId) return

    const userMessage = {
      id: `${Date.now()}-u`,
      role: 'user',
      content: trimmed,
      createdAt: new Date().toISOString(),
    }

    const nextMessages = [...messages, userMessage]
    onUpdateSessionMessages(activeSessionId, nextMessages)
    setInput('')
    setError('')
    setIsLoading(true)

    try {
      const accessToken = localStorage.getItem('access_token')
      const tokenType = localStorage.getItem('token_type') || 'Bearer'

      const conversationText = buildConversationText(userMessage)

      const response = await fetch('http://127.0.0.1:8000/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(accessToken
            ? {
                Authorization: `${tokenType} ${accessToken}`,
              }
            : {}),
        },
        body: JSON.stringify({
          message: conversationText,
          system_prompt: SYSTEM_PROMPT,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.detail || 'The assistant could not respond.')
      }

      const assistantMessage = {
        id: `${Date.now()}-a`,
        role: 'assistant',
        content: data.response || '',
        createdAt: new Date().toISOString(),
      }

      onUpdateSessionMessages(activeSessionId, [...nextMessages, assistantMessage])
    } catch (err) {
      console.error('Chat error:', err)
      setError(
        'Sorry, something went wrong while contacting the assistant. Please try again.',
      )
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="gradient-bg relative min-h-screen w-full overflow-hidden flex flex-col">
      {/* Planet horizon (background layer) */}
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[80%]
                   w-[150vw] h-[150vw] rounded-full bg-[#020617]
                   border-t border-t-white/40 shadow-[0_-40px_100px_rgba(59,130,246,0.5)] z-0"
        aria-hidden="true"
      />

      {/* Chat content */}
      <div
        className="relative z-10 flex-1 flex justify-center px-4"
        style={{ paddingTop: '4.5rem', paddingBottom: '1rem' }}
      >
        <div className="flex flex-col w-full max-w-3xl">
          {/* Conversation area (only when there are messages) */}
          {hasMessages && (
            <div className="flex-1 overflow-y-auto space-y-4 pb-4 animate-fade-in">
              {messages.map((message) => {
                const isUser = message.role === 'user'
                return (
                  <div
                    key={message.id}
                    className="w-full flex"
                    style={{
                      justifyContent: isUser ? 'flex-end' : 'flex-start',
                    }}
                  >
                    <div
                      style={{
                        maxWidth: '80%',
                        padding: '0.75rem 1rem',
                        borderRadius: '0.9rem',
                        backgroundColor: isUser
                          ? 'rgba(37,99,235,0.95)'
                          : 'rgba(15,23,42,0.95)',
                        color: '#e5e7eb',
                        fontSize: '0.95rem',
                        lineHeight: 1.5,
                        whiteSpace: 'pre-wrap',
                        boxShadow: isUser
                          ? '0 10px 25px rgba(37,99,235,0.5)'
                          : '0 10px 30px rgba(15,23,42,0.9)',
                      }}
                    >
                      {message.content}
                    </div>
                  </div>
                )
              })}
              <div ref={messagesEndRef} />
            </div>
          )}

          {/* Centered hero + input block, which smoothly slides down after first message */}
          <div
            className="transition-all duration-500"
            style={{
              marginTop: hasMessages ? 'auto' : '10vh',
              marginBottom: hasMessages ? '0.5rem' : '0',
            }}
          >
            {!hasMessages && (
              <div className="text-center mb-6">
                <h1 className="home-title animate-fade-in-up">
                  What can I help with?
                </h1>
                <p
                  className="home-privacy text-xs mt-2 text-center max-w-md mx-auto animate-fade-in"
                  style={{ animationDelay: '0.2s' }}
                >
                  Ask anything and I will respond in a clear, professional tone.
                </p>
              </div>
            )}

            <div className="home-search-shell w-full max-w-2xl mx-auto animate-fade-in-up">
              <div
                className={`home-search-bar ${
                  isFocused ? 'home-search-bar--focused' : ''
                }`}
              >
                <button
                  type="button"
                  className="home-icon-button"
                  aria-label="New message"
                >
                  <Plus size={18} aria-hidden="true" />
                </button>

                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  onKeyDown={handleKeyDown}
                  placeholder="Message GPT"
                  className="home-search-input"
                  disabled={isLoading}
                />

                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="home-icon-button home-icon-button--send"
                  title="Send"
                >
                  <ArrowUpRight size={18} aria-hidden="true" />
                </button>
              </div>
            </div>

            {!hasMessages && (
              <p
                className="home-privacy text-xs mt-6 text-center max-w-md mx-auto animate-fade-in"
                style={{ animationDelay: '0.45s' }}
              >
                By messaging GPT, you agree to our{' '}
                <button type="button" className="home-privacy-link">
                  Terms
                </button>{' '}
                and have read our{' '}
                <button type="button" className="home-privacy-link">
                  Privacy Policy
                </button>
                .
              </p>
            )}
          </div>

          {error && (
            <div
              className="mt-4 text-sm"
              style={{
                color: '#fca5a5',
                backgroundColor: 'rgba(127,29,29,0.35)',
                border: '1px solid rgba(248,113,113,0.4)',
                borderRadius: '0.75rem',
                padding: '0.6rem 0.9rem',
              }}
            >
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Home
