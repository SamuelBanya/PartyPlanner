import React from "react";

function About({ user }) {
    return (
        <div>
            <h2>About Page</h2>
            <p>
                This app is a Full Stack web application made with React, Ruby On Rails, and PostgresSQL that allows a user to plan a party with their friends!
            </p>
            <h2>Current Functions</h2>
            <ul>
                <li>
                    Login page where a user can create an account, and login to the site
                </li>
                <li>
                    The ability to create a party with a start and end time
                </li>
                <li>
                    The ability to add new items to an existing party as well as edit or delete the items
                </li>
                <li>
                    The ability to create, edit, and delete a item
                </li>
                <li>
                    The ability to display a summary page to view all users' parties
                </li>
            </ul>
            <h2>Roadmap Items</h2>
            <ul>
                <li>
                    Timestamp selection to easily pick timestamp for each party   
                </li>
                <li>
                    Ability to utilize a map library from NPM for the 'Summary' page
                </li>
                <li>
                    Use of MaterialUI throughout the project itself 
                </li>
            </ul>
        </div>
    )
}

export default About;