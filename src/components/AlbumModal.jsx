import { useEffect, useState } from "react";
import Modal from "./Modal";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

export default function ({ isOpen, setIsOpen, id, data }) {
  const [inputVal, setInputVal] = useState({
    title: data.title,
    musician: data.musician,
    year: data.year,
    poster: data.poster,
    duration_seconds: data.duration_seconds,
  });
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
    <Modal isOpen={isOpen} setIsOpen={(v) => setIsOpen(v)} title="Edit Album">
      <div className="dialog-form">
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
                {m.art_name ? m.art_name : m.first_name + " " + m.last_name}
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
      <div className="dialog-buttons">
        <button
          onClick={() => {
            axios
              .patch(`${apiUrl}/albums/${id}`, inputVal)
              .then((res) => console.log(res))
              .catch((err) => console.error(err));
            setIsOpen(false);
          }}
        >
          Save
        </button>
        <button
          onClick={() => {
            setIsOpen(false);
          }}
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
}
