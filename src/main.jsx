// ============================================================
// main.jsx - app ka entry point. index.html ke <div id="root"> me React chalu karta hai.
//
// IMPORTANT: global CSS ko App se PEHLE import karna hai.
// Component ki apni CSS (jaise Navbar.css) baad me load hoti hai, taaki wo global rules ko
// override kar sake (jaise phone par burger menu dikhana). Order badlo mat.
// ============================================================

import React from 'react'
import { createRoot } from 'react-dom/client'

// 1) Global styles (order important: tokens -> base -> layout -> buttons)
import './styles/tokens.css'
import './styles/base.css'
import './styles/layout.css'
import './styles/buttons.css'

// 2) App (isse har component ki apni CSS load hoti hai)
import App from './App'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
