Rahul Kumar – Data Analyst Portfolio

🚀 Live Portfolio: View My Portfolio

A modern, interactive portfolio built using React, Vite, and Three.js.

# Rahul Kumar – Data Analyst Portfolio

A modern, interactive portfolio built using **React, Vite, and Three.js**. It showcases data analytics projects, technical skills, interactive visualizations, and professional experience through a 3D-powered interface.

## Features

- 3D animated data-bar hero section
- Interactive charts and data visualizations
- SQL playground with sample queries and results
- Interactive 3D skills sphere
- Projects and experience showcase
- Responsive design for desktop and mobile
- Dark and light theme support
- Resume download functionality

## Tech Stack

- **Frontend:** React.js, JavaScript, HTML, CSS
- **Build Tool:** Vite
- **3D Graphics:** Three.js
- **Data Analytics:** SQL, Python, Excel, Power BI
- **Deployment:** Netlify

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/rahul8011/rahul-data-analyst-portfolio.git
```

### 2. Navigate to the Project Folder

```bash
cd rahul-data-analyst-portfolio
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start the Development Server

```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

### 5. Create a Production Build

```bash
npm run build
```

This generates a `dist/` folder containing the production-ready files.

## Project Structure

```text
rahul-portfolio/
├── public/
│   └── Rahul_Kumar_Data_Analyst.pdf
│
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Navbar/
│   │   ├── Hero/
│   │   ├── Stats/
│   │   ├── About/
│   │   ├── Projects/
│   │   ├── Playground/
│   │   ├── Skills/
│   │   ├── Journey/
│   │   ├── Contact/
│   │   └── Footer/
│   │
│   ├── data/
│   │   ├── profile.js
│   │   ├── stats.js
│   │   ├── projects.js
│   │   ├── skills.js
│   │   ├── experience.js
│   │   ├── roadData.js
│   │   ├── mobileData.js
│   │   ├── sqlExamples.js
│   │   └── navLinks.js
│   │
│   ├── hooks/
│   ├── styles/
│   ├── utils/
│   ├── App.jsx
│   └── main.jsx
│
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── netlify.toml
```

## Customization Guide

| What to Update | File Location |
|---|---|
| Name, email, LinkedIn, GitHub, and bio | `src/data/profile.js` |
| Portfolio statistics | `src/data/stats.js` |
| Projects and project details | `src/data/projects.js` |
| Technical skills | `src/data/skills.js` |
| Work experience and education | `src/data/experience.js` |
| SQL examples | `src/data/sqlExamples.js` |
| Resume PDF | `public/Rahul_Kumar_Data_Analyst.pdf` |
| Profile picture | `src/assets/rahul.jpg` |
| Theme colors | `src/styles/tokens.css` |
| Hero typing text | `src/components/Hero/Hero.jsx` |
| 3D hero visualization | `src/components/Hero/Hero3D.jsx` |

## Deployment on Netlify

This project is configured for Netlify deployment.

**GitHub-connected deployment settings:**

- Build command: `npm run build`
- Publish directory: `dist`
- Base directory: Leave blank

The deployment configuration is already available in `netlify.toml`.

You can also deploy manually by running `npm run build` and uploading the generated `dist/` folder to Netlify.

## Author

**Rahul Kumar**

- GitHub: https://github.com/rahul8011
- LinkedIn: https://www.linkedin.com/in/rahul-kumar980

---

⭐ If you find this project useful, feel free to star the repository!
