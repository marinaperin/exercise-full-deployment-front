import { NavLink, Navigate, Route, Routes } from "react-router-dom";
import "./App.scss";
import Albums from "./components/Albums";
import Musicians from "./components/Musicians";
import SingleAlbum from "./components/SingleAlbum";
import SingleMusician from "./components/SingleMusician";
import AddPage from "./components/AddPage";

function App() {
  return (
    <>
      <nav>
        <menu>
          <li>
            <NavLink to="/albums">Albums</NavLink>
          </li>
          <li>
            <NavLink to="/musicians">Musicians</NavLink>
          </li>
          <li>
            <NavLink to="/add">Add</NavLink>
          </li>
        </menu>
      </nav>
      <h1>Music Library</h1>
      <Routes>
        <Route path="/" element={<Navigate to="/albums" />} />
        <Route path="/albums" element={<Albums />} />
        <Route path="/albums/:id" element={<SingleAlbum />} />
        <Route path="/musicians" element={<Musicians />} />
        <Route path="/musicians/:id" element={<SingleMusician />} />
        <Route path="/add" element={<AddPage />} />
      </Routes>
    </>
  );
}

export default App;
