import React, { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowUpRight, Plus } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const SYSTEM_PROMPT =
  'You are a helpful assistant. You may use markdown formatting such as **bold**, *italic*, `code`, code blocks, lists, and headings to make your responses clear and well-structured.'

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
  }, [messages.length, isLoading])

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
    <div className="gradient-bg relative min-h-screen w-full overflow-hidden flex flex-col" style={{ position: 'relative' }}>
      {/* Planet horizon (background layer) */}
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[80%]
                   w-[150vw] h-[150vw] rounded-full bg-[#020617]
                   border-t border-t-white/40 shadow-[0_-40px_100px_rgba(59,130,246,0.5)] z-0"
        aria-hidden="true"
      />

      {/* Chat content */}
      <div
        className="relative z-10 flex-1 flex flex-col"
        style={{ paddingTop: '4.5rem', paddingBottom: '1rem' }}
      >
        <div className="chat-wrapper" style={{ flex: 1 }}>
          {/* Conversation area (only when there are messages) */}
          {hasMessages && (
            <div className="chat-messages-container animate-fade-in">
              {messages.map((message) => {
                const isUser = message.role === 'user'
                return (
                  <div
                    key={message.id}
                    className="w-full flex"
                    style={{
                      justifyContent: isUser ? 'flex-end' : 'flex-start',
                      marginBottom: '1rem',
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
                        whiteSpace: isUser ? 'pre-wrap' : 'normal',
                        boxShadow: isUser
                          ? '0 10px 25px rgba(37,99,235,0.5)'
                          : '0 10px 30px rgba(15,23,42,0.9)',
                      }}
                      className={!isUser ? 'markdown-content' : ''}
                    >
                      {isUser ? (
                        message.content
                      ) : (
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {message.content}
                        </ReactMarkdown>
                      )}
                    </div>
                  </div>
                )
              })}

              {/* Typing indicator */}
              {isLoading && (
                <div className="w-full flex" style={{ justifyContent: 'flex-start', marginBottom: '1rem' }}>
                  <div
                    style={{
                      maxWidth: '80%',
                      padding: '0.85rem 1.25rem',
                      borderRadius: '0.9rem',
                      backgroundColor: 'rgba(15,23,42,0.95)',
                      boxShadow: '0 10px 30px rgba(15,23,42,0.9)',
                    }}
                  >
                    <div className="typing-indicator">
                      <span className="typing-dot" />
                      <span className="typing-dot" />
                      <span className="typing-dot" />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}

          {/* Centered hero + input block */}
          <div
            className={`transition-all duration-500 ${hasMessages ? 'chat-input-bar' : 'home-container'}`}
          >
            {!hasMessages && (
              <div className="mb-6" style={{ textAlign: 'center' }}>
                <h1 className="home-title animate-fade-in-up">
                  What can I help with?
                </h1>
                <p
                  className="home-privacy text-xs mt-2 max-w-md mx-auto animate-fade-in"
                  style={{ animationDelay: '0.2s', textAlign: 'center' }}
                >
                  Ask anything and I will respond in a clear, professional tone.
                </p>
              </div>
            )}

            <div className="home-search-shell max-w-2xl animate-fade-in-up" style={{ width: '100%', maxWidth: '672px', margin: '0 auto' }}>
              <div
                className={`home-search-bar ${isFocused ? 'home-search-bar--focused' : ''
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
                  {isLoading ? (
                    <span className="loader-spinner" />
                  ) : (
                    <ArrowUpRight size={18} aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>


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

      {/* Terms text pinned to bottom center */}
      {!hasMessages && (
        <p
          className="home-privacy text-xs text-center max-w-md animate-fade-in"
          style={{
            position: 'fixed',
            bottom: '1.5rem',
            left: '50%',
            transform: 'translateX(-50%)',
            animationDelay: '0.45s',
            zIndex: 20,
          }}
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
  )
}

export default Home
