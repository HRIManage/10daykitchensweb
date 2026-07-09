"use client";

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { motion, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { ease } from "@/lib/motion";

type GalleryImage = { src: string; alt: string };

const HOVER_QUERY = "(hover: hover)";

function subscribeHover(callback: () => void) {
  const mql = window.matchMedia(HOVER_QUERY);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function useSupportsHover(): boolean {
  return useSyncExternalStore(
    subscribeHover,
    () => window.matchMedia(HOVER_QUERY).matches,
    () => false
  );
}

/** Round-robin split so every column gets an even share and uniform gaps. */
function distributeToColumns<T>(items: T[], n: number): T[][] {
  const cols: T[][] = Array.from({ length: n }, () => []);
  items.forEach((item, i) => cols[i % n].push(item));
  return cols;
}

function Lightbox({
  images,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  images: GalleryImage[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") onPrev();
      else if (e.key === "ArrowRight") onNext();
      else if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onPrev, onNext, onClose]);

  const btnBase =
    "fixed z-[2147483647] flex items-center justify-center text-white/90 hover:text-white transition-colors";

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[2147483640] flex items-center justify-center bg-black/85 backdrop-blur-sm"
    >
      <img
        src={images[index].src}
        alt={images[index].alt}
        className="pointer-events-none block max-w-[min(88vw,1400px)] max-h-[88vh] w-auto h-auto rounded-xl"
      />
      <button
        type="button"
        aria-label="Previous image"
        className={`${btnBase} left-2 sm:left-4 top-1/2 -translate-y-1/2 h-14 w-14`}
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
      >
        <ChevronLeft className="h-8 w-8" />
      </button>
      <button
        type="button"
        aria-label="Next image"
        className={`${btnBase} right-2 sm:right-4 top-1/2 -translate-y-1/2 h-14 w-14`}
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
      >
        <ChevronRight className="h-8 w-8" />
      </button>
      <button
        type="button"
        aria-label="Close"
        className={`${btnBase} top-4 right-4 h-11 w-11`}
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
      >
        <X className="h-6 w-6" />
      </button>
    </motion.div>,
    document.body
  );
}

function GalleryTile({
  image,
  globalIndex,
  onOpen,
}: {
  image: GalleryImage;
  globalIndex: number;
  onOpen: (index: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const supportsHover = useSupportsHover();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -8;
    setTilt({ x, y });
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease, delay: (globalIndex % 6) * 0.08 }}
      className="rounded-xl overflow-hidden cursor-pointer relative"
      style={{ perspective: 800 }}
      onMouseEnter={() => supportsHover && setHovered(true)}
      onMouseMove={(e) => supportsHover && handleMouseMove(e)}
      onMouseLeave={() => {
        setHovered(false);
        setTilt({ x: 0, y: 0 });
      }}
      onClick={() => onOpen(globalIndex)}
    >
      <img
        src={image.src}
        alt={image.alt}
        loading="lazy"
        className="w-full h-full object-cover block transition-transform duration-300 ease-out"
        style={{
          transform:
            supportsHover && hovered
              ? `scale(1.06) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`
              : "scale(1)",
        }}
      />
      <div
        className="absolute inset-0 bg-[#111111] pointer-events-none transition-opacity duration-300"
        style={{ opacity: supportsHover && hovered ? 0.08 : 0 }}
      />
    </motion.div>
  );
}

export default function MasonryGallery({
  images,
  columns = 3,
}: {
  images: GalleryImage[];
  columns?: number;
}) {
  const [currentColumns, setCurrentColumns] = useState(columns);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth;
      if (width < 480) setCurrentColumns(1);
      else if (width < 768) setCurrentColumns(Math.min(2, columns));
      else if (width < 1024) setCurrentColumns(Math.min(3, columns));
      else setCurrentColumns(columns);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [columns]);

  // Distribute in reading order (row-major) so column N holds every Nth image.
  const columnArrays = useMemo(
    () => distributeToColumns(images, currentColumns),
    [images, currentColumns]
  );

  return (
    <div className="relative">
      <div className="flex flex-row gap-4 items-start">
        {columnArrays.map((col, colIndex) => (
          <div key={colIndex} className="flex-1 flex flex-col gap-4 min-w-0">
            {col.map((image, rowIndex) => {
              const globalIndex = rowIndex * currentColumns + colIndex;
              return (
                <GalleryTile
                  key={image.src}
                  image={image}
                  globalIndex={globalIndex}
                  onOpen={setLightboxIndex}
                />
              );
            })}
          </div>
        ))}
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={images}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() => setLightboxIndex((i) => ((i ?? 0) - 1 + images.length) % images.length)}
          onNext={() => setLightboxIndex((i) => ((i ?? 0) + 1) % images.length)}
        />
      )}
    </div>
  );
}
