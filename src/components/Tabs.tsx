import type { ReactNode } from 'react';

interface TabsProps {
  label: string;
  items: ReactNode[];
  selected: number;
  onSelect: (i: number) => void;
}

export default function Tabs({ label, items, selected, onSelect }: TabsProps) {
  return (
    <div className="tabs" role="tablist" aria-label={label}>
      {items.map((item, i) => (
        <button key={i} type="button" className="tab" role="tab" aria-selected={i === selected} onClick={() => onSelect(i)}>
          {item}
        </button>
      ))}
    </div>
  );
}
