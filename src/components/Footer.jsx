import { Link } from 'react-router-dom'
import { profile } from '../data'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>
          <div className="brand">
            <span className="brand-mark">MZ</span>
            <span className="brand-name">{profile.name}</span>
          </div>
          <p className="footer-note">Data science, machine learning and thoughtful interfaces.</p>
        </div>

        <div className="footer-links">
          <Link to="/projects">Projects</Link>
          <Link to="/experience">Experience</Link>
          <Link to="/ui-challenges">UI Challenges</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div className="footer-links">
          <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <a href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
          <a href={`mailto:${profile.email}`}>Email</a>
        </div>
      </div>
      <div className="container footer-bottom">
        © {new Date().getFullYear()} {profile.name}. Built with React.
      </div>
    </footer>
  )
}
