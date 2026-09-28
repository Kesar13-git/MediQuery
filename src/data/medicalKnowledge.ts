import { HealthTopic, QAMessage } from '../types';

export const RED_FLAG_PATTERNS = [
  {
    regex: /(difficulty|trouble|shortness\s+of)\s+(breath|breathing)|can'?t\s+breathe|gasping|suffocating/i,
    name: 'Severe Difficulty Breathing',
    urgency: 'urgent',
    reason: 'Acute respiratory distress requires emergency medical intervention.',
  },
  {
    regex: /chest\s+(pain|pressure|tightness|crushing)|pain\s+in\s+(my\s+)?chest/i,
    name: 'Severe Chest Discomfort',
    urgency: 'urgent',
    reason: 'Chest pain may indicate cardiac or pulmonary emergencies requiring immediate evaluation.',
  },
  {
    regex: /(passed|blacked)\s+out|lost\s+consciousness|fainted|unresponsive|syncope/i,
    name: 'Loss of Consciousness',
    urgency: 'urgent',
    reason: 'Unexplained syncope or loss of consciousness necessitates prompt emergency assessment.',
  },
  {
    regex: /facial\s+droop|slurred\s+speech|sudden\s+weakness\s+(on\s+one\s+side|in\s+arm)|stroke/i,
    name: 'Signs Suggestive of Stroke',
    urgency: 'urgent',
    reason: 'Sudden neurological deficits are medical emergencies (BE-FAST protocol).',
  },
  {
    regex: /(severe|anaphylaxis|swollen\s+tongue|throat\s+closing|lip\s+swelling)\s+allerg/i,
    name: 'Severe Allergic Reaction',
    urgency: 'urgent',
    reason: 'Anaphylactic signs require immediate emergency care or epinephrine.',
  },
  {
    regex: /uncontrolled\s+bleeding|coughing\s+up\s+blood|vomiting\s+blood|heavy\s+blood\s+loss/i,
    name: 'Severe Hemorrhage',
    urgency: 'urgent',
    reason: 'Significant blood loss requires immediate emergency clinical management.',
  },
];

