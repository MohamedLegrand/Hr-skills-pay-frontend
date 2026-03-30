import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import ScrollToTop from "./components/scrolltotop/Scrolltotop";
import Home from "./pages/home/Home";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Header />
      
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>

      <Footer /> 
    </Router>
  );
}

export default App;