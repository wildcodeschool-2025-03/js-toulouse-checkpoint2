import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cupcake from "../components/Cupcake";

/* ************************************************************************* */

type CupcakeType = {
  id: number;
  accessory_id: string;
  accessory: string;
  color1: string;
  color2: string;
  color3: string;
  name: string;
};

type AccessoryType = {
  id: number;
  name: string;
};

function CupcakeList() {
  const [cupcakes, setCupcakes] = useState<CupcakeType[]>([]);
  const [accessories, setAccessories] = useState<AccessoryType[]>([]);
  const [selectedAccessory, setSelectedAccessory] = useState<string>("");

  useEffect(() => {
    const fetchCupcakes = async () => {
      try {
        const response = await fetch("http://localhost:3310/api/cupcakes");
        const data = await response.json();
        setCupcakes(data);
      } catch (err) {
        console.error("Erreur lors du chargement des cupcakes :", err);
      }
    };

    fetchCupcakes();
  }, []);

  useEffect(() => {
    const fetchAccessories = async () => {
      try {
        const response = await fetch("http://localhost:3310/api/accessories");
        const data = await response.json();
        setAccessories(data);
      } catch (err) {
        console.error("Erreur lors du chargement des accessoires :", err);
      }
    };

    fetchAccessories();
  }, []);

  const filteredCupcakes =
    selectedAccessory !== ""
      ? cupcakes.filter((cupcake) => cupcake.accessory_id === selectedAccessory)
      : cupcakes;

  return (
    <>
      <h1>My cupcakes</h1>
      <form className="center">
        <label htmlFor="cupcake-select">
          Filter by{" "}
          <select
            id="cupcake-select"
            value={selectedAccessory}
            onChange={(e) => setSelectedAccessory(e.target.value)}
          >
            <option value="">---</option>
            {accessories.map((accessory) => (
              <option key={accessory.id} value={accessory.id}>
                {accessory.name}
              </option>
            ))}
          </select>
        </label>
      </form>
      <ul className="cupcake-list" id="cupcake-list">
        {filteredCupcakes.map((cupcake) => (
          <li className="cupcake-item" key={cupcake.id}>
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
