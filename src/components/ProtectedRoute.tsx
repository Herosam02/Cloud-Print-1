import React from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  // No blocking - just pass through the children
  return <>{children}</>;
};

export default ProtectedRoute;