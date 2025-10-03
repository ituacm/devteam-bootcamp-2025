import { useState, useEffect } from "react";
import axios from "axios";
import "./Projects.css";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);

      const backendUrl =
        import.meta.env.VITE_API_URL || "https://your-backend.vercel.app";
      const response = await axios.get(`${backendUrl}/api/projects`);
      setProjects(response.data.projects);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "#4CAF50";
      case "in_progress":
        return "#FF9800";
      case "planning":
        return "#2196F3";
      default:
        return "#757575";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "completed":
        return "Completed";
      case "in_progress":
        return "In Progress";
      case "planning":
        return "Planning";
      default:
        return "Unknown";
    }
  };

  if (loading) return <div className="loading">Loading projects...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="projects-page">
      <h1>💼 Projects</h1>

      <div className="projects-grid">
        {projects.map((project) => (
          <div key={project.id} className="project-card">
            <div className="project-header">
              <h3>{project.name}</h3>
              <span
                className="project-status"
                style={{ backgroundColor: getStatusColor(project.status) }}
              >
                {getStatusText(project.status)}
              </span>
            </div>

            <p className="project-description">{project.description}</p>

            <div className="tech-stack">
              <strong>Tech Stack:</strong>
              <div className="tech-tags">
                {project.tech_stack.map((tech, index) => (
                  <span key={index} className="tech-tag">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="projects-summary">
        <p>Total Projects: {projects.length}</p>
      </div>
    </div>
  );
};

export default Projects;
