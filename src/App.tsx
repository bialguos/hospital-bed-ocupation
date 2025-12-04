import { useMemo, useState } from 'react';

interface Patient {
  id: string;
  name: string;
  bedNumber: number;
  admissionDate: Date;
  durationDays: number;
  dischargeTime?: '15:00';
  sex: 'M' | 'F';
  age: number;
  surgery: string;
  surgeon: string;
}

type BedOccupation = {
  bedNumber: number;
  date: Date;
  patientId: string | null;
  patientName: string | null;
  period: 'morning' | 'afternoon' | 'full';
  patient: Patient | null;
};

// Datos de ejemplo - Hospital casi lleno (dejar solo 4-6 huecos)
const mockPatients: Patient[] = [
  {
    id: '1',
    name: 'Juan Pérez García',
    bedNumber: 1,
    admissionDate: new Date(2025, 11, 4),
    durationDays: 5,
    sex: 'M',
    age: 62,
    surgery: 'Prótesis de cadera',
    surgeon: 'Dr. Ramírez',
  },
  {
    id: '2',
    name: 'María García López',
    bedNumber: 2,
    admissionDate: new Date(2025, 11, 3),
    durationDays: 7,
    sex: 'F',
    age: 45,
    surgery: 'Colecistectomía',
    surgeon: 'Dra. Martínez',
  },
  {
    id: '3',
    name: 'Carlos López Ruiz',
    bedNumber: 3,
    admissionDate: new Date(2025, 11, 5),
    durationDays: 3,
    dischargeTime: '15:00',
    sex: 'M',
    age: 38,
    surgery: 'Apendicectomía',
    surgeon: 'Dr. Fernández',
  },
  {
    id: '4',
    name: 'Ana Martínez Soto',
    bedNumber: 3,
    admissionDate: new Date(2025, 11, 8),
    durationDays: 4,
    sex: 'F',
    age: 55,
    surgery: 'Histerectomía',
    surgeon: 'Dra. González',
  },
  {
    id: '5',
    name: 'Pedro Sánchez Díaz',
    bedNumber: 5,
    admissionDate: new Date(2025, 11, 4),
    durationDays: 8,
    sex: 'M',
    age: 70,
    surgery: 'Bypass coronario',
    surgeon: 'Dr. Torres',
  },
  {
    id: '6',
    name: 'Laura Torres Navarro',
    bedNumber: 7,
    admissionDate: new Date(2025, 11, 4),
    durationDays: 10,
    dischargeTime: '15:00',
    sex: 'F',
    age: 52,
    surgery: 'Mastectomía',
    surgeon: 'Dr. Jiménez',
  },
  {
    id: '7',
    name: 'Roberto Díaz Moreno',
    bedNumber: 4,
    admissionDate: new Date(2025, 11, 4),
    durationDays: 6,
    sex: 'M',
    age: 48,
    surgery: 'Hernia inguinal',
    surgeon: 'Dr. Ramírez',
  },
  {
    id: '8',
    name: 'Isabel Ruiz Castro',
    bedNumber: 8,
    admissionDate: new Date(2025, 11, 4),
    durationDays: 5,
    sex: 'F',
    age: 41,
    surgery: 'Cesárea',
    surgeon: 'Dra. Martínez',
  },
  {
    id: '9',
    name: 'Fernando Gómez Vega',
    bedNumber: 6,
    admissionDate: new Date(2025, 11, 4),
    durationDays: 7,
    sex: 'M',
    age: 58,
    surgery: 'Prótesis de rodilla',
    surgeon: 'Dr. Fernández',
  },
  {
    id: '10',
    name: 'Carmen Vega Ortiz',
    bedNumber: 9,
    admissionDate: new Date(2025, 11, 5),
    durationDays: 4,
    sex: 'F',
    age: 33,
    surgery: 'Tiroidectomía',
    surgeon: 'Dra. González',
  },
  {
    id: '11',
    name: 'Miguel Herrera Gil',
    bedNumber: 10,
    admissionDate: new Date(2025, 11, 4),
    durationDays: 12,
    sex: 'M',
    age: 65,
    surgery: 'Cirugía de columna',
    surgeon: 'Dr. Torres',
  },
  {
    id: '12',
    name: 'Sofía Castro Ramos',
    bedNumber: 11,
    admissionDate: new Date(2025, 11, 6),
    durationDays: 6,
    sex: 'F',
    age: 29,
    surgery: 'Quiste ovárico',
    surgeon: 'Dra. Martínez',
  },
  {
    id: '13',
    name: 'Antonio Ruiz Blanco',
    bedNumber: 12,
    admissionDate: new Date(2025, 11, 4),
    durationDays: 9,
    sex: 'M',
    age: 54,
    surgery: 'Gastrectomía',
    surgeon: 'Dr. Jiménez',
  },
  {
    id: '14',
    name: 'Elena Navarro Prieto',
    bedNumber: 1,
    admissionDate: new Date(2025, 11, 10),
    durationDays: 5,
    sex: 'F',
    age: 47,
    surgery: 'Cirugía de vesícula',
    surgeon: 'Dr. Ramírez',
  },
  {
    id: '15',
    name: 'José Morales Cruz',
    bedNumber: 2,
    admissionDate: new Date(2025, 11, 11),
    durationDays: 8,
    sex: 'M',
    age: 72,
    surgery: 'Resección intestinal',
    surgeon: 'Dr. Fernández',
  },
  {
    id: '16',
    name: 'Lucía Fernández Sanz',
    bedNumber: 4,
    admissionDate: new Date(2025, 11, 11),
    durationDays: 6,
    sex: 'F',
    age: 36,
    surgery: 'Cirugía de tiroides',
    surgeon: 'Dra. González',
  },
  {
    id: '17',
    name: 'David Romero Serrano',
    bedNumber: 5,
    admissionDate: new Date(2025, 11, 13),
    durationDays: 7,
    sex: 'M',
    age: 61,
    surgery: 'Angioplastia',
    surgeon: 'Dr. Torres',
  },
  {
    id: '18',
    name: 'Patricia Jiménez Muñoz',
    bedNumber: 6,
    admissionDate: new Date(2025, 11, 12),
    durationDays: 8,
    sex: 'F',
    age: 50,
    surgery: 'Histerectomía radical',
    surgeon: 'Dra. Martínez',
  },
  {
    id: '19',
    name: 'Alberto Santos Romero',
    bedNumber: 7,
    admissionDate: new Date(2025, 11, 15),
    durationDays: 6,
    sex: 'M',
    age: 44,
    surgery: 'Hernia discal',
    surgeon: 'Dr. Jiménez',
  },
  {
    id: '20',
    name: 'Cristina Muñoz León',
    bedNumber: 8,
    admissionDate: new Date(2025, 11, 10),
    durationDays: 10,
    sex: 'F',
    age: 58,
    surgery: 'Cirugía bariátrica',
    surgeon: 'Dr. Ramírez',
  },
  {
    id: '21',
    name: 'Javier Gil Martín',
    bedNumber: 9,
    admissionDate: new Date(2025, 11, 10),
    durationDays: 9,
    sex: 'M',
    age: 67,
    surgery: 'Prostatectomía',
    surgeon: 'Dr. Fernández',
  },
  {
    id: '22',
    name: 'Raquel Ortiz Campos',
    bedNumber: 11,
    admissionDate: new Date(2025, 11, 13),
    durationDays: 7,
    sex: 'F',
    age: 42,
    surgery: 'Miomectomía',
    surgeon: 'Dra. González',
  },
  {
    id: '23',
    name: 'Sergio Vargas Delgado',
    bedNumber: 12,
    admissionDate: new Date(2025, 11, 14),
    durationDays: 8,
    sex: 'M',
    age: 56,
    surgery: 'Nefrectomía',
    surgeon: 'Dr. Torres',
  },
  {
    id: '24',
    name: 'Beatriz León Rubio',
    bedNumber: 1,
    admissionDate: new Date(2025, 11, 16),
    durationDays: 5,
    sex: 'F',
    age: 39,
    surgery: 'Cesárea programada',
    surgeon: 'Dra. Martínez',
  },
  {
    id: '25',
    name: 'Francisco Méndez Rivas',
    bedNumber: 3,
    admissionDate: new Date(2025, 11, 13),
    durationDays: 6,
    sex: 'M',
    age: 53,
    surgery: 'Cirugía de colon',
    surgeon: 'Dr. Jiménez',
  },
  {
    id: '26',
    name: 'Marta Rojas Iglesias',
    bedNumber: 2,
    admissionDate: new Date(2025, 11, 20),
    durationDays: 4,
    sex: 'F',
    age: 31,
    surgery: 'Apendicectomía',
    surgeon: 'Dr. Ramírez',
  },
  {
    id: '27',
    name: 'Pablo Cruz Medina',
    bedNumber: 5,
    admissionDate: new Date(2025, 11, 21),
    durationDays: 3,
    sex: 'M',
    age: 28,
    surgery: 'Hernia umbilical',
    surgeon: 'Dr. Fernández',
  },
  {
    id: '28',
    name: 'Silvia Campos Reyes',
    bedNumber: 4,
    admissionDate: new Date(2025, 11, 18),
    durationDays: 5,
    sex: 'F',
    age: 46,
    surgery: 'Colecistectomía',
    surgeon: 'Dra. González',
  },
];

