// src/pages/Login.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, loginWithEmail, registerWithEmail, googleProvider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';
import { Mail, Lock, User, Phone, CreditCard, Eye, EyeOff, LogIn, ArrowRight, CheckCircle } from 'lucide-react';

// Definir tipo para error de Firebase
interface FirebaseError {
  code: string;
  message: string;
}

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
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
    
    // Validaciones
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
      
      // Guardar datos adicionales en localStorage (para mantener DNI y teléfono)
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 to-black flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        <div className="grid md:grid-cols-2 gap-8 bg-zinc-900/50 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
          
          {/* Lado izquierdo - Información */}
          <div className="hidden md:flex flex-col justify-center p-10 bg-gradient-to-br from-red-600/20 to-red-800/20">
            <div className="mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-500 rounded-2xl flex items-center justify-center shadow-2xl mb-6">
                <span className="text-white text-3xl font-bold">P</span>
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">PURIQ</h2>
              <p className="text-red-300 text-sm">Explora Perú</p>
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-4">
              {isLogin ? '¡Bienvenido de vuelta!' : 'Únete a la aventura'}
            </h3>
            
            <p className="text-zinc-300 leading-relaxed">
              {isLogin 
                ? 'Inicia sesión para descubrir los mejores destinos, alojamientos y experiencias que Perú tiene para ofrecer.'
                : 'Regístrate y comienza a planificar tu próxima aventura. Accede a ofertas exclusivas y guarda tus lugares favoritos.'
              }
            </p>
            
            <div className="mt-8 flex gap-2">
              <div className="w-2 h-2 rounded-full bg-red-500"></div>
              <div className="w-2 h-2 rounded-full bg-white/30"></div>
              <div className="w-2 h-2 rounded-full bg-white/30"></div>
            </div>
          </div>
          
          {/* Lado derecho - Formulario */}
          <div className="p-8 md:p-10">
            <div className="flex justify-end gap-2 mb-6">
              <button
                onClick={() => {
                  setIsLogin(true);
                  setError('');
                  setSuccess('');
                }}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  isLogin 
                    ? 'bg-red-600 text-white shadow-lg shadow-red-600/30'
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
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  !isLogin 
                    ? 'bg-red-600 text-white shadow-lg shadow-red-600/30'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Registrarse
              </button>
            </div>
            
            {error && (
              <div className="mb-4 p-3 bg-red-600/20 border border-red-600/30 rounded-xl text-red-400 text-sm">
                {error}
              </div>
            )}
            
            {success && (
              <div className="mb-4 p-3 bg-green-600/20 border border-green-600/30 rounded-xl text-green-400 text-sm flex items-center gap-2">
                <CheckCircle size={16} />
                {success}
              </div>
            )}
            
            {isLogin ? (
              // FORMULARIO DE LOGIN
              <form onSubmit={handleEmailLogin} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">Correo electrónico</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                    <input
                      type="email"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      className="w-full bg-zinc-800/50 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 transition-all"
                      placeholder="tu@email.com"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">Contraseña</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className="w-full bg-zinc-800/50 border border-white/10 rounded-xl pl-12 pr-12 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 transition-all"
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 py-3 rounded-xl font-semibold transition-all shadow-lg shadow-red-600/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      Iniciar sesión
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </form>
            ) : (
              // FORMULARIO DE REGISTRO
              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">Nombre completo</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                    <input
                      type="text"
                      value={registerName}
                      onChange={(e) => setRegisterName(e.target.value)}
                      className="w-full bg-zinc-800/50 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 transition-all"
                      placeholder="Juan Pérez"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">Correo electrónico</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                    <input
                      type="email"
                      value={registerEmail}
                      onChange={(e) => setRegisterEmail(e.target.value)}
                      className="w-full bg-zinc-800/50 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 transition-all"
                      placeholder="tu@email.com"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">Teléfono</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                    <input
                      type="tel"
                      value={registerPhone}
                      onChange={(e) => setRegisterPhone(e.target.value)}
                      className="w-full bg-zinc-800/50 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 transition-all"
                      placeholder="+51 987654321"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">DNI</label>
                  <div className="relative">
                    <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                    <input
                      type="text"
                      value={registerDni}
                      onChange={(e) => setRegisterDni(e.target.value)}
                      className="w-full bg-zinc-800/50 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 transition-all"
                      placeholder="12345678"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">Contraseña</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={registerPassword}
                      onChange={(e) => setRegisterPassword(e.target.value)}
                      className="w-full bg-zinc-800/50 border border-white/10 rounded-xl pl-12 pr-12 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 transition-all"
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">Confirmar contraseña</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={registerConfirmPassword}
                      onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                      className="w-full bg-zinc-800/50 border border-white/10 rounded-xl pl-12 pr-12 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 transition-all"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                </div>
                
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 py-3 rounded-xl font-semibold transition-all shadow-lg shadow-red-600/30 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto" />
                  ) : (
                    'Crear cuenta'
                  )}
                </button>
              </form>
            )}
            
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-zinc-900/50 px-4 text-zinc-500 text-sm">O continúa con</span>
              </div>
            </div>
            
            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full bg-white/10 hover:bg-white/20 border border-white/20 py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-3"
            >
              <LogIn size={20} />
              Google
            </button>
            
            <p className="text-center text-xs text-zinc-500 mt-6">
              Al continuar, aceptas nuestros Términos y Condiciones y Política de Privacidad.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}