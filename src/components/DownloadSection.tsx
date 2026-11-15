import { ArrowDownToLine, Info, Smartphone } from 'lucide-react';
import { useState, type MouseEvent } from 'react';
import appIcon from '../assets/images/streamx_app_icon_1794566284521.jpg';
import type { StreamXRelease } from '../config/release';

interface DownloadSectionProps {
  release: StreamXRelease;
  isExternalDownload: boolean;
  isCheckingDownload: boolean;
  onDownloadClick: () => void;
}

export function DownloadSection({
  release,
  isExternalDownload,
  isCheckingDownload,
  onDownloadClick,
}: DownloadSectionProps) {
  const [iconFailed, setIconFailed] = useState(false);

  const handleDownload = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!isExternalDownload || release.isPlaceholderBuild) {
      event.preventDefault();
    }
    onDownloadClick();
  };

  return (
    <section
      id="download"
      className="border-b border-white/[0.06] bg-[#08080B] py-14 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl border border-white/[0.1] bg-gradient-to-b from-[#13131B] to-[#0D0D13] p-5 sm:p-10 lg:p-12">
          <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-10">
            {/* Left: App identity & specifications */}
            <div className="min-w-0 lg:col-span-7">
              <div className="flex items-center gap-4 sm:gap-5">
                <div className="h-16 w-16 shrink-0 overflow-hidden rounded-2xl border border-white/15 bg-[#09090D] shadow-xl sm:h-24 sm:w-24">
                  {!iconFailed ? (
                    <img
                      src={appIcon}
                      alt="StreamX Android application icon"
                      referrerPolicy="no-referrer"
                      onError={() => setIconFailed(true)}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-[#14141D]">
                      <Smartphone className="h-8 w-8 text-rose-500 sm:h-9 sm:w-9" aria-hidden="true" />
                    </div>
                  )}
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-medium text-rose-400 sm:text-sm">
                    Official Android Release
                  </p>
                  <h2 className="mt-1 font-display text-2xl font-bold tracking-tight text-white sm:text-4xl">
                    Download StreamX
                  </h2>
                  <p className="mt-1 text-xs text-zinc-400 sm:mt-1.5 sm:text-sm">
                    Version {release.version} · {release.fileSize} · {release.releaseDate}
                  </p>
                </div>
              </div>

              {/* Release specifications grid */}
              <dl className="mt-6 grid grid-cols-2 gap-x-4 gap-y-4 border-y border-white/[0.08] py-5 sm:mt-8 sm:grid-cols-4 sm:gap-x-6 sm:gap-y-5 sm:py-6">
                <div>
                  <dt className="text-xs text-zinc-500">Latest Version</dt>
                  <dd className="mt-1 font-mono text-sm font-semibold tabular-nums text-white">
                    v{release.version}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-zinc-500">APK File Size</dt>
                  <dd className="mt-1 font-mono text-sm font-semibold tabular-nums text-white">
                    {release.fileSize}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-zinc-500">Android Compatibility</dt>
                  <dd className="mt-1 text-sm font-semibold text-white">
                    {release.androidCompatibility}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-zinc-500">Release Date</dt>
                  <dd className="mt-1 text-sm font-semibold tabular-nums text-white">
                    {release.releaseDate}
                  </dd>
                </div>
              </dl>

              {/* Unknown sources notice */}
              <div className="mt-5 flex items-start gap-3 rounded-xl border border-white/[0.08] bg-white/[0.025] p-4 text-xs leading-relaxed text-zinc-300 sm:mt-6 sm:text-sm">
                <Info className="mt-0.5 h-5 w-5 shrink-0 text-zinc-400" aria-hidden="true" />
                <p>
                  Because StreamX is distributed as a direct APK installer outside Google Play,
                  Android may ask you to allow installation from unknown sources for your browser or
                  file manager before completing setup.
                </p>
              </div>
            </div>

            {/* Right: Primary direct download action */}
            <div className="min-w-0 flex flex-col justify-center rounded-2xl border border-white/[0.08] bg-black/40 p-5 sm:p-8 lg:col-span-5">
              <p className="text-xs font-medium text-zinc-400">Official APK Download</p>
              <p className="mt-1 font-display text-xl font-semibold text-white">
                {release.apkFileName}
              </p>
              <p className="mt-1 text-xs text-zinc-400">
                Liquid Glass UI · 4K UHD · EAX 4.1 Surround · Shrunk APK
              </p>
              <p className="mt-0.5 text-xs text-zinc-500">{release.architecture}</p>

              <a
                href={release.downloadUrl}
                target={isExternalDownload ? '_blank' : undefined}
                rel={isExternalDownload ? 'noopener noreferrer' : undefined}
                download={!isExternalDownload ? release.apkFileName : undefined}
                onClick={handleDownload}
                aria-busy={isCheckingDownload}
                className="mt-5 inline-flex min-h-[52px] w-full items-center justify-center gap-3 rounded-xl bg-rose-600 px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-rose-950/40 transition-all duration-150 active:scale-[0.98] hover:bg-rose-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 sm:mt-6"
              >
                <ArrowDownToLine className="h-5 w-5 shrink-0" aria-hidden="true" />
                <span>
                  {isCheckingDownload ? 'Checking package...' : 'Download APK'}
                </span>
              </a>

              <div className="mt-4 space-y-1.5 text-xs text-zinc-400">
                <p className="flex min-w-0 items-center justify-between gap-2">
                  <span className="shrink-0">Download Source:</span>
                  <code className="min-w-0 truncate font-mono text-zinc-300">
                    {release.downloadUrl}
                  </code>
                </p>
                {release.isPlaceholderBuild && (
                  <p className="text-zinc-500">
                    Placeholder URL active — upload your signed APK or update{' '}
                    <code className="font-mono text-zinc-300">release-manifest.json</code> to go
                    live.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
