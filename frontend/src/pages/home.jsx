import MovieCard from "../components/moviecard"
import { useState,useEffect } from "react";
import "../css/Home.css";
import { searchMovies, getPopularMovies } from "../services/api";
function Home() {
    const[searchQuery, setSearchQuery]= useState("");
const [movies,setMovies] = useState([]);
const [error, setError] = useState(null);
const [loading, setLoading] = useState(true);
useEffect(()=>{
    const loadPopularMovies = async () => {
        try{
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
        } catch(err){
            setError("Failed to load popular movies.....");
            console.log(err);
        }
        finally{
            setLoading(false);
        }
        
    
    }
    loadPopularMovies();
},[]);

const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return; // nothing to search
    if (loading) return; // prevent multiple searches

    setLoading(true);
    setError(null);
    
    try {
      const results = await searchMovies(searchQuery);
      setMovies(results || []);
    } catch (err) {
      console.error(err);
      setError("Search failed. Please try again.");
    } finally {
      setLoading(false);
    }
    // optionally clear query: setSearchQuery("");
};



    return(
        
        
        <div className="home">
            <form onSubmit={handleSearchSubmit} className="search-form">
            <input 
                type="text" 
                placeholder="Search for a movie..." 
                className="search-input" 
                value={searchQuery} 
                onChange={(e) => setSearchQuery(e.target.value)} />
            <button type="submit" className="search-button">Search</button>
            </form>
            {error && <div className="error-message">{error}</div>}
            {loading ?( <div className="loading">Loading...</div> ): 
            ( <div className="movies-grid">
            {movies.map(movie => (
                <MovieCard movie={movie} key={movie.id}/>))}
        </div>)} 
          
       
    </div>

)
}
export default Home;