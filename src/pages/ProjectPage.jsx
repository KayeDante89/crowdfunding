import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Pages.css";
// Dummy data
import { oneProject } from "../data";

function ProjectPage() {
  const [projectData, setProjectData] = useState({ pledges: [] });

  const { id } = useParams();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}projects/${id}`)
      .then((results) => {
        return results.json();
      })
      .then((data) => {
        setProjectData(data);
      });
  }, []);

  return (
    <div>
      <container className="container">
        <h2>{projectData.title}</h2>
        <p>Created at: {projectData.date_created}</p>
        <div className="project-img">
          <img src={projectData.image} />
        </div>
        <p>{projectData.description}</p>
        <h3>{`Status: ${projectData.is_open}`}</h3>
        <h3>Pledges:</h3>
        <ul>
          {projectData.pledges.map((pledgeData, key) => {
            return (
              <li key={key}>
                {pledgeData.amount} from {pledgeData.supporter}
              </li>
            );
          })}
        </ul>
      </container>
    </div>
  );
}

export default ProjectPage;

// async file. asynchronous function
