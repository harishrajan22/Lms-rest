import "./App.css";
import { createContext, useEffect, useMemo, useState } from "react";
import { getBooks } from "./services/Service";
import Books from "./components/Books";
import { Routes, Route } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Darwer from "./components/Darwer";
import AddBook from "./components/AddBook";

export const AppContext = createContext();

function App() {
  const [books, setBooks] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    getBooks().then((data) => setBooks(data));
  }, []);

  useEffect(() => {
    getBooks().then((data) => setBooks(data));
  }, [refresh]);

  return (
    <div className="App">
      <AppContext.Provider
        value={useMemo(() => {
          return {
            books,
            setBooks,
            setRefresh,
            refresh,
          };
        })}
      >
        <Darwer>
          <Routes>
            <Route
              path="/viewbooks"
              element={<Books setRefresh={setRefresh} />}
            />
            <Route
              path="/addbook"
              element={<AddBook setRefresh={setRefresh} />}
            />
          </Routes>
        </Darwer>
      </AppContext.Provider>
    </div>
  );
}

export default App;
