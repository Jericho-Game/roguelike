import {
  useRef, useState, useCallback, useEffect,
} from 'react';
import GameManager from '../core/gameManager';

export default () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameManager, setGameManager] = useState<GameManager | null>(null);
  const restart = useCallback(() => {
    gameManager?.restart();
  }, [gameManager]);

  useEffect(() => {
    if (canvasRef.current) {
      const newGameManager = new GameManager(canvasRef.current);

      newGameManager?.run();
      setGameManager(newGameManager);
    }
    return () => {
      gameManager?.destroy();
    };
  }, []);

  return { canvasRef, restart };
};
