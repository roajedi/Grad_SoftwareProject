import React, { useState } from 'react';
import AuthScreen from './src/screens/AuthScreen';
import HomeScreen from './src/screens/HomeScreen';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  if (showLogin) {
    return (
      <AuthScreen 
        onLoginSuccess={() => {
          setIsLoggedIn(true);
          setShowLogin(false);
        }} 
        onBack={() => setShowLogin(false)} 
      />
    );
  }

  return (
    <HomeScreen 
      isLoggedIn={isLoggedIn} 
      onLogout={() => setIsLoggedIn(false)} 
      onOpenLogin={() => setShowLogin(true)} 
    />
  );
}