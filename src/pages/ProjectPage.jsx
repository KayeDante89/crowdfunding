import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
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
          <div className="project-img">
            <img src={projectData.image} />
          </div>
          <div className="project-text">
            <h2>{projectData.title}</h2>
            <p>{new Date(projectData.date_created).toLocaleDateString()}</p>
            <p>{projectData.description}</p>
            <p>{projectData.is_open ? <p>Still open</p> : <p>Closed</p>}</p>
            <ProgressBar goal={projectData.goal} total={projectData.total} />
          </div>
        </div>
      </div>
      <Link className="nav-btn" to="/edit-project">
        Edit
      </Link>
      <div className="inner-box-pledges">
        <div>
          <PledgeForm project={projectData} />{" "}
        </div>
        <div>
          <h3>Pledges:</h3>
          <ul>
            {projectData.pledges.map((pledgeData, key) => {
              return (
                <li key={key}>
                  {pledgeData.amount} : {pledgeData.comment} from{" "}
                  {pledgeData.supporter}
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
