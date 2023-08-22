import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./components/Home";
import HomeInvoice from './components/HomeInvoice';

function App() {
  return (
    <BrowserRouter>
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/faktura/:id" element={<HomeInvoice />} />
          </Routes>
        </BrowserRouter>
  );
}

export default App;
