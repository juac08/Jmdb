import React, { useState, useContext, useEffect } from "react";
import axios from "axios";

export const API_ENDPOINT = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_MOVIE_API_KEY}&s=`;
const AppContext = React.createContext();
const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ show: false, msg: "" });
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("batman");

  const fetchMovies = async () => {
    setLoading(true);
    try {
      const data =(await axios.get(`${API_ENDPOINT}${query}`))
      if(data.data.Response === 'True'){
     setMovies(data.data.Search)
     setError({show:false,msg:''})
      }else{
        setError({show:true,msg:data.data.Error})
      }
      setLoading(false);
    } catch (err) {
      console.log(err)
    }
  };
  useEffect(() => {
    fetchMovies();
  },[query]);
  console.log(movies);
  return (
    <AppContext.Provider
      value={{
        movies,
        setQuery,
        error,
        loading,
        query,
        fetchMovies
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
