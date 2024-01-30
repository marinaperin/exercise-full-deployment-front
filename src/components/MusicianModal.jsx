import { useEffect, useState } from "react";
import Modal from "./Modal";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

export default function ({ isOpen, setIsOpen, id, data }) {
  const [inputVal, setInputVal] = useState({
    first_name: data.first_name,
    last_name: data.last_name,
    art_name: data.art_name,
    poster: data.poster,
    agency: data.agency,
    band: data.band,
    country: data.country,
    debut_year: data.debut_year,
    members_number: data.members_number,
  });
  const [error, setError] = useState();


  return (
    <Modal isOpen={isOpen} setIsOpen={(v) => setIsOpen(v)} title="Edit Album">
      <div className="dialog-form">
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
      <div className="dialog-buttons">
        <button
          onClick={() => {
            axios
              .patch(`${apiUrl}/musicians/${id}`, inputVal)
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
