import { Check, Copy, ExternalLink, FolderGit2 } from 'lucide-react';
import { useState } from 'react';
import { EXTENSION_REPOSITORY } from '../config/release';

interface ExtensionsSectionProps {
  onCopySuccess: () => void;
}

export function ExtensionsSection({ onCopySuccess }: ExtensionsSectionProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyManifest = async () => {
    const manifestUrl = EXTENSION_REPOSITORY.manifestUrl;

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(manifestUrl);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = manifestUrl;
        textArea.style.position = 'fixed';
        textArea.style.left = '-9999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopied(true);
      onCopySuccess();
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      onCopySuccess();
    }
  };

  return (
    <section
      id="extensions"
      className="border-b border-white/[0.06] bg-[#08080B] py-14 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Left intro */}
          <div className="min-w-0 lg:col-span-5">
            <p className="text-sm font-medium text-rose-400">Extensions Repository</p>
            <h2
              className="mt-2 font-display text-2xl font-bold tracking-tight text-white sm:text-4xl"
              style={{ textWrap: 'balance' }}
            >
              Expand Your Streaming Experience
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400 sm:mt-4 sm:text-base">
              Connect compatible streaming repositories to discover additional content sources.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-zinc-500 sm:mt-4">
              You can add the repository manifest URL directly inside StreamX under extension
              settings if repository imports are supported by your installed application version.
            </p>
          </div>

          {/* Right repository card */}
          <div className="min-w-0 lg:col-span-7">
            <article className="rounded-2xl border border-white/[0.1] bg-[#101016] p-5 sm:p-8">
              <div className="flex items-start justify-between gap-4 border-b border-white/[0.08] pb-5 sm:pb-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-rose-400">
                    <FolderGit2 className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500">Featured Community Repository</p>
                    <h3 className="mt-0.5 font-display text-lg font-semibold text-white sm:text-xl">
                      {EXTENSION_REPOSITORY.name}
                    </h3>
                  </div>
                </div>
              </div>

              <dl className="mt-5 space-y-4 sm:mt-6 sm:space-y-5">
                <div>
                  <dt className="text-xs font-medium text-zinc-400">Official Repository</dt>
                  <dd className="mt-1.5">
                    <a
                      href={EXTENSION_REPOSITORY.officialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 break-all font-mono text-xs text-zinc-200 underline decoration-white/20 underline-offset-4 transition-colors hover:text-white hover:decoration-rose-500 sm:text-sm"
                    >
                      <span>{EXTENSION_REPOSITORY.officialUrl}</span>
                      <ExternalLink className="h-3.5 w-3.5 shrink-0 text-zinc-400" aria-hidden="true" />
                    </a>
                  </dd>
                </div>

                <div>
                  <dt className="text-xs font-medium text-zinc-400">Repository Manifest</dt>
                  <dd className="mt-1.5 rounded-xl border border-white/[0.08] bg-black/50 px-3.5 py-3 font-mono text-xs leading-relaxed text-zinc-300 break-all sm:px-4">
                    {EXTENSION_REPOSITORY.manifestUrl}
                  </dd>
                </div>
              </dl>

              <div className="mt-6 flex flex-col gap-3 sm:mt-7 sm:flex-row sm:flex-wrap sm:items-center">
                <a
                  href={EXTENSION_REPOSITORY.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 whitespace-nowrap rounded-xl border border-white/15 bg-white/[0.05] px-5 py-2.5 text-sm font-semibold text-white transition-all duration-150 active:scale-[0.98] hover:bg-white/[0.1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 sm:w-auto"
                >
                  <span>Visit Repository</span>
                  <ExternalLink className="h-4 w-4 shrink-0 text-zinc-400" aria-hidden="true" />
                </a>

                <button
                  type="button"
                  onClick={handleCopyManifest}
                  className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-rose-600 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-150 active:scale-[0.98] hover:bg-rose-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 sm:w-auto"
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 shrink-0" aria-hidden="true" />
                      <span>Copied Manifest URL</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 shrink-0" aria-hidden="true" />
                      <span>Copy Repository URL</span>
                    </>
                  )}
                </button>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
