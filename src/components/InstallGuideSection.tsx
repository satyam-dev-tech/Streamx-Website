import {
  CheckCircle2,
  Download,
  FileBox,
  Play,
  ShieldCheck,
} from 'lucide-react';
import { motion } from 'motion/react';

const INSTALL_STEPS = [
  {
    number: '01',
    title: 'Download the StreamX APK',
    description:
      'Tap the Download StreamX APK button to save the official Android installer package directly to your device.',
    icon: Download,
  },
  {
    number: '02',
    title: 'Open the downloaded APK',
    description:
      'Tap the finished download notification or locate StreamX-v1.0.0.apk inside your Android Files app.',
    icon: FileBox,
  },
  {
    number: '03',
    title: 'Allow installation from this source',
    description:
      'If Android prompts for permission, open Settings and enable "Allow from this source" for your browser or file manager.',
    icon: ShieldCheck,
  },
  {
    number: '04',
    title: 'Tap Install',
    description:
      'Review the standard Android installation prompt and tap Install to set up StreamX on your device.',
    icon: CheckCircle2,
  },
  {
    number: '05',
    title: 'Open StreamX and enjoy',
    description:
      'Launch StreamX from your app drawer, configure your preferences or extensions, and start watching.',
    icon: Play,
  },
] as const;

export function InstallGuideSection() {
  return (
    <section
      id="install-guide"
      className="border-b border-white/[0.06] bg-[#08080B] py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-rose-400">Installation Guide</p>
          <h2
            className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl"
            style={{ textWrap: 'balance' }}
          >
            Set up StreamX on Android in five steps
          </h2>
          <p className="mt-4 text-base leading-relaxed text-zinc-400">
            Follow these steps to sideload the APK safely on any compatible Android smartphone or
            tablet.
          </p>
        </div>

        <ol className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {INSTALL_STEPS.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.li
                key={step.number}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.35, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-[#101016] p-6 transition-colors duration-200 hover:border-white/[0.18]"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-sm font-semibold tabular-nums text-rose-400">
                      {step.number}
                    </span>
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-zinc-200">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </div>
                  </div>
                  <h3 className="mt-5 font-display text-base font-semibold leading-snug text-white">
                    {step.title}
                  </h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">{step.description}</p>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
