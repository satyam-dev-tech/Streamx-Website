import { FileDown, ShieldAlert, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import type { StreamXRelease } from '../config/release';

interface ApkPlaceholderModalProps {
  isOpen: boolean;
  onClose: () => void;
  release: StreamXRelease;
}

export function ApkPlaceholderModal({ isOpen, onClose, release }: ApkPlaceholderModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="apk-placeholder-title"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.16 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.99 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="pb-safe relative z-10 w-full max-w-lg rounded-t-3xl border border-white/12 bg-[#111117] p-6 shadow-2xl sm:rounded-2xl sm:p-8"
          >
            <div
              className="mx-auto mb-4 h-1.5 w-10 rounded-full bg-white/15 sm:hidden"
              aria-hidden="true"
            />
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-rose-400">
                  <FileDown className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 id="apk-placeholder-title" className="font-display text-lg font-semibold text-white">
                    APK Download Placeholder Active
                  </h3>
                  <p className="text-xs text-zinc-400">
                    Version {release.version} · Target filename {release.apkFileName}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close dialog"
                className="rounded-lg p-1.5 text-zinc-400 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div className="mt-5 space-y-4 text-sm leading-relaxed text-zinc-300">
              <p>
                No APK binary has been uploaded to the download endpoint yet. This button is wired
                for direct file download and points to the configured placeholder URL:
              </p>

              <div className="rounded-xl border border-white/10 bg-black/50 px-4 py-3 font-mono text-xs text-zinc-200 break-all">
                {release.downloadUrl}
              </div>

              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-xs leading-relaxed text-zinc-400">
                <p className="font-semibold text-zinc-200">How to publish a real APK release:</p>
                <ol className="mt-2 list-decimal space-y-1.5 pl-4">
                  <li>
                    Upload your signed APK file to{' '}
                    <code className="font-mono text-zinc-200">public/downloads/streamx-latest.apk</code>{' '}
                    (or host it externally).
                  </li>
                  <li>
                    Update <code className="font-mono text-zinc-200">release-manifest.json</code> with
                    the new version, size, date, and download URL, then set{' '}
                    <code className="font-mono text-zinc-200">isPlaceholderBuild</code> to{' '}
                    <code className="font-mono text-zinc-200">false</code>.
                  </li>
                </ol>
              </div>

              <div className="flex items-start gap-2.5 rounded-xl border border-amber-500/20 bg-amber-500/[0.06] p-3.5 text-xs text-amber-200/90">
                <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" aria-hidden="true" />
                <span>
                  Once uploaded, Android devices may prompt users to allow installation from unknown
                  sources before installing the APK.
                </span>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-zinc-950 transition-colors hover:bg-zinc-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
              >
                Got it
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
