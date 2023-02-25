import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProjectForm.css";

function ProjectForm() {
  const [projectPost, setProjectPost] = useState({
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
    setProjectPost((prevProject) => ({
      ...prevProject,
      [id]: value,
    }));
  };

  const authToken = window.localStorage.getItem("token");

  const postData = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}projects/`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${authToken}`,
      },
      body: JSON.stringify(projectPost),
    });
    return response.json();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (authToken) {
      const postProject = await postData();
      navigate("/");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <input
          type="text"
          id="description"
          placeholder="Let us what you need.."
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="goal">Goal</label>
        <input type="number" id="goal" onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="image">Image</label>
        <input type="url" id="image" onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="is_open">Is Open:</label>
        <input type="checkbox" id="is_open" onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="date_created">Date Created:</label>
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
