import React, { useState, createContext, useEffect } from "react";
import axios from "axios";

// Context provides a way to pass data through the component tree without having to pass props down manually at every level.

// createContext function returns a Provider and a Consumer component (i.e. CategoryContext.Provider & CategoryContext.Consumer)
export const CategoryContext = createContext(); //creating Context object with empty object

export default ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [categoryLoaded, setCategoryLoaded] = useState(false);
  useEffect(() => {
    // populates categories array. Send HTTP request to server
    const getCategories = async () => {
      const response = await axios.get("/api/categories");
      setCategories(response.data);
    };

    const load = async () => {
      await getCategories();
      setCategoryLoaded(true);
    };

    load();
  }, []);
  // provider passes context to all children compoents, no matter how deep it is
  return (
    <>
      {!categoryLoaded ? (
        <>
          <img className="loading" src={require("../assets/loading.gif")} alt="loading..." />
        </>
      ) : (
        <>
          <CategoryContext.Provider value={{ categories, setCategories, categoryLoaded }}>{children}</CategoryContext.Provider>
        </>
      )}
    </>
  );
};
