import { Department, Doctor, MedicalRecord } from './types';

export const DEFAULT_MEDICAL_RECORDS: MedicalRecord[] = [
  {
    id: 'MR-2026-8819',
    patientId: 'default',
    visitDate: '2026-08-14',
    doctorName: 'Dr. Saniya',
    departmentName: 'Cardiology',
    diagnosis: 'Stage 1 Essential Hypertension & Borderline Dyslipidemia',
    visitSummary: 'Patient presented for routine annual cardiovascular review. Reports occasional mild dizziness in warm environments. Resting ECG shows sinus rhythm with normal axis. Echocardiogram shows normal ejection fraction (62%) without regional wall motion abnormalities. Recommended lifestyle changes, sodium reduction, and initiation of low-dose Telmisartan.',
    symptoms: ['Mild dizziness', 'Intermittent morning headaches', 'Mild fatigue after physical exertion'],
    vitals: {
      bloodPressure: '138/86 mmHg',
      heartRate: '72 bpm',
      temperature: '98.4 °F',
      oxygenSaturation: '99%',
      weightKg: 74.5
    },
    prescriptions: [
      {
        medication: 'Telmisartan 20mg',
        dosage: '1 tablet once daily',
        frequency: 'Morning after breakfast',
        duration: '90 Days'
      },
      {
        medication: 'Omega-3 Fish Oil (EPA/DHA 1000mg)',
        dosage: '1 capsule daily',
        frequency: 'With evening meal',
        duration: '60 Days'
      }
    ],
    labReports: [
      {
        testName: 'Lipid Panel (Total Cholesterol)',
        result: '215 mg/dL',
        normalRange: '< 200 mg/dL',
        status: 'Abnormal'
      },
      {
        testName: 'LDL Cholesterol',
        result: '128 mg/dL',
        normalRange: '< 100 mg/dL',
        status: 'Abnormal'
      },
      {
        testName: 'Fasting Blood Glucose',
        result: '94 mg/dL',
        normalRange: '70 - 99 mg/dL',
        status: 'Normal'
      },
      {
        testName: 'Serum Creatinine',
        result: '0.9 mg/dL',
        normalRange: '0.7 - 1.2 mg/dL',
        status: 'Normal'
      }
    ],
    doctorAdvice: 'Maintain daily 30-minute brisk walk. Restrict dietary sodium to under 2,000 mg/day. Maintain a weekly home blood pressure log.',
    followUpDate: '2026-11-15',
    attachments: [
      {
        name: 'Cardio_ECG_Report_Aug2026.pdf',
        type: 'PDF Diagnostic Document',
        size: '1.4 MB'
      },
      {
        name: 'Lipid_Panel_Lab_Result.pdf',
        type: 'Clinical Laboratory File',
        size: '840 KB'
      }
    ]
  },
  {
    id: 'MR-2026-6402',
    patientId: 'default',
    visitDate: '2026-05-19',
    doctorName: 'Dr. Michael Chen',
    departmentName: 'Neurology',
    diagnosis: 'Tension-Type Cephalea & Cervical Muscle Strain',
    visitSummary: 'Patient evaluated for recurring bi-temporal tension headaches occurring primarily toward the end of long workdays. Cranial nerve examination was completely intact. No visual aura or focal neurological deficit. Ergonomic workstation review and cervical physiotherapy recommended with magnesium supplementation.',
    symptoms: ['Bilateral dull aching sensation', 'Neck and shoulder stiffness', 'Eye strain'],
    vitals: {
      bloodPressure: '124/80 mmHg',
      heartRate: '68 bpm',
      temperature: '98.6 °F',
      oxygenSaturation: '99%',
      weightKg: 75.0
    },
    prescriptions: [
      {
        medication: 'Magnesium Glycinate 400mg',
        dosage: '1 tablet nightly',
        frequency: 'Before bedtime',
        duration: '60 Days'
      },
      {
        medication: 'Naproxen Sodium 250mg',
        dosage: '1 tablet PRN',
        frequency: 'As needed for acute pain (max 2/day)',
        duration: '14 Days'
      }
    ],
    labReports: [
      {
        testName: 'Vitamin D (25-OH)',
        result: '34 ng/mL',
        normalRange: '30 - 100 ng/mL',
        status: 'Normal'
      },
      {
        testName: 'Serum Electrolytes (Sodium/Potassium)',
        result: '141 / 4.2 mmol/L',
        normalRange: '135-145 / 3.5-5.0',
        status: 'Normal'
      }
    ],
    doctorAdvice: 'Take 5-minute screen breaks every 45 minutes. Practice cervical stretching exercises twice daily.',
    followUpDate: '2026-08-20',
    attachments: [
      {
        name: 'Cervical_Spine_XRay_Summary.pdf',
        type: 'Radiology Report',
        size: '2.8 MB'
      }
    ]
  },
  {
    id: 'MR-2026-3105',
    patientId: 'default',
    visitDate: '2026-02-10',
    doctorName: 'Dr. Robert Wilson',
    departmentName: 'Orthopedics',
    diagnosis: 'Mild Right Knee Patellofemoral Syndrome',
    visitSummary: 'Patient attended orthopedics outpatient clinic following mild right anterior knee discomfort when descending stairs. Physical evaluation showed mild patellar crepitus with negative Lachman and McMurray tests. Prescribed quadriceps strengthening physiotherapy protocol and glucosamine complex.',
    symptoms: ['Right knee aching on stairs', 'Mild joint stiffness in the morning'],
    vitals: {
      bloodPressure: '122/78 mmHg',
      heartRate: '70 bpm',
      temperature: '98.2 °F',
      oxygenSaturation: '98%',
      weightKg: 76.2
    },
    prescriptions: [
      {
        medication: 'Glucosamine & Chondroitin Complex',
        dosage: '1 caplet twice daily',
        frequency: 'With meals',
        duration: '90 Days'
      }
    ],
    labReports: [
      {
        testName: 'Uric Acid (Serum)',
        result: '5.2 mg/dL',
        normalRange: '3.5 - 7.2 mg/dL',
        status: 'Normal'
      }
    ],
    doctorAdvice: 'Avoid deep squats and high-impact running on asphalt for 6 weeks. Low-impact cycling and swimming are encouraged.',
    followUpDate: '2026-06-15',
    attachments: [
      {
        name: 'Right_Knee_MRI_Study.pdf',
        type: 'Imaging Study',
        size: '3.5 MB'
      }
    ]
  }
];

