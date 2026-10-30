// ============================================================
// SQL PLAYGROUND - sample queries.
//   sql  = jo query editor me type hogi
//   cols = result table ke column names
//   rows = result (road accident PivotTables ke asli numbers)
// Ye sirf demo hai - koi real database run nahi hota.
// ============================================================

export const sqlExamples = [
  {
    id: 'surface',
    label: 'Casualties by road surface',
    sql: `SELECT road_surface,
       SUM(number_of_casualties) AS casualties
FROM   road_accidents
GROUP  BY road_surface
ORDER  BY casualties DESC;`,
    cols: ['road_surface', 'casualties'],
    rows: [
      ['Dry', 279445],
      ['Wet', 115261],
      ['Snow/Ice', 22781],
      [null, 396],
    ],
  },
  {
    id: 'severity',
    label: 'Severity share of all casualties',
    sql: `SELECT accident_severity,
       SUM(number_of_casualties)          AS casualties,
       ROUND(100 * SUM(number_of_casualties)
         / SUM(SUM(number_of_casualties)) OVER (), 1) AS pct
FROM   road_accidents
GROUP  BY accident_severity
ORDER  BY casualties DESC;`,
    cols: ['accident_severity', 'casualties', 'pct'],
    rows: [
      ['Slight', 351436, 84.1],
      ['Serious', 59312, 14.2],
      ['Fatal', 7135, 1.7],
    ],
  },
  {
    id: 'yoy',
    label: 'Month trend: 2021 vs 2022',
    sql: `SELECT MONTHNAME(accident_date) AS month,
       SUM(CASE WHEN YEAR(accident_date) = 2021
                THEN number_of_casualties END) AS cy_2021,
       SUM(CASE WHEN YEAR(accident_date) = 2022
                THEN number_of_casualties END) AS cy_2022
FROM   road_accidents
GROUP  BY MONTH(accident_date), MONTHNAME(accident_date)
ORDER  BY MONTH(accident_date)
LIMIT  6;`,
    cols: ['month', 'cy_2021', 'cy_2022'],
    rows: [
      ['January', 18173, 13163],
      ['February', 14648, 14804],
      ['March', 17815, 16575],
      ['April', 17335, 15767],
      ['May', 18852, 16775],
      ['June', 18728, 17230],
    ],
  },
]
