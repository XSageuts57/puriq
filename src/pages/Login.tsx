// src/pages/Login.tsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, loginWithEmail, registerWithEmail, googleProvider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';
import { Mail, Lock, User, Phone, CreditCard, Eye, EyeOff, LogIn, ArrowRight, CheckCircle, Sparkles, Mountain, Hotel, Utensils } from 'lucide-react';

interface FirebaseError {
  code: string;
  message: string;
}

interface AlertCircleIconProps {
  size?: number;
  className?: string;
}

function AlertCircleIcon({ size = 18, className = '' }: AlertCircleIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  
  // Login form
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  // Register form
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPhone, setRegisterPhone] = useState('');
  const [registerDni, setRegisterDni] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');
  
  const navigate = useNavigate();

  // Detectar si es móvil
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Efecto de parallax para el mouse (solo en desktop)
  useEffect(() => {
    if (isMobile) return;
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMobile]);

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/');
    } catch (err) {
      const firebaseError = err as FirebaseError;
      console.error(firebaseError);
      setError(firebaseError.message || 'Error al iniciar sesión con Google');
    }
    setLoading(false);
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await loginWithEmail(loginEmail, loginPassword);
      navigate('/');
    } catch (err) {
      const firebaseError = err as FirebaseError;
      console.error(firebaseError);
      if (firebaseError.code === 'auth/invalid-credential') {
        setError('Correo o contraseña incorrectos');
      } else if (firebaseError.code === 'auth/user-not-found') {
        setError('No existe una cuenta con este correo');
      } else if (firebaseError.code === 'auth/wrong-password') {
        setError('Contraseña incorrecta');
      } else {
        setError(firebaseError.message || 'Error al iniciar sesión');
      }
    }
    setLoading(false);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    
    if (registerName.length < 3) {
      setError('El nombre debe tener al menos 3 caracteres');
      setLoading(false);
      return;
    }
    if (registerPhone.length < 9) {
      setError('Ingresa un número de teléfono válido');
      setLoading(false);
      return;
    }
    if (registerDni.length < 8) {
      setError('Ingresa un DNI válido (8 dígitos)');
      setLoading(false);
      return;
    }
    if (registerPassword.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      setLoading(false);
      return;
    }
    if (registerPassword !== registerConfirmPassword) {
      setError('Las contraseñas no coinciden');
      setLoading(false);
      return;
    }
    
    try {
      await registerWithEmail(registerEmail, registerPassword, registerName);
      
      const userData = {
        name: registerName,
        email: registerEmail,
        phone: registerPhone,
        dni: registerDni,
        registeredAt: new Date().toISOString()
      };
      localStorage.setItem(`user_data_${registerEmail}`, JSON.stringify(userData));
      
      setSuccess('¡Cuenta creada exitosamente! Redirigiendo...');
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (err) {
      const firebaseError = err as FirebaseError;
      console.error(firebaseError);
      if (firebaseError.code === 'auth/email-already-in-use') {
        setError('Este correo ya está registrado');
      } else if (firebaseError.code === 'auth/invalid-email') {
        setError('Correo electrónico inválido');
      } else {
        setError(firebaseError.message || 'Error al crear la cuenta');
      }
    }
    setLoading(false);
  };

  // Calcular posición de elementos flotantes (solo desktop)
  const getParallaxOffset = (factor: number) => {
    if (isMobile) return { x: 0, y: 0 };
    const x = (mousePosition.x / window.innerWidth - 0.5) * factor;
    const y = (mousePosition.y / window.innerHeight - 0.5) * factor;
    return { x, y };
  };

  const iconOffset = getParallaxOffset(30);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 overflow-x-hidden">
      
      {/* Fondo animado */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-purple-500/20 via-transparent to-transparent"></div>
        
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${isMobile ? 'w-[400px] h-[400px]' : 'w-[800px] h-[800px]'} bg-gradient-radial from-red-600/10 via-transparent to-transparent rounded-full animate-pulse-slow`}></div>
        <div className={`absolute top-1/3 left-1/4 ${isMobile ? 'w-[250px] h-[250px]' : 'w-[500px] h-[500px]'} bg-gradient-radial from-purple-600/10 via-transparent to-transparent rounded-full animate-pulse-slower ${isMobile ? 'hidden' : 'block'}`}></div>
        <div className={`absolute bottom-1/4 right-1/4 ${isMobile ? 'w-[300px] h-[300px]' : 'w-[600px] h-[600px]'} bg-gradient-radial from-blue-600/10 via-transparent to-transparent rounded-full animate-pulse-slowest ${isMobile ? 'hidden' : 'block'}`}></div>
        
        {/* Iconos flotantes */}
        <div 
          className={`absolute ${isMobile ? 'top-[5%] left-[5%] text-white/5' : 'top-[15%] left-[10%] text-white/10'} animate-float ${isMobile ? 'hidden md:block' : ''}`}
          style={{ transform: `translate(${iconOffset.x * 0.5}px, ${iconOffset.y * 0.5}px)` }}
        >
          <Mountain size={isMobile ? 40 : 80} />
        </div>
        <div 
          className={`absolute ${isMobile ? 'bottom-[5%] right-[5%] text-white/5' : 'bottom-[20%] right-[15%] text-white/10'} animate-float-delayed ${isMobile ? 'hidden md:block' : ''}`}
          style={{ transform: `translate(${iconOffset.x * 0.7}px, ${iconOffset.y * 0.7}px)` }}
        >
          <Hotel size={isMobile ? 35 : 70} />
        </div>
        <div 
          className={`absolute ${isMobile ? 'top-[30%] right-[10%] text-white/5' : 'top-[40%] right-[20%] text-white/10'} animate-float-slower ${isMobile ? 'hidden md:block' : ''}`}
          style={{ transform: `translate(${iconOffset.x * 0.3}px, ${iconOffset.y * 0.3}px)` }}
        >
          <Utensils size={isMobile ? 30 : 60} />
        </div>
      </div>

      {/* Tarjeta principal */}
      <div className="w-full max-w-6xl relative z-10">
        <div className="grid md:grid-cols-2 gap-0 bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/20 overflow-hidden shadow-2xl transition-all duration-500 hover:shadow-red-600/20 hover:border-red-500/30">
          
          {/* Lado izquierdo - Información */}
          <div className="hidden md:flex flex-col justify-center p-12 bg-gradient-to-br from-red-600/30 to-red-800/30 backdrop-blur-sm relative overflow-hidden group">
            <div 
              className="absolute w-64 h-64 bg-gradient-radial from-red-500/30 to-transparent rounded-full blur-3xl transition-transform duration-300"
              style={{ 
                transform: `translate(${mousePosition.x * 0.05}px, ${mousePosition.y * 0.05}px)`,
                left: '50%',
                top: '50%',
                marginLeft: '-128px',
                marginTop: '-128px'
              }}
            />
            
            <div className="relative z-10">
              <div className="mb-8 transform transition-transform duration-500 group-hover:scale-105">
                <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center shadow-2xl mb-6 animate-pulse-slow">
                  <span className="text-white text-4xl font-bold">P</span>
                </div>
                <h2 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-white to-red-200 bg-clip-text text-transparent">
                  PURIQ
                </h2>
                <p className="text-red-300 text-sm flex items-center gap-2">
                  <Sparkles size={14} /> Explora Perú como nunca antes
                </p>
              </div>
              
              <h3 className="text-3xl font-bold text-white mb-4 animate-slide-in">
                {isLogin ? '✨ ¡Bienvenido de vuelta!' : '🌟 Únete a la aventura'}
              </h3>
              
              <p className="text-zinc-200 leading-relaxed text-lg animate-slide-in-delayed">
                {isLogin 
                  ? 'Descubre los mejores destinos, alojamientos y experiencias que Perú tiene para ofrecer.'
                  : 'Regístrate y comienza a planificar tu próxima aventura. Accede a ofertas exclusivas.'
                }
              </p>
              
              <div className="mt-10 flex gap-6 animate-fade-in">
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-400">200+</div>
                  <div className="text-xs text-zinc-300">Destinos</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-400">50K+</div>
                  <div className="text-xs text-zinc-300">Viajeros</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-400">4.9</div>
                  <div className="text-xs text-zinc-300">Rating</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Lado derecho - Formulario */}
          <div className="p-6 md:p-12 relative">
            {/* Logo para móvil */}
            {isMobile && (
              <div className="flex justify-center mb-6 md:hidden">
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center shadow-2xl">
                  <span className="text-white text-3xl font-bold">P</span>
                </div>
              </div>
            )}
            
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            
            {/* Tabs con subrayado mejorado */}
            <div className="flex justify-center md:justify-end gap-3 mb-6 md:mb-8 relative">
              {/* Subrayado animado - versión mejorada */}
              <div 
                className={`absolute bottom-0 h-0.5 bg-gradient-to-r from-red-500 to-red-600 transition-all duration-300 ease-out ${
                  isLogin 
                    ? 'w-24 md:w-24 left-[calc(50%-3rem)] md:left-[calc(50%-3rem)]' 
                    : 'w-28 md:w-28 left-[calc(50%+1rem)] md:left-[calc(50%+2rem)]'
                }`}
              />
              <button
                onClick={() => {
                  setIsLogin(true);
                  setError('');
                  setSuccess('');
                }}
                className={`relative px-4 md:px-6 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                  isLogin 
                    ? 'text-white'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Iniciar sesión
              </button>
              <button
                onClick={() => {
                  setIsLogin(false);
                  setError('');
                  setSuccess('');
                }}
                className={`relative px-4 md:px-6 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                  !isLogin 
                    ? 'text-white'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Registrarse
              </button>
            </div>
            
            {/* Mensajes */}
            {(error || success) && (
              <div className={`mb-4 p-3 rounded-xl animate-slide-down ${
                error ? 'bg-red-600/20 border border-red-600/30 text-red-400' : 'bg-green-600/20 border border-green-600/30 text-green-400'
              }`}>
                <div className="flex items-center gap-2">
                  {error ? <AlertCircleIcon size={16} /> : <CheckCircle size={16} />}
                  <span className="text-sm">{error || success}</span>
                </div>
              </div>
            )}
            
            {isLogin ? (
              // FORMULARIO DE LOGIN
              <form onSubmit={handleEmailLogin} className="space-y-4 animate-slide-in-right">
                <div className="transform transition-all duration-300 hover:translate-x-1">
                  <label className="block text-sm font-medium text-zinc-300 mb-2">Correo electrónico</label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-hover:text-red-400 transition-colors duration-300" size={18} />
                    <input
                      type="email"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-sm md:text-base text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-300"
                      placeholder="tu@email.com"
                      required
                    />
                  </div>
                </div>
                
                <div className="transform transition-all duration-300 hover:translate-x-1">
                  <label className="block text-sm font-medium text-zinc-300 mb-2">Contraseña</label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-hover:text-red-400 transition-colors duration-300" size={18} />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-12 py-3 text-sm md:text-base text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-300"
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-all duration-300"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-red-600/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group text-sm md:text-base"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      Iniciar sesión
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
                    </>
                  )}
                </button>
              </form>
            ) : (
              // FORMULARIO DE REGISTRO
              <form onSubmit={handleRegister} className="space-y-3 animate-slide-in-left">
                <div className="transform transition-all duration-300 hover:translate-x-1">
                  <label className="block text-sm font-medium text-zinc-300 mb-2">Nombre completo</label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-hover:text-red-400 transition-colors duration-300" size={18} />
                    <input
                      type="text"
                      value={registerName}
                      onChange={(e) => setRegisterName(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-sm md:text-base text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-300"
                      placeholder="Juan Pérez"
                      required
                    />
                  </div>
                </div>
                
                <div className="transform transition-all duration-300 hover:translate-x-1">
                  <label className="block text-sm font-medium text-zinc-300 mb-2">Correo electrónico</label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-hover:text-red-400 transition-colors duration-300" size={18} />
                    <input
                      type="email"
                      value={registerEmail}
                      onChange={(e) => setRegisterEmail(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-sm md:text-base text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-300"
                      placeholder="tu@email.com"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="transform transition-all duration-300 hover:translate-x-1">
                    <label className="block text-sm font-medium text-zinc-300 mb-2">Teléfono</label>
                    <div className="relative group">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-hover:text-red-400 transition-colors duration-300" size={18} />
                      <input
                        type="tel"
                        value={registerPhone}
                        onChange={(e) => setRegisterPhone(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-sm md:text-base text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-300"
                        placeholder="+51 987654321"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="transform transition-all duration-300 hover:translate-x-1">
                    <label className="block text-sm font-medium text-zinc-300 mb-2">DNI</label>
                    <div className="relative group">
                      <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-hover:text-red-400 transition-colors duration-300" size={18} />
                      <input
                        type="text"
                        value={registerDni}
                        onChange={(e) => setRegisterDni(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-sm md:text-base text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-300"
                        placeholder="12345678"
                        required
                      />
                    </div>
                  </div>
                </div>
                
                <div className="transform transition-all duration-300 hover:translate-x-1">
                  <label className="block text-sm font-medium text-zinc-300 mb-2">Contraseña</label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-hover:text-red-400 transition-colors duration-300" size={18} />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={registerPassword}
                      onChange={(e) => setRegisterPassword(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-12 py-3 text-sm md:text-base text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-300"
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-all duration-300"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                
                <div className="transform transition-all duration-300 hover:translate-x-1">
                  <label className="block text-sm font-medium text-zinc-300 mb-2">Confirmar contraseña</label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-hover:text-red-400 transition-colors duration-300" size={18} />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={registerConfirmPassword}
                      onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-12 py-3 text-sm md:text-base text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-300"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                </div>
                
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-red-600/30 disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto" />
                  ) : (
                    'Crear cuenta'
                  )}
                </button>
              </form>
            )}
            
            {/* Separador */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white/5 backdrop-blur-sm px-4 text-zinc-400 text-xs md:text-sm rounded-full">O continúa con</span>
              </div>
            </div>
            
            {/* Botón de Google */}
            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full bg-white/5 hover:bg-white/10 border border-white/20 py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-3 group hover:border-red-500/50 hover:shadow-lg hover:shadow-red-500/10 text-sm md:text-base"
            >
              <LogIn size={18} className="group-hover:rotate-12 transition-transform duration-300" />
              <span>Continuar con Google</span>
            </button>
            
            <p className="text-center text-[11px] md:text-xs text-zinc-500 mt-6">
              Al continuar, aceptas nuestros Términos y Condiciones y Política de Privacidad.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(15px) rotate(-5deg); }
        }
        @keyframes float-slower {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(3deg); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.1); }
        }
        @keyframes pulse-slower {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.2); }
        }
        @keyframes pulse-slowest {
          0%, 100% { opacity: 0.1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.3); }
        }
        @keyframes slide-in-right {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slide-in-left {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slide-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-down {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 7s ease-in-out infinite; }
        .animate-float-slower { animation: float-slower 8s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
        .animate-pulse-slower { animation: pulse-slower 5s ease-in-out infinite; }
        .animate-pulse-slowest { animation: pulse-slowest 6s ease-in-out infinite; }
        .animate-slide-in { animation: slide-in 0.5s ease-out; }
        .animate-slide-in-delayed { animation: slide-in 0.5s ease-out 0.2s both; }
        .animate-slide-in-right { animation: slide-in-right 0.5s ease-out; }
        .animate-slide-in-left { animation: slide-in-left 0.5s ease-out; }
        .animate-slide-down { animation: slide-down 0.3s ease-out; }
        .animate-fade-in { animation: fade-in 0.5s ease-out; }
        
        .bg-gradient-radial {
          background-image: radial-gradient(ellipse at center, var(--tw-gradient-stops));
        }

        /* Ajustes para móvil */
        @media (max-width: 768px) {
          input, button {
            font-size: 16px !important;
          }
        }
      `}</style>
    </div>
  );
}