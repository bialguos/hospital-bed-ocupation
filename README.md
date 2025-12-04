# Hospital Bed Occupation Tracker

Sistema de seguimiento y visualización de ocupación de camas hospitalarias.

## 🏥 Características

- **Visualización de 12 camas** y 21 días de previsión
- **Selector de fecha** para iniciar desde cualquier día (hoy o futuro)
- **Soporte para altas a las 15:00** - permite 2 pacientes en la misma cama el mismo día
- **Porcentaje de ocupación por día** con código de colores (verde <75%, naranja 75-89%, rojo ≥90%)
- **Tooltips informativos** al pasar el ratón sobre cada paciente:
  - Nombre completo
  - Sexo
  - Edad
  - Cirugía a realizar
  - Cirujano asignado
- **Código de colores de celdas**:
  - ⬜ Blanco: Cama libre
  - 🟧 Naranja: Ocupada día completo
  - 🟨 Amarillo: Ocupada parcialmente (mañana o tarde)
- **Diseño responsive** - toda la información visible sin scroll

## 🚀 Tecnologías

- React 18 + TypeScript
- Vite
- Tailwind CSS

## 📦 Instalación

```bash
npm install
```

## 💻 Desarrollo

```bash
npm run dev
```

## 🏗️ Build

```bash
npm run build
```

## 🌐 Despliegue

La aplicación se despliega automáticamente en GitHub Pages cuando se hace push a la rama `main`.

URL: https://bialguos.github.io/hospital-bed-ocupation/

## 📝 Uso

1. Selecciona una fecha de inicio (por defecto: hoy)
2. Visualiza la ocupación de las 12 camas durante los próximos 21 días
3. Pasa el ratón sobre cualquier paciente para ver sus detalles
4. Observa el porcentaje de ocupación en la parte superior de cada día

## 📊 Estructura de datos

Para conectar con tu base de datos real, modifica el array `mockPatients` en `src/App.tsx`:

```typescript
interface Patient {
  id: string;
  name: string;
  bedNumber: number; // 1-12
  admissionDate: Date;
  durationDays: number;
  dischargeTime?: '15:00'; // Opcional para altas a las 15:00
  sex: 'M' | 'F';
  age: number;
  surgery: string;
  surgeon: string;
}
```

## 🤖 Generado con

Esta aplicación fue generada con [Claude Code](https://claude.com/claude-code)

## 📄 Licencia

MIT
