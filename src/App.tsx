// import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './Pages/HomePage';
import ShowDetails from './Pages/ShowDetails';
import SearchPage from './Pages/SearchPage';
import FavoritesPage from './Pages/FavoritesPage';
import { ThemeProvider } from './context/ThemeContext';
import { FavoritesProvider } from './context/FavoriteContext';

function App() {
  return (
    <ThemeProvider>
      <FavoritesProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/show/:id" element={<ShowDetails />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
          </Routes>
        </BrowserRouter>
      </FavoritesProvider>
    </ThemeProvider>
  );
}

export default App;