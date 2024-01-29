import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const apiUrl = import.meta.env.VITE_API_URL;

export default function () {
  const [album, setAlbum] = useState({});
  const [musician, setMusician] = useState({});
  const [songs, setSongs] = useState([]);
  const [error, setError] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`${apiUrl}/albums/${id}`)
      .then((res) => {
        setAlbum(res.data);
        setMusician(res.data.musician);
        setSongs(res.data.songs);
        console.log(res.data);
      })
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
      {!error && album && (
        <div>
          <h2>
            {musician.art_name} - {album.title}
          </h2>
          <div className="single-page">
            <figure className="single-img">
              <img src={album.poster} alt={album.title} />
            </figure>
            <div>
              <ul>
                <li>
                  <strong>Year: </strong> {album.year}
                </li>
                <li>
                  <strong>Duration: </strong>
                  {(album.duration_seconds / 60).toFixed(2).replace(".", ":")}
                </li>
                <li>
                  <strong>Songs: </strong>
                  <ul className="nested-list">
                     {songs.map((s, i) => {
                      return <li key={`${s}-${i}`}>{s}</li>;
                    })}
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
