document.addEventListener('DOMContentLoaded', function() {
    // Convert the data to a 2D array format suitable for Chart.js heatmap
    var chartData = [];
    for (var i = 0; i < heatmapData.length; i++) {
      for (var j = 0; j < heatmapData[i].length; j++) {
        chartData.push({
          x: j,
          y: i,
          value: heatmapData[i][j]
        });
      }
    }
  
    // Configure the heatmap chart
    var ctx = document.getElementById('heatmapChart').getContext('2d');
    new Chart(ctx, {
      type: 'heatmap',
      data: {
        datasets: [{
          data: chartData,
          borderWidth: 1,
          borderColor: 'white',
          backgroundColor: 'rgba(255, 0, 0, 1)'
        }]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            display: true
          },
          y: {
            display: true
          }
        },
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            enabled: false
          }
        }
      }
    });
  });