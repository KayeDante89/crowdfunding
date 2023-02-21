import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ProjectForm() {
  const [project, setProject] = useState({
    title: "",
    description: "",
    goal: "",
    image: "",
    is_open: "",
    date_created: "",
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
    if (credentials.token) {
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
          placeholder="What do you need help with?"
        />
      </div>
      <button type="submit">Post</button>
    </form>
  );
}

export default ProjectForm;
