# Rahul Kumar - Portfolio

React + Vite + Three.js se bana portfolio. 3D data-bar hero, interactive charts, SQL playground, 3D skill sphere.

## Chalane ka tareeka

```bash
npm install        # ek baar (packages download)
npm run dev        # http://localhost:5173 par chalega, code badalte hi page refresh
npm run build      # deploy ke liye dist/ folder banata hai
```

**Netlify par daalna:** `npm run build` ke baad `dist/` folder ko app.netlify.com/drop par drag-drop kar do.
(GitHub se connect karna ho to build command `npm run build`, publish directory `dist` - ye `netlify.toml` me pehle se likha hai.)

---

## Folder map (kaunsi file kya karti hai)

```
rahul-portfolio/
├── index.html                 # Ek hi HTML page. Title, meta, fonts, <div id="root">
├── package.json               # Packages + npm commands
├── vite.config.js             # Build tool ki setting
├── netlify.toml               # Netlify ki setting
├── public/
│   └── Rahul_Kumar_Data_Analyst.pdf     # Resume (Download buttons yahi dete hain)
│
└── src/
    ├── main.jsx               # Entry point: global CSS + <App/> load karta hai
    ├── App.jsx                # Page ka order: Navbar, Hero, Stats, About, Work ...
    │
    ├── data/                  # <-- TEXT / NUMBERS BADALNE KE LIYE YAHAN AAO
    │   ├── profile.js         #   Naam, email, LinkedIn, GitHub, about paragraph
    │   ├── stats.js           #   Hero ke neeche wale 4 numbers
    │   ├── projects.js        #   Projects (title, points, GitHub link, screenshots)
    │   ├── skills.js          #   Skill tags + 3D sphere ke words
    │   ├── experience.js      #   Jobs aur education
    │   ├── roadData.js        #   Road accident charts ke numbers
    │   ├── mobileData.js      #   Mobile sales chart ke numbers
    │   ├── sqlExamples.js     #   SQL playground ki queries + results
    │   └── navLinks.js        #   Top menu ke links
    │
    ├── components/            # Har section ka apna folder: JSX (structure) + CSS (look)
    │   ├── Navbar/            #   Navbar.jsx, Navbar.css
    │   ├── Hero/              #   Hero.jsx, Hero3D.jsx (Three.js), Typed.jsx, Hero.css
    │   ├── Stats/             #   Stats.jsx, Stats.css
    │   ├── Section/           #   Section.jsx (har section ka heading wrapper)
    │   ├── About/             #   About.jsx, About.css
    │   ├── Projects/          #   Projects.jsx, ProjectCard.jsx, Lightbox.jsx + CSS
    │   ├── Playground/        #   Playground.jsx, Explorer.jsx, RoadPanel.jsx,
    │   │                      #   MobilePanel.jsx, SqlPlayground.jsx + CSS
    │   ├── Skills/            #   Skills.jsx, SkillSphere.jsx (canvas 3D), Skills.css
    │   ├── Journey/           #   Journey.jsx, Journey.css
    │   ├── Contact/           #   Contact.jsx, Contact.css
    │   └── Footer/            #   Footer.jsx, Footer.css
    │
    ├── hooks/                 # Chhote reusable "kaam" (React hooks)
    │   ├── useReveal.js            # scroll karne par fade-in
    │   ├── useCountUp.js           # numbers 0 se ginna
    │   ├── useTilt.js              # mouse ke saath 3D tilt
    │   ├── useActiveSection.js     # navbar me current section highlight
    │   ├── useTheme.js             # dark / light mode
    │   ├── useScrollProgress.js    # top ki progress line
    │   └── usePointerSpotlight.js  # mouse ke peeche roshni
    │
    ├── utils/formatNumber.js  # 417883 -> "417,883"
    │
    ├── styles/                # Poore page ki common CSS
    │   ├── tokens.css         #   Colors, fonts, shadows (dark/light yahin se)
    │   ├── base.css           #   Reset, background, shared animations
    │   ├── layout.css         #   Section spacing, heading, reveal, tags
    │   └── buttons.css        #   Buttons
    │
    └── assets/                # Photo + dashboard screenshots
```

## Aam badlaav kaise karein

| Kya badalna hai | Kahan |
| --- | --- |
| Naam, email, LinkedIn, GitHub, about text | `src/data/profile.js` |
| Naya project add karna | `src/data/projects.js` (array me ek object aur jodo) + screenshot `src/assets/` me |
| Skills | `src/data/skills.js` |
| Job / education | `src/data/experience.js` |
| Resume PDF | `public/Rahul_Kumar_Data_Analyst.pdf` replace karo (naam same rakho) |
| Profile photo | `src/assets/rahul.jpg` replace karo |
| Colors (cyan / violet / amber, dark / light) | `src/styles/tokens.css` |
| Hero ki typing wali lines | `src/components/Hero/Hero.jsx` me `TYPED_WORDS` |
| 3D bars ka color / size | `src/components/Hero/Hero3D.jsx` ke upar ki settings |
| Kisi section ka look | us section ke folder ki `.css` file |

## Ek zaroori baat (CSS ka order)

`main.jsx` me global CSS (`styles/`) ko `App` se **pehle** import kiya gaya hai. Isse har component ki apni CSS
baad me load hoti hai aur zarurat padne par global rules ko override kar sakti hai
(jaise phone par burger menu dikhana). Ye order badloge to mobile menu toot sakta hai.
