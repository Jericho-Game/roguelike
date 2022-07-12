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

  const openFullScreen = useCallback(() => {
    if (!document.fullscreenElement) {
      canvasRef.current?.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }, []);

  useEffect(() => {
    if (canvasRef.current) {
      const newGameManager = new GameManager(canvasRef.current);

      newGameManager?.run();
      setGameManager(newGameManager);
    }
    return () => {
      gameManager?.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { canvasRef, restart, openFullScreen };
};
