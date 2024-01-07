import React from 'react';
import useP5Sketch from '../utils/useP5Sketch';
import { mandalaMirrorSketch as sketch } from './sketch';

const MandalaMirror = () => {
  useP5Sketch(sketch);

  return <div />;
};

export default MandalaMirror;
