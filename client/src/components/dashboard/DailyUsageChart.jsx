import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Legend, Tooltip, Filler } from "chart.js";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Legend, Tooltip, Filler);

const DailyUsageChart = ({ data }) => {
    if (!data || data.length === 0) return <div>No usage data available.</div>;

    const labels = data.map((d) => d.date);

    const chartData = {
        labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"],
        datasets: [
            {
                label: "Total",
                data: [500, 600, 700, 350, 100, 900, 1000],
                borderColor: "#007bff",
                backgroundColor: "rgba(0,123,255,0.1)",
                fill: true,
            },
            {
                label: "Success",
                data: [480, 580, 650, 800, 950, 1050, 1150],
                borderColor: "#28a745",
                backgroundColor: "rgba(40,167,69,0.1)",
                fill: true,
            },
            {
                label: "Failed",
                data: [20, 20, 50, 50, 50, 50, 50],
                borderColor: "#dc3545",
                backgroundColor: "rgba(220,53,69,0.1)",
                fill: true,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            // legend: { position: "top" },
            // tooltip: { mode: "index", intersect: false },
        },
        scales: {
            // y: { beginAtZero: true },
        },
    };

    return <Line data={chartData} options={options} />;
}

export default DailyUsageChart;