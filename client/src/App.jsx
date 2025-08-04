import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        {/* otras rutas vendrán luego */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
