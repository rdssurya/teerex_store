import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Products from './Components/Products';
import Cart from './Components/Cart';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
    </Router>
  );
}

export default App;
