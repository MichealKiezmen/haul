"use client"

import {Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"
import React, { useEffect, useState } from 'react'
import { TruckObject } from "@/types/interface"

interface DataEntry{
  name: string,
  value: number,
  color: string
}
function BarChartComponent({data}: any) {
  

  const [reineData, setRefinedData] = useState<DataEntry[]>([])


  useEffect(() => {

  let idle = 0
  let maintenance= 0
  let transit = 0

    data.map(({status} : TruckObject) => {
          if(status === "In Transit"){
              transit = transit + 1
          }else if(status === "Idle"){
              idle = idle + 1
          }else{
              maintenance = maintenance + 1
          }
    })

  setRefinedData([
    {name: "Idle", value: idle, color: "#e70034"},
    {name: "In Transit", value: transit, color: "#00e77b"},
    {name: "Maintenance", value: maintenance, color: "#B6C4CC"},
  ])

  },[data])


  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        className="font-semibold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded shadow-lg">
          <p className="font-semibold">{payload[0].name}</p>
          <p className="text-sm">Count: {payload[0].value} trucks</p>
          <p className="text-sm">Percentage: {((payload[0].value / 9) * 100).toFixed(1)}%</p>
        </div>
      );
    }
    return null;
  };


  return (
    <div className="">
      <div className="flex flex-col items-center justify-center my-6 sm:my-14 px-4">
        <p className="text-xl md:text-2xl font-semibold md:text-center">Truck Status Visualisation</p>
        <p className="">Total Fleet Size: {data.length} Trucks</p>
      </div>
        <div style={{ width: '100%', height: '500px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={reineData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={150}
                fill="#8884d8"
                dataKey="value"
              >
                {reineData.map((entry: DataEntry, index: number) => {
                  return <Cell key={`cell-${index}`} fill={entry.color} />
                } )}
              </Pie>
              <Tooltip  content={CustomTooltip} />
              <Legend 
                verticalAlign="bottom" 
                height={36}
                formatter={(value: string, entry: any) => `${value}: ${entry.payload.value}`}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
    </div>
  )
}

export default BarChartComponent
