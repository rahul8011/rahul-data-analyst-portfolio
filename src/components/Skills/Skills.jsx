import SkillSphere from './SkillSphere'
import { skillGroups } from '../../data/skills'
import './Skills.css'

/**
 * Skills section: left me 3D sphere, right me category-wise skill tags.
 * Skills badalne ke liye: src/data/skills.js
 */
export default function Skills() {
  return (
    <div className="skills">
      <SkillSphere />

      <div className="skill-groups">
        {skillGroups.map((group) => (
          <div className="sg" key={group.title}>
            <h4>{group.title}</h4>
            <div className="tags">
              {group.items.map((skill) => (
                <span className="tag" key={skill}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
