import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import MusicianModal from "./MusicianModal";
import Modal from "./Modal";
const apiUrl = import.meta.env.VITE_API_URL;

export default function () {
  const [musician, setMusician] = useState({});
  const [albums, setAlbums] = useState([]);
  const [error, setError] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${apiUrl}/musicians/${id}`)
      .then((res) => {
        setMusician(res.data);
        setAlbums(res.data.albums);
      })
      .catch((err) => {
        console.error(err);
        setError(true);
      });
  }, [musician]);

  return (
    <>
      {error && (
        <div className="error">
          There was an error, try again in a few minutes.
        </div>
      )}
      {!error && musician && (
        <div>
          <section className="top-page">
            <h2>{musician.art_name}</h2>
            <div>
              <button
                onClick={() => {
                  setModalOpen(true);
                }}
              >
                Edit
              </button>
              <button
                onClick={() => {
                  setDeleteModalOpen(true);
                }}
              >
                Delete
              </button>
            </div>
          </section>
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
                    return (
                      <li key={a._id}>
                        <Link to={`/albums/${a._id}`} className="link">
                          {a.title}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </li>
            </ul>
          </div>
        </div>
      )}
      {modalOpen && (
        <MusicianModal
          isOpen={modalOpen}
          setIsOpen={(v) => {
            setModalOpen(v);
          }}
          id={id}
          data={musician}
        ></MusicianModal>
      )}
      {deleteModalOpen && (
        <Modal
          isOpen={deleteModalOpen}
          setIsOpen={(v) => setDeleteModalOpen(v)}
          id={id}
          title={"Are you sure?"}
        >
          <div className="delete-msg">
            <div>By confirming, you will permanently delete this musician.</div>
            <div>
              <button
                onClick={() => {
                  setDeleteModalOpen(false);
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  axios
                    .delete(`${apiUrl}/musicians/${id}`)
                    .then((res) => {
                      console.log(res);
                      setDeleteModalOpen(false);
                      navigate(`/musicians`);
                    })
                    .catch((err) => {
                      console.error(err);
                    });
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
