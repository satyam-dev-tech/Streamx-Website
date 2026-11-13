import { Menu, X } from 'lucide-react';
import { useState, type MouseEvent } from 'react';
import type { StreamXRelease } from '../config/release';
import { StreamXLogo } from './StreamXLogo';

const NAV_LINKS = [
  { label: 'StreamX AI', href: '#assistant' },
  { label: 'Features', href: '#features' },
  { label: 'Extensions', href: '#extensions' },
  { label: 'Install Guide', href: '#install-guide' },
  { label: "What's New", href: '#whats-new' },
] as const;

interface NavbarProps {
  release: StreamXRelease;
  isExternalDownload: boolean;
  onDownloadClick: () => void;
}

export function Navbar({ release, isExternalDownload, onDownloadClick }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavDownload = (event: MouseEvent<HTMLAnchorElement>) => {
    setMobileOpen(false);
    if (!isExternalDownload || release.isPlaceholderBuild) {
      event.preventDefault();
    }
    onDownloadClick();
  };

  return (
    <header className="relative z-40 border-b border-white/[0.07] bg-[#08080B]/85 backdrop-blur-xl md:sticky md:top-0">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-8 px-4 sm:px-6 md:h-16 lg:px-8">
        {/* Zone 1: Single clean brand wordmark */}
        <a
          href="#home"
          className="rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
          aria-label="StreamX Home"
        >
          <StreamXLogo />
        </a>

        {/* Zone 2: 5 concise single-line navigation links */}
        <nav aria-label="Primary Navigation" className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="whitespace-nowrap shrink-0 text-sm font-medium text-zinc-400 transition-colors duration-150 hover:text-white hover:underline hover:underline-offset-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 rounded"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Single primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href={release.downloadUrl}
            target={isExternalDownload ? '_blank' : undefined}
            rel={isExternalDownload ? 'noopener noreferrer' : undefined}
            download={!isExternalDownload ? release.apkFileName : undefined}
            onClick={handleNavDownload}
            className="hidden whitespace-nowrap shrink-0 rounded-lg bg-rose-600 px-4 py-2 text-sm font-semibold text-white transition-colors duration-150 hover:bg-rose-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 md:inline-flex"
          >
            Download APK
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 text-zinc-200 transition-colors active:bg-white/[0.08] hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 md:hidden"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile Navigation"
          className="border-t border-white/[0.07] bg-[#0B0B10] px-4 py-3 md:hidden"
        >
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="flex min-h-[44px] items-center rounded-xl px-3 text-sm font-medium text-zinc-200 transition-colors active:bg-white/[0.08] hover:bg-white/[0.05] hover:text-white"
              >
                {item.label}
              </a>
            ))}
            <a
              href={release.downloadUrl}
              target={isExternalDownload ? '_blank' : undefined}
              rel={isExternalDownload ? 'noopener noreferrer' : undefined}
              download={!isExternalDownload ? release.apkFileName : undefined}
              onClick={handleNavDownload}
              className="mt-2 inline-flex min-h-[48px] items-center justify-center rounded-xl bg-rose-600 px-4 text-sm font-semibold text-white transition-transform active:scale-[0.98] hover:bg-rose-500"
            >
              Download APK
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
