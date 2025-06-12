import { useEffect, useMemo, useState } from "react";

export default function App() {
  const [politicians, setPoliticians] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:3333/politicians")
      .then((res) => res.json())
      .then((data) => setPoliticians(data))
      .catch((err) => console.error(err));
  }, []);

  const filteredPoliticians = useMemo(() => {
    return politicians.filter((politician) => {
      const isInName = politician.name
        .toLowerCase()
        .includes(search.toLowerCase());
      const isInBio = politician.biography
        .toLowerCase()
        .includes(search.toLowerCase());
      return isInName || isInBio;
    });
  }, [politicians, search]);

  return (
    <>
      <h1>Lista dei politici</h1>
      <input
        className="search"
        type="text"
        placeholder="Cerca per nome o biografia"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="container">
        {filteredPoliticians.map((politician) => (
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
