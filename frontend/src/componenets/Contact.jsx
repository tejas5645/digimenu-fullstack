import axios from "axios";
import { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({
    uname: "",
    email: "",
    subject: "",
    message: ""
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Loading...");

    try {


      
      const response = await axios.post("http://localhost:5000/feedback", formData); // Send formData
      if (response.status >= 200 && response.status < 300) {
        setStatus("Your message has been sent. Thank you!");
        setFormData({ uname: "", email: "", subject: "", message: "" });
      } else {
        setStatus("Error sending message. Please try again.");
      }
    } catch (error) {
      setStatus("Error sending message. Please try again.");
    }
  };


  return (
    <section id="contact" className="contact section">
      <div className="container section-title">
        <p><span>Need Help?</span> <span className="description-title">Contact Us</span></p>
      </div>
      <div className="container">
        <form onSubmit={handleSubmit} className="php-email-form">
          <div className="row gy-4">
            <div className="col-md-6">
              <input type="text" name="uname" className="form-control" placeholder="Your Name" required value={formData.uname} onChange={handleChange} />
            </div>
            <div className="col-md-6">
              <input type="email" name="email" className="form-control" placeholder="Your Email" required value={formData.email} onChange={handleChange} />
            </div>
            <div className="col-md-12">
              <input type="text" name="subject" className="form-control" placeholder="Subject" required value={formData.subject} onChange={handleChange} />
            </div>
            <div className="col-md-12">
              <textarea name="message" className="form-control" rows="6" placeholder="Message" required value={formData.message} onChange={handleChange}></textarea>
            </div>
            <div className="col-md-12 text-center">
              <p>{status}</p>
              <button type="submit">Send Message</button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Contact;
