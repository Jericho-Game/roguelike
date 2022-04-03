import { useEffect, useRef } from 'react';

import GameManager from '../core/gameManager';

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef?.current) {
      const gameManager = new GameManager(canvasRef.current);

      gameManager.run();
    }
  }, []);

  return <canvas ref={canvasRef} />;
}
