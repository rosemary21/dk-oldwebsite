/* eslint-disable @typescript-eslint/no-explicit-any */
import { Bar, BarChart, XAxis, YAxis } from 'recharts';

const data = [
    { name: "12 Jan", art: 32, fashion: 37 },
    { name: "13 Jan", art: 38, fashion: 61 },
    { name: "14 Jan", art: 45, fashion: 38 },
    { name: "15 Jan", art: 58, fashion: 47 },
    { name: "16 Jan", art: 82, fashion: 27 },
    { name: "17 Jan", art: 87, fashion: 77 },
    { name: "18 Jan", art: 92, fashion: 87 },
    { name: "19 Jan", art: 94, fashion: 97 },
    { name: "20 Jan", art: 90, fashion: 77 },
    { name: "21 Jan", art: 98, fashion: 97 }
]

export default function DashboardBarChart() {
    return (
        <div>
            <BarChart width={900} height={300} data={data}>
                <Bar dataKey="art" barSize={30} fill="#101828" />
                <Bar dataKey="fashion" barSize={30} fill="#71717A" />
                <XAxis dataKey="name" />
                <YAxis />
                {/* <Tooltip content={ToolTipStyle} /> */}
            </BarChart>
        </div>
    )
}

// Styles for recharts tool tip
// const divStyle = {
//     color: 'white',
//     backgroundColor: '#081735',
//     borderRadius: "6px",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     padding: "5px 14px",
//     gap: "4px",
// };
// const pStyle = {
//     display: "flex",
//     justifyContent: "flex-start",
//     alignItems: "center",
//     gap: "5px",
// };


// function ToolTipStyle({ active, payload }: { active: any, payload: any }) {
//   if (active && payload && payload.length) {
//     return (
//       <div style={divStyle}>
//         <div className="label">
//           <p style={pStyle}>
//             {`Art = ${payload[0].value}%`}
//             <i className="bx bx-up-arrow-alt" />
//           </p>
//           <p style={pStyle}>
//             {`Fashion = ${payload[1].value}%`}
//             <i className="bx bx-up-arrow-alt" />
//           </p>
//         </div>
//       </div>
//     );
//   }
//   return null;
// }

// const getIntroOfPage = (label) => {
//     if (label === 2017) {
//         return "Page A is about men's clothing";
//     }
//     if (label === 2018) {
//         return "Page B is about women's dress";
//     }
//     if (label === 2019) {
//         return "Page C is about women's bag";
//     }
//     if (label === 2020) {
//         return "Page D is about household goods";
//     }
//     if (label === 2021) {
//         return "Page E is about food";
//     }
//     return "";
// };