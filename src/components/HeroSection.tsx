import { ArrowDownToLine, ChevronRight, Smartphone } from 'lucide-react';
import { motion } from 'motion/react';
import { useState, type MouseEvent } from 'react';
import heroBackdrop from '../assets/images/hero_cinema_backdrop_1794566284100.jpg';
import phoneShowcase from '../assets/images/streamx_phone_showcase_1794566284845.jpg';
import type { StreamXRelease } from '../config/release';
import { StreamXLogo } from './StreamXLogo';

interface HeroSectionProps {
  release: StreamXRelease;
  onDownloadClick: () => void;
}

export function HeroSection({ release, onDownloadClick }: HeroSectionProps) {
  const [backdropFailed, setBackdropFailed] = useState(false);
  const [phoneFailed, setPhoneFailed] = useState(false);

  const handlePrimaryClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    onDownloadClick();
  };

  return (
    <section
      id="home"
      className="relative overflow-hidden border-b border-white/[0.06] bg-[#08080B]"
    >
      {/* Subtle cinematic backdrop */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {!backdropFailed ? (
          <img
            src={heroBackdrop}
            alt=""
            referrerPolicy="no-referrer"
            onError={() => setBackdropFailed(true)}
            className="h-full w-full object-cover object-center opacity-40"
          />
        ) : (
          <div className="h-full w-full bg-[radial-gradient(ellipse_at_top_right,rgba(225,29,72,0.16),transparent_55%)]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-[#08080B]/70 via-[#08080B]/85 to-[#08080B]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#08080B] via-[#08080B]/75 to-transparent" />
      </div>

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-12 lg:gap-10 lg:px-8 lg:py-28">
        {/* Left column: Brand pitch & CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7"
        >
          <div className="mb-6 flex items-center gap-3 text-xs font-medium text-zinc-400">
            <StreamXLogo className="scale-95 origin-left" />
            <span aria-hidden="true" className="text-zinc-600">
              /
            </span>
            <span>Android Streaming Client</span>
          </div>

          <h1
            className="font-display font-bold tracking-tight text-white"
            style={{
              fontSize: 'clamp(2.5rem, 4.6vw, 4.125rem)',
              lineHeight: 1.06,
              textWrap: 'balance',
            }}
          >
            Your Entertainment. Your Way.
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-zinc-300 sm:text-lg">
            Discover movies and series with a premium streaming experience. Built for Android with
            4K playback support, multiple streaming sources, and a refined dark cinema interface.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href={release.downloadUrl}
              download={release.apkFileName}
              onClick={handlePrimaryClick}
              className="inline-flex min-h-[48px] items-center justify-center gap-2.5 whitespace-nowrap rounded-xl bg-rose-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-rose-950/30 transition-all duration-150 hover:bg-rose-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400"
            >
              <ArrowDownToLine className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>Download StreamX APK</span>
            </a>

            <a
              href="#features"
              className="inline-flex min-h-[48px] items-center justify-center gap-2 whitespace-nowrap rounded-xl border border-white/15 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-zinc-100 backdrop-blur-md transition-colors duration-150 hover:bg-white/[0.09] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400"
            >
              <span>Explore Features</span>
              <ChevronRight className="h-4 w-4 shrink-0 text-zinc-400" aria-hidden="true" />
            </a>
          </div>

          {/* Unboxed typographic metadata strip */}
          <dl className="mt-10 grid max-w-lg grid-cols-3 gap-6 border-t border-white/[0.08] pt-6">
            <div>
              <dt className="text-xs text-zinc-500">Latest Version</dt>
              <dd className="mt-1 font-mono text-sm font-medium tabular-nums text-zinc-100">
                v{release.version}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-zinc-500">Compatibility</dt>
              <dd className="mt-1 text-sm font-medium text-zinc-100">Android 8.0+</dd>
            </div>
            <div>
              <dt className="text-xs text-zinc-500">Video Support</dt>
              <dd className="mt-1 text-sm font-medium text-zinc-100">4K UHD Playback</dd>
            </div>
          </dl>
        </motion.div>

        {/* Right column: Phone Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5"
        >
          <div className="relative mx-auto max-w-[340px] sm:max-w-[380px] lg:max-w-none">
            <div
              className="pointer-events-none absolute -inset-4 rounded-[2.25rem] bg-gradient-to-tr from-rose-600/15 via-transparent to-zinc-400/10 blur-2xl"
              aria-hidden="true"
            />
            <div className="relative overflow-hidden rounded-[1.75rem] border border-white/[0.1] bg-[#0D0D12]/90 p-2.5 backdrop-blur-md">
              {!phoneFailed ? (
                <img
                  src={phoneShowcase}
                  alt="StreamX Android app interface displaying movies and TV series"
                  referrerPolicy="no-referrer"
                  onError={() => setPhoneFailed(true)}
                  className="aspect-[3/4] w-full rounded-[1.25rem] object-cover"
                />
              ) : (
                <div className="flex aspect-[3/4] w-full flex-col items-center justify-center rounded-[1.25rem] bg-gradient-to-b from-[#14141C] to-[#0B0B0F] p-8 text-center">
                  <Smartphone className="h-12 w-12 text-rose-500" aria-hidden="true" />
                  <p className="mt-4 font-display text-lg font-semibold text-white">
                    StreamX for Android
                  </p>
                  <p className="mt-1 text-sm text-zinc-400">
                    Movies, TV Shows &amp; 4K Playback
                  </p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
