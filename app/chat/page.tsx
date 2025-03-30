"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ArrowRight, Bot, Cloud, Code2, Database, FileText, Send, Server, User } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { useToast } from "@/components/ui/use-toast"

export default function ChatPage() {
  const [messages, setMessages] = useState([
    {
      role: "system",
      content: "Welcome to CloudAI Assistant. How can I help you with your cloud infrastructure today?",
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = () => {
    if (input.trim()) {
      setMessages([
        ...messages,
        {
          role: "user",
          content: input,
        },
      ])

      setInput("")
      setIsTyping(true)

      // Simulate AI response with typing effect
      setTimeout(() => {
        setIsTyping(false)
        setMessages((prev) => [
          ...prev,
          {
            role: "system",
            content: getAIResponse(input),
          },
        ])
      }, 1500)
    }
  }

  const getAIResponse = (query: string) => {
    if (query.toLowerCase().includes("deploy") || query.toLowerCase().includes("create")) {
      return "I can help you deploy a new cloud infrastructure. Based on your requirements, I recommend using AWS EC2 for compute, RDS for database, and S3 for storage. Would you like me to generate a deployment plan?"
    } else if (query.toLowerCase().includes("cost") || query.toLowerCase().includes("price")) {
      return "Based on your current infrastructure, I estimate the monthly cost to be around $2,350. I've identified potential savings of up to $320 by right-sizing your EC2 instances and optimizing storage usage. Would you like to see a detailed cost breakdown?"
    } else if (query.toLowerCase().includes("terraform") || query.toLowerCase().includes("iac")) {
      return "I can generate Terraform code for your infrastructure. This will include modules for compute, networking, storage, and security. Would you like me to create a basic template or a more detailed configuration?"
    } else {
      return "I understand you're interested in cloud automation. Could you provide more details about your specific requirements? For example, what kind of resources do you need, and what are your performance and cost constraints?"
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const suggestedQueries = [
    "Deploy a new web application",
    "Optimize my current infrastructure for cost",
    "Generate Terraform code for my infrastructure",
    "Scale my database cluster",
  ]

  const handleSuggestedQuery = (query: string) => {
    setInput(query)
    toast({
      title: "Suggestion selected",
      description: `"${query}" added to input`,
    })
  }

  const handleUseTemplate = (template: string) => {
    toast({
      title: "Template selected",
      description: `${template} template will be used for your deployment`,
    })
  }

  return (
    <div className="flex-1 p-4 md:p-8 pt-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">AI Assistant</h2>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button
            variant="outline"
            size="sm"
            className="transition-all duration-300 hover:bg-primary/10"
            onClick={() => {
              toast({
                title: "Chat history",
                description: "Viewing your previous conversations",
              })
            }}
          >
            <FileText className="mr-2 h-4 w-4" />
            View History
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-3 space-y-4">
          <Card className="h-[calc(100vh-220px)] bg-card/60 border-primary/10 hover:border-primary/30 transition-all duration-300">
            <CardHeader className="p-4">
              <CardTitle className="text-xl">Cloud Automation Assistant</CardTitle>
              <CardDescription>
                Ask me anything about cloud infrastructure, deployments, and optimization
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <ScrollArea className="h-[calc(100vh-350px)]">
                <div className="space-y-4">
                  {messages.map((message, index) => (
                    <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`flex items-start gap-3 max-w-[80%] ${
                          message.role === "user" ? "bg-primary text-primary-foreground" : "bg-card"
                        } rounded-lg p-3 shadow-sm ${
                          message.role === "user" ? "" : "border border-border"
                        } transition-all duration-300 hover:scale-[1.01]`}
                      >
                        <div
                          className={`flex size-6 shrink-0 items-center justify-center rounded-full ${
                            message.role === "user" ? "bg-primary-foreground/20" : "bg-primary/20"
                          }`}
                        >
                          {message.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                        </div>
                        <div className="text-sm">{message.content}</div>
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="flex items-start gap-3 max-w-[80%] bg-card rounded-lg p-3 shadow-sm border border-border">
                        <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/20">
                          <Bot className="h-4 w-4" />
                        </div>
                        <div className="flex space-x-1">
                          <div className="h-2 w-2 rounded-full bg-primary animate-bounce"></div>
                          <div
                            className="h-2 w-2 rounded-full bg-primary animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                          <div
                            className="h-2 w-2 rounded-full bg-primary animate-bounce"
                            style={{ animationDelay: "0.4s" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <div className="flex w-full items-center space-x-2">
                <Input
                  placeholder="Type your message..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 transition-all duration-300 focus:border-primary"
                />
                <Button
                  size="icon"
                  onClick={handleSend}
                  disabled={isTyping || !input.trim()}
                  className="transition-all duration-300 hover:scale-110"
                >
                  <Send className="h-4 w-4" />
                  <span className="sr-only">Send</span>
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="bg-card/60 border-primary/10 hover:border-primary/30 transition-all duration-300">
            <CardHeader className="p-4">
              <CardTitle className="text-sm">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="space-y-2">
                {suggestedQueries.map((query, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-start text-sm hover:bg-primary/10 transition-all duration-300"
                    className="w-full justify-start text-sm hover:bg-primary/10 transition-all duration-300"
                    onClick={() => handleSuggestedQuery(query)}
                  >
                    {index === 0 && <Cloud className="mr-2 h-4 w-4 text-primary" />}
                    {index === 1 && <Database className="mr-2 h-4 w-4 text-primary" />}
                    {index === 2 && <Code2 className="mr-2 h-4 w-4 text-primary" />}
                    {index === 3 && <Server className="mr-2 h-4 w-4 text-primary" />}
                    {query}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/60 border-primary/10 hover:border-primary/30 transition-all duration-300">
            <CardHeader className="p-4">
              <CardTitle className="text-sm">Suggested Templates</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="space-y-2">
                <div
                  className="rounded-md border p-3 hover:bg-card/50 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                  onClick={() => handleUseTemplate("Web Application Stack")}
                >
                  <h3 className="font-medium text-sm">Web Application Stack</h3>
                  <p className="text-xs text-muted-foreground mt-1">EC2, RDS, S3, CloudFront</p>
                  <Button size="sm" variant="link" className="px-0 mt-1 text-primary">
                    Use Template <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </div>
                <div
                  className="rounded-md border p-3 hover:bg-card/50 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                  onClick={() => handleUseTemplate("Serverless API")}
                >
                  <h3 className="font-medium text-sm">Serverless API</h3>
                  <p className="text-xs text-muted-foreground mt-1">Lambda, API Gateway, DynamoDB</p>
                  <Button size="sm" variant="link" className="px-0 mt-1 text-primary">
                    Use Template <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </div>
                <div
                  className="rounded-md border p-3 hover:bg-card/50 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                  onClick={() => handleUseTemplate("Data Processing Pipeline")}
                >
                  <h3 className="font-medium text-sm">Data Processing Pipeline</h3>
                  <p className="text-xs text-muted-foreground mt-1">S3, Lambda, SQS, Kinesis</p>
                  <Button size="sm" variant="link" className="px-0 mt-1 text-primary">
                    Use Template <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

