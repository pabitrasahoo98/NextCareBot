import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Responses from './pages/Responses';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/response/:id" element={<Responses/>} />
      </Routes>
      </BrowserRouter>
  );
}

export default App;
