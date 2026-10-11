const r = require("raylib");

function drawPoints(world, point) {
  const radians = point * world.spaceBtwPoints * (Math.PI / 180);
  const start = {
    x: world.x + world.radius * Math.cos(radians),
    y: world.y + world.radius * Math.sin(radians),
  };
  const nextRadians = (1 + point) * world.spaceBtwPoints * (Math.PI / 180);
  const nextPoint = {
    x: world.x + world.radius * Math.cos(nextRadians),
    y: world.y + world.radius * Math.sin(nextRadians),
  };
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
  const WIDTH = 400;
  const HEIGHT = 400;
  const FPS = 50;
  const TITLE = "circle_points";

  const x = 200;
  const y = 200;
  const radius = 150;
  const numberOfSides = 8;
  const spaceBtwPoints = 360 / numberOfSides;
  const pointRadius = 10;

  r.SetTraceLogLevel(r.LOG_NONE);
  r.InitWindow(WIDTH, HEIGHT, TITLE);
  r.SetTargetFPS(FPS);

  return { radius, x, y, numberOfSides, spaceBtwPoints, pointRadius };
}

function main() {
  const world = setup();
  loop(world);
  teardown();
}
main();