// Funciones de utilidad
const calculateBedOccupation = (
  patients: Patient[],
  totalBeds: number,
  daysAhead: number,
  startDate: Date
): BedOccupation[][] => {
  const baseDate = new Date(startDate);
  baseDate.setHours(0, 0, 0, 0);

  const occupationMatrix: BedOccupation[][] = [];

  for (let dayOffset = 0; dayOffset < daysAhead; dayOffset++) {
    const currentDate = new Date(baseDate);
    currentDate.setDate(baseDate.getDate() + dayOffset);

    const dayOccupation: BedOccupation[] = [];

    for (let bedNumber = 1; bedNumber <= totalBeds; bedNumber++) {
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
        dayOccupation.push({
          bedNumber,
          date: currentDate,
          patientId: null,
          patientName: null,
          period: 'full',
          patient: null,
        });
      } else if (patientsInBed.length === 1) {
        const patient = patientsInBed[0];
        const admissionDate = new Date(patient.admissionDate);
        admissionDate.setHours(0, 0, 0, 0);

        const dischargeDate = new Date(admissionDate);
        dischargeDate.setDate(admissionDate.getDate() + patient.durationDays);
        dischargeDate.setHours(0, 0, 0, 0);

        const isAdmissionDay = currentDate.getTime() === admissionDate.getTime();
        const isDischargeDay = currentDate.getTime() === dischargeDate.getTime() - 86400000;

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
          patient: patient,
        });
      } else {
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

        if (morningPatient) {
          dayOccupation.push({
            bedNumber,
            date: currentDate,
            patientId: morningPatient.id,
            patientName: morningPatient.name,
            period: 'morning',
            patient: morningPatient,
          });
        }
        if (afternoonPatient) {
          dayOccupation.push({
            bedNumber,
            date: currentDate,
            patientId: afternoonPatient.id,
            patientName: afternoonPatient.name,
            period: 'afternoon',
            patient: afternoonPatient,
          });
        }
      }
    }

    occupationMatrix.push(dayOccupation);
  }

  return occupationMatrix;
};

