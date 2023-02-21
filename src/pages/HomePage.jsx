// import { useState, useEffect } from "react";

import { useState, useEffect } from "react";
import "./Pages.css";

import ProjectCard from "../components/ProjectCard/ProjectCard";

// import { allProjects } from "../data";

function HomePage() {
  // State
  const [projectList, setProjectList] = useState([]); // first variable is the object itself. second is the state to edit the object

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}projects`) // making network request to url
      .then((results) => {
        return results.json();
      })
      .then((data) => {
        setProjectList(data);
      });
  }, []);

  function compare(a, b) {
    if (a.date_created < b.date_created) {
      return 1;
    }
    if (a.date_created > b.date_created) {
      return -1;
    }
    return 0;
  }

  const latestProject = projectList.sort(compare).slice(0, 3);
  // console.log(latestProject);

  return (
    <div>
      <p>Crowdfund your wedding!</p>
      <h3>Latest Projects</h3>
      <div id="project-list">
        {latestProject.map((project, key) => {
          return <ProjectCard key={key} projectData={project} />;
        })}
      </div>
    </div>
  );
}

export default HomePage;

// sort by created date
