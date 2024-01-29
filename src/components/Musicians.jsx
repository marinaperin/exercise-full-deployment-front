import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const apiUrl = import.meta.env.VITE_API_URL;

export default function () {
  const [musicians, setMusicians] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .get(`${apiUrl}/musicians`)
      .then((res) => setMusicians(res.data))
      .catch((err) => {
        console.error(err);
        setError(true);
      });
  }, []);

  return (
    <>
      {error && (
        <div className="error">
          There was an error, try again in a few minutes.
        </div>
      )}
      <main>
        {!error && (
          <>
            {musicians.map((m) => {
              return (
                <div key={m._id} className="card">
                  <Link to={`/musicians/${m._id}`}>
                    <h3 className="top-card-musician">{m.art_name}</h3>
                    <figure>
                      <img src={m.poster} alt={m.art_name} />
                    </figure>
                  </Link>
                </div>
              );
            })}
          </>
        )}
      </main>
    </>
  );
}
