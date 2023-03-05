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
    <form className="project-form" onSubmit={handleSubmit}>
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
          maxlength="200"
          onChange={handleChange}
        />
      </div>
      <div>
        {/* <label htmlFor="goal">Goal</label> */}
        <input
          placeholder="Enter your targeted amount here"
          type="number"
          min="1"
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
      <div className="checkbox-field">
        <label htmlFor="is_open">
          Is Open:
          <input
            className="checkbox"
            type="checkbox"
            id="is_open"
            onChange={handleChange}
          />
        </label>
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
