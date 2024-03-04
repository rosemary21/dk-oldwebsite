// import React from 'react';
import { Bar, BarChart } from 'recharts';

const data = [
  { name: "12 Jan", art: 32, fashion: 37 },
  { name: "13 Jan", art: 38, fashion: 61 },
  { name: "14 Jan", art: 45, fashion: 38 },
  { name: "15 Jan", art: 58, fashion: 47 },
  { name: "16 Jan", art: 82, fashion: 27 },
  { name: "17 Jan", art: 87, fashion: 77 },
  { name: "18 Jan", art: 97, fashion: 97 }
]

export default function GrowthBarChart() {
  return (
    <div>
      <BarChart width={350} height={150} data={data}>
        <Bar dataKey="art" barSize={15} fill="#101828" />
        <Bar dataKey="fashion" barSize={15} fill="#71717A" />
      </BarChart>
    </div>
  )
}

