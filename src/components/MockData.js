import crocinImg from '../assets/medicine_crocin.png';
import expiredImg from '../assets/medicine_expired.png';

// Bounding box templates for OCR overlays
export const SAMPLE_MEDICINES = [
  {
    id: 'crocin',
    name: 'Crocin 650',
    genericName: 'Paracetamol / Acetaminophen',
    batchNumber: 'CR8820',
    mfgDate: '08/2024',
    expDate: '08/2027',
    ocrConfidence: '98.4%',
    yoloConfidence: '99.2%',
    status: 'VALID',
    remainingDays: 415,
    recommendation: 'Medicine is in excellent condition and safe for consumption. Store below 30°C in a dry place away from direct sunlight.',
    imageUrl: crocinImg,
    voiceText: 'Medicine is valid and safe to use. Crocin 650, batch number C R 8 8 2 0, expires in 4 1 5 days.',
    boxes: [
      { label: 'Medicine Package', x: 10, y: 15, w: 80, h: 70, color: '#2563EB' },
      { label: 'Expiry Date Region', x: 25, y: 55, w: 40, h: 12, color: '#14B8A6' }
    ]
  },
  {
    id: 'expired_syrup',
    name: 'CoughRelief Syrup',
    genericName: 'Dextromethorphan HBr',
    batchNumber: 'CR1023',
    mfgDate: '12/2022',
    expDate: '12/2024',
    ocrConfidence: '94.6%',
    yoloConfidence: '97.8%',
    status: 'EXPIRED',
    remainingDays: -558, // expired 558 days ago relative to 2026-07-12
    recommendation: 'WARNING: This medicine is expired. DO NOT consume. Please dispose of it safely at a pharmaceutical disposal site.',
    imageUrl: expiredImg,
    voiceText: 'Warning! Medicine has expired. Cough Relief Syrup, batch number C R 1 0 2 3, expired 5 5 8 days ago.',
    boxes: [
      { label: 'Medicine Bottle', x: 15, y: 10, w: 70, h: 80, color: '#EF4444' },
      { label: 'Expiry Date Region', x: 30, y: 60, w: 35, h: 12, color: '#F59E0B' }
    ]
  }
];

export const HISTORY_DATA = [
  { id: 1, name: 'Crocin 650', batch: 'CR8820', mfgDate: '08/2024', expDate: '08/2027', status: 'VALID', remainingDays: '415 Days', scanDate: '2026-07-12', accuracy: '98.4%' },
  { id: 2, name: 'CoughRelief Syrup', batch: 'CR1023', mfgDate: '12/2022', expDate: '12/2024', status: 'EXPIRED', remainingDays: 'Expired 558 Days Ago', scanDate: '2026-07-12', accuracy: '94.6%' },
  { id: 3, name: 'Amoxicillin 500mg', batch: 'AMX500', mfgDate: '10/2024', expDate: '10/2026', status: 'VALID', remainingDays: '111 Days', scanDate: '2026-07-08', accuracy: '97.1%' },
  { id: 4, name: 'Paracetamol 500', batch: 'P5002', mfgDate: '03/2024', expDate: '03/2026', status: 'EXPIRED', remainingDays: 'Expired 103 Days Ago', scanDate: '2026-06-25', accuracy: '91.2%' },
  { id: 5, name: 'Lipitor 20mg', batch: 'LP201', mfgDate: '08/2024', expDate: '08/2026', status: 'EXPIRING_SOON', remainingDays: '50 Days', scanDate: '2026-07-10', accuracy: '96.8%' },
  { id: 6, name: 'Combiflam', batch: 'CB120', mfgDate: '01/2025', expDate: '01/2028', status: 'VALID', remainingDays: '568 Days', scanDate: '2026-05-18', accuracy: '99.1%' },
  { id: 7, name: 'Azithromycin 250mg', batch: 'AZ250', mfgDate: '04/2023', expDate: '04/2025', status: 'EXPIRED', remainingDays: 'Expired 437 Days Ago', scanDate: '2026-04-12', accuracy: '89.5%' },
  { id: 8, name: 'Zantac 150mg', batch: 'ZN150', mfgDate: '06/2024', expDate: '06/2027', status: 'VALID', remainingDays: '354 Days', scanDate: '2026-06-11', accuracy: '97.5%' }
];

export const ANALYTICS_METRICS = {
  totalScanned: 184,
  safeMedicines: 142,
  expiredMedicines: 37,
  expiringSoon: 5,
  ocrAccuracy: '95.8%',
  detectionAccuracy: '98.2%',
  processingTime: '1.24s'
};

