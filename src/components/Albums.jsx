import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const apiUrl = import.meta.env.VITE_API_URL;

export default function () {
  const [albums, setAlbums] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .get(`${apiUrl}/albums`)
      .then((res) => setAlbums(res.data))
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
            {albums.map((a) => {
              return (
                <div key={a._id} className="card">
                  <Link to={`/albums/${a._id}`}>
                    <div className="top-card">
                      <h3>
                        {a.title} ({a.year})
                      </h3>
                      <p className="subtitle">{a.musician.art_name}</p>
                    </div>
                    <figure>
                      <img src={a.poster} alt={a.title} />
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
