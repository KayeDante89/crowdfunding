import { Link } from "react-router-dom";

import "./ProjectCard.css";

function ProjectCard(props) {
  const { projectData } = props;

  return (
    <div className="project-card">
      <Link className="proj-name-link" to={`/project/${projectData.id}`}>
        <img src={projectData.image} />
        <h2>{projectData.title}</h2>
        <p>{projectData.description}</p>
        <p>
          created: {new Date(projectData.date_created).toLocaleDateString()}
        </p>
      </Link>
    </div>
  );
}

export default ProjectCard;
