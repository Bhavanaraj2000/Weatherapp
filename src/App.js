// import logo from './logo.svg';
import './App.css';
import{BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './pages/Home';
import Location from './components/Location';
import Temperature from './components/Temperature';
import Week from './components/Week';

function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/location" element={<Location />} />
    <Route path="/temperature" element={<Temperature />} />
    <Route path="/week" element={<Week />} />
    



      
    </Routes>

      
    </BrowserRouter>
  );
}

export default App;
