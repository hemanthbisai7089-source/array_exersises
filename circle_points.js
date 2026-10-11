const r = require("raylib");

function drawPoints(world, point) {
  const angle = point * world.spaceBtwPoints;
  const radians = angle * (Math.PI / 180);
  const pointX = world.x + world.radius * Math.cos(radians);
  const pointY = world.y + world.radius * Math.sin(radians);

  r.DrawCircle(pointX, pointY, world.pointRadius, r.BLUE);
}

function draw(world) {
  r.BeginDrawing();
  r.ClearBackground(r.BLACK);
  r.DrawCircle(world.x, world.y, world.radius, r.WHITE);
  for (let point = 0; point < world.numberOfPoints; point++) {
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
  const numberOfPoints = 12;
  const spaceBtwPoints = 360 / numberOfPoints;
  const pointRadius = 10;

  r.SetTraceLogLevel(r.LOG_NONE);
  r.InitWindow(WIDTH, HEIGHT, TITLE);
  r.SetTargetFPS(FPS);

  return { radius, x, y, numberOfPoints, spaceBtwPoints, pointRadius };
}

function main() {
  const world = setup();
  loop(world);
  teardown();
}
main();
