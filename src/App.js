import './App.css';
import CardsSection from './components/CardsSection';
import Header from './components/Header';
import LoginPage from './components/Login';
import SignUpPage from './components/Signup';
import {Routes,Route,useNavigate} from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import apiSlice, { getTasks, getUsers } from './slices/apiSlice';


function App() {
  let state = useSelector(state=>state.apiSlice)
  let dispatch = useDispatch(apiSlice)
  let goTo = useNavigate()
  useEffect(()=>{
   if(state.accessToken===""){
     goTo("/login")
   }
   else{
    dispatch(getTasks())
    dispatch(getUsers())
   }
  },[])
  return (
    <div className="app">
      <Header/>
      <Routes>
        <Route path="/" element={<CardsSection/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/signup" element={<SignUpPage/>} />
      </Routes>
    </div>
  );
}

export default App;
