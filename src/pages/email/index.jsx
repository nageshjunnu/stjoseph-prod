import React, { useState } from 'react';
import axios from 'axios';

const SendBulkMessageForm = () => {
  const [subject, setSubject] = useState(""); // Subject input state
  const [message, setMessage] = useState(""); // Message input state
  const [loading, setLoading] = useState(false); // To handle loading state
  const [responseMessage, setResponseMessage] = useState(""); // To display success/error messages
  const [errorMessage, setErrorMessage] = useState(""); // To store error messages if any

  // Handle subject input change
  const handleSubjectChange = (e) => {
    setSubject(e.target.value);
  };

  // Handle message input change
  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    setLoading(true); // Start loading
    setErrorMessage(""); // Reset any previous error message
    setResponseMessage(""); // Reset any previous success message

    // Check if subject and message are not empty
    if (!subject || !message) {
      setErrorMessage("Please fill out both the subject and message.");
      setLoading(false);
      return;
    }

    // Prepare the data for the request
    const data = JSON.stringify({
      subject: subject,
      message: message,
    });

    // API request configuration
    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://kyroes.in/st-josephs/api/sendBulkMessage/',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    try {
      const response = await axios.request(config);

      if (response.data.success) {
        setResponseMessage(response.data.message); // Display success message
        // Clear form fields after successful submission
        setSubject("");  // Clear the subject field
        setMessage("");  // Clear the message field
      } else {
        setErrorMessage(response.data.message || "An error occurred while sending emails.");
      }
    } catch (error) {
      setErrorMessage("Failed to send emails. Please try again later.");
      console.error(error); // Log the error for debugging purposes
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="content-wrapper">
      <div className="container-full">
        <div className="content-header">
          <div className="d-flex align-items-center">
            <div className="me-auto">
              <h3 className="page-title">Send Bulk Message</h3>
              <div className="d-inline-block align-items-center">
                <nav>
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="#">
                        <i className="mdi mdi-home-outline"></i>
                      </a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Send Bulk Message
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
        <section className="content" style={{align:"center"}}>
          <div className="table-container">
            <form onSubmit={handleSubmit} style={{padding:"100px;"}}>
              <div className="form-group">
                <label htmlFor="subject">Subject:</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={subject}
                  onChange={handleSubjectChange}
                  required
                  placeholder="Enter subject"
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message:</label>
                <textarea
                  id="message"
                  name="message"
                  value={message}
                  onChange={handleMessageChange}
                  required
                  placeholder="Enter your message"
                  className="form-control"
                />
              </div>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? "Sending..." : "Send Bulk Email"}
              </button>
            </form>

            {/* Display messages */}
            {responseMessage && <div className="alert alert-success" style={{ marginTop: '20px' }}>{responseMessage}</div>}
            {errorMessage && <div className="alert alert-danger" style={{ marginTop: '20px' }}>{errorMessage}</div>}
          </div>
        </section>
      </div>
    </div>
  );
};

export default SendBulkMessageForm;
