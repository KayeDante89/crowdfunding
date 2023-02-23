import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProjectForm.css";

function ProjectForm() {
  const [projectPost, setProjectPost] = useState([]);

  const [credentials, setCredentials] = useState({
    username: "",
  });

  const navigate = useNavigate();

  const postData = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}projects/`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    return response.json();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (credentials.username) {
      const { token } = await postData();
      navigate("/project");
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
        />
      </div>
      <div>
        <label htmlFor="goal">Goal</label>
        <input type="number" id="goal" />
      </div>
      <div>
        <label htmlFor="image">Image</label>
        <input type="url" id="image" />
      </div>
      <div>
        <label htmlFor="is_open">Is Open:</label>
        <input type="checkbox" id="is_open" />
      </div>
      <div>
        <label htmlFor="date_created">Date Created:</label>
        <input type="date" id="date_created" />
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
