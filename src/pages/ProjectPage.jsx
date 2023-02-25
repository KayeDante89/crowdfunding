import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Pages.css";
// Dummy data
import { oneProject } from "../data";
import PledgeForm from "../components/PledgeForm/PledgeForm";
import ProgressBar from "../components/ProgressBar/ProgressBar";

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
      <div className="outer-box">
        <div className="inner-box">
          <div>
            <h2>{projectData.title}</h2>
            <p>Created at: {projectData.date_created}</p>
            <p>{projectData.description}</p>
            <h3>{`Status: ${projectData.is_open}`}</h3>
          </div>
          <div className="project-img">
            <img src={projectData.image} />
          </div>
        </div>
      </div>
      <ProgressBar goal={projectData.goal} total={projectData.total} />
      <div className="inner-box-pledges">
        <div>
          <PledgeForm />{" "}
        </div>
        <div>
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
        </div>
      </div>
    </div>
  );
}

export default ProjectPage;

// async file. asynchronous function
