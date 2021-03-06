import React, { useState, createContext, useEffect } from "react";
import axios from "axios";

// Context provides a way to pass data through the component tree without having to pass props down manually at every level.

// createContext function returns a Provider and a Consumer component (i.e. CategoryContext.Provider & CategoryContext.Consumer)
export const ProfileContext = createContext(); //creating Context object with empty object

export default ({ children }) => {
  const [profiles, setProfiles] = useState([]);
  const [profLoaded, setProfLoaded] = useState(false); // see if the app is loaded
  useEffect(() => {
    //populates profiles array. Send HTTP request to server
    const getProfiles = async () => {
      const response = await axios.get("/api/users");
      setProfiles(response.data);
    };

    const load = async () => {
      await getProfiles();
      setProfLoaded(true);
    };

    load();
  }, []);

  // provider passes context to all children compoents, no matter how deep it is
  return (
    <>
      {!profLoaded ? (
        <>
          <img className="loading" src={require("../assets/loading.gif")} alt="loading..." />
        </>
      ) : (
        <>
          <ProfileContext.Provider value={{ profiles, setProfiles, profLoaded }}>{children}</ProfileContext.Provider>
        </>
      )}
    </>
  );
};
