// ============================================================
// ROAD ACCIDENT DATA
// Ye numbers aapke Excel dashboard ke PivotTables se liye gaye hain.
// Playground ke charts yahin se banate hain.
// Note: Road type / Area / Light dashboard me thousands me rounded the.
// ============================================================

export const roadData = {
  total: 417883,
  dims: {
    Severity: {
      note: 'Casualties by severity',
      rows: [
        ['Slight', 351436],
        ['Serious', 59312],
        ['Fatal', 7135],
      ],
    },
    Vehicle: {
      note: 'Casualties by vehicle type',
      rows: [
        ['Cars', 333485],
        ['Motorcycles', 33672],
        ['Van', 33472],
        ['Buses', 12798],
        ['Others', 3424],
        ['Agricultural vehicle', 1032],
      ],
    },
    'Road type': {
      note: 'Casualties by road type (values in the dashboard are rounded to thousands)',
      rows: [
        ['Single carriageway', 309700],
        ['Dual carriageway', 67400],
        ['Roundabout', 26800],
        ['One way street', 7400],
        ['Slip road', 4700],
        ['(blank)', 1900],
      ],
    },
    Surface: {
      note: 'Casualties by road surface condition',
      rows: [
        ['Dry', 279445],
        ['Wet', 115261],
        ['Snow / Ice', 22781],
        ['(blank)', 396],
      ],
    },
    Area: {
      note: 'Urban vs rural (rounded to thousands)',
      rows: [
        ['Urban', 255900],
        ['Rural', 162000],
      ],
    },
    Light: {
      note: 'Casualties by light condition (rounded to thousands)',
      rows: [
        ['Daylight', 305000],
        ['Dark', 112900],
      ],
    },
  },
  months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  y2021: [18173, 14648, 17815, 17335, 18852, 18728, 19682, 18797, 18456, 20109, 20975, 18576],
  y2022: [13163, 14804, 16575, 15767, 16775, 17230, 17201, 16796, 17500, 18287, 18439, 13200],
}
