import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";
import type { Show } from './types';

function App() {
  const [shows, setShows] = useState<Show[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    axios.get<Show[]>('https://api.tvmaze.com/shows')
      .then(response => {
        setShows(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch shows');
        setLoading(false);
        console.error(err);
      });
  }, []);




  return (
    <>
    
    </>
  );
}

export default App;
