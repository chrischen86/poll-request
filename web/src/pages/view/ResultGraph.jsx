import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Bar } from "react-chartjs-2";
import useDetectDarkMode from "../../components/hooks/useDetectDarkMode";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  ChartDataLabels
);

const getColours = (isDarkMode) => {
  return isDarkMode
    ? [
        "#f87171",
        "#60a5fa",
        "#facc15",
        "#4ade80",
        "#fb923c",
        "#22d3ee",
        "#c084fc",
        "#94a3b8",
      ]
    : [
        "#ef4444",
        "#3b82f6",
        "#eab308",
        "#22c55e",
        "#f97316",
        "#06b6d4",
        "#a855f7",
        "#64748b",
      ];
};

const getOptions = (isDarkMode) => {
  return {
    scales: {
      x: {
        ticks: {
          font: function (context) {
            const avgSize = Math.round(
              (context.chart.height + context.chart.width) / 2
            );
            let size = Math.round(avgSize / 16);
            size = size > 32 ? 32 : size; // setting max limit to 12
            return {
              size: size,
              weight: "bold",
            };
          },
          color: isDarkMode ? "#FFFFFF" : "#0f172a",
        },
        grid: {
          display: !isDarkMode,
        },
        border: {
          display: !isDarkMode,
        },
      },
      y: {
        ticks: {
          display: false,
        },
        grid: {
          display: !isDarkMode,
        },
        border: {
          display: !isDarkMode,
        },
      },
    },
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    layout: {
      padding: 32,
    },
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        color: isDarkMode ? "#FFFFFF" : "#0f172a",
        anchor: "end",
        textShadowBlur: 40,
        textShadowColor: isDarkMode ? "#0f172a" : "#FFFFFF",
        font: function (context) {
          const avgSize = Math.round(
            (context.chart.height + context.chart.width) / 2
          );
          let size = Math.round(avgSize / 16);
          size = size > 32 ? 32 : size; // setting max limit to 12
          return {
            size: size,
            weight: "bold",
          };
        },
      },
    },
  };
  //#0f172a
};

const ResultGraph = ({ optionLabels, values, title }) => {
  const isDarkMode = useDetectDarkMode();
  const backgroundColor = getColours(isDarkMode);
  const borderColor = getColours(!isDarkMode);

  const graphData = {
    labels: optionLabels,
    datasets: [
      {
        label: "Votes",
        data: values,
        backgroundColor,
        borderColor,
      },
    ],
  };

  const options = getOptions(isDarkMode);

  return (
    <div className="flex flex-col">
      <div className="text-4xl lg:text-6xl text-slate-900 dark:text-white text-center font-bold">
        {title}
      </div>
      <Bar options={options} data={graphData} />
    </div>
  );
};
export default ResultGraph;
