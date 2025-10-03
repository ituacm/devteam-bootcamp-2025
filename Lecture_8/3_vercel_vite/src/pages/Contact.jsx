import { useState } from "react";
import axios from "axios";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const backendUrl =
        import.meta.env.VITE_API_URL || "https://your-backend.vercel.app";
      const response = await axios.post(`${backendUrl}/api/contact`, formData);

      setStatus({
        type: "success",
        message: "Message sent successfully!",
        details: response.data,
      });

      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setStatus({
        type: "error",
        message: "Failed to send message",
        details: error.response?.data || error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      <h1>📧 Contact Us</h1>

      <div className="contact-container">
        <div className="contact-info">
          <h3>Get in Touch</h3>
          <p>
            Have questions about the ITU ACM DevTeam Bootcamp? We'd love to hear
            from you!
          </p>

          <div className="contact-details">
            <div className="contact-item">
              <strong>📍 Address:</strong>
              <p>
                Istanbul Technical University
                <br />
                Maslak, Istanbul, Turkey
              </p>
            </div>

            <div className="contact-item">
              <strong>📧 Email:</strong>
              <p>devteam@ituacm.com</p>
            </div>

            <div className="contact-item">
              <strong>🌐 Website:</strong>
              <p>https://ituacm.com</p>
            </div>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message *</label>
            <textarea
              id="message"
              name="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Sending..." : "Send Message"}
          </button>

          {status && (
            <div className={`status-message ${status.type}`}>
              <p>{status.message}</p>
              {status.details && (
                <details>
                  <summary>Details</summary>
                  <pre>{JSON.stringify(status.details, null, 2)}</pre>
                </details>
              )}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Contact;
