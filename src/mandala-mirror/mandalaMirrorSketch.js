
import * as dat from 'dat.gui';

export const mandalaMirrorSketch = (p) => {
  // Constants and variables specific to this sketch
  const circleRadius = 250;
  let gui;
  let gui_setup;

  p.setup = () => {
    // Create a p5 canvas
    let canvas = p.createCanvas(p.windowWidth, p.windowHeight);

    // Parent the canvas to a specific HTML element
    canvas.parent('canvas-container');
    
    p.frameRate(30)

    // Set up Gui class
    if (!gui_setup) {
      gui = new Gui();
      gui_setup = new dat.GUI();
      gui_setup.add(gui, 'sections', 4, 64).step(4).onChange(drawBackground);
    }

    drawBackground();
  };

  p.draw = () => {
    // Continuous drawing logic, if any
  };

  function drawBackground() {
    p.background(250);
    p.stroke(200);
    p.noFill();
    p.circle(p.width / 2, p.height / 2, circleRadius * 2);

    const angleIncrement = p.TWO_PI / gui.sections;
    for (let i = 0; i < gui.sections; i++) {
      const angle = i * angleIncrement;
      p.line(
        p.width / 2,
        p.height / 2,
        p.width / 2 + circleRadius * p.cos(angle),
        p.height / 2 + circleRadius * p.sin(angle)
      );
    }
  }

  function replicateDrawing(x, y, prevX, prevY, color, weight, isLine) {
    p.stroke(color);
    p.strokeWeight(weight);

    const angleIncrement = p.TWO_PI / gui.sections;
    for (let i = 0; i < gui.sections; i++) {
      const angle = i * angleIncrement;
      let newX = p.cos(angle) * (x - p.width / 2) - p.sin(angle) * (y - p.height / 2) + p.width / 2;
      let newY = p.sin(angle) * (x - p.width / 2) + p.cos(angle) * (y - p.height / 2) + p.height / 2;
      let newPrevX = p.cos(angle) * (prevX - p.width / 2) - p.sin(angle) * (prevY - p.height / 2) + p.width / 2;
      let newPrevY = p.sin(angle) * (prevX - p.width / 2) + p.cos(angle) * (prevY - p.height / 2) + p.height / 2;

      if (isLine) {
        p.line(newPrevX, newPrevY, newX, newY);
      } else {
        p.point(newX, newY);
      }
    }
  }

  p.mousePressed = () => {
    let d = p.dist(p.mouseX, p.mouseY, p.width / 2, p.height / 2);
    if (d <= circleRadius) {
      replicateDrawing(p.mouseX, p.mouseY, p.mouseX, p.mouseY, 0, 5, false);
    }
  };

  p.mouseDragged = () => {
    let d = p.dist(p.mouseX, p.mouseY, p.width / 2, p.height / 2);
    if (d <= circleRadius) {
      replicateDrawing(p.mouseX, p.mouseY, p.pmouseX, p.pmouseY, 0, 3, true);
    }
  };

  function Gui() {
    this.sections = 16;
  }
};
