import { AlertTriangle, X } from "lucide-react";

interface AlertBannerProps {
  type: "warning" | "info" | "success";
  title: string;
  message: string;
  onClose?: () => void;
}

const AlertBanner = ({ type, title, message, onClose }: AlertBannerProps) => {
  const colors = {
    warning: "border-amber-500/20 bg-amber-500/5 text-amber-600 dark:text-amber-400",
    info: "border-primary/20 bg-primary/5 text-primary",
    success: "border-emerald-500/20 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400",
  };

  return (
    <div className={`relative w-full p-4 rounded-xl border animate-in fade-in slide-in-from-top-2 duration-500 mb-8 ${colors[type]}`}>
      <div className="flex gap-4 items-start">
        <div className="mt-0.5">
          <AlertTriangle size={18} />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-xs uppercase tracking-wider mb-1">{title}</h3>
          <p className="text-sm opacity-90 leading-relaxed font-medium">{message}</p>
        </div>
        {onClose && (
          <button onClick={onClose} className="hover:opacity-60 transition-opacity shrink-0">
            <X size={16} />
          </button>
        )}
      </div>
    </div>
  );
};

export default AlertBanner;
