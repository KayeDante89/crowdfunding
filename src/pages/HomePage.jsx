// import { useState, useEffect } from "react";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import ProjectCard from "../components/ProjectCard/ProjectCard";

// import { allProjects } from "../data";

function HomePage() {
  const authToken = window.localStorage.getItem("token");
  // State
  const [projectList, setProjectList] = useState([]);
  // const [user, setUser] = useState([]);

  // const { id } = useParams();

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
      <section className="text-section">
        {/* <h2>Welcome {user.username}</h2> */}
        <h2>Crowdfund your Wedding!</h2>
      </section>
      <h2 className="project-container">Latest Projects</h2>
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

export default HomePage;

// sort by created date
