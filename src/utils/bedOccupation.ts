export interface Patient {
  id: string;
  name: string;
  bedNumber: number;
  admissionDate: Date;
  durationDays: number;
  dischargeTime?: '15:00';
}

type BedOccupation = {
  bedNumber: number;
  date: Date;
  patientId: string | null;
  patientName: string | null;
  period: 'morning' | 'afternoon' | 'full';
};

export const calculateBedOccupation = (
  patients: Patient[],
  totalBeds: number,
  daysAhead: number
): BedOccupation[][] => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Crear matriz de ocupación: [día][cama]
  const occupationMatrix: BedOccupation[][] = [];

  for (let dayOffset = 0; dayOffset < daysAhead; dayOffset++) {
    const currentDate = new Date(today);
    currentDate.setDate(today.getDate() + dayOffset);

    const dayOccupation: BedOccupation[] = [];

    for (let bedNumber = 1; bedNumber <= totalBeds; bedNumber++) {
      // Buscar pacientes en esta cama en este día
      const patientsInBed = patients.filter((patient) => {
        if (patient.bedNumber !== bedNumber) return false;

        const admissionDate = new Date(patient.admissionDate);
        admissionDate.setHours(0, 0, 0, 0);

        const dischargeDate = new Date(admissionDate);
        dischargeDate.setDate(admissionDate.getDate() + patient.durationDays);
        dischargeDate.setHours(0, 0, 0, 0);

        return currentDate >= admissionDate && currentDate < dischargeDate;
      });

      if (patientsInBed.length === 0) {
        // Cama vacía
        dayOccupation.push({
          bedNumber,
          date: currentDate,
          patientId: null,
          patientName: null,
          period: 'full',
        });
      } else if (patientsInBed.length === 1) {
        // Un solo paciente
        const patient = patientsInBed[0];
        const admissionDate = new Date(patient.admissionDate);
        admissionDate.setHours(0, 0, 0, 0);

        const dischargeDate = new Date(admissionDate);
        dischargeDate.setDate(admissionDate.getDate() + patient.durationDays);
        dischargeDate.setHours(0, 0, 0, 0);

        // Verificar si es el día de admisión o alta
        const isAdmissionDay = currentDate.getTime() === admissionDate.getTime();
        const isDischargeDay = currentDate.getTime() === dischargeDate.getTime() - 86400000; // Restar 1 día

        let period: 'morning' | 'afternoon' | 'full' = 'full';
        if (isAdmissionDay && patient.dischargeTime === '15:00') {
          period = 'afternoon';
        } else if (isDischargeDay && patient.dischargeTime === '15:00') {
          period = 'morning';
        }

        dayOccupation.push({
          bedNumber,
          date: currentDate,
          patientId: patient.id,
          patientName: patient.name,
          period,
        });
      } else {
        // Dos pacientes el mismo día (alta a las 15:00 e ingreso a las 15:00)
        // El paciente que se va ocupa la mañana, el que entra ocupa la tarde
        const morningPatient = patientsInBed.find((p) => {
          const dischargeDate = new Date(p.admissionDate);
          dischargeDate.setDate(dischargeDate.getDate() + p.durationDays - 1);
          dischargeDate.setHours(0, 0, 0, 0);
          return currentDate.getTime() === dischargeDate.getTime();
        });

        const afternoonPatient = patientsInBed.find((p) => {
          const admissionDate = new Date(p.admissionDate);
          admissionDate.setHours(0, 0, 0, 0);
          return currentDate.getTime() === admissionDate.getTime();
        });

        // Añadir ambos períodos
        if (morningPatient) {
          dayOccupation.push({
            bedNumber,
            date: currentDate,
            patientId: morningPatient.id,
            patientName: morningPatient.name,
            period: 'morning',
          });
        }
        if (afternoonPatient) {
          dayOccupation.push({
            bedNumber,
            date: currentDate,
            patientId: afternoonPatient.id,
            patientName: afternoonPatient.name,
            period: 'afternoon',
          });
        }
      }
    }

    occupationMatrix.push(dayOccupation);
  }

  return occupationMatrix;
};

export const formatDate = (date: Date): string => {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  return `${day}/${month}`;
};

export const getDayName = (date: Date): string => {
  const days = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  return days[date.getDay()];
};
