const r = require("raylib");

function drawAxis(world) {
  r.DrawLine(world.xStart, 0, world.xStart, r.GetScreenHeight(), r.WHITE);
  r.DrawLine(0, world.yStart, r.GetScreenWidth(), world.yStart, r.WHITE);
}

function drawSine(world, axis) {
  const y = world.yStart + Math.sin((-axis * Math.PI) / 180) * world.amplitude;
  const x = axis + world.xStart;
  const nextY =
    world.yStart + Math.sin((-(axis + 1) * Math.PI) / 180) * world.amplitude;
  const nextX = axis + world.xStart + 1;
  const color = r.GREEN;
  drawWave(x, y, nextX, nextY, axis, world, color);
}

function drawWave(x, y, nextX, nextY, axis, world, color) {
  r.DrawLine(x, y, nextX, nextY, color);
  if (axis % 90 === 0) r.DrawCircle(x, y, world.pointRadius, r.GOLD);
}

function drawCosine(world, axis) {
  const y = world.yStart - Math.cos((axis * Math.PI) / 180) * world.amplitude;
  const x = axis + world.xStart;
  const nextY =
    world.yStart - Math.cos(((axis + 1) * Math.PI) / 180) * world.amplitude;
  const nextX = axis + world.xStart + 1;
  const color = r.SKYBLUE;

  drawWave(x, y, nextX, nextY, axis, world, color);
}

function draw(world) {
  r.BeginDrawing();
  r.ClearBackground(r.BLACK);
  drawAxis(world);
  for (let axis = 0; axis <= 360 * world.numberOfRevelutions; axis++) {
    drawSine(world, axis);
    drawCosine(world, axis);
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
  const TITLE = "circle_points";

  const xStart = 50;
  const yStart = 200;
  const radius = 150;
  const amplitude = 60;
  const numberOfRevelutions = 2;

  const pointRadius = 5;

  r.SetTraceLogLevel(r.LOG_NONE);
  r.InitWindow(WIDTH, HEIGHT, TITLE);
  r.SetTargetFPS(FPS);
  const cf = 0;
  return {
    radius,
    xStart,
    yStart,
    pointRadius,
    amplitude,
    numberOfRevelutions,
  };
}

function main() {
  const world = setup();
  loop(world);
  teardown();
}
main();
