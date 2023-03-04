// import { useState, useEffect } from "react";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import ProjectCard from "../components/ProjectCard/ProjectCard";

// import { allProjects } from "../data";

function AllProjectsPage() {
  // State
  const [projectList, setProjectList] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}projects`) // making network request to url
      .then((results) => {
        return results.json();
      })
      .then((data) => {
        setProjectList(data);
      });
  }, []);

  // sorting the created date in order
  function compare(a, b) {
    if (a.date_created < b.date_created) {
      return 1;
    }
    if (a.date_created > b.date_created) {
      return -1;
    }
    return 0;
  }
  // organizes project list in reverse order so it shows the latest project first
  const latestProject = projectList.sort(compare);

  return (
    <div>
      <section className="text-section">
        <h2>It's okay to ask for help..</h2>
        <p>
          Love Ledger is more than just a crowdfunding app - it's a community of
          people who believe in love and want to help couples celebrate their
          special day. With Love Ledger, couples can focus on planning their
          wedding without the stress of financial worries.
        </p>
        <p>Start a crowdfund now!</p>
      </section>
      <h2 className="project-container">Discover Current Projects</h2>
      <div className="project-container">
        <div id="project-list">
          {latestProject.map((project, key) => {
            return <ProjectCard key={key} projectData={project} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default AllProjectsPage;
