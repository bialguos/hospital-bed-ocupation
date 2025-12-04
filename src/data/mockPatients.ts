export interface Patient {
  id: string;
  name: string;
  bedNumber: number;
  admissionDate: Date;
  durationDays: number;
  dischargeTime?: '15:00';
}

// Datos de ejemplo con pacientes
export const mockPatients: Patient[] = [
  {
    id: '1',
    name: 'Juan Pérez',
    bedNumber: 1,
    admissionDate: new Date(2025, 11, 4), // Hoy
    durationDays: 5,
  },
  {
    id: '2',
    name: 'María García',
    bedNumber: 2,
    admissionDate: new Date(2025, 11, 3),
    durationDays: 7,
  },
  {
    id: '3',
    name: 'Carlos López',
    bedNumber: 3,
    admissionDate: new Date(2025, 11, 5),
    durationDays: 3,
    dischargeTime: '15:00',
  },
  {
    id: '4',
    name: 'Ana Martínez',
    bedNumber: 3,
    admissionDate: new Date(2025, 11, 8), // Ingresa cuando Carlos sale
    durationDays: 4,
  },
  {
    id: '5',
    name: 'Pedro Sánchez',
    bedNumber: 5,
    admissionDate: new Date(2025, 11, 6),
    durationDays: 8,
  },
  {
    id: '6',
    name: 'Laura Torres',
    bedNumber: 7,
    admissionDate: new Date(2025, 11, 4),
    durationDays: 10,
    dischargeTime: '15:00',
  },
  {
    id: '7',
    name: 'Roberto Díaz',
    bedNumber: 4,
    admissionDate: new Date(2025, 11, 7),
    durationDays: 6,
  },
  {
    id: '8',
    name: 'Isabel Ruiz',
    bedNumber: 8,
    admissionDate: new Date(2025, 11, 10),
    durationDays: 5,
  },
  {
    id: '9',
    name: 'Fernando Gómez',
    bedNumber: 6,
    admissionDate: new Date(2025, 11, 12),
    durationDays: 7,
  },
  {
    id: '10',
    name: 'Carmen Vega',
    bedNumber: 9,
    admissionDate: new Date(2025, 11, 15),
    durationDays: 4,
  },
  {
    id: '11',
    name: 'Miguel Herrera',
    bedNumber: 10,
    admissionDate: new Date(2025, 11, 8),
    durationDays: 12,
  },
  {
    id: '12',
    name: 'Sofía Castro',
    bedNumber: 11,
    admissionDate: new Date(2025, 11, 18),
    durationDays: 6,
  },
];
