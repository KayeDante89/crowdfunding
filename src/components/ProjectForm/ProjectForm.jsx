import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProjectForm.css";

function ProjectForm() {
  const [project, setProject] = useState({
    title: "",
    description: "",
    goal: null,
    image: "",
    is_open: false,
    date_created: null,
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { id, value } = event.target;
    setProject((prevProject) => ({
      ...prevProject,
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
          `${import.meta.env.VITE_API_URL}projects/`,
          {
            method: "post",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${authToken}`,
            },
            body: JSON.stringify({
              ...project,
            }),
          }
        );
        if (!response.ok) {
          throw new Error(await response.text());
        }
        // location.reload();
        navigate(`/`);
      } catch (err) {
        console.error(err);
        alert(`Error: ${err.message}`);
      }
    } else {
      //REDIRECT TO LOGIN PAGE
      navigate(`/project`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h1>Start a project!</h1>
        {/* <label htmlFor="title">Title</label> */}
        <input
          placeholder="Title"
          type="text"
          id="title"
          onChange={handleChange}
        />
      </div>
      <div>
        {/* <label htmlFor="description">Description</label> */}
        <input
          type="text"
          id="description"
          placeholder="Tell us about what you need help with."
          onChange={handleChange}
        />
      </div>
      <div>
        {/* <label htmlFor="goal">Goal</label> */}
        <input
          placeholder="Enter your targeted amount here"
          type="number"
          id="goal"
          onChange={handleChange}
        />
      </div>
      <div>
        {/* <label htmlFor="image">Image</label> */}
        <input
          placeholder="image url"
          type="url"
          id="image"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="is_open">Is Open:</label>
        <input type="checkbox" id="is_open" onChange={handleChange} />
      </div>
      <div>
        {/* <label htmlFor="date_created">Date Created:</label> */}
        <input type="date" id="date_created" onChange={handleChange} />
      </div>
      <div>
        <button className="project-button" type="submit">
          Post
        </button>
      </div>
    </form>
  );
}

export default ProjectForm;
