const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

canvas.style.backgroundColor = '#2b2826';
context.globalCompositeOperation = 'destination-over';

function drawFlower(conf) {
  let radius = conf.scale * Math.sqrt(conf.number);
  let angle = conf.number * conf.newAngle;
  let positionX = radius * Math.sin(angle) + conf.posX;
  let positionY = radius * Math.cos(angle) + conf.posY;

  context.fillStyle = 'hsl(' + conf.hue + ', 100%, 40%)';
  context.strokeStyle = 'white';

  context.beginPath();
  context.arc(positionX, positionY, conf.size, 0, Math.PI * 2);
  context.closePath();
  context.fill();
  context.stroke();

  conf.number++;
  conf.hue = (conf.number % 4 === 0) ? ++conf.hue : conf.hue;
  return conf;
}

function animate(conf, resolve) {
  drawFlower(conf);
  if (conf.number > 200) {
    return resolve();
  };
  requestAnimationFrame(() => { animate(conf, resolve) });
}

function flowerTimeout(conf, timeout) {
  return new Promise((resolve) => {
    setTimeout(() => {
      animate(conf, resolve);
    }, timeout);
  })
}



const flowerConfigs = [
  {number: 0, size: 5, scale: 20, hue: 155, newAngle: 6, posX: 800, posY: 450},
  {number: 0, size: 10, scale: 10, hue: 270, newAngle: 0.3, posX: 250, posY: 250},
  {number: 0, size: 20, scale: 10, hue: 207, newAngle: 80, posX: 1350, posY: 250},
  {number: 0, size: 16, scale: 10, hue: 70, newAngle: 2, posX: 250, posY: 700},
  {number: 0, size: 7, scale: 10, hue: 250, newAngle: 0.2, posX: 1350, posY: 700}
];

function setFlowersPosition(flowerConfigs) {
  if (canvas.width < canvas.height) { 
    flowerConfigs[0].posX = canvas.width / 2;
    flowerConfigs[0].posY = canvas.height / 2;

    flowerConfigs[1].posX = canvas.width * 0.2;
    flowerConfigs[1].posY = canvas.height * 0.15;

    flowerConfigs[2].posX = canvas.width * 0.8; 
    flowerConfigs[2].posY = canvas.height * 0.15;

    flowerConfigs[3].posX = canvas.width * 0.2; 
    flowerConfigs[3].posY = canvas.height * 0.85;

    flowerConfigs[4].posX = canvas.width * 0.8; 
    flowerConfigs[4].posY = canvas.height * 0.85;
  }
  else { 
    flowerConfigs[0].posX = canvas.width / 2;
    flowerConfigs[0].posY = canvas.height / 2;

    flowerConfigs[1].posX = canvas.width  * 0.2;
    flowerConfigs[1].posY = canvas.height * 0.25;

    flowerConfigs[2].posX = canvas.width * 0.8; 
    flowerConfigs[2].posY = canvas.height * 0.25;

    flowerConfigs[3].posX = canvas.width * 0.2; 
    flowerConfigs[3].posY = canvas.height * 0.75;

    flowerConfigs[4].posX = canvas.width * 0.8; 
    flowerConfigs[4].posY = canvas.height * 0.75;
  }
}

function scaleFlowers(flowers) {
  let canvasSize = canvas.width + canvas.height;
  let scaleNumber = Math.sqrt(canvasSize) / 50;
  context.lineWidth = Math.round(scaleNumber * 2);

  flowers.forEach((flower) => {
    flower.scale *= scaleNumber;
    flower.size *= scaleNumber;
  });
}

setFlowersPosition(flowerConfigs);
scaleFlowers(flowerConfigs);

flowerTimeout(flowerConfigs[0], 1000)
  .then(() => flowerTimeout(flowerConfigs[1], 2000))
  .then(() => flowerTimeout(flowerConfigs[2], 2000))
  .then(() => flowerTimeout(flowerConfigs[3], 2000))
  .then(() => flowerTimeout(flowerConfigs[4], 2000));