const formatDate = (date: Date): string => {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  return `${day}/${month}`;
};

const getDayName = (date: Date): string => {
  const days = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  return days[date.getDay()];
};

// Componente principal
function App() {
  const totalBeds = 12;
  const daysAhead = 21;

  // Estado para la fecha seleccionada (por defecto hoy)
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const [selectedDate, setSelectedDate] = useState<Date>(today);

  const occupationData = useMemo(
    () => calculateBedOccupation(mockPatients, totalBeds, daysAhead, selectedDate),
    [selectedDate]
  );

  const dates = useMemo(() => {
    return Array.from({ length: daysAhead }, (_, i) => {
      const date = new Date(selectedDate);
      date.setDate(selectedDate.getDate() + i);
      return date;
    });
  }, [selectedDate]);

  // Formatear fecha para input type="date"
  const formatDateForInput = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = new Date(e.target.value);
    newDate.setHours(0, 0, 0, 0);
    setSelectedDate(newDate);
  };

  // Calcular porcentaje de ocupación por día
  const calculateOccupancyPercentage = (dayIndex: number): number => {
    const dayData = occupationData[dayIndex];
    const occupiedBeds = dayData.filter((bed) => bed.patientId !== null).length;
    return Math.round((occupiedBeds / totalBeds) * 100);
  };

  const getCellColor = (hasPatient: boolean, period: string) => {
    if (!hasPatient) return 'bg-white'; // Libre

    if (period === 'morning' || period === 'afternoon') {
      return 'bg-yellow-200'; // Ocupada parcialmente
    }

    return 'bg-orange-200'; // Ocupada totalmente
  };

  const getCellContent = (dayIndex: number, bedNumber: number) => {
    const dayData = occupationData[dayIndex];
    const bedData = dayData.filter((b) => b.bedNumber === bedNumber);

    if (bedData.length === 0 || !bedData[0].patientId) {
      return { content: null, bgColor: 'bg-white' };
    }

    if (bedData.length === 1) {
      const bed = bedData[0];
      const bgColor = getCellColor(true, bed.period);
      const patient = bed.patient;
      return {
        content: (
          <div
            className="h-full flex items-center justify-center group relative cursor-pointer"
            title={patient ? `${patient.name} - ${patient.surgery}` : ''}
          >
            <span className="text-[0.55rem] font-medium text-gray-800 truncate px-1">
              {bed.patientName}
            </span>
            {patient && (
              <div className="absolute hidden group-hover:block z-50 bg-gray-900 text-white text-xs rounded-lg p-3 shadow-xl min-w-[200px] left-1/2 top-full mt-1 -translate-x-1/2">
                <div className="font-bold mb-2 border-b border-gray-700 pb-1">{patient.name}</div>
                <div className="space-y-1">
                  <div><span className="font-semibold">Sexo:</span> {patient.sex === 'M' ? 'Masculino' : 'Femenino'}</div>
                  <div><span className="font-semibold">Edad:</span> {patient.age} años</div>
                  <div><span className="font-semibold">Cirugía:</span> {patient.surgery}</div>
                  <div><span className="font-semibold">Cirujano:</span> {patient.surgeon}</div>
                </div>
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
              </div>
            )}
          </div>
        ),
        bgColor,
      };
    }

    // Dos pacientes en el mismo día (alta a las 15:00 e ingreso a las 15:00)
    return {
      content: (
        <div className="h-full flex flex-col">
          {bedData.map((bed, idx) => {
            const patient = bed.patient;
            return (
              <div
                key={idx}
                className={`flex-1 flex items-center justify-center border-t ${
                  idx === 0 ? 'border-t-0' : 'border-gray-400'
                } ${getCellColor(true, bed.period)} group relative cursor-pointer`}
                title={patient ? `${patient.name} - ${patient.surgery}` : ''}
              >
                <span className="text-[0.45rem] font-medium text-gray-800 truncate px-1">
                  {bed.patientName}
                </span>
                {patient && (
                  <div className="absolute hidden group-hover:block z-50 bg-gray-900 text-white text-xs rounded-lg p-3 shadow-xl min-w-[200px] left-1/2 top-full mt-1 -translate-x-1/2">
                    <div className="font-bold mb-2 border-b border-gray-700 pb-1">{patient.name}</div>
                    <div className="space-y-1">
                      <div><span className="font-semibold">Sexo:</span> {patient.sex === 'M' ? 'Masculino' : 'Femenino'}</div>
                      <div><span className="font-semibold">Edad:</span> {patient.age} años</div>
                      <div><span className="font-semibold">Cirugía:</span> {patient.surgery}</div>
                      <div><span className="font-semibold">Cirujano:</span> {patient.surgeon}</div>
                    </div>
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ),
      bgColor: '',
    };
  };

  return (
    <div className="w-full h-screen overflow-hidden">
      <div className="w-full h-screen flex flex-col bg-gray-50 p-4">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Ocupación de Camas - Previsión 21 Días
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Hospital - {totalBeds} camas disponibles
            </p>
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="startDate" className="text-sm font-medium text-gray-700">
              Fecha inicio:
            </label>
            <input
              type="date"
              id="startDate"
              value={formatDateForInput(selectedDate)}
              min={formatDateForInput(today)}
              onChange={handleDateChange}
              className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          </div>
        </div>

        <div className="flex-1 overflow-hidden border border-gray-300 rounded-lg shadow-lg bg-white">
          <div className="h-full flex flex-col">
            {/* Header con fechas */}
            <div className="flex bg-gray-100 border-b border-gray-300">
              <div className="w-16 flex-shrink-0 flex items-center justify-center border-r border-gray-300">
                <span className="text-xs font-bold text-gray-700">Cama</span>
              </div>
              <div className="flex-1 flex">
                {dates.map((date, idx) => {
                  const occupancyPercent = calculateOccupancyPercentage(idx);
                  return (
                    <div
                      key={idx}
                      className="flex-1 min-w-0 flex flex-col items-center justify-center py-1 border-r border-gray-200 last:border-r-0"
                    >
                      <span className="text-[0.6rem] font-semibold text-gray-700">
                        {getDayName(date)}
                      </span>
                      <span className="text-[0.55rem] text-gray-600">
                        {formatDate(date)}
                      </span>
                      <span className={`text-[0.5rem] font-bold mt-0.5 ${
                        occupancyPercent >= 90 ? 'text-red-600' :
                        occupancyPercent >= 75 ? 'text-orange-600' :
                        'text-green-600'
                      }`}>
                        {occupancyPercent}%
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Grid de camas */}
            <div className="flex-1 overflow-hidden">
              {Array.from({ length: totalBeds }, (_, bedIdx) => (
                <div key={bedIdx} className="flex h-full" style={{ height: `${100 / totalBeds}%` }}>
                  {/* Número de cama */}
                  <div className="w-16 flex-shrink-0 flex items-center justify-center border-r border-b border-gray-300 bg-gray-50">
                    <span className="text-xs font-bold text-gray-700">
                      {bedIdx + 1}
                    </span>
                  </div>

                  {/* Días */}
                  <div className="flex-1 flex">
                    {dates.map((_, dayIdx) => {
                      const { content, bgColor } = getCellContent(dayIdx, bedIdx + 1);

                      return (
                        <div
                          key={dayIdx}
                          className={`flex-1 min-w-0 border-r border-b border-gray-200 last:border-r-0 ${bgColor}`}
                        >
                          {content}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Leyenda */}
        <div className="mt-3 flex items-center gap-4 text-xs text-gray-600">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-white border border-gray-300 rounded"></div>
            <span>Libre</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-orange-200 border border-gray-300 rounded"></div>
            <span>Ocupada (día completo)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-200 border border-gray-300 rounded"></div>
            <span>Ocupada parcialmente (mañana o tarde)</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
