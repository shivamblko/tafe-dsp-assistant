/* ============================================================
   DSP Assistant - sample data (grounded in TAFE-style content)
   ============================================================ */

const FARMER = {
  name: 'Suresh Patel',
  age: 42,
  gender: 'Male',
  mobile: '+91 98XXXXXX12',
  location: 'Tiruvannamalai, Tamil Nadu',
  land: 8,
  crops: ['Paddy', 'Sugarcane'],
  soil: 'Red loamy',
  persona: 'Competitor owner',
  currentBrand: 'John Deere 5050D',
  application: 'Both',
  hp: [45, 55],
  budget: [700000, 900000],
};

const DSP = { name: 'Rajesh Kumar', dealership: 'MF Tractors, Tiruvannamalai' };

const RECENT = [
  { farmer: 'Murugan S.', model: 'MF 241 DI', date: '08 Jun 2026', confidence: 93 },
  { farmer: 'Lakshmi Narayan', model: 'MF 7250 PowerUp', date: '07 Jun 2026', confidence: 90 },
  { farmer: 'Karthik R.', model: 'MF 1035 DI', date: '05 Jun 2026', confidence: 88 },
];

const RECENT_ALL = [
  ...RECENT,
  { farmer: 'Suresh Patel', model: 'MF 254 DT Dynatrack', date: '04 Jun 2026', confidence: 95 },
  { farmer: 'Bhaskar Reddy', model: 'MF 9500 Smart', date: '03 Jun 2026', confidence: 87 },
  { farmer: 'Anand V.', model: 'MF 246 DT', date: '02 Jun 2026', confidence: 91 },
];

// DWM modules shown on the landing workspace
const DWM_MODULES = [
  { id: 'dsp', title: 'DSP Assistant', subtitle: 'AI tractor & implement recommendations', tone: 'feature', badge: 'AI Assistant · Active', cta: 'Continue' },
  { id: 'leads', title: 'Leads · CRM', subtitle: 'Zoho-synced farmer pipeline', tone: 'plain' },
  { id: 'inventory', title: 'Inventory', subtitle: 'Stock across 170+ models', tone: 'plain' },
  { id: 'service', title: 'Service Jobs', subtitle: 'Workshop & warranty', tone: 'plain' },
  { id: 'finance', title: 'Finance & EMI', subtitle: 'Quotes & approvals', tone: 'plain' },
];

const MODELS = [
  {
    id: 'mf254',
    name: 'MF 254 DT Dynatrack',
    series: 'Dynatrack Series',
    img: 'assets/mf254.png',
    confidence: 95,
    specs: { hp: '50 HP', cyl: '3 Cylinder', lift: '1800 kg' },
    rationale: [
      'Best-in-class lift capacity for paddy and sugarcane operations',
      'Proven on red loamy soils across Tamil Nadu',
      'Strong owner base in Tiruvannamalai district, easy resale value',
    ],
    implements: ['2 RMB Plough', 'Cage Wheel', 'Disc Plough'],
  },
  {
    id: 'mf7250',
    name: 'MF 7250 PowerUp',
    series: 'PowerUp Series',
    img: 'assets/mf7250.png',
    confidence: 92,
    specs: { hp: '50 HP', cyl: '2 Cylinder', lift: '1600 kg' },
    rationale: [
      'High torque backup ideal for sugarcane haulage and trolley work',
      'Lower running cost suits 8-acre mixed-crop holdings',
      'Trusted PowerUp platform with wide service coverage in the district',
    ],
    implements: ['Trolley', 'Cultivator', 'Rotavator'],
  },
  {
    id: 'mf246',
    name: 'MF 246 DT',
    series: 'DI Series',
    img: 'assets/mf246.png',
    confidence: 88,
    specs: { hp: '50 HP', cyl: '3 Cylinder', lift: '1600 kg' },
    rationale: [
      '4WD traction advantage for wet paddy fields and bunded plots',
      'Compact footprint manoeuvres well in sugarcane inter-rows',
      'Value pricing keeps it within the farmer\u2019s stated budget band',
    ],
    implements: ['Cage Wheel', 'MB Plough', 'Seed Drill'],
  },
];

// Tooltip / explanation for the match score
const MATCH_INFO = 'Composite score based on application fit (matrix), district context, persona affinity, and budget band. 90%+ recommended.';

