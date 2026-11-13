import { Sparkles, Wrench, Bug } from 'lucide-react';
import type { StreamXRelease } from '../config/release';

interface WhatsNewSectionProps {
  release: StreamXRelease;
}

export function WhatsNewSection({ release }: WhatsNewSectionProps) {
  return (
    <section
      id="whats-new"
      className="border-b border-white/[0.06] bg-[#08080B] py-14 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 border-b border-white/[0.08] pb-6 sm:flex-row sm:items-end sm:pb-8">
          <div>
            <p className="text-sm font-medium text-rose-400">Release Notes</p>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-white sm:text-4xl">
              What&apos;s New in StreamX
            </h2>
          </div>

          <div className="text-sm text-zinc-400">
            <span className="font-mono font-semibold tabular-nums text-white">
              Version {release.version}
            </span>
            <span aria-hidden="true" className="mx-2 text-zinc-600">
              ·
            </span>
            <span className="tabular-nums">Released {release.releaseDate}</span>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-10 sm:gap-6 lg:grid-cols-3">
          {/* New Features */}
          <article className="rounded-2xl border border-white/[0.08] bg-[#101016] p-5 sm:p-7">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-rose-400">
                <Sparkles className="h-4 w-4" aria-hidden="true" />
              </div>
              <h3 className="font-display text-lg font-semibold text-white">New Features</h3>
            </div>
            <ul className="mt-5 space-y-3.5 text-sm leading-relaxed text-zinc-300">
              {release.whatsNew.newFeatures.map((item) => (
                <li key={item} className="flex gap-2.5">
                  <span aria-hidden="true" className="text-rose-500">
                    —
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>

          {/* Improvements */}
          <article className="rounded-2xl border border-white/[0.08] bg-[#101016] p-6 sm:p-7">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-zinc-200">
                <Wrench className="h-4 w-4" aria-hidden="true" />
              </div>
              <h3 className="font-display text-lg font-semibold text-white">Improvements</h3>
            </div>
            <ul className="mt-5 space-y-3.5 text-sm leading-relaxed text-zinc-300">
              {release.whatsNew.improvements.map((item) => (
                <li key={item} className="flex gap-2.5">
                  <span aria-hidden="true" className="text-zinc-500">
                    —
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>

          {/* Bug Fixes */}
          <article className="rounded-2xl border border-white/[0.08] bg-[#101016] p-6 sm:p-7">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-zinc-200">
                <Bug className="h-4 w-4" aria-hidden="true" />
              </div>
              <h3 className="font-display text-lg font-semibold text-white">Bug Fixes</h3>
            </div>
            <ul className="mt-5 space-y-3.5 text-sm leading-relaxed text-zinc-300">
              {release.whatsNew.bugFixes.map((item) => (
                <li key={item} className="flex gap-2.5">
                  <span aria-hidden="true" className="text-zinc-500">
                    —
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}
