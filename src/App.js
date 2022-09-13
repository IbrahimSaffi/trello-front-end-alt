import './App.css';
import CardsSection from './components/CardsSection';
import Header from './components/Header';
import LoginPage from './components/Login';
import SignUpPage from './components/Signup';

import {Routes,Route,useNavigate} from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import apiSlice, { getTasks, getUsers } from './slices/apiSlice';
import AddCard from './components/AddCard';
import Loading from './components/Loading';


function App() {
  let state = useSelector(state=>state.apiSlice)
  let dispatch = useDispatch(apiSlice)
  let goTo = useNavigate()
  useEffect(()=>{
   if(state.profile===null){
     goTo("/login")
   }
   else{
    goTo("/")
   }
  },[state.profile])
  useEffect(()=>{
    // if(state.loading){
    //  goTo("/loading")
    // }
   },[state.loading])
  return (
    <div className="app">
      <Header/>
      <Routes>
        <Route path="/" element={<CardsSection/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/signup" element={<SignUpPage/>} />
        <Route path="/addcard" element={<AddCard/>} />
        <Route path="/loading" element={<Loading/>} />
      </Routes>
    </div>
  );
}

export default App;
