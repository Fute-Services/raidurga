import { Fragment, useEffect, useRef, useState } from 'react';
import { AMEN, CIRC, DRONE, DRONE_LABELS, LOC, locKeys, PI_TABS, renders, SOON, type CircLayer } from '../data';
import { CheckIcon, ChevronLeft, ChevronRight, Icon, PauseIcon, PlayIcon, type IconKey } from '../icons';
import Tabs from './Tabs';

type SetBg = (i: number) => void;

/* location */
export function LocationPage({ setBg }: { setBg: SetBg }) {
  const [sel, setSel] = useState(0);
  const d = LOC[locKeys[sel]];
  useEffect(() => setBg(d.img), [d, setBg]);

  const rows = (list: [string, string][]) => (
    <ul>{list.map(([name, v]) => <li key={name}>{name}<span>{v}</span></li>)}</ul>
  );

  return (
    <div className="page">
      <div className="pin main" style={{ left: '45%', top: '36%' }}><b>RAIDURGA</b><i></i><span className="pulse"></span></div>
      <div className="info">
        <h3>{d.title}</h3>
        <p className="sub">{d.sub}</p>
        {d.groups
          ? d.groups.map(([g, list]) => <Fragment key={g}><p className="grp">{g}</p>{rows(list)}</Fragment>)
          : rows(d.items ?? [])}
      </div>
      <Tabs label="Location views" items={locKeys.map(k => LOC[k].label)} selected={sel} onSelect={setSel} />
    </div>
  );
}

/* amenities */
export function AmenitiesPage({ setBg }: { setBg: SetBg }) {
  const [sel, setSel] = useState(0);
  useEffect(() => setBg(AMEN[sel][1]), [sel, setBg]);

  return (
    <div className="page">
      <h3 className="big-title">AMENITIES</h3>
      <div className="cap-line">{AMEN[sel][2]}</div>
      <Tabs label="Amenities" items={AMEN.map(a => a[0])} selected={sel} onSelect={setSel} />
    </div>
  );
}

/* circulation */
const ROUTES: Record<Exclude<CircLayer, 'all'>, string[]> = {
  met: ['M0 47 C10 40,22 33,32 29.5 C37 27.8,42 24,46 21.7'],
  veh: [
    'M21 37.6 C31 42.6,47 50.4,63 60.2',
    'M66 60.2 C50 50,34 41.6,24 36.4',
    'M100 28.6 C95 40,90 50,85.5 60.2',
    'M34.5 38.6 C37 39.6,39.5 41,42 42.6 C46 44.8,50 46.8,53.5 48.6 L57 50.6',
  ],
  ped: [
    'M26.5 35.6 C29 34,31.5 33.2,33.6 34.2 C35.5 35.2,37 37.4,39.6 39.6',
    'M31.5 30.6 C33 32.2,34.2 33.4,35 34.8',
    'M39 41.2 C42.5 43,46.5 44.9,50.5 46.8 L54 48.4',
  ],
};
const MARKERS: [Exclude<CircLayer, 'all'>, string, string, string][] = [
  ['ped', 'Mall Entry', '39.6%', '65.8%'],
  ['veh', 'Drop-off', '46%', '76.5%'],
  ['ped', 'Plaza', '30%', '55.5%'],
  ['veh', 'Exit', '57%', '84%'],
  ['met', 'Metro Link', '46%', '36%'],
];

export function CirculationPage() {
  const [sel, setSel] = useState(0);
  const [paused, setPaused] = useState(false);
  const layer = CIRC[sel][0];
  const dim = (l: CircLayer) => (layer !== 'all' && l !== layer ? ' dimmed' : '');

  return (
    <div className="page">
      <div className="dim"></div>
      <div className="circ">
        <h3>CIRCULATION</h3>
        <div className="plan">
          <div className={'plan-box' + (paused ? ' paused' : '')}>
            <img src="assets/render-6.jpg" alt="Aerial view of Raidurga with circulation routes" />
            <svg viewBox="0 0 100 60.21" preserveAspectRatio="none" aria-hidden="true">
              {(['met', 'veh', 'ped'] as const).map(l => (
                <g key={l} className={`route ${l}${dim(l)}`}>
                  {ROUTES[l].map(d => [
                    <path key={d + 'b'} className="base" d={d} />,
                    <path key={d + 'f'} className="flow" d={d} />,
                  ])}
                </g>
              ))}
            </svg>
            {MARKERS.map(([l, name, left, top]) => (
              <div key={name} className={`mk ${l}${dim(l)}`} style={{ left, top }}><i></i><b>{name}</b></div>
            ))}
          </div>
        </div>
        <div className="c-bar">
          <Tabs
            label="Circulation layers"
            items={CIRC.map(([, name, color]) => color ? <><span className="dot" style={{ background: color }}></span>{name}</> : name)}
            selected={sel}
            onSelect={setSel}
          />
          <button className="ic" type="button" aria-label={paused ? 'Play route animation' : 'Pause route animation'} onClick={() => setPaused(p => !p)}>
            {paused ? <PlayIcon /> : <PauseIcon />}
          </button>
        </div>
        <span className="c-note">Routes are indicative and subject to the final site plan.</span>
      </div>
    </div>
  );
}

