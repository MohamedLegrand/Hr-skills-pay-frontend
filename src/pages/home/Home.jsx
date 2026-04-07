import Heros from "../../components/section/Heros";
import Produits from "../../components/section/Produits";
import Solutions from "../../components/section/solutions";
import Tarif from "../../components/section/Tarif";
import Devellopeus from "../../components/section/Devellopeur";

 
function Home() {
  return (
    <div>
      <Heros />
      <Produits />
      <Solutions />
      <Tarif />
      <Devellopeus />
      
    </div>
  );
}

export default Home;