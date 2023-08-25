import React, { useState, useEffect } from "react";

export default function Authenticate({token}) {
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null); // State for user data

  const handleClick = async () => {
    try {
      const response = await fetch(
        "https://fsa-jwt-practice.herokuapp.com/authenticate",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await response.json(); // Parse the response

      if (result.success) {
        setSuccessMessage(result.message);
        setUserData(result.data); // Set the user data
        setError(null); // Clear error
      } else {
        setSuccessMessage(null);
        setError(result.message); // Set error message
        setUserData(null); // Clear user data
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred while authenticating."); // Set error message
      setSuccessMessage(null); // Clear success message
      setUserData(null); // Clear user data
    }
  };

  return (
    <div>
      <h2>Authenticate</h2>
      {successMessage && <p>{successMessage}</p>}
      {error && <p>{error}</p>}
      {userData && <p>Logged in as: {userData.username}</p>}
      <button onClick={handleClick}>Authenticate Token!</button>
    </div>
  );
}
