import { useState } from "react";
import { useNavigate, useParams, useOutletContext } from "react-router-dom";

function RegistrationForm() {
  const authToken = window.localStorage.getItem("token");
  const [users, setUsers] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { id } = useParams();

  const handleChange = (event) => {
    const { id, value } = event.target;
    setUsers((prevUsers) => ({
      ...prevUsers,
      [id]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!authToken) {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}users/`, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(users),
        });
        navigate(`/project`);
      } catch (err) {
        console.error(err);
      }
    } else {
      navigate(`/`);
    }
  };

  return (
    <div>
      <form className="project-form" onSubmit={handleSubmit}>
        <div>
          <h2>Sign Up</h2>
          {/* <label htmlFor="username">Username:</label> */}
          <input
            type="text"
            id="username"
            placeholder="Enter username"
            onChange={handleChange}
          />
        </div>
        <div>
          {/* <label htmlFor="email">Email:</label> */}
          <input
            type="email"
            id="email"
            placeholder="Your email here"
            onChange={handleChange}
          />
        </div>
        <div>
          {/* <label htmlFor="password">Password:</label> */}
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            onChange={handleChange}
          />
          <button className="project-button" type="submit">
            Create Account
          </button>
        </div>
      </form>
    </div>
  );
}

export default RegistrationForm;
