import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  House,
  Menu,
  Bell,
  Users,
  LogOut,
  Star,
  FileText,
  Settings,
  Globe,
  Search,
  ChevronUp,
  PlusCircle,
  Clipboard
} from "lucide-react";
import { API_BASE_URL } from "../config";
import { useNavigate } from "react-router-dom";

const DashboardNavbar = () => {
  const navigate = useNavigate();
  const [busqueda, setBusqueda] = useState("");
  const [menuPerfilAbierto, setMenuPerfilAbierto] = useState(false);
  const [menuLateralAbierto, setMenuLateralAbierto] = useState(false);
  const [busquedaActiva, setBusquedaActiva] = useState(false);
  const [mostrarBusqueda, setMostrarBusqueda] = useState(false);
  const [menuColaboradoresAbierto, setMenuColaboradoresAbierto] = useState(false);
  const [panelNotificacionesAbierto, setPanelNotificacionesAbierto] = useState(false);
  const location = useLocation();
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
  });

  const rutas = {
    "/dashboard": { titulo: "Mi Perfil", ruta: "/dashboard" },
    "/notificaciones": { titulo: "Notificaciones", ruta: "/notificaciones" },
    "/perfil": { titulo: "Mi Perfil", ruta: "/perfil" },
    "/perfilConfig": { titulo: "Configuración", ruta: "/perfilConfig" },
    "/mis-apis": { titulo: "Tus APIs", ruta: "/mis-apis" },
    "/favoritas": { titulo: "Tus Favoritas", ruta: "/favoritas" },
    "/borradores": { titulo: "Tus Borradores", ruta: "/borradores" },
    "/crear": { titulo: "Crear API", ruta: "/crear" },
    "/crearCategoria": { titulo: "Crear Categoría", ruta: "/crearCategoria" },
    "/crearSubcategoria": { titulo: "Crear Subcategoría", ruta: "/crearSubcategoria" },
    "/crearTematica": { titulo: "Crear Temática", ruta: "/crearTematica" },
  };
  
  const { titulo, ruta } = rutas[location.pathname] || {
    titulo: "Mi Perfil",
    ruta: "/dashboard"
  };

  const toggleMenuLateral = () => {
    setMenuLateralAbierto(!menuLateralAbierto);
  };

  const manejarBusqueda = (e) => {
    if (e.key === "Enter" && busqueda.trim() !== "") {
      navigate(`/resultados-busqueda?q=${encodeURIComponent(busqueda.trim())}`);
    }
  };

  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/cuenta/perfil/`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token_sesion")}`,
            "Content-Type": "application/json",
          },
        });
  
        if (response.ok) {
          const data = await response.json();
          setFormData({
            name: data.nombres || "",
            lastName: data.apellidos || "",
            email: data.correo || "",
            bio: data.biografia || "",
            username: data.username || "",
          });
        }
      } catch (error) {
        console.error("Error:", error);
        alert("No se pudo cargar el perfil.");
      }
    };
  
    fetchPerfil();
  }, []);

  const handleLogout = async () => {
    try {
      const tokenSesion = localStorage.getItem("token_sesion");
  
      if (!tokenSesion) {
        console.error("No se encontró el token de sesión en localStorage.");
        return;
      }
  
      const response = await fetch(`${API_BASE_URL}/logout/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token_sesion: tokenSesion }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        localStorage.clear();
        window.location.href = '/login';
      } else {
        console.error('Error al cerrar sesión:', data.error);
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  };

  const iniciales = `${formData.name.charAt(0)}${formData.lastName.charAt(0)}`.toUpperCase();

  return (
    <>
      <header className="bg-[#0077ba] text-white shadow-md w-full top-0 left-0 z-40 relative">
        <div className="w-full px-4 py-4 md:py-5 flex items-center justify-between">
          {/* Sección izquierda */}
          <div className="flex items-center gap-4">
            <button
              onClick={toggleMenuLateral}
              className="border border-[1px] border-white p-1 rounded hover:bg-[#003366] transition"
            >
              <Menu size={20} />
            </button>
            <Link to={ruta} className="mr-8 text-xl font-bold tracking-wide">
              {titulo}
            </Link>
          </div>

          <div className="flex items-center gap-4 relative flex-1 justify-end">
            <div
              className={`hidden md:flex -m-l-10 items-center bg-white/10 border border-white rounded-lg overflow-hidden px-3 py-1 backdrop-blur transition-all duration-300 ${
                busquedaActiva ? 'flex-grow bg-black/30 border-white border-[3px] shadow-[0_0_10px_white]' : 'w-auto'
              }`}
              onClick={() => setBusquedaActiva(true)}
              onBlur={() => setBusquedaActiva(false)}
              tabIndex={0}
              style={{ minWidth: busquedaActiva ? '200px' : 'auto' }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-white/70 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z"
                />
              </svg>
              <input
                type="text"
                placeholder="Buscar o ir a..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                onKeyDown={manejarBusqueda}
                className="bg-transparent outline-none text-md text-white placeholder-white/60 w-full"
              />
              <kbd className="ml-2 text-white/50 text-xs border border-white/30 rounded px-1">/</kbd>
            </div>

            <div className="hidden md:block h-6 w-px bg-white/30 mx-2"></div>

            <button
              className="p-2 rounded hover:bg-[#003366] transition"
              onClick={() => setMenuColaboradoresAbierto(true)}
            >
              <Users size={20} />
            </button>
            <button
              className="p-2 rounded hover:bg-[#003366] transition relative"
              onClick={() => setPanelNotificacionesAbierto(true)}
            >
              <Bell size={20} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            <div className="relative">
              <button
                onClick={() => setMenuPerfilAbierto(true)}
                className="w-8 h-8 rounded-full border-[2px] border-white bg-transparent hover:bg-[#003366] transition overflow-hidden flex items-center justify-center focus:outline-none"
              >
                <span className="text-xs text-white font-bold">{iniciales}</span>
              </button>
            </div>
          </div>
        </div>
        {busquedaActiva && (
          <div
            className="fixed inset-0 bg-black/40 z-30"
            onClick={() => setBusquedaActiva(false)}
          />
        )}
      </header>

      {/* Menú lateral */}
      {menuLateralAbierto && (
        <div className="fixed inset-0 z-40">
          <div className="fixed inset-0 bg-black/50" onClick={() => setMenuLateralAbierto(false)}></div>

          <div className="rounded-md fixed top-0 left-0 w-64 h-full bg-white shadow-lg z-50 p-6 overflow-y-auto animate-slide-in">
            <h2 className="text-xl font-bold text-[#0077ba] mb-6">Menú</h2>
            <ul className="space-y-3 text-gray-700 text-sm font-medium">
              <li className="flex items-center gap-2 hover:text-[#0077ba] transition"><House size={18}/><Link to="/" onClick={toggleMenuLateral}>Home</Link></li>
              <li className="flex items-center gap-2 hover:text-[#0077ba] transition"><Clipboard size={18}/><Link to="/dashboard" onClick={toggleMenuLateral}>Dashboard</Link></li>
            </ul>

            <hr className="my-4 border-t border-gray-200" />

            <ul className="space-y-3 text-gray-700 text-sm font-medium">
              <li className="flex items-center gap-2 hover:text-[#0077ba] transition">
                <Globe size={18} />
                <a href="/" rel="noopener noreferrer">
                  Website Gestor APIs
                </a>
              </li>
            </ul>

            <hr className="my-4 border-t border-gray-200" />

            <ul className="space-y-3 text-gray-700 text-sm font-medium">
              <div className="hover:text-[#0077ba] transition">
                <div className="flex items-center justify-between cursor-pointer"
                    onClick={() => setMostrarBusqueda(!mostrarBusqueda)}>
                  <span>APIs</span>
                  {mostrarBusqueda ? <ChevronUp size={18} /> : <Search size={18} />}
                </div>

                {mostrarBusqueda && (
                  <div className="mt-2 flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Buscar APIs..."
                      className="w-full px-3 py-2 border border-[#0077ba] rounded focus:outline-none focus:ring-2 focus:ring-[#0077ba]/50"
                    />
                  </div>
                )}
              </div>
              <li className="flex items-center gap-2 hover:text-[#0077ba] transition"><PlusCircle size={18}/><Link to="/crear" onClick={toggleMenuLateral}>Crear API</Link></li>
            </ul>
          </div>
        </div>
      )}

      {/* Menú de perfil */}
      {menuPerfilAbierto && (
        <div className="fixed inset-0 z-40">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setMenuPerfilAbierto(false)}
          ></div>

          <div className="rounded-md fixed top-0 right-0 w-72 h-full bg-white shadow-lg z-50 p-6 overflow-y-auto animate-slide-in-right">
            <h2 className="text-lg font-semibold text-[#0077ba] mb-4">Estado</h2>

            <ul className="space-y-3 text-gray-700 text-sm font-medium">
              <li className="flex items-center gap-2 hover:text-[#0077ba] transition">
                <FileText size={18} />
                <Link to="/mis-apis" onClick={() => setMenuPerfilAbierto(false)}>Tus APIs</Link>
              </li>
              <li className="flex items-center gap-2 hover:text-[#0077ba] transition">
                <Star size={18} />
                <Link to="/favoritas" onClick={() => setMenuPerfilAbierto(false)}>Tus Favoritas</Link>
              </li>
              <li className="flex items-center gap-2 hover:text-[#0077ba] transition">
                <FileText size={18} />
                <Link to="/borradores" onClick={() => setMenuPerfilAbierto(false)}>Tus Borradores</Link>
              </li>
            </ul>

            <hr className="my-4 border-t border-gray-200" />

            <ul className="space-y-3 text-gray-700 text-sm font-medium">
              <li className="flex items-center gap-2 hover:text-[#0077ba] transition">
                <Settings size={18} />
                <Link to="/perfilConfig" onClick={() => setMenuPerfilAbierto(false)}>Configuración</Link>
              </li>
            </ul>

            <hr className="my-4 border-t border-gray-200" />

            <ul className="space-y-3 text-red-600 text-sm font-medium">
              <li
                className="flex items-center gap-2 hover:text-red-700 transition cursor-pointer"
                onClick={handleLogout}
              >
                <LogOut size={18} /> Cerrar sesión
              </li>
            </ul>
          </div>
        </div>
      )}

      {menuColaboradoresAbierto && (
        <div className="fixed inset-0 z-40">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setMenuColaboradoresAbierto(false)}
          ></div>

          <div className="rounded-md fixed top-0 right-0 w-96 h-full bg-white shadow-lg z-50 p-6 overflow-y-auto animate-slide-in-right">
            <h2 className="text-lg font-semibold text-[#0077ba] mb-4">Colaboradores</h2>

            <div className="mb-4">
              <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    placeholder="Buscar cuentas..."
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#0077ba]/50"
                  />
                </div>
              <button className="mt-2 px-4 py-2 bg-[#0077ba] text-white rounded hover:bg-[#005f99] transition">
                Añadir colaborador
              </button>
            </div>

            <hr className="my-4 border-t border-gray-200" />

            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Colaboradores actuales</h3>
              <ul className="space-y-2 text-gray-800 text-sm">
                {/* Esta parte debe generarse dinámicamente según los datos reales */}
                <li className="flex justify-between items-center border-b pb-1">
                  <span>usuario1@example.com</span>
                  <button className="text-red-500 hover:text-red-700 text-xs">Eliminar</button>
                </li>
                <li className="flex justify-between items-center border-b pb-1">
                  <span>usuario2@example.com</span>
                  <button className="text-red-500 hover:text-red-700 text-xs">Eliminar</button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
      {panelNotificacionesAbierto && (
        <div className="fixed inset-0 z-40">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setPanelNotificacionesAbierto(false)}
          ></div>

          <div className="rounded-md fixed top-0 right-0 w-96 h-full bg-white shadow-lg z-50 p-6 overflow-y-auto animate-slide-in-right">
            <h2 className="text-lg font-semibold text-[#0077ba] mb-4">Notificaciones</h2>

            {/* Lista de notificaciones */}
            <ul className="space-y-3 text-sm text-gray-800">
              <li className="p-3 border rounded shadow-sm bg-gray-50">
                <p><strong>Nuevo API añadido:</strong> API de predicción del clima.</p>
                <span className="text-xs text-gray-500">Hace 2 horas</span>
              </li>
              <li className="p-3 border rounded shadow-sm bg-gray-50">
                <p><strong>Colaborador aceptado:</strong> juan@example.com se unió a tu API.</p>
                <span className="text-xs text-gray-500">Ayer</span>
              </li>
              {/* Puedes mapear datos reales aquí */}
            </ul>

            <div className="mt-6">
              <Link
                to="/notificaciones"
                className="block text-center bg-[#0077ba] hover:bg-[#005f99] text-white py-2 rounded transition"
                onClick={() => setPanelNotificacionesAbierto(false)}
              >
                Ver todas
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardNavbar;