// Persona-aware pitch copy, per language. Selected model: MF 254 DT Dynatrack.
const PITCHES = {
  Hinglish: `Suresh ji, aapke 8 acre ke paddy aur sugarcane kheti ke liye Massey 254 Dynatrack se behtar koi tractor nahi. Aapke John Deere 5050D ke comparison mein, Dynatrack ka lift capacity zyada hai aur fuel efficiency bhi superior. Tiruvannamalai mein 500+ Massey owners hain, parts availability aur service network strong hai. Special finance offer bhi available hai HDFC ke saath. Ek demo book karein?`,
  Hindi: `\u0938\u0941\u0930\u0947\u0936 \u091C\u0940, \u0906\u092A\u0915\u0947 8 \u090F\u0915\u0921\u093C \u0915\u0947 \u0927\u093E\u0928 \u0914\u0930 \u0917\u0928\u094D\u0928\u0947 \u0915\u0940 \u0916\u0947\u0924\u0940 \u0915\u0947 \u0932\u093F\u090F \u092E\u0948\u0938\u0940 254 \u0921\u093E\u092F\u0928\u093E\u091F\u094D\u0930\u0948\u0915 \u0938\u0947 \u092C\u0947\u0939\u0924\u0930 \u0915\u094B\u0908 \u091F\u094D\u0930\u0948\u0915\u094D\u091F\u0930 \u0928\u0939\u0940\u0902\u0964 \u0906\u092A\u0915\u0947 \u091C\u0949\u0928 \u0921\u093F\u092F\u0930 5050D \u0915\u0940 \u0924\u0941\u0932\u0928\u093E \u092E\u0947\u0902, \u0921\u093E\u092F\u0928\u093E\u091F\u094D\u0930\u0948\u0915 \u0915\u0940 \u0932\u093F\u092B\u094D\u091F \u0915\u094D\u0937\u092E\u0924\u093E \u095B\u094D\u092F\u093E\u0926\u093E \u0939\u0948 \u0914\u0930 \u095E\u094D\u092F\u0942\u0932 \u090F\u095E\u093F\u0936\u093F\u090F\u0902\u0938\u0940 \u092D\u0940 \u092C\u0947\u0939\u0924\u0930 \u0939\u0948\u0964 \u0924\u093F\u0930\u0941\u0935\u0928\u094D\u0928\u093E\u092E\u0932\u0948 \u092E\u0947\u0902 500+ \u092E\u0948\u0938\u0940 \u092E\u093E\u0932\u093F\u0915 \u0939\u0948\u0902, \u092A\u093E\u0930\u094D\u091F\u094D\u0938 \u0914\u0930 \u0938\u0930\u094D\u0935\u093F\u0938 \u0928\u0947\u091F\u0935\u0930\u094D\u0915 \u092E\u095B\u092C\u0942\u0924 \u0939\u0948\u0964 HDFC \u0915\u0947 \u0938\u093E\u0925 \u0938\u094D\u092A\u0947\u0936\u0932 \u095E\u093E\u0907\u0928\u0947\u0902\u0938 \u0911\u095E\u093C\u0930 \u092D\u0940 \u0909\u092A\u0932\u092C\u094D\u0927 \u0939\u0948\u0964 \u090F\u0915 \u0921\u0947\u092E\u094B \u092C\u0941\u0915 \u0915\u0930\u0947\u0902?`,
  English: `Suresh ji, for your 8-acre paddy and sugarcane farm, the Massey 254 Dynatrack is the clear best fit. Compared to your current John Deere 5050D, the Dynatrack offers higher lift capacity and superior fuel efficiency. With 500+ Massey owners in Tiruvannamalai, parts availability and the service network are strong. A special finance offer is also available with HDFC. Shall we book a demo?`,
};

const IMPLEMENTS = [
  { name: '2 RMB Plough', use: 'Primary tillage' },
  { name: 'Disc Plough', use: 'Hard / dry land' },
  { name: 'Cage Wheel', use: 'Wet paddy puddling' },
];