export const HEALTH_TOPICS: HealthTopic[] = [
  {
    id: 'headache',
    title: 'Headache',
    category: 'Neurological',
    overview: 'Headaches are common pain or discomfort in the head or face region. They can range from mild tension headaches to more debilitating migraine or sinus-related occurrences.',
    commonSymptoms: ['Throbbing or constant dull ache', 'Pressure across forehead or temples', 'Neck stiffness', 'Sensitivity to light or sound'],
    associatedSymptoms: ['Mild nausea', 'Fatigue', 'Eye strain', 'Difficulty concentrating'],
    whenToSeekHelp: [
      'Sudden "thunderclap" severe headache reaching peak intensity within seconds',
      'Headache accompanied by high fever, stiff neck, confusion, or rash',
      'Headache following a head injury or concussion',
      'New headache starting after age 50 or progressively worsening over days',
    ],
    generalInformation: [
      'Ensure adequate hydration, as mild dehydration is a frequent headache trigger.',
      'Maintain consistent sleep habits and minimize prolonged screen glare.',
      'Gentle neck and shoulder relaxation techniques can alleviate tension-type discomfort.',
    ],
    redFlags: ['Thunderclap onset', 'Neurological deficits', 'Stiff neck with high fever'],
  },
  {
    id: 'fever',
    title: 'Fever',
    category: 'Common Symptoms',
    overview: 'A fever is a temporary increase in body temperature, typically part of the immune system’s defense mechanism against viral or bacterial pathogens.',
    commonSymptoms: ['Elevated body temperature (>38°C / 100.4°F)', 'Chills and shivering', 'Sweating', 'Generalized muscle aches'],
    associatedSymptoms: ['Headache', 'Loss of appetite', 'Fatigue', 'Dehydration'],
    whenToSeekHelp: [
      'Temperature above 39.4°C (103°F) that does not respond to antipyretics',
      'Fever lasting more than 3 consecutive days without improvement',
      'Accompanied by shortness of breath, confusion, or stiff neck',
      'Persistent vomiting preventing any fluid retention',
    ],
    generalInformation: [
      'Prioritize oral fluids like water, broth, or electrolyte solutions to prevent dehydration.',
      'Rest in a comfortably cool environment with light clothing.',
      'Monitor temperature with a digital thermometer and keep a timestamped record.',
    ],
    redFlags: ['Stiff neck', 'Lethargy / unresponsiveness', 'Fever > 103°F lasting > 72 hours'],
  },
  {
    id: 'cough',
    title: 'Cough',
    category: 'Respiratory',
    overview: 'Coughing is a natural protective reflex to clear airways of irritants, secretions, or foreign materials. It can be acute (under 3 weeks) or subacute/chronic.',
    commonSymptoms: ['Dry, hacking throat irritation', 'Productive cough bringing up phlegm', 'Tickle in upper chest', 'Chest muscle soreness from coughing'],
    associatedSymptoms: ['Runny or stuffy nose', 'Sore throat', 'Mild fatigue', 'Postnasal drip'],
    whenToSeekHelp: [
      'Coughing up blood or rust-colored sputum',
      'Difficulty breathing, wheezing, or chest tightness',
      'Cough persisting for longer than 3–4 weeks without easing',
      'Accompanied by high, unexplained fever or significant night sweats',
    ],
    generalInformation: [
      'Warm fluids like tea with honey (for adults and children over 1 year) can soothe airways.',
      'Use a cool-mist room humidifier to keep mucous membranes moist.',
      'Avoid airway irritants including tobacco smoke, harsh aerosols, and chemical fumes.',
    ],
  },
  {
    id: 'sore-throat',
    title: 'Sore Throat',
    category: 'Respiratory',
    overview: 'A sore throat is pain, scratchiness, or irritation of the throat that often worsens when swallowing. The vast majority are viral in origin, though some (like strep) are bacterial.',
    commonSymptoms: ['Pain or scratchy sensation in throat', 'Pain that worsens with swallowing or talking', 'Swollen, red tonsils', 'Slightly enlarged neck lymph nodes'],
    associatedSymptoms: ['Mild fever', 'Cough', 'Runny nose', 'Hoarse voice'],
    whenToSeekHelp: [
      'Inability to swallow saliva or liquids (drooling)',
      'Severe difficulty opening mouth or turning neck',
      'Stridor or high-pitched breathing sounds',
      'Sore throat lasting more than 5–7 days without any trend of improvement',
    ],
    generalInformation: [
      'Gargling warm salt water (1/2 teaspoon in warm water) provides temporary topical relief.',
      'Stay hydrated with chilled or warm non-acidic fluids.',
      'Throat lozenges or pectin drops can help coat and moisten throat tissues.',
    ],
  },
  {
    id: 'nausea',
    title: 'Nausea & Vomiting',
    category: 'Digestive',
    overview: 'Nausea is an uneasy stomach sensation with an urge to vomit. It stems from gastrointestinal irritation, viral gastroenteritis, dietary triggers, motion, or inner ear disturbances.',
    commonSymptoms: ['Queasy stomach sensation', 'Salivation increase', 'Retching or actual vomiting', 'Loss of desire to eat'],
    associatedSymptoms: ['Abdominal cramping', 'Dizziness', 'Headache', 'Diarrhea'],
    whenToSeekHelp: [
      'Inability to keep liquids down for more than 24 hours',
      'Signs of moderate to severe dehydration (dark urine, dry mouth, dizzy on standing)',
      'Vomiting blood or dark "coffee ground" material',
      'Severe, localized abdominal tenderness',
    ],
    generalInformation: [
      'Take small, frequent sips of clear fluids rather than large gulps.',
      'Adopt the BRAT diet (Bananas, Rice, Applesauce, Toast) once vomiting halts.',
      'Avoid greasy, spicy, or strongly odorous foods until digestion settles.',
    ],
  },
  {
    id: 'abdominal-pain',
    title: 'Abdominal Pain',
    category: 'Digestive',
    overview: 'Abdominal pain encompasses discomfort felt between the chest and groin. It can be generalized (gas, indigestion) or localized (appendix, gallbladder, kidneys).',
    commonSymptoms: ['Cramping, dull ache, or bloating', 'Discomfort after eating', 'Gas pain shifting across abdomen'],
    associatedSymptoms: ['Nausea', 'Changes in bowel habits', 'Burping', 'Mild loss of appetite'],
    whenToSeekHelp: [
      'Severe, sudden onset pain or pain that makes walking upright difficult',
      'Rigid or board-like abdomen that is tender to the slightest touch',
      'Pain localized specifically to the lower right abdomen with fever and nausea',
      'Accompanied by persistent vomiting, high fever, or yellowing of eyes/skin (jaundice)',
    ],
    generalInformation: [
      'A warm compress or heating pad placed on the abdomen may relax cramping muscles.',
      'Avoid heavy, high-fat meals and carbonated drinks during active discomfort.',
      'Keep note of the exact pain location, relationship to meals, and bowel frequency.',
    ],
    redFlags: ['Rigid abdomen', 'Severe lower right quadrant pain', 'Inability to pass stool with severe distention'],
  },
  {
    id: 'dizziness',
    title: 'Dizziness & Lightheadedness',
    category: 'Neurological',
    overview: 'Dizziness is a broad term describing feelings of unsteadiness, wooziness, faintness (lightheadedness), or false spinning sensations (vertigo).',
    commonSymptoms: ['Feeling faint when standing quickly', 'Spinning sensation when turning the head', 'Loss of balance or unsteadiness'],
    associatedSymptoms: ['Mild nausea', 'Ear fullness or ringing (tinnitus)', 'Fatigue', 'Visual dimming upon rising'],
    whenToSeekHelp: [
      'Dizziness accompanied by sudden weakness, numbness, or difficulty speaking',
      'Fainting episode with loss of consciousness',
      'Chest pain, rapid irregular pulse, or shortness of breath',
      'New, persistent vertigo that causes recurrent falling',
    ],
    generalInformation: [
      'Rise slowly from lying to sitting, and from sitting to standing to avoid postural drops.',
      'Increase plain water intake, especially in hot weather or following exertion.',
      'Avoid driving or operating machinery while experiencing unsteady balance.',
    ],
  },
  {
    id: 'fatigue',
    title: 'Fatigue & Low Energy',
    category: 'General Wellness',
    overview: 'Fatigue is an overwhelming sense of tiredness, low energy, and physical or mental exhaustion that is not relieved by typical rest.',
    commonSymptoms: ['Difficulty starting or finishing daily tasks', 'Physical heaviness', 'Brain fog and slowed concentration'],
    associatedSymptoms: ['Unrefreshing sleep', 'Mild muscle aches', 'Mood changes or irritability'],
    whenToSeekHelp: [
      'Unexplained, profound fatigue persisting for more than 2–4 weeks',
      'Accompanied by significant involuntary weight loss or night sweats',
      'Accompanied by shortness of breath on minimal exertion',
      'Feeling depressed or overwhelmed to the point of impacting safety',
    ],
    generalInformation: [
      'Review sleep hygiene: aim for 7–9 hours in a dark, quiet, screen-free room.',
      'Check balanced nutrition, including iron, B12, and vitamin D dietary intake.',
      'Incorporate short, gentle daily walks to stimulate circulation without overexertion.',
    ],
  },
  {
    id: 'common-cold',
    title: 'Common Cold',
    category: 'Respiratory',
    overview: 'A viral upper respiratory tract infection predominantly caused by rhinoviruses, self-limiting within 7 to 10 days.',
    commonSymptoms: ['Nasal congestion and sneezing', 'Clear to colored runny nose', 'Scratchy sore throat', 'Mild cough'],
    associatedSymptoms: ['Low-grade fever', 'Mild headache', 'General malaise'],
    whenToSeekHelp: [
      'Symptoms worsening significantly after starting to improve (secondary infection)',
      'High fever >38.5°C or severe sinus pressure lasting >10 days',
      'Shortness of breath or painful breathing',
    ],
    generalInformation: [
      'Rest is critical to assist immune clearance.',
      'Saline nasal sprays help clear blocked passages safely.',
      'Antibiotics are ineffective against viral cold infections and should not be used.',
    ],
  },
  {
    id: 'dehydration',
    title: 'Dehydration',
    category: 'General Wellness',
    overview: 'Dehydration happens when fluid loss exceeds fluid intake, disturbing the balance of water and essential electrolytes necessary for physiological function.',
    commonSymptoms: ['Thirst and dry, sticky mouth', 'Infrequent urination and dark amber urine', 'Mild headache and dry lips'],
    associatedSymptoms: ['Fatigue', 'Dizziness upon standing', 'Flushed skin', 'Decreased skin turgor'],
    whenToSeekHelp: [
      'Extreme thirst with confusion or lethargy',
      'Absence of urination for 8 or more hours',
      'Rapid, weak pulse and sunken eyes',
      'Inability to tolerate oral fluids due to continuous vomiting',
    ],
    generalInformation: [
      'Drink small sips of oral rehydration solution (ORS) or diluted broths.',
      'Avoid high-sugar sodas, alcohol, or excessive caffeine, which may aggravate fluid loss.',
      'Monitor urine color aiming for a pale straw hue.',
    ],
  },
  {
    id: 'migraine',
    title: 'Migraine',
    category: 'Neurological',
    overview: 'A neurological disorder characterized by recurrent, pulsating moderate-to-severe headaches, often unilateral and accompanied by sensory sensitivities.',
    commonSymptoms: ['Throbbing headache on one side of head', 'Photophobia (light sensitivity)', 'Phonophobia (sound sensitivity)', 'Visual aura before onset (zigzags, blind spots)'],
    associatedSymptoms: ['Nausea and vomiting', 'Neck stiffness', 'Sensitivity to specific smells'],
    whenToSeekHelp: [
      'Aura lasting longer than 60 minutes or motor weakness occurring with aura',
      'Sudden onset excruciating pain unlike any past episode',
      'Headaches increasing in frequency to more than 15 days per month',
    ],
    generalInformation: [
      'Rest in a quiet, dark room during an attack.',
      'Track potential triggers such as missed meals, poor sleep, bright lights, or hormonal changes.',
      'A cool compress on the forehead and neck can soothe localized vascular pulsation.',
    ],
  },
  {
    id: 'acid-reflux',
    title: 'Acid Reflux (GERD)',
    category: 'Digestive',
    overview: 'Gastroesophageal reflux occurs when stomach acid flows back into the esophagus, irritating the mucosal lining and creating a burning sensation.',
    commonSymptoms: ['Heartburn (burning sensation behind breastbone)', 'Sour or acidic taste in mouth', 'Regurgitation of food particles'],
    associatedSymptoms: ['Bloating', 'Dry cough, especially at night', 'Frequent throat clearing or hoarseness'],
    whenToSeekHelp: [
      'Difficulty or pain when swallowing food (dysphagia)',
      'Unexplained weight loss or vomiting',
      'Chest pain accompanied by sweating, shortness of breath, or arm pain',
      'Symptoms requiring daily antacids for more than two weeks',
    ],
    generalInformation: [
      'Avoid eating within 2–3 hours of lying down.',
      'Elevate the head of your bed by 6 inches if nighttime reflux occurs.',
      'Limit known dietary triggers such as coffee, citrus, tomato sauces, and peppermint.',
    ],
  },
];

