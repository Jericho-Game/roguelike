import classnames from 'classnames';
import { useEffect, useState, useRef } from 'react';

type OwnProps = {
  width?: number;
  diameter?: number;
  duration?: number;
  easing?: string;
  color?: string;
  fullscreen?: boolean;
};

export default function Spinner({
  width = 10,
  diameter = 200,
  duration = 1000,
  easing = 'ease-out',
  color = 'black',
  fullscreen = false,
}: OwnProps) {
  const radius = diameter / 2;

  const [deg] = useState(0);

  const arc = useRef<HTMLDivElement>(null);

  useEffect(() => {
    arc.current?.animate([
      {
        transform: 'rotate(0deg)',
      },
      {
        transform: 'rotate(360deg)',
      },
    ], {
      duration,
      iterations: Infinity,
      easing,
    });
  });

  return (

    <div
      className={classnames(
        { 'fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center': fullscreen },
      )}
    >
      <div
        ref={arc}
        style={{
          height: radius,
          width: diameter,
          overflow: 'hidden',
          transform: `rotate(${deg}deg)`,
          transformOrigin: '50% 100%',
        }}
      >
        <div
          style={{
            height: diameter,
            width: diameter,
            borderRadius: '50%',
            border: `${width}px solid ${color}`,
          }}
        />
      </div>
    </div>
  );
}
