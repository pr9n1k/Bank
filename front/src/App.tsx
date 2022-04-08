import React, { useEffect, useState } from 'react';
import './App.css'
import AppRouter from './components/AppRouter';
import Navbar from './components/UI/Navbar/Navbar';
import { AuthContext } from './context';
import { useNavigate } from 'react-router-dom';
function App(){
  const [isAuth,setIsAuth] = useState(false);
  const user = localStorage.getItem("user");
  
  const navigate = useNavigate();
  useEffect(()=>{
    if(user){
      setIsAuth(true);
    }else{
      navigate('/login');
    }
  },[user])
  return(
    <AuthContext.Provider value={{
      isAuth,
      setIsAuth
    }}>
      <div className="body">
          <Navbar />
          <div className='main'>
            <AppRouter />
          </div>
      </div>
    </AuthContext.Provider>
  )
}
export default App;
