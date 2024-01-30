import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AlbumModal from "./AlbumModal";
import Modal from "./Modal";
const apiUrl = import.meta.env.VITE_API_URL;

export default function () {
  const [album, setAlbum] = useState({});
  const [musician, setMusician] = useState({});
  const [songs, setSongs] = useState([]);
  const [error, setError] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const { id } = useParams();
  const musicianId = musician._id;
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${apiUrl}/albums/${id}`)
      .then((res) => {
        setAlbum(res.data);
        setMusician(res.data.musician);
        setSongs(res.data.songs);
      })
      .catch((err) => {
        console.error(err);
        setError(true);
      });
  }, [album]);

  return (
    <>
      {error && (
        <div className="error">
          There was an error, try again in a few minutes.
        </div>
      )}
      {!error && album && (
        <div>
          <section className="top-page">
            <h2>
              <Link to={`/musicians/${musicianId}`} className="link">
                {musician.art_name}
              </Link>
              - {album.title}
            </h2>
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
      {modalOpen && (
        <AlbumModal
          isOpen={modalOpen}
          setIsOpen={(v) => {
            setModalOpen(v);
          }}
          id={id}
          data={album}
        ></AlbumModal>
      )}
      {deleteModalOpen && (
        <Modal
          isOpen={deleteModalOpen}
          setIsOpen={(v) => setDeleteModalOpen(v)}
          id={id}
          title={"Are you sure?"}
        >
          <div className="delete-msg">
            <div>By confirming, you will permanently delete this album.</div>
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
                    .delete(`${apiUrl}/albums/${id}`)
                    .then((res) => {
                      console.log(res);
                      setDeleteModalOpen(false);
                      navigate(`/albums`)
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
