const r = require("raylib");

function drawPoints(world, point) {
  const radians = point * world.spaceBtwPoints * (Math.PI / 180);
  const start = {
    x: world.x + world.hRadius * Math.cos(radians),
    y: world.y + world.vRadius * Math.sin(radians),
  };
  const nextRadians = (1 + point) * world.spaceBtwPoints * (Math.PI / 180);
  const nextPoint = {
    x: world.x + world.hRadius * Math.cos(nextRadians),
    y: world.y + world.vRadius * Math.sin(nextRadians),
  };
  // console.log(start.x, start.y);
  r.DrawLineEx(start, nextPoint, 3, r.BLUE);
}

function draw(world) {
  r.BeginDrawing();
  r.ClearBackground(r.BLACK);

  for (let point = 0; point < world.numberOfSides; point++) {
    drawPoints(world, point);
  }
  r.EndDrawing();
}

function teardown() {
  r.CloseWindow();
}

function loop(world) {
  while (!r.WindowShouldClose()) {
    // no update!
    draw(world);
  }
}

function setup() {
  const WIDTH = 600;
  const HEIGHT = 400;
  const FPS = 50;
  const TITLE = "ellipes";

  const x = 300;
  const y = 200;
  const hRadius = 200;
  const vRadius = 100;

  const numberOfSides = 100;
  const spaceBtwPoints = 360 / numberOfSides;
  const pointRadius = 10;

  r.SetTraceLogLevel(r.LOG_NONE);
  r.InitWindow(WIDTH, HEIGHT, TITLE);
  r.SetTargetFPS(FPS);

  return { vRadius, hRadius, x, y, numberOfSides, spaceBtwPoints, pointRadius };
}

function main() {
  const world = setup();
  loop(world);
  teardown();
}
main();
