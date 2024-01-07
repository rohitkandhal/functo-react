export const gameOfLifeSketch = (p) => {
  // Set the size of the grid
  const gridSize = 10;
  let rows, cols, grid;

  // Setup function
  p.setup = () => {
    // Create a p5 canvas
    let canvas = p.createCanvas(p.windowWidth, p.windowHeight);

    // Parent the canvas to a specific HTML element
    canvas.parent('canvas-container');
    
    initializeGrid();
  };

  // Draw function
  p.draw = () => {
    p.background(0)
    drawGrid();
    updateGrid();
  };

  // Initialize the grid with random values
  function initializeGrid() {
    rows = Math.floor(p.height / gridSize);
    cols = Math.floor(p.width / gridSize);
    grid = new Array(rows);
    for (let i = 0; i < rows; i++) {
      grid[i] = new Array(cols).fill(0).map(() => Math.random() > 0.5 ? 1 : 0);
    }
  }

  // Draw the grid
  function drawGrid() {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        p.fill(grid[i][j] === 1 ? 255 : 0);
        p.rect(j * gridSize, i * gridSize, gridSize, gridSize);
      }
    }
  }

  // Update the state of each cell based on the Game of Life rules
  function updateGrid() {
    let nextGrid = new Array(rows).fill(null).map(() => new Array(cols).fill(0));

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        let neighbors = countNeighbors(i, j);
        nextGrid[i][j] = (grid[i][j] === 1 && (neighbors === 2 || neighbors === 3)) || (grid[i][j] === 0 && neighbors === 3) ? 1 : 0;
      }
    }

    grid = nextGrid;
  }

  // Count the number of live neighbors for a given cell
  function countNeighbors(row, col) {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        let neighborRow = (row + i + rows) % rows;
        let neighborCol = (col + j + cols) % cols;
        count += grid[neighborRow][neighborCol];
      }
    }
    return count - grid[row][col];
  }
};
