import React, { Component } from "react";
import "./Joke.css";

/** A single joke, along with vote up/down buttons. */


// This is a functional component that renders a single joke with vote up/down buttons.
// It takes in four props: id, vote, votes, and text.
// id is a unique identifier for the joke.
// vote is a function that is used to update the votes for a joke.
// votes is a number that represents the number of votes a joke has received.
// text is the actual joke.

const Joke = ({ id, vote, votes, text }) => {
  // This function is called when the "thumbs up" button is clicked.
  // It calls the vote function with the id of the joke and 1 as the vote change.
  const handleThumbsUp = () => {
    vote(id, +1);
  };

  // This function is called when the "thumbs down" button is clicked.
  // It calls the vote function with the id of the joke and -1 as the vote change.
  const handleThumbsDown = () => {
    vote(id, -1);
  };

  // This is the JSX that gets rendered.
  // It renders a div with the class "Joke".
  // Inside the div are two buttons and a div that displays the number of votes.
  // The two buttons are labeled "thumbs up" and "thumbs down".
  // When either button is clicked, the corresponding function is called.
  return (
    <div className="Joke">
      <div className="Joke-votearea">
        <button onClick={handleThumbsUp}>
          <i className="fas fa-thumbs-up" />
        </button>

        <button onClick={handleThumbsDown}>
          <i className="fas fa-thumbs-down" />
        </button>

        {/* This div displays the number of votes. */}
        {votes}
      </div>

      {/* This div displays the text of the joke. */}
      <div className="Joke-text">{text}</div>
    </div>
  );
};

export default Joke;
