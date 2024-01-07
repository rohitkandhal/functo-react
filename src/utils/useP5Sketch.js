import { useEffect } from 'react';
import p5 from 'p5';

const useP5Sketch = (sketch) => {
  useEffect(() => {
    let p5Instance = new p5(sketch);

    return () => {
      p5Instance.remove();
    };
  }, [sketch]);
};

export default useP5Sketch;