/* project info */
const FEATURES: [string, string][] = [
  ['Site & Architecture', '15-acre transit-oriented site, opposite IKEA'],
  ['Façade Design', 'Curved full-glass curtain wall over a gold-framed podium'],
  ['Retail Podium', 'Double-height shopfronts opening onto a landscaped plaza'],
  ['Workplace', 'Grade A office towers above the mall'],
  ['Arrival & Transit', 'Covered drop-off, canopy walkway and Raidurg Metro next door'],
];
const FIGURES: [string, string, string | null, string][] = [
  ['Site', '15', 'acres', 'Transit-oriented development parcel'],
  ['Built-up area', '~4.7', 'million sq ft', 'Mall, retail and office combined'],
  ['Retail mall', '~0.9', 'million sq ft', 'Shopping, dining and entertainment'],
  ['Multiplex', '14', 'screens', 'Cinema within the mall'],
  ['Office', 'Grade A', null, 'Office towers over the retail podium'],
  ['Operations', '2029', 'target', 'Planned opening'],
];
const SPECS: [string, string | null][] = [
  ['Location', 'Raidurg, Hyderabad, next to Raidurg Metro Station'],
  ['Components', 'Retail mall, multiplex, high-street retail, Grade A office towers'],
  ['Façade', 'Full-glass curtain wall with curved corners'],
  ['Podium', 'Double-height glazed shopfronts with gold-finish framing'],
  ['Landscape', 'Plaza with water garden, lawns and canopy walkway'],
  ['Office floor plate', null],
  ['Lifts & HVAC', null],
  ['Power backup', null],
  ['Parking', null],
  ['Certifications', null],
];

export function ProjectInfoPage() {
  const [sel, setSel] = useState(0);
  const scroller = useRef<HTMLDivElement>(null);

  const pick = (i: number) => {
    setSel(i);
    if (scroller.current) scroller.current.scrollTop = 0;
  };

  return (
    <div className="page">
      <div className="pi" ref={scroller}>
        <div className="pi-head"><h3>PROJECT INFO</h3><span>— Mall · Retail · Office Tower —</span></div>
        <Tabs label="Project info sections" items={PI_TABS} selected={sel} onSelect={pick} />

        {sel === 0 && (
          <section>
            <div className="pi-grid">
              <div className="pi-img"><img src="assets/render-5.jpg" alt="Raidurga office tower above the lit retail podium" /></div>
              <div className="pi-copy">
                <span className="eyebrow" style={{ fontSize: 12, letterSpacing: '.24em', color: 'var(--gold)', fontWeight: 600 }}>DESIGN PHILOSOPHY</span>
                <p className="quote">"Shops at street level, workplaces above, and the metro at the door."</p>
                <p>Raidurga stacks three ways of using a city block. A gold-framed retail podium opens onto a landscaped plaza. Curved glass office towers rise above it. Raidurg Metro sits right beside the site.</p>
                <p className="em">One address for shopping, dining and work, on Hyderabad's busiest IT corridor.</p>
                <ul className="feat">
                  {FEATURES.map(([title, text]) => (
                    <li key={title}><CheckIcon /><div><b>{title}</b><span>{text}</span></div></li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        )}

        {sel === 1 && (
          <section>
            <div className="figs">
              {FIGURES.map(([label, value, unit, note]) => (
                <div key={label} className="fig"><span>{label}</span><b>{value}{unit && <small>{unit}</small>}</b><p>{note}</p></div>
              ))}
            </div>
            <p className="pi-foot">Figures as publicly reported; to be confirmed against final approvals.</p>
          </section>
        )}

        {sel === 2 && (
          <section>
            <dl className="spec">
              {SPECS.map(([term, value]) => (
                <div key={term}><dt>{term}</dt>{value ? <dd>{value}</dd> : <dd className="tbc">To be confirmed</dd>}</div>
              ))}
            </dl>
          </section>
        )}
      </div>
    </div>
  );
}

/* gallery */
export function GalleryPage({ onOpen }: { onOpen: (i: number) => void }) {
  return (
    <div className="page">
      <div className="dim"></div>
      <div className="g-wrap">
        <h3>GALLERY</h3>
        <div className="g-grid">
          {renders.map((r, i) => (
            <button key={r.src} type="button" className="g-tile" aria-label={'Open ' + r.t} onClick={() => onOpen(i)}>
              <img src={r.src} alt="" loading="lazy" /><span>{r.t}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* walkthrough */
export function WalkthroughPage() {
  return (
    <div className="page">
      <div className="vid"><video src="assets/hero.mp4" poster="assets/poster.jpg" controls playsInline></video></div>
    </div>
  );
}

/* drone view */
export function DronePage({ setBg }: { setBg: SetBg }) {
  const [idx, setIdx] = useState(0);
  useEffect(() => setBg(DRONE[idx]), [idx, setBg]);
  const show = (i: number) => setIdx((i + DRONE.length) % DRONE.length);

  return (
    <div className="page">
      <button className="slide-nav prev" type="button" aria-label="Previous aerial view" onClick={() => show(idx - 1)}><ChevronLeft /></button>
      <button className="slide-nav next" type="button" aria-label="Next aerial view" onClick={() => show(idx + 1)}><ChevronRight /></button>
      <Tabs label="Aerial views" items={DRONE_LABELS} selected={idx} onSelect={show} />
    </div>
  );
}

/* placeholder */
export function SoonPage({ icon, title }: { icon: IconKey; title: string }) {
  return (
    <div className="page">
      <div className="soon">
        <div className="card">
          <span><Icon name={icon} /></span>
          <h3>{title}</h3>
          <p>{SOON[icon]}</p>
        </div>
      </div>
    </div>
  );
}
