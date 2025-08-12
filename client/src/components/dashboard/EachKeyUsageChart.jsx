import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const EachKeyUsageChart = ({ data }) => {
    if (!data || data.length === 0) {
        return <div>No API key data available.</div>;
    }

    const allZero = data.every((item) => item.used_count === 0);

    if (allZero) {
        return <div>No usage recorded for any API keys yet.</div>;
    }

    const labels = data.map((item) => item.key_prefix);
    const usedCounts = data.map((item) => item.used_count);

    const chartData = {
        labels,
        datasets: [
            {
                label: "API Key Usage",
                data: usedCounts,
                backgroundColor: [
                    "#ff6b00",
                    "#ffc107",
                    "#28a745",
                    "#007bff",
                    "#6f42c1",
                    "#e83e8c",
                    "#20c997",
                ],
                borderColor: "#fff",
                borderWidth: 2,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const label = context.label || "";
                        const value = context.raw;
                        return `${label}: ${value} request${value !== 1 ? "s" : ""}`;
                    },
                },
            },
        },
    };

    return <Doughnut data={chartData} options={options} />;
};

export default EachKeyUsageChart;