export const SCAN_TREND_DATA = [
  { month: 'Jan', scans: 18, valid: 15, expired: 3 },
  { month: 'Feb', scans: 24, valid: 20, expired: 4 },
  { month: 'Mar', scans: 32, valid: 25, expired: 7 },
  { month: 'Apr', scans: 28, valid: 22, expired: 6 },
  { month: 'May', scans: 41, valid: 33, expired: 8 },
  { month: 'Jun', scans: 35, valid: 28, expired: 7 },
  { month: 'Jul', scans: 50, valid: 40, expired: 10 }
];

export const DAILY_SCAN_DATA = [
  { day: 'Mon', scans: 5 },
  { day: 'Tue', scans: 8 },
  { day: 'Wed', scans: 12 },
  { day: 'Thu', scans: 7 },
  { day: 'Fri', scans: 15 },
  { day: 'Sat', scans: 10 },
  { day: 'Sun', scans: 6 }
];

export const OCR_ACCURACY_DATA = [
  { name: 'YOLOv8 Pack', accuracy: 98.2 },
  { name: 'Date Location', accuracy: 96.5 },
  { name: 'EasyOCR Text', accuracy: 94.8 },
  { name: 'Overall Pipeline', accuracy: 95.8 }
];

export const PIE_STATUS_DATA = [
  { name: 'Safe (Valid)', value: 142, color: '#22C55E' },
  { name: 'Expired', value: 37, color: '#EF4444' },
  { name: 'Expiring Soon', value: 5, color: '#F59E0B' }
];

export const FEATURE_CARDS = [
  {
    title: 'Medicine Detection (YOLOv8)',
    desc: 'Real-time object detection models locate, classify, and isolate medicine packages and labels within the camera frame.',
    icon: 'Package'
  },
  {
    title: 'Expiry Date Localization',
    desc: 'Specialized secondary bounding-box models isolate text regions related to Mfg, Exp, and Batch dates.',
    icon: 'Focus'
  },
  {
    title: 'OCR via EasyOCR & Tesseract',
    desc: 'Deep learning OCR engines read text from the localized bounding boxes, parsing date patterns in multiple formats.',
    icon: 'Type'
  },
  {
    title: 'Intelligent Expiry Validation',
    desc: 'Algorithmic date parsers cross-reference parsed text with real-time calendars to identify safety status.',
    icon: 'CalendarCheck'
  },
  {
    title: 'AI Voice Assistant',
    desc: 'Native audio synthesis readouts alert visually impaired users and provide immediate voice warning alerts.',
    icon: 'Volume2'
  },
  {
    title: 'Cloud Verification History',
    desc: 'Chronological scans are saved to a searchable secure registry with CSV exports and statistical dashboards.',
    icon: 'Cloud'
  },
  {
    title: 'Real-Time Camera Detection',
    desc: 'Responsive web camera overlay captures frames directly from dynamic environment feeds.',
    icon: 'Camera'
  },
  {
    title: 'Future AI Healthcare Sync',
    desc: 'Designed for deployment with pharmacy management systems and smart medicine cabinets.',
    icon: 'Activity'
  }
];

export const FUTURE_SCOPE_CARDS = [
  { title: 'Barcode & QR Verification', desc: 'Scan product barcodes and serial 2D datamatrix codes to verify authentic pharmacy logs.' },
  { title: 'Fake Medicine Detection', desc: 'Neural network label verification checks holograms and layouts to detect counterfeits.' },
  { title: 'Prescription Matching', desc: 'Matches scanned labels against scanned doctor prescriptions to ensure medication adherence.' },
  { title: 'Medicine Reminder Alerts', desc: 'Configurable automated SMS/push notification reminders for patient consumption cycles.' },
  { title: 'Multi-language OCR support', desc: 'OCR models reading English, Hindi, Tamil, Spanish, and standard international characters.' },
  { title: 'Native Android App', desc: 'High-speed mobile wrapper using React Native and TensorFlow Lite for offline on-device scanning.' },
  { title: 'Cloud Database Storage', desc: 'Secure database syncing scans across multiple family devices and nursing systems.' },
  { title: 'Hospital CRM Integration', desc: 'Direct API channels linking scans with electronic health records (EHR) and prescriptions.' },
  { title: 'Pharmacy Inventory Mgmt', desc: 'Dashboard tracking stock batches, predicting expiries, and initiating automated replenishment.' }
];
