import { useEffect, useRef } from 'react';
import { renders } from '../data';
import { ChevronLeft, ChevronRight, CloseIcon } from '../icons';

interface LightboxProps {
  index: number;
  onChange: (i: number) => void;
  onClose: () => void;
}

const wrap = (i: number) => (i + renders.length) % renders.length;

export default function Lightbox({ index, onChange, onClose }: LightboxProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const startX = useRef<number | null>(null);

  useEffect(() => {
    closeRef.current?.focus();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onChange(wrap(index - 1));
      if (e.key === 'ArrowRight') onChange(wrap(index + 1));
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [index, onChange, onClose]);

  const r = renders[index];
  return (
    <div className="lb" role="dialog" aria-modal="true" aria-label="Image viewer">
      <div className="lb-top">
        <div><small>Gallery · {index + 1} / {renders.length}</small>{r.t}</div>
        <button ref={closeRef} className="ic" type="button" aria-label="Close" onClick={onClose}><CloseIcon /></button>
      </div>
      <div className="lb-stage">
        <button className="ic" type="button" aria-label="Previous" onClick={() => onChange(wrap(index - 1))}><ChevronLeft /></button>
        <div
          className="lb-media"
          onTouchStart={e => { startX.current = e.touches[0].clientX; }}
          onTouchEnd={e => {
            if (startX.current === null) return;
            const dx = e.changedTouches[0].clientX - startX.current;
            if (Math.abs(dx) > 40) onChange(wrap(index + (dx < 0 ? 1 : -1)));
            startX.current = null;
          }}
        >
          <img src={r.src} alt={r.t} />
        </div>
        <button className="ic" type="button" aria-label="Next" onClick={() => onChange(wrap(index + 1))}><ChevronRight /></button>
      </div>
    </div>
  );
}
