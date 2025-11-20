import React from 'react';
import { useSelector } from 'react-redux';
import AuthStack from './AuthStack';
import MainTabs from './MainTabs';

export default function AppNavigator() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return isLoggedIn ? <MainTabs /> : <AuthStack />;
}
