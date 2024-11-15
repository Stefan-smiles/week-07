import { useEffect, useState } from "react";

export default function PostedJokes() {
  const [jokes, setJokes] = useState([]);

  useEffect(() => {
    async function getJokes() {
      const response = await fetch("http://localhost:8080/jokes");
      const data = await response.json();
      setJokes(data);
      console.log(data);
    }
    getJokes();
  }, [setJokes]);

  return (
    <div>
      <h1>Joke Emporium</h1>
      <div className="jokes-container">
        {" "}
        {jokes.map((joke) => {
          return (
            <div key={joke.id}>
              <h3>{joke.username}</h3>
              <p>{joke.setup}</p>
              <button>s/h</button>
              <p>{joke.punchline}</p>
            </div>
          );
        })}{" "}
      </div>
    </div>
  );
}
