// src/hooks/useRouteDebug.js
import { useLocation, useNavigate } from "react-router-dom";

export const useRouteDebug = (componentName) => {
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    console.log(`📍 ${componentName} - Rota atual:`, location.pathname);
  }, [location, componentName]);

  const debugNavigate = (to) => {
    console.log(`🎯 ${componentName} - Navegando para:`, to);
    navigate(to);
  };

  return { debugNavigate };
};
