import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    setLoading(true);

    try {
      await signInWithPopup(auth, googleProvider);

      // REDIRECCIÓN AL HOME
      navigate('/');

    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-10">
          <div className="w-24 h-24 bg-red-600 rounded-3xl flex items-center justify-center shadow-2xl">
            <span className="text-white text-6xl font-bold">P</span>
          </div>
        </div>

        <div className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800">
          <h1 className="text-3xl font-bold text-center mb-2">Iniciar sesión a PURIQ</h1>
          <p className="text-zinc-400 text-center mb-8">Por favor, ingresa tu correo electrónico.</p>

          <input
            type="email"
            placeholder="Introduce tu dirección de correo electrónico"
            className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-4 mb-6 text-white placeholder-zinc-500 focus:outline-none focus:border-red-500"
          />

          <button className="w-full bg-red-600 hover:bg-red-700 py-4 rounded-2xl font-semibold text-lg mb-4 transition-colors">
            Continuar
          </button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-700"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-zinc-900 px-4 text-zinc-500 text-sm">o</span>
            </div>
          </div>

          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full bg-white text-black py-4 rounded-2xl font-medium flex items-center justify-center gap-3 hover:bg-gray-100 disabled:opacity-70"
          >
            <img src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png" alt="Google" className="h-5" />
            Continuar con Google
          </button>
        </div>
      </div>
    </div>
  );
}