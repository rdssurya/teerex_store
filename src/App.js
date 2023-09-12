import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Products from './Components/Products';
import Cart from './Components/Cart';
import Thanks from './Components/Thank';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/thanks" element={<Thanks />} />
        </Routes>
    </Router>
  );
}

export default App;
