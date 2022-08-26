import './App.css';
import CardsSection from './components/CardsSection';
import LoginPage from './components/Login';
import SignUpPage from './components/Signup';
 
function App() {
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
