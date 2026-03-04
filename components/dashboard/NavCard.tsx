import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type ButtonConfig = {
  label: string;
  url: string;
  type: "primary" | "outline" | "brand";
};

type NavCardProps = {
  title: string;
  icon: LucideIcon;
  buttons: ButtonConfig[];
};

export default function NavCard({ title, icon: Icon, buttons }: NavCardProps) {
  const renderButton = (btn: ButtonConfig) => (
    <a
      href={btn.url}
      target="_blank"
      rel="noopener noreferrer"
      className="w-full block"
    >
      <Button
        variant={btn.type === "outline" ? "outline" : "default"}
        className={`w-full min-h-11 ${
          btn.type === "brand"
            ? "bg-purple-600 hover:bg-purple-700 text-white"
            : ""
        } ${
          btn.type === "primary"
            ? "bg-blue-700 hover:bg-blue-800 text-white"
            : ""
        }`}
      >
        {btn.label}
      </Button>
    </a>
  );

  return (
    <Card className="border-border shadow-sm hover:border-primary/50 hover:shadow-md transition-all duration-200 flex flex-col h-full">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3 text-lg">
          <div className="bg-primary/10 p-2 rounded-md">
            <Icon className="w-5 h-5 text-primary" />
          </div>
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent className="mt-auto flex-col space-y-2">
        <div className="flex flex-col gap-2">
          {buttons.length > 0 && renderButton(buttons[0])}

          {buttons.length > 1 && (
            <div className="grid grid-cols-2 gap-2">
              {buttons.slice(1).map((btn, index) => (
                <div key={index} className="w-full">
                  {renderButton(btn)}
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
