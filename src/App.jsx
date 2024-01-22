import { NavLink, Navigate, Route, Routes } from "react-router-dom";
import "./App.scss";
import Albums from "./components/Albums";

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
        <Route path="/albums/:id" element />
        <Route path="/musicians" element />
        <Route path="/musicians/:id" element />
        <Route path="/add" element />
      </Routes>
    </>
  );
}

export default App;
