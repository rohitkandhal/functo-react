import React from 'react';
import useP5Sketch from '../utils/useP5Sketch';
import { gameOfLifeSketch as sketch } from './gameOfLifeSketch';

const GameOfLife = () => {
  useP5Sketch(sketch);

  return <div />;
};

export default GameOfLife;