export const DEPARTMENTS: Department[] = [
  {
    id: 'cardiology',
    name: 'Cardiology',
    shortDesc: 'Lead by Dr. Saniya, specializing in non-invasive robotics and valve repair.',
    fullDesc: 'The Cardiovascular Institute at WeCare delivers comprehensive cardiac care ranging from non-invasive diagnostic procedures to advanced robotic-assisted cardiac surgeries.',
    specialistsCount: 12,
    iconName: 'Heart',
    leadDoctor: 'Dr. Saniya',
    keyServices: ['Robotic Valve Repair', 'Coronary Angioplasty', 'Arrhythmia Management', 'Non-Invasive Diagnostics']
  },
  {
    id: 'neurology',
    name: 'Neurology',
    shortDesc: 'Expert care in neuro-plasticity, stroke recovery, and degenerative brain disorders.',
    fullDesc: 'Our Department of Neurology offers cutting-edge treatment protocols for complex neurological disorders, movement disorders, and neuro-rehabilitation.',
    specialistsCount: 8,
    iconName: 'Brain',
    leadDoctor: 'Dr. Michael Chen',
    keyServices: ['Stroke Emergency Unit', 'Neuro-Plasticity Rehab', 'Epilepsy Monitoring', 'Memory & Dementia Care']
  },
  {
    id: 'pediatrics',
    name: 'Pediatrics',
    shortDesc: 'Gentle, child-centered care from neonatal care to adolescent wellness.',
    fullDesc: 'Dedicated pediatric wing with child-friendly amenities, 24/7 emergency pediatric subspecialists, and compassionate care environments.',
    specialistsCount: 10,
    iconName: 'Baby',
    leadDoctor: 'Dr. Emily Vance',
    keyServices: ['Neonatal Intensive Care (NICU)', 'Pediatric Surgery', 'Immunization & Growth Tracking', 'Child Behavioral Health']
  },
  {
    id: 'orthopedics',
    name: 'Orthopedics',
    shortDesc: 'Pioneering joint replacement, sports injury rehab, and spine reconstruction.',
    fullDesc: 'State-of-the-art orthopedic center specializing in minimally invasive joint replacements, sports trauma medicine, and spinal alignments.',
    specialistsCount: 9,
    iconName: 'Bone',
    leadDoctor: 'Dr. Robert Wilson',
    keyServices: ['Robotic Knee & Hip Replacement', 'Spine Reconstruction', 'Sports Medicine Rehab', 'Fracture Emergency Unit']
  },
  {
    id: 'oncology',
    name: 'Oncology',
    shortDesc: 'Comprehensive cancer treatment combining immunotherapy and targeted diagnostics.',
    fullDesc: 'Providing empathetic, multi-disciplinary cancer care with genetic screening, targeted chemotherapy, and radiation precision.',
    specialistsCount: 7,
    iconName: 'Activity',
    leadDoctor: 'Dr. James Thorne',
    keyServices: ['Precision Immunotherapy', 'Surgical Oncology', 'Radiation Therapy', 'Genetic Cancer Screening']
  },
  {
    id: 'dermatology',
    name: 'Dermatology',
    shortDesc: 'Advanced skin health, laser therapies, and dermatologic oncology.',
    fullDesc: 'Expert clinical and cosmetic dermatology clinic diagnosing and managing complex skin conditions using medical-grade laser technology.',
    specialistsCount: 6,
    iconName: 'Sparkles',
    leadDoctor: 'Dr. Sophia Martinez',
    keyServices: ['Melanoma Screening', 'Laser Skin Resurfacing', 'Eczema & Psoriasis Unit', 'Cosmetic Dermatology']
  }
];

