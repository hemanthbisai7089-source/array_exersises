const r = require("raylib");

function drawPoints(y, x, point, world) {
  const radians = point * world.spaceBtwPoints * (Math.PI / 180);
  const start = {
    x: x + world.radius * Math.cos(radians),
    y: y + world.radius * Math.sin(radians),
  };
  const nextRadians = (1 + point) * world.spaceBtwPoints * (Math.PI / 180);
  const nextPoint = {
    x: x + world.radius * Math.cos(nextRadians),
    y: y + world.radius * Math.sin(nextRadians),
  };
  r.DrawLineEx(start, nextPoint, 3, r.BLUE);
}

function draw(world) {
  r.BeginDrawing();
  r.ClearBackground(r.BLACK);

  for (let point = 0; point < world.numberOfSides; point++) {
    drawPoints(world.y1, world.x1, point, world);
    drawPoints(world.y2, world.x2, point, world);
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
  const HEIGHT = 600;
  const FPS = 50;
  const TITLE = "circle_points";

  const x1 = 150;
  const y1 = 200;
  const x2 = 450;
  const y2 = 200;

  const radius = 150;
  const numberOfSides = 8;
  const spaceBtwPoints = 360 / numberOfSides;
  const pointRadius = 10;

  r.SetTryaceLogLevel(r.LOG_NONE);
  r.InitWindow(WIDTH, HEIGHT, TITLE);
  r.SetTargetFPS(FPS);

  return { radius, x1, y1, x2, y2, numberOfSides, spaceBtwPoints, pointRadius };
}

function main() {
  const world = setup();
  loop(world);
  teardown();
}
main();
