import Home from './pages/Home'
import SharedFile from "./pages/SharedFile";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/share/:id" element={<SharedFile />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;