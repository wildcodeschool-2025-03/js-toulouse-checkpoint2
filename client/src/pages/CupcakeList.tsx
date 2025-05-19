import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cupcake from "../components/Cupcake";

/* you can use sampleCupcakes if you're stucked on step 1 */
/* if you're fine with step 1, just ignore this ;) */
/* ************************************************************************* */

export interface CupCakes {
  id: number;
  accessory_id: string;
  accessory: string;
  color1: string;
  color2: string;
  color3: string;
  name: string;
}

interface AccessoriesType {
  id: number;
  name: string;
  slug: string;
}

function CupcakeList() {
  const [cupCakes, setCupCakes] = useState<CupCakes[]>([]);
  const [accessories, setAccessories] = useState<AccessoriesType[]>([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const fetchCupCakes = async () => {
      try {
        const response = await fetch("http://localhost:3310/api/cupcakes");
        const data = await response.json();
        setCupCakes(data);
      } catch (error) {
        ("Erreur lors du chargement");
      }
    };

    fetchCupCakes();
  }, []);

  useEffect(() => {
    const fetchAccessories = async () => {
      try {
        const response = await fetch("http://localhost:3310/api/accessories");
        const data = await response.json();
        setAccessories(data);
      } catch (error) {
        ("Erreur lors du chargement");
      }
    };

    fetchAccessories();
  }, []);

  return (
    <>
      <h1>My cupcakes</h1>
      <form className="center">
        <label htmlFor="cupcake-select">
          Filter by{" "}
          <select
            id="cupcake-select"
            onChange={(e) => setFilter(e.target.value)}
            value={filter}
          >
            <option value="">---</option>
            {accessories.map((accesory) => (
              <option key={accesory.id} value={accesory.id}>
                {accesory.name}
              </option>
            ))}
          </select>
        </label>
      </form>
      <ul className="cupcake-list" id="cupcake-list">
        {cupCakes
          .filter((accessory) => !filter || accessory.accessory_id === filter)
          .map((cupcake) => (
            <li key={cupcake.id} className="cupcake-item">
              <Link to={`/cupcakes/${cupcake.id}`}>
                <Cupcake data={cupcake} />
              </Link>
            </li>
          ))}
      </ul>
    </>
  );
}

export default CupcakeList;
