import React, { useState } from "react";



export default function SignUpForm({setToken}) {

const [username,setUsername] = useState("");
const [password,setPassword] = useState("");
const [error,setError] = useState(null);

async function handleSubmit(event) {
    event.preventDefault();
    console.log("Hello 👋");
    try {
        const response = await fetch("https://fsa-jwt-practice.herokuapp.com/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        });
  
        const result = await response.json();
        console.log(result);
  
        if (result.token) {
          setToken(result.token);
        }
      } catch (error) {
        setError(error.message);
      }
  }


    return (
    <div>
    <h2>Sign Up!</h2>;
    {error && <p>{error}</p>}
    <form onSubmit={handleSubmit}>
        <label>
           Username:{""} <input value={username} onChange={(e) => setUsername(e.target.value)}
  />
        </label>
        <label>
           Password: <input type ="password" onChange = {(e)=> setPassword(e.target.value)} value={password}/>
        </label>
        <label>
            <button>Submit</button>
        </label>
    </form>
    </div>
    )
  }