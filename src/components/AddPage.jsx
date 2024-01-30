import axios from "axios";
import { useEffect, useState } from "react";
const apiUrl = import.meta.env.VITE_API_URL;

export default function () {
  const [selVal, setSelVal] = useState("Choose");
  const data =
    selVal === "albums"
      ? { title: "", musician: "", year: "", poster: "", duration_seconds: "" }
      : {
          first_name: "",
          last_name: "",
          art_name: "",
          poster: "",
          agency: "",
          band: "",
          country: "",
          debut_year: "",
          members_number: "",
        };
  const [inputVal, setInputVal] = useState({ ...data });
  const [musicians, setMusicians] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    axios
      .get(`${apiUrl}/musicians`)
      .then((res) => {
        setMusicians(res.data);
      })
      .catch((err) => {
        console.error(err);
        setError(true);
      });
  }, []);

  return (
    <div className="form-add">
      {error && (
        <div className="error">
          There was an error, try again in a few minutes.
        </div>
      )}
      {!error && (
        <>
          <select
            value={selVal}
            onChange={(e) => {
              setSelVal(e.target.value);
            }}
          >
            <option value="">Choose</option>
            <option value="albums">Album</option>
            <option value="musicians">Musician</option>
          </select>
          {selVal === "albums" && (
            <div className="main-form">
              <p>Title: </p>
              <input
                type="text"
                value={inputVal.title}
                onChange={(e) => {
                  setInputVal({ ...inputVal, title: e.target.value });
                }}
              />
              <p>Musician: </p>
              <select
                value={inputVal.musician}
                onChange={(e) => {
                  setInputVal({ ...inputVal, musician: e.target.value });
                }}
              >
                <option value="">Choose</option>
                {musicians.map((m) => {
                  return (
                    <option key={m._id} value={m._id}>
                      {m.art_name
                        ? m.art_name
                        : m.first_name + " " + m.last_name}
                    </option>
                  );
                })}
              </select>
              <p>Year: </p>
              <input
                type="text"
                value={inputVal.year}
                onChange={(e) => {
                  setInputVal({ ...inputVal, year: e.target.value });
                }}
              />
              <p>Poster Picture: </p>
              <input
                type="text"
                value={inputVal.poster}
                onChange={(e) => {
                  setInputVal({ ...inputVal, poster: e.target.value });
                }}
              />
              <p>Duration (in seconds): </p>
              <input
                type="text"
                value={inputVal.duration_seconds}
                onChange={(e) => {
                  setInputVal({
                    ...inputVal,
                    duration_seconds: e.target.value,
                  });
                }}
              />
            </div>
          )}
          {selVal === "musicians" && (
            <div className="main-form">
              <p>First Name: </p>
              <input
                type="text"
                value={inputVal.first_name}
                onChange={(e) => {
                  setInputVal({ ...inputVal, first_name: e.target.value });
                }}
              />
              <p>Last Name: </p>
              <input
                type="text"
                value={inputVal.last_name}
                onChange={(e) => {
                  setInputVal({ ...inputVal, last_name: e.target.value });
                }}
              />
              <p>Art Name: </p>
              <input
                type="text"
                value={inputVal.art_name}
                onChange={(e) => {
                  setInputVal({ ...inputVal, art_name: e.target.value });
                }}
              />
              <p>Poster Picture: </p>
              <input
                type="text"
                value={inputVal.poster}
                onChange={(e) => {
                  setInputVal({ ...inputVal, poster: e.target.value });
                }}
              />
              <p>Agency: </p>
              <input
                type="text"
                value={inputVal.agency}
                onChange={(e) => {
                  setInputVal({ ...inputVal, agency: e.target.value });
                }}
              />
              <p>Band: </p>
              <input
                type="text"
                placeholder="Write 'yes' or 'no'"
                value={inputVal.band}
                onChange={(e) => {
                  setInputVal({ ...inputVal, band: e.target.value });
                }}
              />
              <p>Country: </p>
              <input
                type="text"
                value={inputVal.country}
                onChange={(e) => {
                  setInputVal({ ...inputVal, country: e.target.value });
                }}
              />
              <p>Debut Year: </p>
              <input
                type="text"
                value={inputVal.debut_year}
                onChange={(e) => {
                  setInputVal({ ...inputVal, debut_year: e.target.value });
                }}
              />
              {inputVal.band === "yes" && (
                <>
                  <p>Members Number: </p>
                  <input
                    type="text"
                    value={inputVal.members_number}
                    onChange={(e) => {
                      setInputVal({
                        ...inputVal,
                        members_number: e.target.value,
                      });
                    }}
                  />
                </>
              )}
            </div>
          )}
          <div>
            <button
              onClick={() => {
                axios
                  .post(`${apiUrl}/${selVal}`, inputVal)
                  .then((res) => console.log(res.status))
                  .catch((err) => console.error(err));
                {
                  selVal === "albums"
                    ? setInputVal({
                        title: "",
                        musician: "",
                        poster: "",
                        duration_seconds: "",
                        year: "",
                      })
                    : setInputVal({
                        agency: "",
                        art_name: "",
                        band: "",
                        poster: "",
                        first_name: "",
                        last_name: "",
                        country: "",
                        debut_year: "",
                        members_number: "",
                      });
                }
              }}
            >
              Add
            </button>
          </div>
        </>
      )}
    </div>
  );
}
