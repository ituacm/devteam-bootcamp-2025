import { useState, useEffect } from "react";
import axios from "axios";
import "./Students.css";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    department: "",
    year: "",
  });

  useEffect(() => {
    fetchStudents();
  }, [filters]);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      setError(null);

      const backendUrl =
        import.meta.env.VITE_API_URL || "https://your-backend.vercel.app";
      const params = new URLSearchParams();

      if (filters.department) params.append("department", filters.department);
      if (filters.year) params.append("year", filters.year);

      const response = await axios.get(`${backendUrl}/api/students?${params}`);
      setStudents(response.data.students);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({ department: "", year: "" });
  };

  if (loading) return <div className="loading">Loading students...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="students-page">
      <h1>👨‍🎓 Students</h1>

      <div className="filters">
        <div className="filter-group">
          <label>Department:</label>
          <select
            value={filters.department}
            onChange={(e) => handleFilterChange("department", e.target.value)}
          >
            <option value="">All Departments</option>
            <option value="Computer Engineering">Computer Engineering</option>
            <option value="Software Engineering">Software Engineering</option>
            <option value="Data Science">Data Science</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Year:</label>
          <select
            value={filters.year}
            onChange={(e) => handleFilterChange("year", e.target.value)}
          >
            <option value="">All Years</option>
            <option value="1">1st Year</option>
            <option value="2">2nd Year</option>
            <option value="3">3rd Year</option>
            <option value="4">4th Year</option>
          </select>
        </div>

        <button onClick={clearFilters} className="clear-filters">
          Clear Filters
        </button>
      </div>

      <div className="students-grid">
        {students.length === 0 ? (
          <p>No students found matching the criteria.</p>
        ) : (
          students.map((student) => (
            <div key={student.id} className="student-card">
              <h3>{student.name}</h3>
              <p>
                <strong>Department:</strong> {student.department}
              </p>
              <p>
                <strong>Year:</strong> {student.year}
              </p>
            </div>
          ))
        )}
      </div>

      <div className="students-summary">
        <p>Showing {students.length} students</p>
      </div>
    </div>
  );
};

export default Students;
