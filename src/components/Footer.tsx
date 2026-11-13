import { StreamXLogo } from './StreamXLogo';

const FOOTER_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Download', href: '#download' },
  { label: 'Features', href: '#features' },
  { label: 'Extensions Repository', href: '#extensions' },
  { label: 'Installation Guide', href: '#install-guide' },
] as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#08080B] py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-8 border-b border-white/[0.08] pb-8 md:flex-row md:items-center">
          <a
            href="#home"
            aria-label="Back to StreamX Home"
            className="w-fit rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
          >
            <StreamXLogo />
          </a>

          <nav aria-label="Footer Navigation" className="flex flex-wrap gap-x-7 gap-y-3">
            {FOOTER_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="whitespace-nowrap text-sm text-zinc-400 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 rounded"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-8 flex flex-col justify-between gap-4 text-xs text-zinc-500 sm:flex-row sm:items-center">
          <p>&copy; {year} StreamX. All rights reserved.</p>
          <p>
            StreamX does not host media files. Users are responsible for any third-party extension
            repositories they choose to connect.
          </p>
        </div>
      </div>
    </footer>
  );
}
