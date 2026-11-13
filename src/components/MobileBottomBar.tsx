import { ArrowDownToLine, BookOpen, Bot, FolderGit2, Layers } from 'lucide-react';
import type { MouseEvent } from 'react';
import type { StreamXRelease } from '../config/release';

interface MobileBottomBarProps {
  release: StreamXRelease;
  isExternalDownload: boolean;
  onDownloadClick: () => void;
}

export function MobileBottomBar({
  release,
  isExternalDownload,
  onDownloadClick,
}: MobileBottomBarProps) {
  const handleDownload = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!isExternalDownload || release.isPlaceholderBuild) {
      event.preventDefault();
    }
    onDownloadClick();
  };

  return (
    <nav
      aria-label="Mobile Quick Navigation"
      className="pb-safe fixed bottom-0 left-0 right-0 z-40 border-t border-white/[0.1] bg-[#0B0B10]/92 px-2.5 pt-2 backdrop-blur-xl md:hidden"
    >
      <div className="mx-auto flex max-w-md items-center justify-between gap-1.5">
        <a
          href="#features"
          className="flex min-h-[44px] min-w-[46px] flex-col items-center justify-center gap-0.5 rounded-xl px-1.5 text-zinc-400 transition-colors active:bg-white/[0.06] active:text-white"
        >
          <Layers className="h-[18px] w-[18px]" aria-hidden="true" />
          <span className="text-[10px] font-medium leading-none">Features</span>
        </a>

        <a
          href="#extensions"
          className="flex min-h-[44px] min-w-[46px] flex-col items-center justify-center gap-0.5 rounded-xl px-1.5 text-zinc-400 transition-colors active:bg-white/[0.06] active:text-white"
        >
          <FolderGit2 className="h-[18px] w-[18px]" aria-hidden="true" />
          <span className="text-[10px] font-medium leading-none">Repos</span>
        </a>

        <a
          href="#install-guide"
          className="flex min-h-[44px] min-w-[46px] flex-col items-center justify-center gap-0.5 rounded-xl px-1.5 text-zinc-400 transition-colors active:bg-white/[0.06] active:text-white"
        >
          <BookOpen className="h-[18px] w-[18px]" aria-hidden="true" />
          <span className="text-[10px] font-medium leading-none">Guide</span>
        </a>

        <a
          href="#assistant"
          className="flex min-h-[44px] min-w-[46px] flex-col items-center justify-center gap-0.5 rounded-xl px-1.5 text-zinc-400 transition-colors active:bg-white/[0.06] active:text-white"
        >
          <Bot className="h-[18px] w-[18px]" aria-hidden="true" />
          <span className="text-[10px] font-medium leading-none">AI</span>
        </a>

        <a
          href={release.downloadUrl}
          target={isExternalDownload ? '_blank' : undefined}
          rel={isExternalDownload ? 'noopener noreferrer' : undefined}
          download={!isExternalDownload ? release.apkFileName : undefined}
          onClick={handleDownload}
          className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-xl bg-rose-600 px-3 text-xs font-semibold text-white shadow-md shadow-rose-950/40 transition-transform active:scale-[0.98]"
        >
          <ArrowDownToLine className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span>Get APK</span>
        </a>
      </div>
    </nav>
  );
}
