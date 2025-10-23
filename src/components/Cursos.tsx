import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, ExternalLink, XCircle } from "lucide-react";

const cursos = [
  // === 🧠 ALURA ONE ===
  {
    categoria: "🎓 ALURA ONE",
    titulo: "Formación en Desarrollo Personal G7",
    institucion: "Alura Latam — Oracle Next Education (ONE)",
    anio: "2024",
    pdf: "/certificados/alura-one/AluraONE_DesarrolloPersonal_G7_2024.pdf",
  },
  {
    categoria: "🚀 ALURA ONE",
    titulo: "Formación en Emprendimiento y Agilidad",
    institucion: "Alura Latam — Oracle Next Education (ONE)",
    anio: "2024",
    pdf: "/certificados/alura-one/AluraONE_Emprendimiento_Agilidad_2024.pdf",
  },
  {
    categoria: "🤖 ALURA ONE",
    titulo: "Inteligencia Artificial con Java",
    institucion: "Alura Latam — Oracle Next Education (ONE)",
    anio: "2025",
    pdf: "/certificados/alura-one/AluraONE_InteligenciaArtificial_Java_G7_2025.pdf",
  },
  {
    categoria: "☕ ALURA ONE",
    titulo: "Java POO (Programación Orientada a Objetos)",
    institucion: "Alura Latam — Oracle Next Education (ONE)",
    anio: "2025",
    pdf: "/certificados/alura-one/AluraONE_Java_POO_2025.pdf",
  },
  {
    categoria: "🌐 ALURA ONE",
    titulo: "Java Web con Spring Boot",
    institucion: "Alura Latam — Oracle Next Education (ONE)",
    anio: "2025",
    pdf: "/certificados/alura-one/AluraONE_JavaWeb_SpringBoot_2025.pdf",
  },
  {
    categoria: "💻 ALURA ONE",
    titulo: "Lógica de Programación en JavaScript",
    institucion: "Alura Latam — Oracle Next Education (ONE)",
    anio: "2024",
    pdf: "/certificados/alura-one/AluraONE_LogicaProgramacion_JS_2024.pdf",
  },
  {
    categoria: "🔰 ALURA ONE",
    titulo: "Principiante en Programación G7",
    institucion: "Alura Latam — Oracle Next Education (ONE)",
    anio: "2024",
    pdf: "/certificados/alura-one/AluraONE_PrincipianteProgramacion_G7_2024.pdf",
  },

  // === ⚙️ CAPACÍTATE ===
  {
    categoria: "🧩 CAPACÍTATE",
    titulo: "Administración del Tiempo",
    institucion: "Fundación Carlos Slim — Capacítate para el Empleo",
    anio: "2024",
    pdf: "/certificados/capacitate/Capacitate_AdministracionTiempo_2024.pdf",
  },
  {
    categoria: "🧠 CAPACÍTATE",
    titulo: "Control de Versiones",
    institucion: "Fundación Carlos Slim — Capacítate para el Empleo",
    anio: "2024",
    pdf: "/certificados/capacitate/Capacitate_ControlVersiones_2024.pdf",
  },
  {
    categoria: "🎨 CAPACÍTATE",
    titulo: "Evaluador UX (Experiencia de Usuario)",
    institucion: "Fundación Carlos Slim — Capacítate para el Empleo",
    anio: "2024",
    pdf: "/certificados/capacitate/Capacitate_EvaluadorUX_2024.pdf",
  },
  {
    categoria: "🗂️ CAPACÍTATE",
    titulo: "Gestión de Portafolio Profesional",
    institucion: "Fundación Carlos Slim — Capacítate para el Empleo",
    anio: "2024",
    pdf: "/certificados/capacitate/Capacitate_GestionPortafolio_2024.pdf",
  },
  {
    categoria: "🧬 CAPACÍTATE",
    titulo: "Realidad Virtual y Aumentada",
    institucion: "Fundación Carlos Slim — Capacítate para el Empleo",
    anio: "2024",
    pdf: "/certificados/capacitate/Capacitate_RealidadVirtualAumentada_2024.pdf",
  },
  {
    categoria: "🧪 CAPACÍTATE",
    titulo: "Tester (Control de Calidad de Software)",
    institucion: "Fundación Carlos Slim — Capacítate para el Empleo",
    anio: "2024",
    pdf: "/certificados/capacitate/Capacitate_Tester_2024.pdf",
  },
];

export default function Cursos() {
  const [pdfView, setPdfView] = useState<string | null>(null);

  return (
    <section className="min-h-screen bg-gradient-to-b from-[#020617] via-[#0a0f2c] to-[#020617] text-gray-200 py-20 px-6 md:px-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-sky-500/10 via-transparent to-transparent blur-3xl"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-sky-400 drop-shadow-[0_0_15px_#0ea5e9] flex justify-center items-center gap-3">
            <Award className="w-9 h-9 text-sky-300" />
            Certificaciones y Cursos 📚
          </h2>
          <p className="text-gray-400 text-base md:text-lg mt-3">
            Formación continua en desarrollo, diseño y tecnología 💡
          </p>
        </motion.div>

        {/* Tarjetas */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {cursos.map((curso, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group bg-[#0f172a]/70 border border-sky-500/20 rounded-2xl p-5
                         shadow-[0_0_25px_#0ea5e955] hover:shadow-[0_0_40px_#38bdf8aa]
                         transition-all duration-300 backdrop-blur-xl hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                <p className="text-[11px] tracking-widest text-sky-400 font-semibold mb-2">
                  {curso.categoria}
                </p>
                <h3 className="text-lg font-semibold text-sky-200 group-hover:text-sky-300 transition">
                  {curso.titulo}
                </h3>
                <p className="text-sm text-gray-400 mt-1">{curso.institucion}</p>
                <p className="text-xs text-gray-500 mt-1">{curso.anio}</p>
              </div>

              <button
                onClick={() => setPdfView(curso.pdf)}
                className="mt-4 inline-flex items-center justify-center gap-2 text-sky-400 text-sm font-medium hover:text-sky-300 transition group-hover:underline"
              >
                Ver certificado <ExternalLink className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal de vista previa PDF */}
      <AnimatePresence>
        {pdfView && (
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative bg-[#0a1128] rounded-2xl shadow-2xl border border-sky-500/30 max-w-5xl w-full overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <button
                onClick={() => setPdfView(null)}
                className="absolute top-3 right-3 text-sky-300 hover:text-sky-200 transition"
              >
                <XCircle className="w-7 h-7" />
              </button>

              <iframe
                src={pdfView ?? undefined}
                title="Vista previa del certificado"
                className="w-full h-[80vh] rounded-b-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
