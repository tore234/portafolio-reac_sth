import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Code, Database, Globe, Rocket, Package } from "lucide-react";

// Mapeo de estilos fuera del componente para evitar que se recalcule en cada render
const languageStyles = {
  JavaScript: {
    style: "bg-yellow-500/20 text-yellow-300 border-yellow-400/40",
    icon: <Code className="w-4 h-4" />,
    emoji: "⚡",
  },
  TypeScript: {
    style: "bg-blue-500/20 text-blue-300 border-blue-400/40",
    icon: <Code className="w-4 h-4" />,
    emoji: "🔷",
  },
  PHP: {
    style: "bg-purple-600/20 text-purple-300 border-purple-500/40",
    icon: <Database className="w-4 h-4" />,
    emoji: "🐘",
  },
  Astro: {
    style: "bg-pink-600/20 text-pink-300 border-pink-500/40",
    icon: <Globe className="w-4 h-4" />,
    emoji: "🌌",
  },
  Blade: {
    style: "bg-red-600/20 text-red-300 border-red-500/40",
    icon: <Rocket className="w-4 h-4" />,
    emoji: "🎯",
  },
  // Estilo por defecto
  default: {
    style: "bg-slate-700/30 text-slate-300 border-slate-600",
    icon: <Package className="w-4 h-4" />,
    emoji: "📦",
  },
};

// Componente para una tarjeta de repositorio individual
const RepoCard = ({ repo, index }) => {
  const lang = repo.language || "Otro";
  const { style, icon, emoji } = languageStyles[lang] || languageStyles.default;

  return (
    <motion.a
      key={repo.id}
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Ir al proyecto ${repo.name}`}
      className="group flex flex-col rounded-2xl border border-slate-700 bg-slate-900/60 p-5 hover:bg-slate-800 hover:shadow-sky-500/30 transition-all shadow-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      whileHover={{ scale: 1.05 }}
    >
      <h3 className="font-semibold text-sky-400 group-hover:text-sky-300 text-lg flex items-center gap-2">
        {emoji} {repo.name}
      </h3>
      <p className="mt-2 text-sm text-slate-300 line-clamp-3 flex-grow">
        {repo.description || "📭 Sin descripción"}
      </p>
      <div className="mt-4 flex justify-between items-center">
        <span className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full border ${style}`}>
          {icon} {lang}
        </span>
        <p className="text-xs text-slate-400 italic">
          ⏱ {getRelativeTime(repo.updated_at)}
        </p>
      </div>
    </motion.a>
  );
};

// Componente para el esqueleto de carga
const LoadingSkeleton = () => (
  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {Array.from({ length: 6 }).map((_, i) => (
      <div key={i} className="h-40 rounded-2xl bg-slate-800/50 animate-pulse" />
    ))}
  </div>
);

// Función para calcular el tiempo relativo (memoizada para eficiencia)
const getRelativeTime = (dateString) => {
  const rtf = new Intl.RelativeTimeFormat("es", { numeric: "auto" });
  const diff = (new Date(dateString).getTime() - Date.now()) / 1000;
  
  const units = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1,
  };

  for (const [unit, seconds] of Object.entries(units)) {
    const interval = diff / seconds;
    if (Math.abs(interval) >= 1) {
      return rtf.format(Math.round(interval), unit);
    }
  }
  return "justo ahora";
};

export default function Projects() {
  const [repos, setRepos] = useState([]);
  const [status, setStatus] = useState("loading"); // 'loading', 'success', 'error'
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch("https://api.github.com/users/tore234/repos");
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        const data = await response.json();
        setRepos(data);
        setStatus("success");
      } catch (err) {
        setError(err.message);
        setStatus("error");
      }
    };
    fetchRepos();
  }, []);

  const sortedAndFilteredRepos = useMemo(() => {
    return repos
      .filter((repo) => !repo.private)
      .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
  }, [repos]);

  const renderContent = () => {
    switch (status) {
      case "loading":
        return <LoadingSkeleton />;
      case "error":
        return <p className="text-red-400 text-center mt-10">❌ {error}</p>;
      case "success":
        return (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sortedAndFilteredRepos.map((repo, i) => (
              <RepoCard key={repo.id} repo={repo} index={i} />
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold mb-8 text-sky-400">
        🚀 Mis Proyectos GitHub
      </h2>
      {renderContent()}
    </section>
  );
}