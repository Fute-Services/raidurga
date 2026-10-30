import type { ReactNode } from 'react';

export type IconKey =
  | 'master' | 'location' | 'amenities' | 'details' | 'vr' | 'brochure'
  | 'circulation' | 'info' | 'progress' | 'walk' | 'gallery' | 'drone' | 'home';

const paths: Record<IconKey, ReactNode> = {
  master: <path d="M4 20V8l5-4v16M9 20V6l6 3v11M15 20v-8l5 2v6M3 20h18" />,
  location: <><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></>,
  amenities: <path d="M12 3l2 5 5 .5-4 3.5 1.5 5L12 14l-4.5 3 1.5-5-4-3.5 5-.5z" />,
  details: <><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M8 8h8M8 12h8M8 16h5" /></>,
  vr: <><path d="M3 9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-4l-3-3-3 3H5a2 2 0 0 1-2-2z" /><circle cx="8" cy="12" r="1.5" /><circle cx="16" cy="12" r="1.5" /></>,
  brochure: <><path d="M6 3h9l4 4v14H6z" /><path d="M14 3v5h5M9 13h7M9 17h5" /></>,
  circulation: <><path d="M4 7h11l-3-3M20 17H9l3 3" /><path d="M15 7l5 0M4 17h5" /></>,
  info: <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M7 15l3-4 3 3 4-5" /></>,
  progress: <path d="M3 21h18M6 21V10h5v11M11 13h7v8M8 6l3-3 3 3" />,
  walk: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M10 9.5v5l4-2.5z" /></>,
  gallery: <><rect x="3" y="4" width="18" height="16" rx="2" /><circle cx="9" cy="10" r="2" /><path d="M21 17l-5-5-9 8" /></>,
  drone: <><circle cx="5" cy="5" r="2" /><circle cx="19" cy="5" r="2" /><circle cx="5" cy="19" r="2" /><circle cx="19" cy="19" r="2" /><path d="M7 7l3 3M17 7l-3 3M7 17l3-3M17 17l-3-3" /><rect x="10" y="10" width="4" height="4" rx="1" /></>,
  home: <><path d="M4 11l8-7 8 7v9H4z" /><path d="M10 20v-5h4v5" /></>,
};

export function Icon({ name }: { name: IconKey }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

const stroke2 = { width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, 'aria-hidden': true } as const;

export const ChevronLeft = () => <svg {...stroke2}><path d="M15 5l-7 7 7 7" /></svg>;
export const ChevronRight = () => <svg {...stroke2}><path d="M9 5l7 7-7 7" /></svg>;
export const CloseIcon = () => <svg {...stroke2}><path d="M6 6l12 12M18 6L6 18" /></svg>;

export const PinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" />
  </svg>
);

export const SparkIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8z" />
  </svg>
);

export const PauseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" />
  </svg>
);

export const PlayIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M7 4.5v15l13-7.5z" />
  </svg>
);

export const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
    <circle cx="12" cy="12" r="9" /><path d="M8 12.5l2.6 2.6L16 9.6" />
  </svg>
);