// Competitor comparison: farmer's current vs recommended.
// `wins`: 'rec' (TAFE wins), 'comp' (JD wins), 'tie' (equal), or null (not material).
// Showing both sides of the comparison is a credibility signal: we are honest about where competition is stronger,
// so TAFE wins land more convincingly.
const COMPARE = {
  competitor: 'John Deere 5050D',
  recommended: 'MF 254 DT Dynatrack',
  rows: [
    { label: 'Engine power', comp: '50 HP', rec: '50 HP', wins: 'tie' },
    { label: 'Cylinders', comp: '3', rec: '3', wins: 'tie' },
    { label: 'Lift capacity', comp: '1600 kg', rec: '1800 kg', wins: 'rec' },
    { label: 'Fuel tank', comp: '60 L', rec: '47 L', wins: 'comp' },
    { label: 'Wheelbase', comp: '1970 mm', rec: '1925 mm', wins: 'comp' },
    { label: 'PTO power', comp: '42.3 HP', rec: '42.8 HP', wins: 'rec' },
    { label: 'Warranty', comp: '5 yrs', rec: '6 yrs / 6000 hrs', wins: 'rec' },
    { label: 'On-road price (indicative)', comp: '\u20B98.4-8.9 L', rec: '\u20B97.9-8.4 L', wins: 'rec' },
  ],
  advantages: ['Higher lift capacity', 'Better fuel efficiency on red soil', 'Stronger district service network'],
  // Honest note about where the competitor is stronger - this is the credibility hook.
  competitorStrengths: ['Larger fuel tank (longer runs without refuel)', 'Marginally longer wheelbase'],
};

// Manager dashboard
const KPIS = [
  { label: 'Recommendations this week', value: '247', delta: '+12%', trend: 'up' },
  { label: 'Pitches generated', value: '189', delta: '+8%', trend: 'up' },
  { label: 'Avg. confidence', value: '91%', delta: '+1.4', trend: 'up' },
  { label: 'Flagged for review', value: '8', delta: '+3', trend: 'flat' },
];

const FLAGGED = [
  { farmer: 'Suresh Patel', dsp: 'Rajesh Kumar', model: 'MF 254 DT Dynatrack', reason: 'Low confidence on competitor data', sev: 'warn', time: '11:42 AM' },
  { farmer: 'Lakshmi Narayan', dsp: 'Anand Singh', model: 'MF 241 DI', reason: 'Off-playbook competitor mentioned', sev: 'high', time: '10:18 AM' },
  { farmer: 'Murugan S.', dsp: 'Priya R.', model: 'MF 7250 PowerUp', reason: 'Budget mismatch flagged by DSP', sev: 'warn', time: 'Yesterday' },
  { farmer: 'Karthik R.', dsp: 'Vignesh M.', model: 'MF 1035 DI', reason: 'Soil type override by DSP', sev: 'low', time: 'Yesterday' },
  { farmer: 'Bhaskar Reddy', dsp: 'Anand Singh', model: 'MF 9500 Smart', reason: 'Unverified price claim removed', sev: 'high', time: '2 days ago' },
];

const MODEL_BARS = [
  { model: 'MF 254 DT Dynatrack', count: 58 },
  { model: 'MF 241 DI', count: 44 },
  { model: 'MF 1035 DI', count: 31 },
  { model: 'MF 7250 PowerUp', count: 27 },
  { model: 'MF 246 DT', count: 22 },
  { model: 'MF 9500 Smart', count: 18 },
  { model: 'MF 5118', count: 15 },
  { model: 'MF 1030 DI', count: 12 },
  { model: 'MF 6028', count: 11 },
  { model: 'MF 245 DI', count: 9 },
];

const AUDIT = {
  sources: [
    'Tractor Specifications Sheet (row 14)',
    'Application-Implement-Model Matrix',
    'District Competitor Playbook (Tiruvannamalai)',
    'Implement Combination Sheet',
  ],
  validated: true,
};

const GROUNDING = {
  ungrounded: `Suresh ji, the Massey 254 is the best tractor in India with 60 HP and 2200 kg lift. It beats John Deere on every spec and costs only ₹5 lakh on-road. Everyone in Tamil Nadu prefers Massey over all brands. We can give you 0% EMI and a 10-year unlimited warranty today.`,
  grounded: PITCHES.Hinglish,
  sources: AUDIT.sources,
  risks: [
    'Invented HP and lift capacity figures',
    'Unverified on-road price claim',
    'Overbroad market share statement',
    'Non-compliant finance and warranty promises',
  ],
};

Object.assign(window, {
  FARMER, DSP, RECENT, RECENT_ALL, DWM_MODULES, MODELS, MATCH_INFO, PITCHES, IMPLEMENTS, COMPARE, KPIS, FLAGGED, MODEL_BARS, AUDIT, GROUNDING,
});
