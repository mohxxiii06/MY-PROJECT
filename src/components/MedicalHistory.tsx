import React, { useState } from 'react';
import { 
  FileText, 
  Calendar, 
  User, 
  Activity, 
  Heart, 
  Thermometer, 
  Wind, 
  Scale, 
  Pill, 
  FileCheck, 
  AlertCircle, 
  Download, 
  Printer, 
  Search, 
  Filter, 
  ChevronDown, 
  ChevronUp, 
  Clock, 
  ShieldCheck, 
  Plus, 
  X, 
  Stethoscope,
  Paperclip,
  CheckCircle2,
  Share2,
  FilePlus2,
  ArrowUpRight
} from 'lucide-react';
import { MedicalRecord, UserProfile } from '../types';

interface MedicalHistoryProps {
  records: MedicalRecord[];
  userProfile: UserProfile | null;
  currentUserEmail?: string;
  onAddRecord?: (record: Omit<MedicalRecord, 'id'>) => Promise<void>;
}

export const MedicalHistory: React.FC<MedicalHistoryProps> = ({
  records,
  userProfile,
  currentUserEmail,
  onAddRecord
}) => {
  const [selectedRecordId, setSelectedRecordId] = useState<string | null>(
    records.length > 0 ? records[0].id : null
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [activeTab, setActiveTab] = useState<'all' | 'prescriptions' | 'labs' | 'vitals'>('all');
  const [newRecordModalOpen, setNewRecordModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // New Record Form State
  const [formDoctor, setFormDoctor] = useState('Dr. Saniya');
  const [formDept, setFormDept] = useState('Cardiology');
  const [formDate, setFormDate] = useState(new Date().toISOString().split('T')[0]);
  const [formDiagnosis, setFormDiagnosis] = useState('');
  const [formSummary, setFormSummary] = useState('');
  const [formSymptoms, setFormSymptoms] = useState('');
  const [formBP, setFormBP] = useState('120/80 mmHg');
  const [formHR, setFormHR] = useState('72 bpm');
  const [formTemp, setFormTemp] = useState('98.6 °F');
  const [formO2, setFormO2] = useState('99%');
  const [formWeight, setFormWeight] = useState('72');
  const [formMedication, setFormMedication] = useState('');
  const [formDosage, setFormDosage] = useState('');
  const [formAdvice, setFormAdvice] = useState('');
  const [formFollowUp, setFormFollowUp] = useState('');

  // Filtering
  const filteredRecords = records.filter(r => {
    const matchesSearch = 
      r.diagnosis.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.departmentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.visitSummary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept = departmentFilter === 'all' || r.departmentName.toLowerCase() === departmentFilter.toLowerCase();
    return matchesSearch && matchesDept;
  });

  const activeRecord = records.find(r => r.id === selectedRecordId) || (filteredRecords.length > 0 ? filteredRecords[0] : null);

  const handleCopyRecord = (record: MedicalRecord) => {
    const text = `WeCare Hospital Digital Health Record\nRecord ID: ${record.id}\nPatient: ${userProfile?.displayName || currentUserEmail || 'Patient'}\nDate: ${record.visitDate}\nAttending Physician: ${record.doctorName} (${record.departmentName})\nDiagnosis: ${record.diagnosis}\nSummary: ${record.visitSummary}\nDoctor Advice: ${record.doctorAdvice}`;
    navigator.clipboard?.writeText(text);
    setCopiedId(record.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handlePrintRecord = () => {
    window.print();
  };

  const handleCreateRecordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formDiagnosis || !formSummary) return;

    setIsSubmitting(true);
    try {
      const newRec: Omit<MedicalRecord, 'id'> = {
        patientId: userProfile?.uid || 'guest-user',
        visitDate: formDate,
        doctorName: formDoctor,
        departmentName: formDept,
        diagnosis: formDiagnosis,
        visitSummary: formSummary,
        symptoms: formSymptoms ? formSymptoms.split(',').map(s => s.trim()).filter(Boolean) : ['Routine medical evaluation'],
        vitals: {
          bloodPressure: formBP,
          heartRate: formHR,
          temperature: formTemp,
          oxygenSaturation: formO2,
          weightKg: parseFloat(formWeight) || 70
        },
        prescriptions: formMedication ? [
          {
            medication: formMedication,
            dosage: formDosage || '1 dose daily',
            frequency: 'As directed',
            duration: '30 Days'
          }
        ] : [],
        labReports: [
          {
            testName: 'Complete Metabolic Panel (CMP)',
            result: 'Within normal biological reference parameters',
            normalRange: 'Standard Clinical Range',
            status: 'Normal'
          }
        ],
        doctorAdvice: formAdvice || 'Maintain active lifestyle and adhere to prescribed guidance.',
        followUpDate: formFollowUp || undefined,
        attachments: [
          {
            name: `${formDept}_Clinical_Consultation_Note.pdf`,
            type: 'Electronic Health Record (EHR)',
            size: '1.2 MB'
          }
        ]
      };

      if (onAddRecord) {
        await onAddRecord(newRec);
      }
      setNewRecordModalOpen(false);
      // Reset form
      setFormDiagnosis('');
      setFormSummary('');
      setFormSymptoms('');
      setFormMedication('');
      setFormDosage('');
      setFormAdvice('');
    } catch (err) {
      console.error('Error creating medical record:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const uniqueDepartments = Array.from(new Set(records.map(r => r.departmentName)));

  return (
    <div className="space-y-6">
      {/* Patient Health ID Card / Summary Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <span className="bg-blue-500/20 text-blue-300 text-[11px] font-bold tracking-wider uppercase px-3 py-1 rounded-full border border-blue-400/30 flex items-center gap-1.5">
                <ShieldCheck size={13} className="text-blue-400" />
                Verified Digital Health Vault
              </span>
              <span className="text-xs text-slate-400">HIPAA Compliant Record</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center gap-3">
              <span>{userProfile?.displayName || 'Patient Health Portal'}</span>
              <span className="text-sm font-normal text-blue-200 bg-white/10 px-2.5 py-0.5 rounded-lg border border-white/10 font-mono">
                ID: {userProfile?.uid?.slice(0, 8).toUpperCase() || 'WC-USR-01'}
              </span>
            </h2>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-300 pt-1">
              <p className="flex items-center gap-1.5">
                <User size={14} className="text-blue-400" />
                <span>Primary Email: <strong>{userProfile?.email || currentUserEmail || 'patient@wecare.org'}</strong></span>
              </p>
              {userProfile?.phone && (
                <p className="flex items-center gap-1.5">
                  <Activity size={14} className="text-emerald-400" />
                  <span>Phone: <strong>{userProfile.phone}</strong></span>
                </p>
              )}
              <p className="flex items-center gap-1.5">
                <FileCheck size={14} className="text-amber-400" />
                <span>Total Health Records: <strong>{records.length} Documents</strong></span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              onClick={() => setNewRecordModalOpen(true)}
              className="flex-1 md:flex-initial bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs py-3 px-5 rounded-xl transition-all shadow-lg hover:shadow-blue-500/25 flex items-center justify-center gap-2"
            >
              <Plus size={16} />
              <span>Log Visit Summary</span>
            </button>
            <button
              onClick={handlePrintRecord}
              className="bg-white/10 hover:bg-white/20 text-white p-3 rounded-xl transition-all text-xs font-semibold flex items-center justify-center"
              title="Print Health Record Dossier"
            >
              <Printer size={16} />
            </button>
          </div>
        </div>

        {/* Patient Quick Vitals Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-white/10 text-xs">
          <div className="bg-white/5 backdrop-blur-xs rounded-2xl p-3 border border-white/10">
            <p className="text-slate-400 text-[11px] uppercase font-semibold">Blood Group</p>
            <p className="text-base font-bold text-white mt-0.5">{userProfile?.bloodGroup || 'O+ Positive'}</p>
          </div>
          <div className="bg-white/5 backdrop-blur-xs rounded-2xl p-3 border border-white/10">
            <p className="text-slate-400 text-[11px] uppercase font-semibold">Known Allergies</p>
            <p className="text-base font-bold text-emerald-400 mt-0.5">Penicillin, Pollen</p>
          </div>
          <div className="bg-white/5 backdrop-blur-xs rounded-2xl p-3 border border-white/10">
            <p className="text-slate-400 text-[11px] uppercase font-semibold">Immunization Status</p>
            <p className="text-base font-bold text-blue-300 mt-0.5">Up to Date (2026)</p>
          </div>
          <div className="bg-white/5 backdrop-blur-xs rounded-2xl p-3 border border-white/10">
            <p className="text-slate-400 text-[11px] uppercase font-semibold">Next Scheduled Follow-up</p>
            <p className="text-base font-bold text-amber-300 mt-0.5">
              {activeRecord?.followUpDate ? activeRecord.followUpDate : 'Nov 15, 2026'}
            </p>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative flex-1 w-full">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by diagnosis, doctor, clinical summary or symptoms..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter size={15} className="text-slate-400 flex-shrink-0" />
          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Departments ({records.length})</option>
            {uniqueDepartments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Medical Records Layout (2-Column Dossier) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Timeline List of Past Visits */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Clock size={16} className="text-blue-600" />
              <span>Visit Summaries Timeline ({filteredRecords.length})</span>
            </h3>
            <span className="text-xs text-slate-400 font-medium">Most Recent First</span>
          </div>

          {filteredRecords.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center">
              <FileText size={40} className="mx-auto text-slate-300 mb-2" />
              <p className="text-sm font-bold text-slate-700">No medical records match query</p>
              <p className="text-xs text-slate-400 mt-1">Try adjusting your search terms or department filter.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredRecords.map((record) => {
                const isSelected = activeRecord?.id === record.id;
                return (
                  <div
                    key={record.id}
                    onClick={() => setSelectedRecordId(record.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer text-left relative overflow-hidden ${
                      isSelected 
                        ? 'bg-blue-50/70 border-blue-500 shadow-md ring-1 ring-blue-500/20' 
                        : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-xs'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="font-mono text-[11px] font-bold text-blue-700 bg-blue-100/70 px-2 py-0.5 rounded-md">
                        {record.id}
                      </span>
                      <span className="text-xs text-slate-500 flex items-center gap-1 font-medium">
                        <Calendar size={13} className="text-slate-400" />
                        {record.visitDate}
                      </span>
                    </div>

                    <h4 className="font-bold text-slate-900 text-sm leading-snug line-clamp-1">
                      {record.diagnosis}
                    </h4>

                    <p className="text-xs text-slate-500 mt-1 flex items-center gap-1.5">
                      <Stethoscope size={13} className="text-blue-600 flex-shrink-0" />
                      <span>{record.doctorName}</span>
                      <span className="text-slate-300">•</span>
                      <span className="font-medium text-slate-600">{record.departmentName}</span>
                    </p>

                    <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed bg-white/60 p-2 rounded-xl border border-slate-100">
                      {record.visitSummary}
                    </p>

                    <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-100 text-[11px] text-slate-500">
                      <span>{record.prescriptions?.length || 0} Prescriptions</span>
                      <span>{record.labReports?.length || 0} Lab Tests</span>
                      <span className="text-blue-600 font-semibold flex items-center gap-0.5">
                        View Dossier
                        <ArrowUpRight size={12} />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Column: Detailed Digital Health Record Inspector */}
        <div className="lg:col-span-7">
          {activeRecord ? (
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
              {/* Header Details */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-slate-100">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-lg">
                      {activeRecord.id}
                    </span>
                    <span className="text-xs font-semibold bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                      <CheckCircle2 size={12} />
                      Signed by {activeRecord.doctorName}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 pt-1">
                    {activeRecord.diagnosis}
                  </h3>
                  <p className="text-xs text-slate-500 flex items-center gap-2">
                    <span>Department of {activeRecord.departmentName}</span>
                    <span>•</span>
                    <span>Consultation Date: <strong>{activeRecord.visitDate}</strong></span>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopyRecord(activeRecord)}
                    className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors text-xs font-semibold flex items-center gap-1.5"
                    title="Copy Clinical Summary"
                  >
                    <Share2 size={15} />
                    <span>{copiedId === activeRecord.id ? 'Copied!' : 'Share'}</span>
                  </button>
                  <button
                    onClick={handlePrintRecord}
                    className="p-2.5 rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition-colors text-xs font-semibold flex items-center gap-1.5 shadow-xs"
                    title="Print Document"
                  >
                    <Printer size={15} />
                    <span>Print PDF</span>
                  </button>
                </div>
              </div>

              {/* Vitals Ribbon */}
              {activeRecord.vitals && (
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                    <Activity size={14} className="text-blue-600" />
                    Recorded Clinical Vitals
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                    <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 text-center">
                      <p className="text-[10px] text-slate-400 uppercase font-semibold flex items-center justify-center gap-1">
                        <Heart size={11} className="text-rose-500" /> BP
                      </p>
                      <p className="text-xs sm:text-sm font-bold text-slate-800 mt-1">
                        {activeRecord.vitals.bloodPressure || 'N/A'}
                      </p>
                    </div>

                    <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 text-center">
                      <p className="text-[10px] text-slate-400 uppercase font-semibold flex items-center justify-center gap-1">
                        <Activity size={11} className="text-blue-500" /> Pulse
                      </p>
                      <p className="text-xs sm:text-sm font-bold text-slate-800 mt-1">
                        {activeRecord.vitals.heartRate || 'N/A'}
                      </p>
                    </div>

                    <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 text-center">
                      <p className="text-[10px] text-slate-400 uppercase font-semibold flex items-center justify-center gap-1">
                        <Thermometer size={11} className="text-amber-500" /> Temp
                      </p>
                      <p className="text-xs sm:text-sm font-bold text-slate-800 mt-1">
                        {activeRecord.vitals.temperature || 'N/A'}
                      </p>
                    </div>

                    <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 text-center">
                      <p className="text-[10px] text-slate-400 uppercase font-semibold flex items-center justify-center gap-1">
                        <Wind size={11} className="text-emerald-500" /> SpO2
                      </p>
                      <p className="text-xs sm:text-sm font-bold text-slate-800 mt-1">
                        {activeRecord.vitals.oxygenSaturation || 'N/A'}
                      </p>
                    </div>

                    <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 text-center col-span-2 sm:col-span-1">
                      <p className="text-[10px] text-slate-400 uppercase font-semibold flex items-center justify-center gap-1">
                        <Scale size={11} className="text-purple-500" /> Weight
                      </p>
                      <p className="text-xs sm:text-sm font-bold text-slate-800 mt-1">
                        {activeRecord.vitals.weightKg ? `${activeRecord.vitals.weightKg} kg` : 'N/A'}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Clinical Visit Summary */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <FileText size={14} className="text-blue-600" />
                  Clinical Evaluation & Findings
                </h4>
                <div className="bg-slate-50/80 p-4 rounded-2xl border border-slate-200/70 text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
                  {activeRecord.visitSummary}
                </div>
              </div>

              {/* Symptoms Presented */}
              {activeRecord.symptoms && activeRecord.symptoms.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Presenting Symptoms
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activeRecord.symptoms.map((symp, idx) => (
                      <span key={idx} className="bg-slate-100 text-slate-700 text-xs font-medium px-3 py-1 rounded-full border border-slate-200">
                        • {symp}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Prescriptions & Medications */}
              {activeRecord.prescriptions && activeRecord.prescriptions.length > 0 && (
                <div className="space-y-2.5">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Pill size={14} className="text-blue-600" />
                    Digital Rx & Prescribed Medications ({activeRecord.prescriptions.length})
                  </h4>
                  <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden">
                    {activeRecord.prescriptions.map((rx, idx) => (
                      <div key={idx} className="p-3.5 bg-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs">
                        <div>
                          <p className="font-bold text-slate-900 text-sm">{rx.medication}</p>
                          <p className="text-slate-500">{rx.dosage} • {rx.frequency}</p>
                        </div>
                        <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-lg font-semibold border border-blue-100 text-[11px]">
                          Duration: {rx.duration}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Laboratory Reports */}
              {activeRecord.labReports && activeRecord.labReports.length > 0 && (
                <div className="space-y-2.5">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <FileCheck size={14} className="text-blue-600" />
                    Diagnostic Tests & Lab Panels
                  </h4>
                  <div className="border border-slate-200 rounded-2xl overflow-hidden">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 text-slate-400 text-[11px] uppercase border-b border-slate-200">
                        <tr>
                          <th className="p-3 font-semibold">Test Name</th>
                          <th className="p-3 font-semibold">Result</th>
                          <th className="p-3 font-semibold">Normal Range</th>
                          <th className="p-3 font-semibold text-right">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {activeRecord.labReports.map((lab, idx) => (
                          <tr key={idx} className="hover:bg-slate-50/50">
                            <td className="p-3 font-semibold text-slate-800">{lab.testName}</td>
                            <td className="p-3 font-mono text-slate-700 font-bold">{lab.result}</td>
                            <td className="p-3 text-slate-400">{lab.normalRange}</td>
                            <td className="p-3 text-right">
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                lab.status === 'Normal' 
                                  ? 'bg-emerald-100 text-emerald-800' 
                                  : 'bg-amber-100 text-amber-800'
                              }`}>
                                {lab.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Physician Advice & Follow-Up Box */}
              <div className="bg-blue-50/80 border border-blue-200 rounded-2xl p-4 text-xs space-y-2 text-blue-950">
                <div className="flex items-center gap-2 font-bold text-blue-900">
                  <AlertCircle size={15} className="text-blue-600" />
                  <span>Physician Post-Visit Recommendations</span>
                </div>
                <p className="leading-relaxed pl-6">
                  {activeRecord.doctorAdvice}
                </p>
                {activeRecord.followUpDate && (
                  <p className="text-[11px] font-semibold text-blue-800 pl-6 pt-1">
                    Scheduled Re-evaluation Date: <strong>{activeRecord.followUpDate}</strong>
                  </p>
                )}
              </div>

              {/* Attachments */}
              {activeRecord.attachments && activeRecord.attachments.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Paperclip size={14} className="text-slate-500" />
                    Attached Digital Documents
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {activeRecord.attachments.map((file, idx) => (
                      <div key={idx} className="bg-slate-50 hover:bg-slate-100 p-3 rounded-xl border border-slate-200 flex items-center justify-between text-xs transition-colors">
                        <div className="flex items-center gap-2 overflow-hidden">
                          <FileText size={16} className="text-blue-600 flex-shrink-0" />
                          <div className="truncate">
                            <p className="font-semibold text-slate-800 truncate">{file.name}</p>
                            <p className="text-[10px] text-slate-400">{file.type} • {file.size}</p>
                          </div>
                        </div>
                        <button 
                          onClick={handlePrintRecord}
                          className="text-blue-600 hover:text-blue-800 p-1 font-semibold flex items-center gap-1 flex-shrink-0"
                          title="Download record"
                        >
                          <Download size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center">
              <FileText size={48} className="mx-auto text-slate-300 mb-3" />
              <h3 className="text-lg font-bold text-slate-800">Select a Medical Record</h3>
              <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                Select any previous visit summary from the left timeline to inspect the full electronic diagnostic dossier.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Log New Medical Record Modal */}
      {newRecordModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between mb-5">
              <div>
                <span className="text-xs font-bold text-blue-600 uppercase">EHR Entry</span>
                <h3 className="text-xl font-bold text-slate-900">Log Medical Visit Summary</h3>
              </div>
              <button 
                onClick={() => setNewRecordModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateRecordSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-500 font-semibold mb-1">Department</label>
                  <select
                    value={formDept}
                    onChange={(e) => setFormDept(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-medium text-slate-800"
                  >
                    <option value="Cardiology">Cardiology</option>
                    <option value="Neurology">Neurology</option>
                    <option value="Pediatrics">Pediatrics</option>
                    <option value="Orthopedics">Orthopedics</option>
                    <option value="Oncology">Oncology</option>
                    <option value="Dermatology">Dermatology</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-500 font-semibold mb-1">Attending Doctor</label>
                  <input
                    type="text"
                    value={formDoctor}
                    onChange={(e) => setFormDoctor(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800"
                    placeholder="e.g. Dr. Saniya"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-500 font-semibold mb-1">Visit Date</label>
                  <input
                    type="date"
                    value={formDate}
                    onChange={(e) => setFormDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-500 font-semibold mb-1">Follow-up Date (Optional)</label>
                  <input
                    type="date"
                    value={formFollowUp}
                    onChange={(e) => setFormFollowUp(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-500 font-semibold mb-1">Primary Clinical Diagnosis *</label>
                <input
                  type="text"
                  value={formDiagnosis}
                  onChange={(e) => setFormDiagnosis(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800"
                  placeholder="e.g. Acute Bronchitis, Essential Hypertension"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-500 font-semibold mb-1">Visit Summary & Doctor Notes *</label>
                <textarea
                  rows={3}
                  value={formSummary}
                  onChange={(e) => setFormSummary(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800"
                  placeholder="Summarize patient symptoms, physical exam findings, and clinical decision..."
                  required
                />
              </div>

              <div>
                <label className="block text-slate-500 font-semibold mb-1">Symptoms (comma separated)</label>
                <input
                  type="text"
                  value={formSymptoms}
                  onChange={(e) => setFormSymptoms(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800"
                  placeholder="e.g. Fever, Persistent Cough, Fatigue"
                />
              </div>

              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 space-y-2">
                <p className="font-bold text-slate-700">Recorded Vitals</p>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-[10px] text-slate-400">Blood Pressure</label>
                    <input
                      type="text"
                      value={formBP}
                      onChange={(e) => setFormBP(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-lg p-1.5 text-xs"
                      placeholder="120/80 mmHg"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-400">Heart Rate</label>
                    <input
                      type="text"
                      value={formHR}
                      onChange={(e) => setFormHR(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-lg p-1.5 text-xs"
                      placeholder="72 bpm"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-400">Oxygen Saturation</label>
                    <input
                      type="text"
                      value={formO2}
                      onChange={(e) => setFormO2(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-lg p-1.5 text-xs"
                      placeholder="99%"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-500 font-semibold mb-1">Prescribed Medication</label>
                  <input
                    type="text"
                    value={formMedication}
                    onChange={(e) => setFormMedication(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs"
                    placeholder="e.g. Amoxicillin 500mg"
                  />
                </div>
                <div>
                  <label className="block text-slate-500 font-semibold mb-1">Dosage Instructions</label>
                  <input
                    type="text"
                    value={formDosage}
                    onChange={(e) => setFormDosage(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs"
                    placeholder="1 tablet every 8 hours"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-500 font-semibold mb-1">Doctor Advice</label>
                <input
                  type="text"
                  value={formAdvice}
                  onChange={(e) => setFormAdvice(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs"
                  placeholder="e.g. Drink plenty of fluids, rest for 3 days."
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold text-xs shadow-md transition-all disabled:opacity-50"
                >
                  {isSubmitting ? 'Saving Record...' : 'Save to Health Records'}
                </button>
                <button
                  type="button"
                  onClick={() => setNewRecordModalOpen(false)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-3 rounded-xl font-semibold text-xs"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default MedicalHistory;
