"use client";

import { motion, AnimatePresence } from "framer-motion";

function getEmbedUrl(url: string): string | null {
  const yt = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]+)/);
  if (yt) return `https://www.youtube.com/embed/${yt[1]}?autoplay=1`;
  const vimeo = url.match(/vimeo\.com\/(\d+)/);
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}?autoplay=1`;
  return null;
}

export default function VideoModal({
  open, onClose, videoUrl, title,
}: {
  open: boolean;
  onClose: () => void;
  videoUrl?: string;
  title?: string;
}) {
  const embedUrl = videoUrl ? getEmbedUrl(videoUrl) : null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[999] flex items-center justify-center p-6"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gray-900 rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl border border-white/10"
          >
            <div className="aspect-video bg-black flex items-center justify-center">
              {embedUrl ? (
                <iframe
                  src={embedUrl}
                  className="w-full h-full"
                  allow="autoplay; encrypted-media; fullscreen"
                  allowFullScreen
                />
              ) : videoUrl ? (
                // eslint-disable-next-line jsx-a11y/media-has-caption
                <video src={videoUrl} controls autoPlay className="w-full h-full" />
              ) : (
                <p className="text-white/50 text-sm">Video coming soon</p>
              )}
            </div>
            {title && (
              <div className="px-6 py-4 flex items-center justify-between">
                <p className="text-white font-bold text-sm">{title}</p>
                <button onClick={onClose} className="text-white/40 hover:text-white transition-colors text-sm">✕ Close</button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
