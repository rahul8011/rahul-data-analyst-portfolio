import Explorer from './Explorer'
import SqlPlayground from './SqlPlayground'

/**
 * "Playground" section ka content: upar interactive charts, neeche SQL editor.
 * (Section ka heading App.jsx me <Section> se aata hai.)
 */
export default function Playground() {
  return (
    <>
      <Explorer />
      <div className="sub-gap" />
      <SqlPlayground />
    </>
  )
}