export const MOCK_QA_DATABASE: {
  id: string;
  keywords: string[];
  question: string;
  answer: string;
  category: string;
  sources: string[];
  references?: string[];
  safetyDisclaimer: string;
  relatedTopics?: string[];
}[] = [
  {
    id: 'qa-dehydration',
    keywords: ['dehydration', 'water', 'thirsty', 'symptoms of dehydration'],
    question: 'What are common symptoms of dehydration?',
    answer: 'Common symptoms of dehydration include persistent thirst, a dry or sticky mouth, infrequent urination, and dark amber-colored urine. You may also experience mild lightheadedness when standing up, fatigue, dry lips, and headache. In moderate to severe cases, sunken eyes, rapid heart rate, confusion, and absent urination occur, which warrant urgent medical evaluation.',
    category: 'General Wellness',
    sources: ['World Health Organization — Clinical Guidance on Dehydration', 'CDC General Health Topics'],
    references: ['World Health Organization (WHO) Guidelines on Hydration', 'CDC General Health Guidance'],
    safetyDisclaimer: 'Educational overview only. Severe dehydration with inability to retain fluids is a medical emergency.',
    relatedTopics: ['Hydration', 'Electrolytes', 'Kidney Function'],
  },
  {
    id: 'qa-cold-vs-flu',
    keywords: ['cold', 'flu', 'difference between cold and flu', 'influenza'],
    question: 'What is the difference between a cold and flu?',
    answer: 'While both are viral respiratory illnesses, they differ significantly in onset and severity. Colds typically develop gradually over 1–2 days, featuring a runny nose, sneezing, scratchy throat, and mild cough, with fever being rare or low-grade. The flu (Influenza) typically strikes abruptly with high fever (100°F–104°F), intense body/muscle aches, deep exhaustion, and severe chills. Flu complications like pneumonia require medical monitoring.',
    category: 'Respiratory',
    sources: ['CDC Influenza & Common Cold Comparative Summary', 'National Institute of Allergy and Infectious Diseases (NIAID)'],
    references: ['CDC Comparative Overview: Influenza & Common Cold', 'NIAID Viral Pathogen Reviews'],
    safetyDisclaimer: 'If high fever is accompanied by shortness of breath or chest pain, seek immediate medical evaluation.',
    relatedTopics: ['Viral Infection', 'Fever Management', 'Respiratory Care'],
  },
  {
    id: 'qa-fever-eval',
    keywords: ['fever', 'doctor', 'when to evaluate fever', 'high temperature'],
    question: 'When should a fever be evaluated by a doctor?',
    answer: 'For adults, a fever should be evaluated if it exceeds 39.4°C (103°F), fails to respond to fever-reducing measures, or persists for more than 3 consecutive days. Immediate emergency care is needed if fever is accompanied by a stiff neck, sudden confusion, difficulty breathing, a new unexplained rash, or persistent vomiting that prevents hydration. For infants under 3 months, any rectal temperature of 38°C (100.4°F) or higher requires immediate emergency evaluation.',
    category: 'Common Symptoms',
    sources: ['American Academy of Family Physicians (AAFP)', 'Mayo Clinic Medical Review Board'],
    references: ['AAFP Clinical Guidelines for Adult Fever', 'Mayo Clinic Medical Review'],
    safetyDisclaimer: 'Never delay emergency care if high fever coincides with neurological symptoms like confusion or stiff neck.',
    relatedTopics: ['Body Temperature', 'Immune Response', 'Emergency Triage'],
  },
  {
    id: 'qa-headache-causes',
    keywords: ['headache', 'causes of headache', 'head pain', 'migraine vs headache'],
    question: 'What are common causes of headaches?',
    answer: 'Common primary headache causes include tension-type headaches (triggered by stress, poor posture, eye strain, or muscular tension), migraines (neurovascular throbbing often with light/sound sensitivity or aura), and sinus headaches (congestion in facial sinus cavities). Secondary headaches can stem from dehydration, caffeine withdrawal, lack of sleep, or hunger. Any sudden "thunderclap" headache or headache paired with focal weakness, numbness, or fever requires emergency attention.',
    category: 'Neurological',
    sources: ['International Headache Society (IHS) Classification', 'NINDS Headache Information Page'],
    references: ['International Headache Society Classification (ICHD-3)', 'NIH NINDS Neurological Bulletins'],
    safetyDisclaimer: 'A sudden, severe headache unlike any previous episode requires immediate emergency evaluation.',
    relatedTopics: ['Migraines', 'Tension Headaches', 'Neurological Evaluation'],
  },
  {
    id: 'qa-stomach-eating',
    keywords: ['stomach', 'stomach hurts', 'after eating', 'indigestion', 'gastric'],
    question: 'Why does stomach pain happen after eating?',
    answer: 'Post-prandial (after eating) stomach discomfort is frequently caused by indigestion (dyspepsia), gastroesophageal reflux (GERD), eating too quickly, or consuming fatty, spicy, or acidic foods. Other causes include gastritis, peptic ulcer irritation, food intolerances (such as lactose or gluten), or gallbladder inflammation (which often causes upper right abdomen pain after fatty meals). If pain is severe, radiates to the back, or is accompanied by yellowing of the skin or fever, consult a physician promptly.',
    category: 'Digestive',
    sources: ['National Institute of Diabetes and Digestive and Kidney Diseases (NIDDK)', 'Gastroenterology Clinical Reviews'],
    references: ['NIDDK Digestive Diseases Compendium', 'American Gastroenterological Association (AGA)'],
    safetyDisclaimer: 'Severe or progressive abdominal pain requires a doctor’s assessment to rule out acute conditions.',
    relatedTopics: ['GERD', 'Indigestion', 'Gallbladder', 'Ulcers'],
  },
];

