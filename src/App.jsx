import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import StarshipList from './components/StarshipList';
import StarshipDetails from './components/StarshipDetails';
import './App.css';

function App() {
  const [starships, setStarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nextPage, setNextPage] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredShips, setFilteredShips] = useState([]);

  const fetchStarships = async (url = 'https://swapi.dev/api/starships/') => {
    try {
      setLoading(true);
      const response = await axios.get(url);
      setStarships(prevShips => [...prevShips, ...response.data.results]);
      setNextPage(response.data.next);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching starships:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStarships();
  }, []);

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredShips(starships);
    } else {
      const filtered = starships.filter(
        ship =>
          ship.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          ship.model.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredShips(filtered);
    }
  }, [searchTerm, starships]);

  const handleSearch = e => {
    setSearchTerm(e.target.value);
  };

  const loadMore = () => {
    if (nextPage) {
    }
  };

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <header className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-gray-900 p-4 shadow-lg sticky top-0 z-10">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <h1 className="text-3xl font-bold font-starjedi tracking-wider">
                <span className="text-gray-900">STAR WARS</span> <span className="text-yellow-100">STARSHIPS</span>
              </h1>
              <div className="mt-2 md:mt-0 w-full md:w-64">
                <input
                  type="text"
                  placeholder="Search starships..."
                  className="w-full p-2 rounded-lg border-0 focus:ring-2 focus:ring-yellow-400 text-gray-900"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
            </div>
          </div>
        </header>
        
        <main className="container mx-auto p-4 min-h-[calc(100vh-80px)]">
          <div className="py-4">
            <Routes>
              <Route
                path="/"
                element={
                  <StarshipList
                    ships={filteredShips}
                    loading={loading}
                    onSearch={handleSearch}
                    searchTerm={searchTerm}
                    loadMore={loadMore}
                    hasMore={!!nextPage}
                  />
                }
              />
              <Route path="/starship/:id" element={<StarshipDetails />} />
            </Routes>
          </div>
        </main>
        
        <footer className="bg-gray-900/80 backdrop-blur-sm py-4 border-t border-gray-800">
          <div className="container mx-auto text-center text-gray-400 text-sm">
            <p>Star Wars Starships App - Data provided by <a href="https://swapi.dev/" className="text-yellow-400 hover:underline" target="_blank" rel="noopener noreferrer">SWAPI</a></p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
