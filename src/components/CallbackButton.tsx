import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const CallbackButton = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50 animate-pulse">
      <Button
        size="lg"
        className="bg-gradient-primary hover:bg-primary-dark shadow-hover rounded-full px-6 py-3 text-primary-foreground font-semibold"
      >
        <Phone className="w-5 h-5 mr-2" />
        Request Callback
      </Button>
    </div>
  );
};

export default CallbackButton;