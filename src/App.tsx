import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MealDetail from './pages/MealDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/meal/:id" element={<MealDetail/>}/>
      </Routes>
    </Router>
  );
}

export default App;