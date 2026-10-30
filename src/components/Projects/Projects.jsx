import ProjectCard from './ProjectCard'
import { projects } from '../../data/projects'
import './Projects.css'

/**
 * "Work" section: data/projects.js ke har project ka ek card.
 * Alternate cards (flip) left-right ulte dikhte hain.
 */
export default function Projects() {
  return (
    <div className="projects">
      {projects.map((project, index) => (
        <ProjectCard key={project.id} project={project} flip={index % 2 === 1} />
      ))}
    </div>
  )
}
