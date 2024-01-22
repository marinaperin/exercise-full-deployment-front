import axios from "axios";
import { useEffect, useState } from "react";
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
      <main>
        {error && <div>There was an error, try again in a few minutes.</div>}
        {!error && (
          <>
            {albums.map((a) => {
              return (
                <div key={a._id}>
                  <h3>
                    {a.title} ({a.year})
                  </h3>
                  <figure>
                    <img src={a.poster} alt={a.title} />
                  </figure>
                </div>
              );
            })}
          </>
        )}
      </main>
    </>
  );
}
