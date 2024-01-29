import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const apiUrl = import.meta.env.VITE_API_URL;

export default function () {
  const [musician, setMusician] = useState({});
  const [albums, setAlbums] = useState([]);
  const [error, setError] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`${apiUrl}/musicians/${id}`)
      .then((res) => {
        setMusician(res.data);
        setAlbums(res.data.albums);
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
      {!error && musician && (
        <div>
          <h2>{musician.art_name}</h2>
          <div className="single-page">
            <figure className="single-img">
              <img src={musician.poster} alt={musician.art_name} />
            </figure>
            <ul>
              <li>
                <strong>Agency: </strong>
                {musician.agency}
              </li>
              <li>
                <strong>Country: </strong>
                {musician.country}
              </li>
              <li>
                <strong>Debut Year: </strong>
                {musician.debut_year}
              </li>
              {musician.band === "yes" && (
                <li>
                  <strong>Number of Members: </strong>
                  {musician.members_number}
                </li>
              )}
              <li>
                <strong>Albums: </strong>
                <ul className="nested-list">
                  {albums.map((a) => {
                    return <li key={a._id}>{a.title}</li>;
                  })}
                </ul>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
