import { useEffect, useState } from 'react';
import { DEFAULT_RELEASE, type StreamXRelease } from '../config/release';

export function useReleaseManifest() {
  const [release, setRelease] = useState<StreamXRelease>(DEFAULT_RELEASE);
  const [isPlaceholderModalOpen, setIsPlaceholderModalOpen] = useState(false);
  const [isCheckingDownload, setIsCheckingDownload] = useState(false);

  useEffect(() => {
    let active = true;

    async function loadManifest() {
      try {
        const res = await fetch('/release-manifest.json', { cache: 'no-store' });
        if (!res.ok) return;
        const data = (await res.json()) as Partial<StreamXRelease>;
        if (!active || !data || typeof data.version !== 'string') return;

        setRelease((prev) => ({
          ...prev,
          ...data,
          whatsNew: {
            newFeatures: Array.isArray(data.whatsNew?.newFeatures)
              ? data.whatsNew.newFeatures
              : prev.whatsNew.newFeatures,
            improvements: Array.isArray(data.whatsNew?.improvements)
              ? data.whatsNew.improvements
              : prev.whatsNew.improvements,
            bugFixes: Array.isArray(data.whatsNew?.bugFixes)
              ? data.whatsNew.bugFixes
              : prev.whatsNew.bugFixes,
          },
        }));
      } catch {
        // Retain static DEFAULT_RELEASE fallback silently if manifest is unreachable
      }
    }

    loadManifest();
    return () => {
      active = false;
    };
  }, []);

  const isExternalDownload = /^https?:\/\//i.test(release.downloadUrl);

  const triggerDirectDownload = () => {
    const link = document.createElement('a');
    link.href = release.downloadUrl;
    if (isExternalDownload) {
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    } else {
      link.setAttribute('download', release.apkFileName || 'StreamX-4.9.1-streamx.15.apk');
      link.rel = 'noopener noreferrer';
    }
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleApkDownload = async (onStarted?: () => void) => {
    if (isCheckingDownload) return;

    if (isExternalDownload && !release.isPlaceholderBuild) {
      onStarted?.();
      return;
    }

    setIsCheckingDownload(true);

    try {
      const isLocalPath = release.downloadUrl.startsWith('/');

      if (isLocalPath) {
        const headRes = await fetch(release.downloadUrl, {
          method: 'HEAD',
          cache: 'no-store',
        });
        const contentType = headRes.headers.get('content-type') || '';
        const isBinaryAvailable =
          headRes.ok && !contentType.toLowerCase().includes('text/html');

        if (!isBinaryAvailable) {
          setIsPlaceholderModalOpen(true);
          return;
        }
      } else if (release.isPlaceholderBuild) {
        setIsPlaceholderModalOpen(true);
        return;
      }

      triggerDirectDownload();
      onStarted?.();
    } catch {
      if (release.isPlaceholderBuild) {
        setIsPlaceholderModalOpen(true);
      } else {
        triggerDirectDownload();
        onStarted?.();
      }
    } finally {
      setIsCheckingDownload(false);
    }
  };

  return {
    release,
    isExternalDownload,
    isCheckingDownload,
    isPlaceholderModalOpen,
    setIsPlaceholderModalOpen,
    handleApkDownload,
  };
}
