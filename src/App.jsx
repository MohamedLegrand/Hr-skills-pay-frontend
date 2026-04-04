import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import ScrollToTop from "./components/scrolltotop/Scrolltotop";
import Home from "./pages/home/Home";

// footer pages
import Contact from "./pages/contact/Contact"; 
import Aboutus from "./pages/aboutus/Aboutus";
import Passerelle from "./pages/passerelle/Passerelle"; 
import Abonnements from "./pages/abonnements/Abonnements"; 
import Docs from "./pages/docs/Docs"; 
import FAQ from "./pages/faq/FAQ";
import Securite from "./pages/securite/Securite";
import Partenaires from "./pages/partenaires/Partenaires";
import Mentions from "./pages/mentions/Mentions";
import Confidentialite from "./pages/confidentialite/Confidentialite"

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Header />
      
      <main>
        <Routes>
          <Route path="/" element={<Home />} />

          {/* footer routes */}
          <Route path="/contact" element={<Contact />} />
          <Route path="/aboutus" element={<Aboutus />} />
          <Route path="/passerelle" element={<Passerelle />} />
          <Route path="/abonnements" element={<Abonnements />} /> 
          <Route path="/docs" element={<Docs />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/securite" element={<Securite />} />
          <Route path="/partenaires" element={<Partenaires />} />
          <Route path="/mentions" element={<Mentions />} />
          <Route path="confidentialite" element={<Confidentialite/>}/>
        </Routes>
      </main>

      <Footer /> 
    </Router>
  );
}

export default App;