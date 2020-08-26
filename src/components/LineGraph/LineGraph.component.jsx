import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral";

const options = {
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format("+0,0");
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          format: "MM/DD/YY",
          tooltipFormat: "ll",
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          // Include a dollar sign in the ticks
          callback: function (value, index, values) {
            return numeral(value).format("0a");
          },
        },
      },
    ],
  },
};
const buildChartData = (data, casesType) => {
  let chartData = [];
  let lastDataPoint;
  for (let date in data.cases) {
    if (lastDataPoint) {
      let newDataPoint = {
        x: date,
        y: data[casesType][date] - lastDataPoint,
      };
      chartData.push(newDataPoint);
    }
    lastDataPoint = data[casesType][date];
  }
  return chartData;
};

const LineGraph = ({ casesType }) => {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () =>
      await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
        .then((response) => response.json())
        .then((data) => {
          const chartData = buildChartData(data, casesType);
          setData(chartData);
        });
    fetchData();
  }, [casesType]);
  const casesTypeColors = {
    cases: {
      backgroundColor: "rgba(148, 175, 219, 0.5)",
      borderColor: "rgba(148, 175, 219)",
    },
    recovered: {
      backgroundColor: "rgba(125, 215, 29, .5)",
      borderColor: "#7dd71d",
    },
    deaths: {
      backgroundColor: "rgba(251, 68, 67, .5)",
      borderColor: "#fb4443",
    },
  };

  return (
    <div className="linegraph">
      <h2>Daily New Cases</h2>
      {data?.length > 0 && (
        <Line
          className="linegraph-line"
          data={{
            datasets: [
              {
                data: data,
                backgroundColor: casesTypeColors[casesType].backgroundColor,
                borderColor: casesTypeColors[casesType].borderColor,
                borderWidth: 1.5,
              },
            ],
          }}
          options={options}
        />
      )}
    </div>
  );
};

export default LineGraph;
