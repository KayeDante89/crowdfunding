import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function PledgeForm(props) {
  const { project } = props;

  const [pledges, setPledges] = useState({
    // from JSON Raw Body in Deployed (default values)
    // this is what you return at the bottom - your list might look different to mine. If so, don't worry!
    amount: null,
    comment: "",
    anonymous: false,
    // project: null,
  });

  // enables redirect
  const navigate = useNavigate();

  // accesses project ID so the pledge can be connected to it
  const { id } = useParams();

  // copies the original data, replaces the old data for each id/value pair to what is input in the form (changes state). this will be submitted to API below
  const handleChange = (event) => {
    const { id, value } = event.target;
    setPledges((prevPledges) => ({
      ...prevPledges,
      [id]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // get auth token from local storage
    const authToken = window.localStorage.getItem("token");
    // if the auth token exists (if logged in)
    // TRY to POST the data to your deployed, using fetch.
    // send the token with it to authorise the ability to post
    // wait for the response -
    // if successful, return the JSON payload and reload the page with the data
    // if not successful, CATCH the error and display as a pop up alert
    // if not logged in, redirect to login page
    if (authToken) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}pledges/`,
          {
            method: "post",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${authToken}`,
            },
            body: JSON.stringify(
              // {project:props.project.id, amount:pledges.amount, comment:pledges.comment, anonymous:pledges.anonymous}
              // removed props from the above as we amended the line above.
              // {project:project.id, amount:pledges.amount, comment:pledges.comment, anonymous:pledges.anonymous}
              { project: project.id, ...pledges }
            ),
          }
        );
        if (!response.ok) {
          throw new Error(await response.text());
        }
        location.reload();
      } catch (err) {
        console.error(err);
        alert(`Error: ${err.message}`);
      }
    } else {
      //REDIRECT TO LOGIN PAGE
      navigate(`/login`);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h3>Make a Donation:</h3>
        <div>
          {/* <label htmlFor="amount">Amount:</label> */}
          <input
            type="number"
            id="amount"
            placeholder="How much are you donating?"
            onChange={handleChange}
          />
        </div>
        <div>
          {/* <label htmlFor="comment">Comment:</label> */}
          <input
            type="text"
            id="comment"
            placeholder="Leave a message!"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="anonymous">Anonymous:</label>
          <input type="checkbox" id="anonymous" onChange={handleChange} />
        </div>
        {/* <div>
          <label htmlFor="project">Project:</label>
          <input
            type="text"
            id="project"
            placeholder="needs to be auto-filled with current project"
            onChange={handleChange}
          />
        </div> */}
        <div>
          <button className="project-button" type="submit">
            Pledge
          </button>
        </div>
      </form>
    </div>
  );
}

export default PledgeForm;
