// ============================================================
// PROJECTS - "Work" section ke cards.
// Naya project add karna ho to array me ek object aur jod do.
//   accent = card ka color, repo = GitHub link,
//   shots  = screenshots (src + caption), tags = chhote badges.
// Screenshots src/assets/ folder me rakho aur upar import karo.
// ============================================================

import roadDashboard from '../assets/road-dashboard.webp'
import roadAnalysis from '../assets/road-analysis.webp'
import mobileDashboard from '../assets/mobile-dashboard.webp'
import mobileMtd from '../assets/mobile-mtd.webp'
import mobileYoy from '../assets/mobile-yoy.webp'

export const projects = [
  {
    id: 'mobile',
    title: 'Mobile Sales Data Analysis Dashboard',
    tool: 'Power BI',
    accent: '#22d3ee',
    repo: 'https://github.com/rahul8011/Mobile-Sales-Dashboard',
    summary:
      'An interactive Power BI report on 100,000+ mobile sales records, covering regions, brands, cities, payment methods and time periods.',
    points: [
      'ETL with Power Query, connecting Excel and SQL sources.',
      'Star-schema data model built for fast, clean reporting.',
      'DAX measures for Total Sales, Profit, Average Order Value, MoM, YTD and Same Period Last Year.',
      'KPI cards and slicers, with insights on top products and trends across 3+ regions.',
    ],
    tags: ['Power BI', 'DAX', 'Power Query', 'SQL', 'Star Schema'],
    shots: [
      { src: mobileDashboard, caption: 'Dashboard: sales by city, model, payment method and ratings' },
      { src: mobileMtd, caption: 'MTD report: month-to-date sales across 2022 to 2024' },
      { src: mobileYoy, caption: 'Same period last year: quarterly and monthly comparison' },
    ],
  },
  {
    id: 'road',
    title: 'Road Accident Analysis Dashboard',
    tool: 'Advanced Excel',
    accent: '#f59e0b',
    repo: 'https://github.com/rahul8011/Road-Accident-project',
    summary:
      'An interactive Excel dashboard on 300,000+ road accident records, tracking casualties by severity, vehicle type, road type and road surface condition.',
    points: [
      'Slicers and a Timeline filter for Year and Location Type (Urban/Rural) for self-service analysis.',
      'KPI cards, donut charts and trend lines that compare year-over-year casualty patterns.',
      'PivotTable-driven data sheet that feeds every visual on the dashboard.',
    ],
    tags: ['Excel', 'PivotTables', 'Slicers', 'Dashboard Design', 'KPIs'],
    shots: [
      { src: roadDashboard, caption: 'Dashboard: severity KPIs, vehicle types, trends and filters' },
      { src: roadAnalysis, caption: 'Data analysis sheet: the PivotTables behind every visual' },
    ],
  },
]
