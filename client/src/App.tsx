
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import { Navbar } from './components/Navbar';
import Login from './pages/Login';
import { Footer } from './components/Footer';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/config';
import axios from 'axios';

function App() {

  const dispatch =  useDispatch();


  const registerWithSocials = async (userData : any) => {
    console.log(userData);
    try {
      const res = await axios.post('http://localhost:3000/api/v1/register', userData);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  

  useEffect(() => {
    const unscribe = onAuthStateChanged(auth, (googleUser) => {
      if (googleUser) {
        console.log("Inside Unscribe");
        // console.log(user);
        // setGoogleUser(googleUser); 

        const tempUser = googleUser;
        const userData = {
          uid: tempUser.uid,
          email: tempUser.email,
          displayName: tempUser.displayName,
          photoURL: tempUser.photoURL,
        };
        dispatch({
          type: "SET_USER",
          payload: userData,
        });

        registerWithSocials(userData);



        auth.currentUser?.getIdToken(/* forceRefresh */ true).then(function(idToken ) {
          // console.log("user token, " , idToken);
          document.cookie = `jwtToken=${idToken}; path=/`;        
        })

        

        // console.log(userData);
      }
    //   console.log(user);
    });

    

    return unscribe;
  }, []);


  

  return (
    <div className=' font-primary '>
    <Router>

      
      <Navbar/>

    
     
      {/* <Toaster/> */}
      <div className='flex min-h-screen flex-col items-center mt-10'>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path='/login' element={<Login/>} />
          

        </Routes>
      </div>

      <Footer/>

   
    </Router>

  </div>
  )
}

export default App
