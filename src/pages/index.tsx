import { RefreshIcon } from '@heroicons/react/solid';
import Button from '../components/Button';
import useGame from '../hooks/game';

export default function IndexPage() {
  const { canvasRef, restart } = useGame();

  return (
    <div className="w-full aspect-video">
      <div className="flex flex-row justify-center">
        <canvas ref={canvasRef} />

        <Button className="ml-4 self-start" variant="secondary" onClick={restart}>
          <RefreshIcon className="h-6 w-6" aria-hidden="true" />
          <span>Restart</span>
        </Button>
      </div>
    </div>
  );
}
