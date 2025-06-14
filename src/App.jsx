import { useEffect, useMemo, useState, memo } from "react";

function PoliticianCard({ name, image, position, biography }) {
  console.log("Card");
  return (
    <>
      <div className="card">
        <img src={image} alt={name} />
        <h2>{name}</h2>
        <p>
          <strong>Posizione:</strong> {position}
        </p>
        <p>{biography}</p>
      </div>
    </>
  );
}

const MemoPoliticianCard = memo(PoliticianCard);

export default function App() {
  const [politicians, setPoliticians] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedPosition, setSelectPosition] = useState("");

  useEffect(() => {
    fetch("http://localhost:3333/politicians")
      .then((res) => res.json())
      .then((data) => setPoliticians(data))
      .catch((err) => console.error(err));
  }, []);

  const positions = useMemo(() => {
    return politicians.reduce((acc, p) => {
      if (!acc.includes(p.position)) {
        return [...acc, p.position];
      }
      return acc;
    }, []);
  }, [politicians]);

  const filteredPoliticians = useMemo(() => {
    return politicians.filter((politician) => {
      const isInName = politician.name
        .toLowerCase()
        .includes(search.toLowerCase());
      const isInBio = politician.biography
        .toLowerCase()
        .includes(search.toLowerCase());
      const isValidPosition =
        selectedPosition === "" || selectedPosition === politician.position;
      return (isInName || isInBio) && isValidPosition;
    });
  }, [politicians, search, selectedPosition]);

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
      <select
        value={selectedPosition}
        onChange={(e) => setSelectPosition(e.target.value)}
      >
        <option value="">Seleziona posizione</option>
        {positions.map((position, index) => (
          <option key={index} value={position}>
            {position}
          </option>
        ))}
      </select>
      <div className="container">
        {filteredPoliticians.map((politician) => (
          <MemoPoliticianCard key={politician.id} {...politician} />
        ))}
      </div>
    </>
  );
}