export const QA_DATABASE = MOCK_QA_DATABASE;


export const DEMO_PRESETS = [
  {
    id: 'demo-1',
    label: 'Headache & mild fever',
    text: 'I have a headache and mild fever since yesterday.',
    summary: 'Neurological / Systemic mild onset',
  },
  {
    id: 'demo-2',
    label: 'Stomach pain after eating',
    text: 'I have stomach pain after eating and feel nauseous.',
    summary: 'Digestive trigger & nausea',
  },
  {
    id: 'demo-3',
    label: 'Cough & sore throat (3 days)',
    text: 'I have been coughing and have a sore throat for three days.',
    summary: 'Upper respiratory subacute duration',
  },
  {
    id: 'demo-4',
    label: 'Severe stomach pain & nausea',
    text: 'I have severe stomach pain for three days and feel nauseous after eating.',
    summary: 'Multi-entity: symptom, severity, duration, trigger',
  },
  {
    id: 'demo-5',
    label: 'Feeling dizzy for two days',
    text: "I've been feeling dizzy for two days.",
    summary: 'Neurological balance & duration',
  },
  {
    id: 'demo-urgent',
    label: '🚨 Urgent: Severe breathing difficulty',
    text: 'I suddenly have severe difficulty breathing.',
    summary: 'Safety alert / Urgent triage demo',
    isUrgent: true,
  },
];
