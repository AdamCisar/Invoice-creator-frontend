import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./components/Home";

function App() {
  return (
    <BrowserRouter>
          <Routes>
              <Route path="/" element={<Home />} />
              {/* <Route path="signup" element={<Signup />} />
              <Route path="login"  element={<Login />} />
              <Route path="reservations"  element={<ReservationList />} />
              <Route path="my-reservations"  element={<MyReservations />} /> */}
          </Routes>
        </BrowserRouter>
  );
}

export default App;
