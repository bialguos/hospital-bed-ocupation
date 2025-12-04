import { useMemo } from 'react';
import { Patient, calculateBedOccupation, formatDate, getDayName } from '../utils/bedOccupation';

interface BedOccupationGridProps {
  patients: Patient[];
  totalBeds: number;
  daysAhead: number;
}

const BedOccupationGrid = ({ patients, totalBeds, daysAhead }: BedOccupationGridProps) => {
  const occupationData = useMemo(
    () => calculateBedOccupation(patients, totalBeds, daysAhead),
    [patients, totalBeds, daysAhead]
  );

  // Generar array de fechas para las columnas
  const dates = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return Array.from({ length: daysAhead }, (_, i) => {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      return date;
    });
  }, [daysAhead]);

  const getCellColor = (patientId: string | null, period: string) => {
    if (!patientId) return 'bg-white';

    // Colores diferentes según el ID del paciente
    const colors = [
      'bg-blue-200',
      'bg-green-200',
      'bg-yellow-200',
      'bg-purple-200',
      'bg-pink-200',
      'bg-indigo-200',
      'bg-red-200',
      'bg-orange-200',
      'bg-teal-200',
      'bg-cyan-200',
      'bg-lime-200',
      'bg-amber-200',
    ];

    const colorIndex = parseInt(patientId) % colors.length;
    const baseColor = colors[colorIndex];

    // Si es solo mañana o tarde, hacer más claro
    if (period === 'morning' || period === 'afternoon') {
      return baseColor.replace('200', '100');
    }

    return baseColor;
  };

  const getCellContent = (dayIndex: number, bedNumber: number) => {
    const dayData = occupationData[dayIndex];
    const bedData = dayData.filter((b) => b.bedNumber === bedNumber);

    if (bedData.length === 0 || !bedData[0].patientId) {
      return null;
    }

    if (bedData.length === 1) {
      const bed = bedData[0];
      return (
        <div className="h-full flex items-center justify-center">
          <span className="text-[0.55rem] font-medium text-gray-800 truncate px-1">
            {bed.patientName}
          </span>
        </div>
      );
    }

    // Dos pacientes en el mismo día (mañana y tarde)
    return (
      <div className="h-full flex flex-col">
        {bedData.map((bed, idx) => (
          <div
            key={idx}
            className={`flex-1 flex items-center justify-center border-t ${
              idx === 0 ? 'border-t-0' : 'border-gray-400'
            } ${getCellColor(bed.patientId, bed.period)}`}
          >
            <span className="text-[0.45rem] font-medium text-gray-800 truncate px-1">
              {bed.patientName}
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full h-screen flex flex-col bg-gray-50 p-4">
      <div className="mb-3">
        <h1 className="text-2xl font-bold text-gray-800">
          Ocupación de Camas - Previsión 21 Días
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          Hospital - {totalBeds} camas disponibles
        </p>
      </div>

      <div className="flex-1 overflow-hidden border border-gray-300 rounded-lg shadow-lg bg-white">
        <div className="h-full flex flex-col">
          {/* Header con fechas */}
          <div className="flex bg-gray-100 border-b border-gray-300">
            <div className="w-16 flex-shrink-0 flex items-center justify-center border-r border-gray-300">
              <span className="text-xs font-bold text-gray-700">Cama</span>
            </div>
            <div className="flex-1 flex">
              {dates.map((date, idx) => (
                <div
                  key={idx}
                  className="flex-1 min-w-0 flex flex-col items-center justify-center py-2 border-r border-gray-200 last:border-r-0"
                >
                  <span className="text-[0.6rem] font-semibold text-gray-700">
                    {getDayName(date)}
                  </span>
                  <span className="text-[0.55rem] text-gray-600">
                    {formatDate(date)}
                  </span>
                </div>
              ))}
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
                    const bedData = occupationData[dayIdx].filter(
                      (b) => b.bedNumber === bedIdx + 1
                    );
                    const hasPatient = bedData.length > 0 && bedData[0].patientId;
                    const bgColor = hasPatient
                      ? getCellColor(bedData[0].patientId, bedData[0].period)
                      : 'bg-white';

                    return (
                      <div
                        key={dayIdx}
                        className={`flex-1 min-w-0 border-r border-b border-gray-200 last:border-r-0 ${bgColor}`}
                      >
                        {getCellContent(dayIdx, bedIdx + 1)}
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
          <div className="w-4 h-4 bg-blue-200 border border-gray-300 rounded"></div>
          <span>Ocupada (día completo)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-100 border border-gray-300 rounded"></div>
          <span>Ocupada (mañana/tarde)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-white border border-gray-300 rounded"></div>
          <span>Libre</span>
        </div>
      </div>
    </div>
  );
};

export default BedOccupationGrid;
