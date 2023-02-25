import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import ProjectForm from "../components/ProjectForm/ProjectForm";

function EditProjectPage() {
  const [project, setProject] = useState({
    title: "",
    description: "",
    goal: null,
    image: "",
    is_open: false,
    date_created: null,
  });

  const { id } = useParams();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}projects/${id}`)
      .then((results) => {
        return results.json();
      })
      .then((data) => {
        setProject(data);
      });
  }, []);

  const handleChange = (event) => {
    const { id, value } = event.target;
    setProject((prevProject) => ({
      ...prevProject,
      [id]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const authToken = window.localStorage.getItem("token");

    if (authToken) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}projects/${id}`,
          {
            method: "put",
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
        <label htmlFor="title">Title</label>
        <input
          type="text"
          //   value={data.title}
          id="title"
          onChange={handleChange}
        />
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

export default EditProjectPage;
