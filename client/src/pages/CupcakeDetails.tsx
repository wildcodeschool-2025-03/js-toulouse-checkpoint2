import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Cupcake from "../components/Cupcake";
import type { CupCakes } from "../pages/CupcakeList";

function CupcakeDetails() {
  const { id } = useParams();
  const [cupcakes, setCupcakes] = useState<CupCakes[]>();

  useEffect(() => {
    const fetchCupCakes = async () => {
      try {
        const response = await fetch("http://localhost:3310/api/cupcakes");
        const data = await response.json();
        setCupcakes(data);
      } catch (error) {
        ("Erreur lors du chargement");
      }
    };

    fetchCupCakes();
  }, []);

  const cupcake = cupcakes?.find((elem) => elem.id.toString() === id);

  if (!cupcake) {
    return <div>Loading...</div>;
  }

  return (
    <div className="cupcake-page">
      <Cupcake data={cupcake} />
      <h2>{cupcake?.name}</h2>
    </div>
  );
}

export default CupcakeDetails;
