import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Invoice from './components/invoice/Invoice';
import Home from './components/home/Home';

function App() {
  return (
    <BrowserRouter>
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/faktura/:id" element={<Invoice />} />
          </Routes>
        </BrowserRouter>
  );
}

export default App;
