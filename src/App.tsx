import { useCallback, useEffect, useRef, useState } from 'react';
import { ApkPlaceholderModal } from './components/ApkPlaceholderModal';
import { DownloadSection } from './components/DownloadSection';
import { ExtensionsSection } from './components/ExtensionsSection';
import { FeaturesSection } from './components/FeaturesSection';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { InstallGuideSection } from './components/InstallGuideSection';
import { Navbar } from './components/Navbar';
import { Toast, type ToastMessage } from './components/Toast';
import { WhatsNewSection } from './components/WhatsNewSection';
import { useReleaseManifest } from './hooks/useReleaseManifest';

export default function App() {
  const {
    release,
    isCheckingDownload,
    isPlaceholderModalOpen,
    setIsPlaceholderModalOpen,
    handleApkDownload,
  } = useReleaseManifest();

  const [toast, setToast] = useState<ToastMessage | null>(null);
  const timerRef = useRef<number | null>(null);

  const showToast = useCallback(
    (title: string, description?: string, variant: 'success' | 'info' = 'success') => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }
      setToast({ id: Date.now(), title, description, variant });
      timerRef.current = window.setTimeout(() => {
        setToast(null);
      }, 4500);
    },
    [],
  );

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, []);

  const onDownloadClick = () => {
    handleApkDownload(() => {
      showToast(
        'Starting StreamX APK download',
        'If Android asks for permission, allow installation from this source to continue.',
        'info',
      );
    });
  };

  const onCopyRepositorySuccess = () => {
    showToast(
      'Manifest URL copied to clipboard',
      'Paste this URL inside StreamX extension settings to add Phisher98 Extensions.',
      'success',
    );
  };

  return (
    <div className="min-h-screen bg-[#08080B] text-zinc-100">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-rose-600 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>

      <Navbar />

      <main id="main-content">
        <HeroSection release={release} onDownloadClick={onDownloadClick} />
        <FeaturesSection />
        <DownloadSection
          release={release}
          isCheckingDownload={isCheckingDownload}
          onDownloadClick={onDownloadClick}
        />
        <ExtensionsSection onCopySuccess={onCopyRepositorySuccess} />
        <InstallGuideSection />
        <WhatsNewSection release={release} />
      </main>

      <Footer />

      <ApkPlaceholderModal
        isOpen={isPlaceholderModalOpen}
        onClose={() => setIsPlaceholderModalOpen(false)}
        release={release}
      />

      <Toast toast={toast} onDismiss={() => setToast(null)} />
    </div>
  );
}
