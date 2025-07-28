"use client";

import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import ReactMarkdown from "react-markdown";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";

const TOOLS = [
  { id: "chatbot", label: "General Chatbot" },
  { id: "resume", label: "Resume Enhancer" },
  { id: "blog", label: "Blog Intro Generator" },
  { id: "code", label: "Code Explainer" },
  { id: "student", label: "Student Tutor" },
  { id: "game", label: "Text Adventure" },
  { id: "bugfix", label: "Bug Fix Assistant" },
];

export default function GPTAssistant() {
  const [tool, setTool] = useState("chatbot");
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setResult("");
    try {
      const { data, error } = await supabase.functions.invoke("chatgpt-tools", {
        body: { tool, prompt: input },
      });
      if (error) throw error;
      setResult(data.result || "No response received.");
    } catch (err) {
      setResult(
        "Failed to generate response. Please check your connection and try again later."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto my-8 px-4">
      <CardHeader>
        <CardTitle>Zwanski AI Assistant</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block mb-1 text-sm font-medium">Select Tool</label>
            <Select value={tool} onValueChange={setTool}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {TOOLS.map((t) => (
                  <SelectItem key={t.id} value={t.id}>
                    {t.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Prompt</label>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your prompt here"
              rows={5}
            />
          </div>

          <Button type="submit" disabled={loading} className="flex items-center">
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {loading ? "Generating..." : "Generate"}
          </Button>
        </form>

        {result && (
          <div className="prose max-w-none bg-muted/50 p-4 rounded">
            <ReactMarkdown>{result}</ReactMarkdown>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
