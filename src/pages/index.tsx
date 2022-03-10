import { useEffect, useRef } from 'react';

import CanvasContainer from '../core/graphics';
import Grid from '../core/entities/grid';

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef?.current) {
      const canvas = new CanvasContainer(canvasRef.current);
      const grid = new Grid(canvas);

      grid.generate();
    }
  }, []);

  return <canvas ref={canvasRef} />;
}
