import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2 } from "lucide-react"; // Icono para el botón de limpiar

// --- Constantes movidas fuera del componente para mejor organización ---

// Preguntas rápidas
const predefinedQuestions = [
  "¿Cuáles son tus proyectos?",
  "¿Quién eres?",
  "¿Cómo puedo contactarte?",
];

// Contacto
const contactInfo = [
  {
    label: "Email",
    url: "mailto:trenadohernandezsalvador@gmail.com",
    icon: "📧",
  },
  {
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/salvador-trenado-5995942aa/",
    icon: "🔗",
  },
  {
    label: "GitHub",
    url: "https://github.com/tore234",
    icon: "💻",
  },
];

// Intents (intenciones) para entender al usuario
const intents = {
  proyectos: ["proyectos", "repos", "trabajos"],
  about: ["quién eres", "eres", "sobre ti"],
  contacto: ["contacto", "contactarte", "contactarme", "contigo"],
};

// Tipo para los mensajes del chat
type ChatMessage = {
  from: "bot" | "user";
  text: string;
  isHtml?: boolean;
};

// Función de ayuda para identificar la intención
function matchIntent(msg: string, keywords: string[]): boolean {
  return keywords.some((kw) => msg.includes(kw));
}

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { from: "bot", text: "¡Hola! Soy tu asistente. ¿En qué puedo ayudarte? 🚀" },
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null); // Ref para el auto-scroll

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]); // Se activa cuando llegan mensajes nuevos o se abre el chat

  const handleUserMessage = async (msg: string) => {
    const lowerMsg = msg.toLowerCase();
    let reply: ChatMessage = { from: "bot", text: "No entendí tu pregunta, intenta con otra de las opciones. 🤔" };

    setLoading(true);
    setMessages((prev) => [...prev, { from: "user", text: msg }]);

    try {
      await new Promise(res => setTimeout(res, 800));

      if (matchIntent(lowerMsg, intents.proyectos)) {
        const res = await fetch("https://api.github.com/users/tore234/repos");
        if (!res.ok) throw new Error("Error de red con GitHub");
        const data = await res.json();

        if (Array.isArray(data) && data.length > 0) {
          reply = {
            from: "bot",
            // MEJORA 2: Formato de proyectos más claro
            text: "Aquí tienes mis 5 proyectos más recientes:<br/><br/>" + data
              .filter(repo => !repo.private)
              .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
              .slice(0, 5)
              .map(
                (repo) =>
                  `<div class="mb-2">` +
                  `• <a href="${repo.html_url}" target="_blank" class="text-sky-600 underline font-semibold">${repo.name}</a>` +
                  `<p class="text-xs text-gray-500 pl-4">${repo.description || "Sin descripción"}</p>` +
                  `</div>`
              )
              .join(""),
            isHtml: true,
          };
        } else {
          reply = { from: "bot", text: "No encontré proyectos en tu GitHub. 😅" };
        }
      } else if (matchIntent(lowerMsg, intents.about)) {
        reply = {
          from: "bot",
          text: "Soy <b>Salvador Trenado Hernández</b>, un apasionado ingeniero en desarrollo y gestión de software. 🚀",
          isHtml: true,
        };
      } else if (matchIntent(lowerMsg, intents.contacto)) {
        reply = {
          from: "bot",
          text: "¡Claro! Conectemos por aquí:<br/>" + contactInfo
            .map(
              (c) =>
                `${c.icon} <a href="${c.url}" target="_blank" class="text-sky-600 underline">${c.label}</a>`
            )
            .join("<br/>"),
          isHtml: true,
        };
      }
    } catch (error) {
      reply = { from: "bot", text: "Hubo un problema al conectar con GitHub. 🚨" };
    }
    
    setMessages((prev) => [...prev, reply]);
    setLoading(false);
  };

  const clearChat = () => {
    setMessages([
      { from: "bot", text: "Chat limpiado 🧹. ¡Pregúntame otra cosa!" },
    ]);
  };

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50 cursor-grab"
      drag
      dragMomentum={false}
      whileDrag={{ cursor: "grabbing" }}
    >
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.25 }}
            className="w-80 h-[450px] bg-white text-gray-800 rounded-xl shadow-xl flex flex-col mb-3 border border-gray-200"
          >
            {/* MEJORA 3: Header del Chat */}
            <div className="flex items-center justify-between p-3 border-b border-gray-200">
              <h3 className="font-semibold text-gray-700">Asistente Virtual</h3>
              <button
                onClick={clearChat}
                title="Limpiar chat"
                className="text-gray-400 hover:text-red-500 transition"
              >
                <Trash2 size={16} />
              </button>
            </div>

            {/* Área de mensajes */}
            <div className="flex-1 p-3 overflow-y-auto text-sm space-y-2">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`px-3 py-2 rounded-lg max-w-[85%] break-words ${
                    m.from === "user"
                      ? "ml-auto bg-sky-600 text-white text-right"
                      : "mr-auto bg-gray-100 text-gray-900"
                  }`}
                  dangerouslySetInnerHTML={{ __html: m.text }}
                />
              ))}
              {loading && (
                <div className="italic text-xs text-gray-400 animate-pulse">
                  •••
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Preguntas rápidas */}
            <div className="border-t border-gray-200 p-2 flex flex-wrap gap-2 justify-center">
              {predefinedQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleUserMessage(q)}
                  disabled={loading}
                  className={`text-xs px-3 py-1 rounded-full transition ${
                    loading
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-sky-100 text-sky-700 hover:bg-sky-200"
                  }`}
                >
                  {q}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botón burbuja */}
      <motion.button
        onTap={() => setOpen(!open)}
        className="bg-sky-600 hover:bg-sky-700 text-white rounded-full w-14 h-14 shadow-lg flex items-center justify-center text-2xl transition"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {open ? <span className="text-xl">▼</span> : '💬'}
      </motion.button>
    </motion.div>
  );
}