import React, { useContext } from "react";
import { ProfileContext } from "../contexts/ProfileContext";

const Profile = ({ userID }) => {
  const { profiles } = useContext(ProfileContext);
  return (
    <>
      {profiles.map(
        (currentProfile, i) =>
          currentProfile._id === userID && (
            <span key={i}>
              <img src={currentProfile.avatar && require("../assets/avatars/" + currentProfile.avatar + ".png")} alt="Logo" width="20" />
              {currentProfile.username}
            </span>
          )
      )}
    </>
  );
};

export default Profile;
