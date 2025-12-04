export interface Patient {
  id: string;
  name: string;
  bedNumber: number;
  admissionDate: Date;
  durationDays: number;
  dischargeTime?: '15:00'; // Hora de alta si aplica
}

export interface BedOccupation {
  bedNumber: number;
  date: Date;
  patientId: string | null;
  patientName: string | null;
  period: 'morning' | 'afternoon' | 'full'; // mañana (hasta 15:00), tarde (desde 15:00), o día completo
}
