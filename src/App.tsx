import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { auth } from './firebase';
import { onAuthStateChanged, type User } from 'firebase/auth';

import Login from './pages/Login';
// Importamos las páginas (las crearemos después)
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
        {/* Si NO hay usuario → va al Login */}
        {!user ? (
          <Route path="*" element={<Login />} />
        ) : (
          /* Si hay usuario → puede navegar */
          <>
            <Route path="/" element={<Home />} />
            <Route path="/destinos" element={<Destinations />} />
            <Route path="/destinos/:id" element={<DestinationDetail />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;