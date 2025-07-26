import GPTAssistant from "@/components/GPTAssistant";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AIAssistantPage() {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4">
      <div className="mt-4 mb-2">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="gap-1"
        >
          <ArrowLeft className="h-4 w-4" />
          Home
        </Button>
      </div>
      <GPTAssistant />
    </div>
  );
}
