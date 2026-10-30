import { useCallback, useEffect, useRef, useState } from 'react';
import { LEFT, RIGHT, type RailItem } from './data';
import { Icon, PinIcon, SparkIcon, type IconKey } from './icons';
import StageBg from './components/StageBg';
import Lightbox from './components/Lightbox';
import {
  AmenitiesPage, CirculationPage, DronePage, GalleryPage, LocationPage,
  ProjectInfoPage, SoonPage, WalkthroughPage,
} from './components/Pages';

type View = 'cover' | 'intro' | 'stage';

const ALL = [...LEFT, ...RIGHT];
// pages that pick their own background (or, like Project Info, leave it as is)
const OWN_BG: IconKey[] = ['location', 'amenities', 'drone', 'info'];
const isValidKey = (k: string): k is IconKey => k === 'home' || ALL.some(x => x[0] === k);

function ExploreButton({ onClick }: { onClick: () => void }) {
  return (
    <button className="explore" type="button" onClick={onClick}>
      <span className="mark">R</span>
      <span className="lbl"><SparkIcon />explore</span>
    </button>
  );
}

export default function App() {
  const [view, setView] = useState<View>('cover');
  const [active, setActive] = useState<IconKey | null>(null);
  const [navId, setNavId] = useState(0);
  const [bg, setBg] = useState(3);
  const [lbIdx, setLbIdx] = useState<number | null>(null);
  const introVid = useRef<HTMLVideoElement>(null);

  const go = useCallback((key: IconKey) => {
    setView('stage');
    setActive(key);
    setNavId(n => n + 1); // remount the page so its tabs reset, as each visit starts fresh
    if (key === 'circulation') setBg(5);
    else if (!OWN_BG.includes(key)) setBg(3);
    try { history.replaceState(null, '', '#' + key); } catch { /* ignore */ }
  }, []);

  // intro film plays only while the intro view is showing
  useEffect(() => {
    const v = introVid.current;
    if (!v) return;
    if (view === 'intro') {
      v.currentTime = 0;
      v.play().catch(() => {});
    } else v.pause();
  }, [view]);

  // deep link
  useEffect(() => {
    const h = location.hash.slice(1);
    if (h && isValidKey(h)) go(h);
  }, [go]);

  const railBtn = ([key, label]: RailItem) => (
    <button key={key} type="button" className="r-btn" aria-current={active === key ? 'page' : undefined} onClick={() => go(key)}>
      <Icon name={key} /><span>{label}</span>
    </button>
  );

  const renderPage = () => {
    switch (active) {
      case null:
      case 'home': return null;
      case 'location': return <LocationPage setBg={setBg} />;
      case 'amenities': return <AmenitiesPage setBg={setBg} />;
      case 'circulation': return <CirculationPage />;
      case 'info': return <ProjectInfoPage />;
      case 'gallery': return <GalleryPage onOpen={setLbIdx} />;
      case 'walk': return <WalkthroughPage />;
      case 'drone': return <DronePage setBg={setBg} />;
      default: return <SoonPage icon={active} title={ALL.find(x => x[0] === active)![1]} />;
    }
  };

  return (
    <>
      {/* 1. Cover */}
      <section className={'view' + (view === 'cover' ? '' : ' off')} id="cover" aria-label="Cover">
        <img className="fill" src="assets/render-3.jpg" alt="" />
        <div className="shade"></div>
        <a className="loc-chip" href="https://www.google.com/maps/search/?api=1&query=Raidurg%2C%20Hyderabad" target="_blank" rel="noopener">
          <PinIcon />
          Raidurg, Hyderabad
        </a>
        <div className="c-inner">
          <div className="rule"></div>
          <h1>RAIDURGA</h1>
          <p>Mall · Retail · Office Tower · Raidurg, Hyderabad</p>
          <ExploreButton onClick={() => setView('intro')} />
        </div>
      </section>

      {/* 2. Intro film */}
      <section className={'view' + (view === 'intro' ? '' : ' off')} id="intro" aria-label="Intro">
        <video ref={introVid} className="fill" src="assets/hero.mp4" poster="assets/poster.jpg" muted loop playsInline aria-hidden="true"></video>
        <div className="shade" style={{ background: 'rgba(8,16,28,.35)' }}></div>
        <div className="tagline">
          <h2><span className="a">Where Retail Meets</span><span className="b">The Workplace</span></h2>
          <ExploreButton onClick={() => go('home')} />
        </div>
      </section>

      {/* 3. Stage with rails */}
      <section className={'view' + (view === 'stage' ? '' : ' off')} id="stage" aria-label="Raidurga interface">
        <StageBg index={bg} />

        <nav className="rail left" aria-label="Project menu">
          {LEFT.map(railBtn)}
          <button type="button" className="r-btn r-home" aria-current={active === 'home' ? 'page' : undefined} onClick={() => go('home')}>
            <Icon name="home" /><span>Home</span>
          </button>
        </nav>
        <nav className="rail right" aria-label="Media menu">
          {RIGHT.map(railBtn)}
        </nav>

        <div key={navId} style={{ display: 'contents' }}>{renderPage()}</div>
      </section>

      {lbIdx !== null && <Lightbox index={lbIdx} onChange={setLbIdx} onClose={() => setLbIdx(null)} />}
    </>
  );
}
