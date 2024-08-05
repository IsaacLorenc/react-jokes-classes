import React, { useState, useEffect } from "react";
import axios from "axios";
import Joke from "./Joke";
import "./JokeList.css";

/** List of jokes. */

const JokeList = props => {
  const [jokes, setJokes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Define an async function to fetch jokes from the icanhazdadjoke API
    const fetchJokes = async () => {
      try {
        // Initialize an empty array to store the jokes
        let jokes = [];
        // Initialize a Set to keep track of the seen jokes, to avoid duplicates
        let seenJokes = new Set();

        // Loop until we have the desired number of jokes
        while (jokes.length < props.numJokesToGet) {
          // Make a GET request to the icanhazdadjoke API
          let res = await axios.get("https://icanhazdadjoke.com", {
            headers: { Accept: "application/json" }
          });
          // Destructure the joke object from the response data
          let { ...joke } = res.data;

          // Check if we have seen this joke before
          if (!seenJokes.has(joke.id)) {
            // If not, add it to the seen jokes Set and the jokes array
            seenJokes.add(joke.id);
            jokes.push({ ...joke, votes: 0 });
          } else {
            // If we have seen it before, log a message
            console.log("duplicate found!");
          }
        }

        // Set the state of the jokes and isLoading variables to update the component
        setJokes(jokes);
        setIsLoading(false);
      } catch (err) {
        // If there's an error, log it to the console
        console.error(err);
      }
    };

    fetchJokes();
  }, []);

  // Define a function to generate new jokes
  // This function is triggered when the user clicks the "Get New Jokes" button
  const generateNewJokes = () => {
    // Set the isLoading state variable to true, to indicate that the component is loading new jokes
    setIsLoading(true);
    // Use the setTimeout function to delay the execution of the fetchJokes function
    // This delay is necessary to ensure that the isLoading state variable is set to true before the component re-renders
    // The delay of 100 milliseconds is arbitrary and can be adjusted as needed
    setTimeout(fetchJokes, 100);
  };

  // Define an async function to fetch jokes from the icanhazdadjoke API
  const fetchJokes = async () => {
    try {
      // Initialize an empty array to store the jokes
      let jokes = [];
      // Initialize a Set to keep track of the seen jokes, to avoid duplicates
      let seenJokes = new Set();

      // Loop until we have the desired number of jokes
      while (jokes.length < props.numJokesToGet) {
        // Make a GET request to the icanhazdadjoke API
        let res = await axios.get("https://icanhazdadjoke.com", {
          headers: { Accept: "application/json" }
        });
        // Destructure the joke object from the response data
        let { ...joke } = res.data;

        // Check if we have seen this joke before
        if (!seenJokes.has(joke.id)) {
          // If not, add it to the seen jokes Set and the jokes array
          seenJokes.add(joke.id);
          jokes.push({ ...joke, votes: 0 });
        } else {
          // If we have seen it before, log a message
          console.log("duplicate found!");
        }
      }

      // Set the state of the jokes and isLoading variables to update the component
      setJokes(jokes);
      // Set the isLoading state variable to false, to indicate that the component has finished loading new jokes
      setIsLoading(false);
    } catch (err) {
      // If there's an error, log it to the console
      console.error(err);
    }
  };

  // Define a function to update the votes of a specific joke
  // This function takes two parameters: id, which is the id of the joke to update,
  // and delta, which is the amount by which to change the votes of the joke.
  const vote = (id, delta) => {
    // Update the state of the jokes variable by mapping over the current jokes array
    // and updating the votes of the joke with the given id by adding the delta.
    // If the id of the joke does not match the given id, the joke is returned unchanged.
    setJokes(jokes =>
      jokes.map(j =>
        j.id === id ? { ...j, votes: j.votes + delta } : j
      )
    );
  };

  const sortedJokes = [...jokes].sort((a, b) => b.votes - a.votes);

  if (isLoading) {
    return (
      <div className="loading">
        <i className="fas fa-4x fa-spinner fa-spin" />
      </div>
    );
  }

  return (
    <div className="JokeList">
      <button
        className="JokeList-getmore"
        onClick={generateNewJokes}
      >
        Get New Jokes
      </button>

      {sortedJokes.map(j => (
        <Joke
          text={j.joke}
          key={j.id}
          id={j.id}
          votes={j.votes}
          vote={vote}
        />
      ))}
    </div>
  );
};

JokeList.defaultProps = {
  numJokesToGet: 5
};

export default JokeList;
