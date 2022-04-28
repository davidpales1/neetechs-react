import React from 'react';
import './App.css';
import { useAuth } from "./lib/auth";
import { UserInfo } from "./components/UserInfo";
import { Auth } from "./components/Auth";

function App() {
  const { user } = useAuth();
  return user ?  <Auth />  : <UserInfo />
}

export default App;
