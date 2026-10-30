import { useEffect, useState } from 'react';
import { renders } from '../data';

/** Stage background that fades out, swaps the render, and fades back in. */
export default function StageBg({ index }: { index: number }) {
  const [shown, setShown] = useState(index);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    if (index === shown) {
      setOpacity(1);
      return;
    }
    setOpacity(0);
    const t = setTimeout(() => {
      setShown(index);
      setOpacity(1);
    }, 250);
    return () => clearTimeout(t);
  }, [index, shown]);

  const r = renders[shown];
  return <img className="fill bg" src={r.src} alt={r.t} style={{ opacity }} />;
}
