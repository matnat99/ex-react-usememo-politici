import { useEffect, useState } from "react";

export default function App() {
  const [politicians, setPoliticians] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3333/politicians")
      .then((res) => res.json())
      .then((data) => setPoliticians(data))
      .catch((err) => console.error(err));
  }, []);

  console.log(politicians);

  return (
    <>
      <h1>Lista dei politici</h1>
      <div className="container">
        {politicians.map((politician) => (
          <div key={politician.id} className="card">
            <img src={politician.image} alt={politician.name} />
            <h2>{politician.name}</h2>
            <p>
              <strong>Posizione:</strong> {politician.position}
            </p>
            <p>{politician.biography}</p>
          </div>
        ))}
      </div>
    </>
  );
}
