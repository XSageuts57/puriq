import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { auth } from './firebase';
import { onAuthStateChanged, type User } from 'firebase/auth';

import Login from './pages/Login';
import Home from './pages/Home';
import Destinations from './pages/Destinations';
import DestinationDetail from './pages/DestinationDetail';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="text-white text-xl">Cargando PURIQ...</div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Rutas Públicas */}
        <Route 
          path="/login" 
          element={!user ? <Login /> : <Navigate to="/" replace />} 
        />

        {/* Rutas Protegidas */}
        {user ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/destinos" element={<Destinations />} />
            <Route path="/destinos/:id" element={<DestinationDetail />} />
            {/* Agrega más rutas aquí después */}
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" replace />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;