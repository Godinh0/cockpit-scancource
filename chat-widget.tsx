"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Plus, Send } from "lucide-react"

export default function ChatWidget() {
  const [message, setMessage] = useState("")

  return (
    <Card className="fixed bottom-4 right-4 w-[300px] shadow-lg">
      <CardHeader className="bg-[#f5f7fa] p-4">
        <div className="flex items-center gap-2">
          <img src="/placeholder.svg?height=24&width=24" alt="iAzzie" className="h-6" />
          <span className="font-semibold">iAzzie</span>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="w-full justify-start">
              <Plus className="mr-2 h-4 w-4" />
              Nova Conversa
            </Button>
          </div>

          <div className="bg-muted p-3 rounded-lg">
            <p className="text-sm text-muted-foreground">Olá, como posso ajudar?</p>
          </div>

          <div className="flex gap-2">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Converse com iAzzie"
              className="flex-1"
            />
            <Button size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

