import { Zap } from "lucide-react";

const Loading = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-8">
        <div className="relative">
          <div className="absolute inset-0 animate-ping rounded-full bg-turquoise/20" />
          <div className="absolute -inset-4 animate-spin rounded-full border-2 border-transparent border-t-turquoise" />
          <div className="relative rounded-2xl bg-turquoise p-3 shadow-[0_0_32px_rgba(0,228,184,0.3)]">
            <Zap className="size-7 text-black" />
          </div>
        </div>

        <div className="flex flex-col items-center gap-3">
          <p className="font-mono text-xl font-semibold tracking-wide text-white">
            NEXUS<span className="text-turquoise">.gg</span>
          </p>
          <div className="flex items-center gap-1.5">
            <span className="size-1.5 animate-bounce rounded-full bg-turquoise [animation-delay:0ms]" />
            <span className="size-1.5 animate-bounce rounded-full bg-turquoise [animation-delay:150ms]" />
            <span className="size-1.5 animate-bounce rounded-full bg-turquoise [animation-delay:300ms]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;