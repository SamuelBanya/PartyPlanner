import React, { useState, useContext, createContext } from "react";
import { HelloContext } from "./context/HelloContext";

// Links for 'useContext':
// React Beta Docs page for 'useContext' that barely shows any decent example on this hook:
// https://beta.reactjs.org/reference/react/createContext
// Okay example but still didn't help me personally:
// https://www.w3schools.com/react/react_usecontext.asp
// Okay example but a bit scattered:
// https://www.geeksforgeeks.org/reactjs-usecontext-hook/
// Decent example:
// https://www.pragimtech.com/blog/reactjs/usecontext-hook-in-react/

function About({ user }) {
  const value = useContext(HelloContext);
  return (
    <div>
      <h2>About Page</h2>
      <h3>{value}, {user.username}!</h3>
      <p>
        This app is a Full Stack web application made with React, Ruby On Rails, and PostgresSQL that allows a user to plan a party with their friends!
      </p>
      <h2>Current Functionality</h2>
      <ul>
        <li>
          Login page where a user can create an account, and login to the site
        </li>
        <br />
        <li>
          The ability to create a party with a start and end time
        </li>
        <br />
        <li>
          The ability to add new items to an existing party as well as edit or delete the items
        </li>
        <br />
        <li>
          The ability to create, edit, and delete a item
        </li>
        <br />
        <li>
          The ability to display a summary page to view all user parties
        </li>
        <br />
        <li>
          The ability to utilize the Google Maps API to produce a map with pins for the 'Summary' component page
        </li>
        <br />
        <li>
          The ability to utilize the Google Maps API to autocomplete a given address for the 'Location' component page's 'Autocomplete' MaterialUI field
        </li>
        <br />
        <li>
          The ability to use a date timestamp picker from MaterialUI to select a date timestamp for a given party
        </li>
        <br />
      </ul>
    </div>
  )
}

export default About;
