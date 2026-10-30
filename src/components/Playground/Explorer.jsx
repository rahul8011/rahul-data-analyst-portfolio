import { useState } from 'react'
import RoadPanel from './RoadPanel'
import MobilePanel from './MobilePanel'
import './Explorer.css'

/**
 * Do tabs: "Road accident data" aur "Mobile sales data".
 * Selected tab ka panel (alag file me) neeche dikhta hai.
 */
export default function Explorer() {
  const [tab, setTab] = useState('road')

  return (
    <div className="explorer">
      <div className="tabs" role="tablist">
        <button role="tab" aria-selected={tab === 'road'} className={tab === 'road' ? 'on' : ''} onClick={() => setTab('road')}>
          Road accident data
        </button>
        <button role="tab" aria-selected={tab === 'mobile'} className={tab === 'mobile' ? 'on' : ''} onClick={() => setTab('mobile')}>
          Mobile sales data
        </button>
      </div>

      {tab === 'road' ? <RoadPanel /> : <MobilePanel />}
    </div>
  )
}
