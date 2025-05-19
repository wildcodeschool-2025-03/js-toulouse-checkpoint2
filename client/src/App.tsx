import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import NavBar from "./components/NavBar";

import "./App.css";

function App() {
  const [data, setData] = useState([]);

  console.log(data);

  useEffect(() => {
    async function CupCakeFetch() {
      const Url = "http://localhost:3310/api/cupcakes";
      const Fetch = await fetch(Url);
      const result = await Fetch.json();
      setData(result);
    }
    CupCakeFetch();
  }, []);

  return (
    <>
      <main className="main-container">
        <Outlet />
      </main>
      <NavBar />
    </>
  );
}

export default App;
