import {
  FaInstagram,
  FaWhatsapp,
  FaLinkedinIn,
  FaYoutube
} from "react-icons/fa";
import "./footer.css";

export default function Footer() {
  return (
    <footer className="futuristic-footer">
      <div className="footer-container">

        {/* BRAND + ABOUT */}
        <div className="footer-brand">
          <h2>Algorithm X.O</h2>
          <p>
            Algorithm X.O is a futuristic innovation-driven platform
            focused on algorithms, AI, and next-generation digital systems.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li>Home</li>
            <li>About</li>
            <li>Track</li>
            <li>Timeline</li>
            <li>Sponsors</li>
            <li>FAQ</li>
          </ul>
        </div>

        {/* CONTACT US */}
        <div className="footer-contact">
          <h3>Contact Us</h3>
          <p>Email: algorithmxo@gmail.com</p>
          <p>Phone: +91 77388 48463</p>

          <div className="social-icons">
            <a href="#" aria-label="Instagram"><FaInstagram /></a>
            <a href="#" aria-label="WhatsApp"><FaWhatsapp /></a>
            <a href="#" aria-label="LinkedIn"><FaLinkedinIn /></a>
            <a href="#" aria-label="YouTube"><FaYoutube /></a>
          </div>
        </div>

        {/* MAP / LOCATION */}
        <div className="footer-map">
          <h3>Our Location</h3>
          <div className="map-box">
            <iframe
              title="Algorithm X.O Location"
              src="https://www.google.com/maps?q=Anjuman-I-Islam's%20Kalsekar%20Technical%20Campus&output=embed"
              loading="lazy"
            />
          </div>
          <span className="map-caption">
            Anjuman-I-Islam’s Kalsekar Technical Campus
          </span>
        </div>

      </div>

      {/* FOOTER BOTTOM */}
      <div className="footer-bottom">
        © {new Date().getFullYear()} Algorithm X.O. All rights reserved.
      </div>
    </footer>
  );
}

