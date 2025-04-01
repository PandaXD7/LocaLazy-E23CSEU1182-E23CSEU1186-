
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

type BackButtonProps = {
  className?: string;
};

const BackButton = ({ className = "" }: BackButtonProps) => {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return (
    <Button
      variant="ghost"
      size="icon"
      className={`absolute top-24 right-4 md:right-8 ${className}`}
      onClick={goBack}
      aria-label="Go back"
    >
      <ArrowLeft className="h-5 w-5" />
    </Button>
  );
};

export default BackButton;
