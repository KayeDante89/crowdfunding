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
          <img className="project-img" src={projectData.image} />
          <div className="project-text">
            <h2>{projectData.title}</h2>
            <p>{new Date(projectData.date_created).toLocaleDateString()}</p>
            <p>{projectData.description}</p>
            <p>{projectData.is_open ? <p>Still open</p> : <p>Closed</p>}</p>
            <ProgressBar goal={projectData.goal} total={projectData.total} />
          </div>
        </div>
      </div>
      <div className="outer-box">
        <div className="pledge-box">
          <div>
            <ul className="pledge-list">
              <h3>Pledges:</h3>
              {projectData.pledges.slice().reverse().map((pledgeData, key) => {
                return (
                  <li className="pledge-blocks" key={key}>
                    <b>
                      {pledgeData.supporter
                        ? pledgeData.supporter
                        : "anonymous"}
                    </b>{" "}
                    | ${pledgeData.amount}
                    <br />"{pledgeData.comment}"
                  </li>
                );
              })}{" "}
            </ul>
          </div>
          <div class="pledge-form">
            <PledgeForm project={projectData} />{" "}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectPage;

// async file. asynchronous function
