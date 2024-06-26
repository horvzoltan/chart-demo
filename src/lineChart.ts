// src/lineChart.ts

const canvas = document.getElementById("chart") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");

if (!ctx) {
  throw new Error("Unable to get canvas context");
}

const data: number[] = [];
const maxDataPoints = 50;
const xPadding = 50;
const yPadding = 50;

const getRandomData = (): number => Math.random() * canvas.height;

for (let i = 0; i < maxDataPoints; i++) {
  data.push(getRandomData());
}

function drawChart() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.beginPath();
  ctx.moveTo(xPadding, 0);
  ctx.lineTo(xPadding, canvas.height - yPadding);
  ctx.lineTo(canvas.width, canvas.height - yPadding);
  ctx.strokeStyle = "black";
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(xPadding, canvas.height - yPadding - data[0]);

  for (let i = 1; i < data.length; i++) {
    ctx.lineTo(
      xPadding + ((canvas.width - xPadding) / maxDataPoints) * i,
      canvas.height - yPadding - data[i]
    );
  }

  ctx.strokeStyle = "blue";
  ctx.stroke();
}

function updateChart() {
  data.push(getRandomData());

  if (data.length > maxDataPoints) {
    data.shift();
  }

  drawChart();
}

function animate() {
  updateChart();
  requestAnimationFrame(animate);
}

animate();
