import type { IconKey } from './icons';

export type RailItem = [IconKey, string];

export const LEFT: RailItem[] = [['master', 'Master Plan'], ['location', 'Location'], ['amenities', 'Amenities'], ['details', 'Project Details'], ['vr', 'VR'], ['brochure', 'Brochure']];
export const RIGHT: RailItem[] = [['circulation', 'Circulation'], ['info', 'Project Info'], ['progress', 'Construction Progress'], ['walk', 'Walkthrough'], ['gallery', 'Gallery'], ['drone', 'Drone View']];

export interface Render { src: string; t: string }

export const renders: Render[] = [
  { src: 'assets/render-1.jpg', t: 'Twin office towers above the retail podium' },
  { src: 'assets/render-2.jpg', t: 'Podium frontage and landscaped plaza' },
  { src: 'assets/render-3.jpg', t: 'Aerial view at dusk' },
  { src: 'assets/render-4.jpg', t: 'Three-tower cluster at night' },
  { src: 'assets/render-5.jpg', t: 'Office tower with retail frontage' },
  { src: 'assets/render-6.jpg', t: 'Aerial view in its Hyderabad setting' },
];

/** [label, render index, caption] */
export const AMEN: [string, number, string][] = [
  ['Mall Entrance', 1, 'Mall · Double-height glass frontage opening onto the plaza'],
  ['Landscaped Plaza', 1, 'Mall · Water garden, lawns and a white canopy walkway'],
  ['Retail Podium', 0, 'Retail · Shopfronts along the base of the office towers'],
  ['Retail Frontage', 4, 'Retail · Display windows and digital façades on the corner'],
  ['Office Towers', 0, 'Office · Glass-clad workplace towers above the podium'],
  ['Office Tower Corner', 4, 'Office · Corner tower with landscaped terraces'],
  ['Drop Off', 4, 'Covered drop-off along the main road'],
  ['Central Courtyard', 2, 'Lit courtyard and plaza between the towers'],
  ['Night Façade', 3, 'Mall, retail and office towers lit up after dark'],
];

type Row = [string, string];
export interface LocEntry {
  label: string;
  img: number;
  title: string;
  sub: string;
  items?: Row[];
  groups?: [string, Row[]][];
}

export const LOC: Record<'site' | 'hood' | 'conn' | 'biz' | 'air', LocEntry> = {
  site: { label: 'Site Location', img: 5, title: 'Raidurg, Hyderabad', sub: 'Location highlights', items: [
    ['15-acre transit-oriented site', 'TOD'],
    ['Directly opposite IKEA', 'Opp.'],
    ['HITEC City – Gachibowli – Kokapet corridor', 'West Hyd'],
    ['Raidurg Metro Station', 'Adjacent']] },
  hood: { label: 'Neighbourhood', img: 5, title: 'Neighbourhood', sub: 'Approx. distance · drive time', groups: [
    ['Hospitality', [['Westin Mindspace / Lemon Tree', '< 1 km · 3–5 min']]],
    ['Malls', [['Inorbit Mall Cyberabad', '~2 km · 6–8 min'], ['Sarath City Capital Mall', '~7 km · 18 min']]],
    ['Leisure', [['Durgam Cheruvu cable bridge & lakefront', '~3 km · 10 min']]],
    ['Schools', [['Oakridge International, Gachibowli', '~4 km · 12–15 min'], ['Chirec International, Kondapur', '~5 km · 15 min']]],
    ['Hospitals', [['Continental Hospitals, Gachibowli', '~4 km · 12 min'], ['Citizens Specialty, Nallagandla', '~6 km · 15–18 min'], ['KIMS Hospital, Kondapur', '~6 km · 15–18 min']]],
  ] },
  conn: { label: 'Connectivity', img: 5, title: 'Connectivity', sub: 'Metro, road and shuttle links', items: [
    ['Raidurg Metro Station', 'Adjacent'],
    ['Skywalk to Mindspace campus', '~1 km'],
    ['Knowledge City Road', 'Access road'],
    ['Cyber Liner shuttles to Kokapet, Waverock & Wipro', 'From metro'],
    ['Financial District, Gachibowli, Kokapet', 'Catchment']] },
  biz: { label: 'Business Hub', img: 5, title: 'Business Hub', sub: 'Office neighbours in the precinct', items: [
    ['JP Morgan', ''], ['Microsoft', ''], ['Intel', ''], ['Goldman Sachs', ''], ['Wells Fargo', '']] },
  air: { label: 'Airport Connectivity', img: 5, title: 'Airport Connectivity', sub: 'Distance to be confirmed', items: [
    ['Rajiv Gandhi International Airport', '— km']] },
};
export type LocKey = keyof typeof LOC;
export const locKeys = Object.keys(LOC) as LocKey[];

export const SOON: Partial<Record<IconKey, string>> = {
  master: 'The master plan for Raidurga will appear here.',
  details: 'Details for the mall, retail and office tower, including specifications and area statements, will appear here.',
  vr: 'Virtual reality tours of the mall, retail and office spaces will appear here.',
  brochure: 'The Raidurga brochure will appear here.',
  progress: 'Construction progress updates will appear here.',
};

export const DRONE = [2, 3, 5];
export const DRONE_LABELS = ['Dusk', 'Night', 'Day'];

export type CircLayer = 'all' | 'veh' | 'ped' | 'met';
export const CIRC: [CircLayer, string, string | null][] = [
  ['all', 'All Routes', null], ['veh', 'Vehicular', '#F5C04A'], ['ped', 'Pedestrian', '#FF7A6B'], ['met', 'Metro Link', '#6CC4FF'],
];

export const PI_TABS = ['Philosophy', 'Key Figures', 'Specifications'];
