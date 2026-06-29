'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  MessageCircle,
  Send,
  Mic,
  Copy,
  Volume2,
  Globe,
  ChevronDown,
  ChevronUp,
} from 'lucide-react'

export function AIAssistantChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      type: 'user',
      text: 'My father has a fever after surgery.',
    },
    {
      type: 'assistant',
      text: 'Fever after surgery can indicate infection if temperature exceeds 101°F.',
      recommendations: [
        'Check temperature every 4 hours',
        'Continue prescribed medicines',
        'Keep patient hydrated',
        'Contact your doctor if fever persists',
      ],
      riskLevel: 'Moderate',
    },
  ])

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-br from-primary to-accent rounded-full shadow-lg flex items-center justify-center text-white hover:shadow-xl transition z-40"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-8 w-96 h-96 bg-white rounded-2xl shadow-2xl border border-border flex flex-col z-40 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-accent text-white p-4 flex items-center justify-between">
            <div>
              <h3 className="font-bold">AI Recovery Assistant</h3>
              <p className="text-xs opacity-90">Ask anything about recovery</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 p-1 rounded transition"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {/* Chat History */}
          <div className="flex-1 overflow-auto p-4 space-y-4">
            {messages.map((msg, index) => (
              <div key={index}>
                {/* User Message */}
                {msg.type === 'user' && (
                  <div className="flex justify-end mb-4">
                    <div className="bg-primary text-white p-3 rounded-lg max-w-xs">
                      <p className="text-sm">{msg.text}</p>
                    </div>
                  </div>
                )}

                {/* Assistant Message */}
                {msg.type === 'assistant' && (
                  <div className="flex justify-start space-y-2">
                    <div className="bg-muted/50 p-4 rounded-lg max-w-xs space-y-3">
                      <p className="text-sm text-foreground">{msg.text}</p>

                      {/* Recommendations */}
                      {msg.recommendations && (
                        <div className="space-y-1">
                          <p className="text-xs font-semibold text-foreground">Recommendations:</p>
                          <ul className="text-xs text-muted-foreground space-y-1">
                            {msg.recommendations.map((rec, i) => (
                              <li key={i} className="flex gap-1.5">
                                <span>•</span>
                                <span>{rec}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Risk Level */}
                      {msg.riskLevel && (
                        <div className="pt-2 border-t border-border">
                          <span className="text-xs font-semibold">Risk Level: </span>
                          <span className="text-xs font-bold text-yellow-600">
                            {msg.riskLevel === 'Moderate' ? '🟡' : '🟢'} {msg.riskLevel}
                          </span>
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex gap-2 pt-2">
                        <button className="text-xs text-primary font-semibold hover:text-primary/80 transition flex items-center gap-1">
                          <Globe className="w-3 h-3" />
                          Hindi
                        </button>
                        <button className="text-xs text-primary font-semibold hover:text-primary/80 transition flex items-center gap-1">
                          <Volume2 className="w-3 h-3" />
                          Read
                        </button>
                        <button className="text-xs text-primary font-semibold hover:text-primary/80 transition flex items-center gap-1">
                          <Copy className="w-3 h-3" />
                          Copy
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="border-t border-border p-4 space-y-3">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Ask me anything..."
                className="flex-1 px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button className="p-2 text-muted-foreground hover:text-foreground transition">
                <Mic className="w-5 h-5" />
              </button>
              <button className="p-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition">
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
