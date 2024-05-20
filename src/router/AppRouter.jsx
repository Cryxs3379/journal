import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthRoutes } from '../auth/routes/AuthRoutes';
import { JournalRoutes } from '../journal/routes/JournalRoutes';
import { CheckingAuth } from '../UI/components/CheckingAuth';
import { useCheckOut } from '../hooks/useCheckOut';

// Componente principal de enrutamiento de la aplicación
export const AppRouter = () => {
  const status = useCheckOut(); // Obtiene el estado de autenticación

  // Muestra el componente de comprobación de autenticación mientras se verifica el estado
  if (status === 'checking') {
    return <CheckingAuth />;
  }

  return (
    <Routes>
      {
        status === 'authenticated'
        ? <Route path='/*' element={<JournalRoutes />} /> // Rutas para usuarios autenticados
        : <Route path='/auth/*' element={<AuthRoutes />} /> // Rutas para usuarios no autenticados
      }
      <Route path='/*' element={<Navigate to='/auth/login' />} /> {/* Redirige al login si la ruta no coincide */}
    </Routes>
  );
};

