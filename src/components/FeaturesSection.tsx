import {
  Bookmark,
  Film,
  Layers,
  MonitorPlay,
  PlayCircle,
  Sparkles,
} from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import playerPreview from '../assets/images/player_4k_preview_1794566285459.jpg';

export function FeaturesSection() {
  const [playerImageFailed, setPlayerImageFailed] = useState(false);

  return (
    <section
      id="features"
      className="border-b border-white/[0.06] bg-[#08080B] py-14 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-rose-400">Core Capabilities</p>
          <h2
            className="mt-2 font-display text-2xl font-bold tracking-tight text-white sm:text-4xl"
            style={{ textWrap: 'balance' }}
          >
            Engineered for seamless Android streaming
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-400 sm:mt-4 sm:text-base">
            Every layer of StreamX is built around clean media discovery, responsive playback
            controls, and flexible source management.
          </p>
        </div>

        {/* Asymmetric Bento Grid */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-12 sm:gap-5 lg:grid-cols-12">
          {/* 1. Featured Wide Card: Premium Video Player */}
          <motion.article
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-between overflow-hidden rounded-2xl border border-white/[0.08] bg-[#101016] p-6 transition-colors duration-200 hover:border-white/[0.16] sm:p-8 lg:col-span-7"
          >
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-rose-400">
                  <PlayCircle className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="font-display text-xl font-semibold text-white">
                  Premium Video Player
                </h3>
              </div>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-zinc-400">
                Responsive touch gestures for brightness, volume, and timeline scrubbing paired with
                EAX 4.1 surround audio settings and crisp subtitle controls.
              </p>
            </div>

            <div className="mt-6 overflow-hidden rounded-xl border border-white/[0.08] bg-black">
              {!playerImageFailed ? (
                <img
                  src={playerPreview}
                  alt="StreamX landscape 4K video player playback view"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  onError={() => setPlayerImageFailed(true)}
                  className="aspect-[16/9] w-full object-cover"
                />
              ) : (
                <div className="flex aspect-[16/9] w-full items-center justify-center bg-gradient-to-br from-[#161620] to-[#0A0A0E] text-zinc-400">
                  <PlayCircle className="h-10 w-10 text-rose-500" aria-hidden="true" />
                </div>
              )}
            </div>
          </motion.article>

          {/* 2. 4K Playback & EAX 4.1 Surround Sound */}
          <motion.article
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.4, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-[#101016] p-6 transition-colors duration-200 hover:border-white/[0.16] sm:p-8 lg:col-span-5"
          >
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-rose-400">
                <MonitorPlay className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="mt-5 font-display text-xl font-semibold text-white">
                4K Playback &amp; EAX 4.1 Surround Sound
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                Stream compatible titles in crisp 4K Ultra HD video paired with EAX 4.1 surround
                sound settings for deeper spatial audio clarity on headphones and speakers.
              </p>
            </div>

            <div className="mt-8 border-t border-white/[0.07] pt-5">
              <p className="text-xs text-zinc-500">Video &amp; Audio Profiles</p>
              <p className="mt-1.5 font-mono text-sm text-zinc-200">
                2160p 4K UHD · EAX 4.1 Surround · 1080p
              </p>
            </div>
          </motion.article>

          {/* 3. Movies & TV Shows */}
          <motion.article
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.4, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-2xl border border-white/[0.08] bg-[#101016] p-6 transition-colors duration-200 hover:border-white/[0.16] sm:p-7 lg:col-span-4"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-rose-400">
              <Film className="h-5 w-5" aria-hidden="true" />
            </div>
            <h3 className="mt-5 font-display text-lg font-semibold text-white">
              Movies &amp; TV Shows
            </h3>
            <p className="mt-2.5 text-sm leading-relaxed text-zinc-400">
              Browse feature films and multi-season TV series with organized episode lists, artwork,
              and synopsis details in one place.
            </p>
          </motion.article>

          {/* 4. Multiple Streaming Sources */}
          <motion.article
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.4, delay: 0.11, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-2xl border border-white/[0.08] bg-[#101016] p-6 transition-colors duration-200 hover:border-white/[0.16] sm:p-7 lg:col-span-4"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-rose-400">
              <Layers className="h-5 w-5" aria-hidden="true" />
            </div>
            <h3 className="mt-5 font-display text-lg font-semibold text-white">
              Multiple Streaming Sources
            </h3>
            <p className="mt-2.5 text-sm leading-relaxed text-zinc-400">
              Switch effortlessly between available playback mirrors and source resolutions if a
              stream slows down or fails to load.
            </p>
          </motion.article>

          {/* 5. Personalized Watchlist */}
          <motion.article
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.4, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-2xl border border-white/[0.08] bg-[#101016] p-6 transition-colors duration-200 hover:border-white/[0.16] sm:p-7 lg:col-span-4"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-rose-400">
              <Bookmark className="h-5 w-5" aria-hidden="true" />
            </div>
            <h3 className="mt-5 font-display text-lg font-semibold text-white">
              Personalized Watchlist
            </h3>
            <p className="mt-2.5 text-sm leading-relaxed text-zinc-400">
              Bookmark movies and ongoing series to your personal watchlist so you can pick up
              where you left off without searching again.
            </p>
          </motion.article>

          {/* 6. Modern Cinematic Interface */}
          <motion.article
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.4, delay: 0.17, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-between gap-6 rounded-2xl border border-white/[0.08] bg-gradient-to-r from-[#101016] via-[#12121A] to-[#161017] p-6 transition-colors duration-200 hover:border-white/[0.16] sm:p-8 lg:col-span-12 lg:flex-row lg:items-center"
          >
            <div className="max-w-2xl">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-rose-400">
                  <Sparkles className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="font-display text-xl font-semibold text-white">
                  Modern Cinematic Interface &amp; Smoother Animations
                </h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400 sm:text-base">
                Crafted with an obsidian dark canvas, fluid page transitions, smoother scrolling
                animations, and thumb-friendly controls so browsing and playback feel effortless.
              </p>
            </div>

            <div className="grid shrink-0 grid-cols-2 gap-4 border-t border-white/[0.08] pt-5 sm:gap-8 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
              <div>
                <p className="text-xs text-zinc-500">Motion</p>
                <p className="mt-1 text-sm font-semibold text-zinc-100">Fluid Animations</p>
              </div>
              <div>
                <p className="text-xs text-zinc-500">Audio &amp; UI</p>
                <p className="mt-1 text-sm font-semibold text-zinc-100">EAX 4.1 · Dark UI</p>
              </div>
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
