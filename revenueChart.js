document.addEventListener("DOMContentLoaded", () => {
    // Define the data
    const categories = [
        "January", "February", "March", "April", "May", "June", 
        "July", "August", "September", "October", "November", "December"
    ];

    const barData = [800, 900, 1300, 1000, 1400, 1600, 2100, 2500, 2550, 2600, 3200, 3800];
    const lineData = barData.map(value => value + 400); // Offset the line data for visual effect

    // Initialize the chart
    const options = {
        chart: {
            type: "line",
            stacked: false,
            toolbar: {
                show: true,
                offsetX: 0,
                offsetY: 0,
                tools: {
                    download: true,
                    selection: true,
                    zoom: false,
                    zoomin: false,
                    zoomout: false,
                    pan: false,
                    reset: false,
                },
            },
        },
        series: [
            {
                name: "Revenue",
                type: "bar",
                data: barData,
            },
            {
                name: "Trendline (Line)",
                type: "line",
                data: lineData,
            }
        ],
        stroke: {
            width: [0, 3], // Bar: no stroke, Line: 3px stroke
            curve: "smooth", // Smooth line curve
        },
        plotOptions: {
            bar: {
                borderRadius: 10,
                borderRadiusApplication: "end",
                columnWidth: "70%",
            }
        },
        dataLabels: {
            enabled: false, // Disable data labels
        },
        colors: ["#0FB450", "#cc4331"], // Bar: green, Line: orange
        xaxis: {
            categories: categories, // X-axis labels
            labels: {
                show: false, // Hide x-axis labels
            },
            axisBorder: {
                show: false, // Remove x-axis border
            },
            axisTicks: {
                show: false, // Remove x-axis ticks
            },
        },
        yaxis: {
            labels: {
                show: false, // Hide y-axis labels
            },
            axisBorder: {
                show: false, // Remove y-axis border
            },
            axisTicks: {
                show: false, // Remove y-axis ticks
            },
        },
        grid: {
            show: false, // Remove grid lines
        },
        tooltip: {
            enabled: true, // Enable tooltips
            shared: false,
            intersect: false,
            y: {
                formatter: function (value) {
                    return `₦${value.toLocaleString()}`; 
                }
            }
        },
        legend: {
            show: false, // Hide legend
        },
    };

    // Render the chart
    const chart = new ApexCharts(document.querySelector("#revenueChart"), options);
    chart.render();
});