export const DOCTORS: Doctor[] = [
  {
    id: 'doc-saniya',
    name: 'Dr. Saniya',
    role: 'Chief of Cardiovascular Surgery',
    departmentId: 'cardiology',
    departmentName: 'Cardiology',
    experience: '18+ Years Experience',
    bio: 'Pioneer in minimally invasive robotic mitral valve repairs. Has completed over 1,500 successful cardiac interventions.',
    rating: 4.9,
    reviewsCount: 320,
    availableDays: ['Mon', 'Tue', 'Thu', 'Fri'],
    avatarUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400',
    education: 'MD, Harvard Medical School',
    specialties: ['Robotic Surgery', 'Valve Repair', 'Aortic Interventions']
  },
  {
    id: 'doc-chen',
    name: 'Dr. Michael Chen',
    role: 'Chief of Neurology',
    departmentId: 'neurology',
    departmentName: 'Neurology',
    experience: '20+ Years Experience',
    bio: 'Physician of the Month. Internationally acclaimed researcher in neuro-plasticity and degenerative brain disorders.',
    rating: 4.9,
    reviewsCount: 410,
    availableDays: ['Mon', 'Wed', 'Thu'],
    avatarUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400',
    education: 'MD, Johns Hopkins University',
    specialties: ['Neuro-Plasticity', 'Stroke Recovery', 'Parkinsons Care']
  },
  {
    id: 'doc-wilson',
    name: 'Dr. Robert Wilson',
    role: 'Senior Orthopedic Surgeon',
    departmentId: 'orthopedics',
    departmentName: 'Orthopedics',
    experience: '15+ Years Experience',
    bio: 'Specialist in sports medicine and complex joint reconstruction, serving as official consultant for Olympic athletes.',
    rating: 4.8,
    reviewsCount: 290,
    availableDays: ['Tue', 'Wed', 'Fri'],
    avatarUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400',
    education: 'MD, Stanford University',
    specialties: ['Joint Replacement', 'Sports Injuries', 'Spine Reconstruction']
  },
  {
    id: 'doc-vance',
    name: 'Dr. Emily Vance',
    role: 'Head of Pediatric Medicine',
    departmentId: 'pediatrics',
    departmentName: 'Pediatrics',
    experience: '14+ Years Experience',
    bio: 'Dedicated to compassionate pediatric healthcare and neonatal critical care management.',
    rating: 4.9,
    reviewsCount: 350,
    availableDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    avatarUrl: 'https://images.unsplash.com/photo-1594824813566-88855ce78347?auto=format&fit=crop&q=80&w=400',
    education: 'MD, Columbia University',
    specialties: ['Neonatal Care', 'Pediatric Cardiology', 'Growth Development']
  },
  {
    id: 'doc-thorne',
    name: 'Dr. James Thorne',
    role: 'Director of Oncology',
    departmentId: 'oncology',
    departmentName: 'Oncology',
    experience: '22+ Years Experience',
    bio: 'Pioneered targeted immunotherapy treatments reducing side effects while improving remission rates.',
    rating: 4.9,
    reviewsCount: 180,
    availableDays: ['Mon', 'Wed', 'Fri'],
    avatarUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400',
    education: 'MD, Oxford University',
    specialties: ['Immunotherapy', 'Surgical Oncology', 'Precision Genetics']
  },
  {
    id: 'doc-martinez',
    name: 'Dr. Sophia Martinez',
    role: 'Lead Dermatologist',
    departmentId: 'dermatology',
    departmentName: 'Dermatology',
    experience: '12+ Years Experience',
    bio: 'Specialist in early melanoma diagnostics and non-ablative laser skin therapies.',
    rating: 4.8,
    reviewsCount: 210,
    availableDays: ['Tue', 'Thu', 'Sat'],
    avatarUrl: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&q=80&w=400',
    education: 'MD, UCLA School of Medicine',
    specialties: ['Melanoma Screening', 'Laser Surgery', 'Clinical Dermatology']
  }
];
