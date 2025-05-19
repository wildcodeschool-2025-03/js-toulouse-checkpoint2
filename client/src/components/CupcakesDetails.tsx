import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Cupcake from "../components/Cupcake";

type CupcakeType = {
  id: number;
  accessory_id: string;
  accessory: string;
  color1: string;
  color2: string;
  color3: string;
  name: string;
};

function CupcakeDetails() {
  const { id } = useParams();
  const [cupcake, setCupcake] = useState<CupcakeType | null>(null);

  useEffect(() => {
    const fetchCupcake = async () => {
      const response = await fetch(`http://localhost:3310/api/cupcakes/${id}`);
      const data = await response.json();
      setCupcake(data);
    };

    fetchCupcake();
  }, [id]);

  if (!cupcake) return <p>Loading cupcake...</p>;

  return (
    <div>
      <h1>Cupcake Details</h1>
      <Cupcake data={cupcake} />
      <p>Name: {cupcake.name}</p>
      <p>Accessory: {cupcake.accessory}</p>
    </div>
  );
}

export default CupcakeDetails;
