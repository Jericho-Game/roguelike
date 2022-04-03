import { useRef, useEffect } from 'react';
import GameManager from '../core/gameManager';

export default function IndexPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef?.current) {
      const gameManager = new GameManager(canvasRef.current);

      gameManager.run();
    }
  }, []);

  return (
    <div className="w-full aspect-video">
      <canvas ref={canvasRef} />
    </div>
  );
}
