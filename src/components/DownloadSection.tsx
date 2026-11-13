import { ArrowDownToLine, Info, Smartphone } from 'lucide-react';
import { useState, type MouseEvent } from 'react';
import appIcon from '../assets/images/streamx_app_icon_1794566284521.jpg';
import type { StreamXRelease } from '../config/release';

interface DownloadSectionProps {
  release: StreamXRelease;
  isCheckingDownload: boolean;
  onDownloadClick: () => void;
}

export function DownloadSection({
  release,
  isCheckingDownload,
  onDownloadClick,
}: DownloadSectionProps) {
  const [iconFailed, setIconFailed] = useState(false);

  const handleDownload = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    onDownloadClick();
  };

  return (
    <section
      id="download"
      className="border-b border-white/[0.06] bg-[#08080B] py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl border border-white/[0.1] bg-gradient-to-b from-[#13131B] to-[#0D0D13] p-6 sm:p-10 lg:p-12">
          <div className="grid items-center gap-10 lg:grid-cols-12">
            {/* Left: App identity & specifications */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-5">
                <div className="h-20 w-20 shrink-0 overflow-hidden rounded-2xl border border-white/15 bg-[#09090D] shadow-xl sm:h-24 sm:w-24">
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
                      <Smartphone className="h-9 w-9 text-rose-500" aria-hidden="true" />
                    </div>
                  )}
                </div>

                <div>
                  <p className="text-sm font-medium text-rose-400">Official Android Release</p>
                  <h2 className="mt-1 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
                    Download StreamX
                  </h2>
                  <p className="mt-1.5 text-sm text-zinc-400">
                    Version {release.version} · {release.fileSize} · Released {release.releaseDate}
                  </p>
                </div>
              </div>

              {/* Release specifications grid */}
              <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 border-y border-white/[0.08] py-6 sm:grid-cols-4">
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
              <div className="mt-6 flex items-start gap-3 rounded-xl border border-white/[0.08] bg-white/[0.025] p-4 text-sm leading-relaxed text-zinc-300">
                <Info className="mt-0.5 h-5 w-5 shrink-0 text-zinc-400" aria-hidden="true" />
                <p>
                  Because StreamX is distributed as a direct APK installer outside Google Play,
                  Android may ask you to allow installation from unknown sources for your browser or
                  file manager before completing setup.
                </p>
              </div>
            </div>

            {/* Right: Primary direct download action */}
            <div className="flex flex-col justify-center rounded-2xl border border-white/[0.08] bg-black/40 p-6 sm:p-8 lg:col-span-5">
              <p className="text-xs font-medium text-zinc-400">Direct APK Installer</p>
              <p className="mt-1 font-display text-xl font-semibold text-white">
                {release.apkFileName}
              </p>
              <p className="mt-1 text-xs text-zinc-500">{release.architecture}</p>

              <a
                href={release.downloadUrl}
                download={release.apkFileName}
                onClick={handleDownload}
                aria-busy={isCheckingDownload}
                className="mt-6 inline-flex min-h-[54px] w-full items-center justify-center gap-3 rounded-xl bg-rose-600 px-6 py-4 text-base font-semibold text-white shadow-lg shadow-rose-950/40 transition-all duration-150 hover:bg-rose-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400"
              >
                <ArrowDownToLine className="h-5 w-5 shrink-0" aria-hidden="true" />
                <span>
                  {isCheckingDownload ? 'Checking package...' : 'Download APK'}
                </span>
              </a>

              <div className="mt-4 space-y-1.5 text-xs text-zinc-400">
                <p className="flex items-center justify-between gap-2">
                  <span>Configured URL:</span>
                  <code className="truncate font-mono text-zinc-300">{release.downloadUrl}</code>
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
