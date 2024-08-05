## react-jokes-classes

This is a simple React application that lets users view and vote on cheesy jokes. It fetches jokes from the [ICanHazDadJoke API](https://icanhazdadjoke.com/api).

## Features

- Fetches and displays 5 random jokes from the ICanHazDadJoke API.
- Ensures no duplicate jokes are displayed.
- Displays a loading spinner while jokes are being fetched.
- Allows users to vote up or down on each joke.
- Displays the net score (upvotes minus downvotes) for each joke.

## Technologies Used

- React: A JavaScript library for building user interfaces.
- Axios: A promise-based HTTP client for the browser and Node.js, used to make API requests.
- ICanHazDadJoke API: A free API for getting random dad jokes in JSON format.

### Initialization

```
npm install && npm start
```