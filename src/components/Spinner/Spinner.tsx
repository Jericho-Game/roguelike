import { useEffect, useState, useRef } from 'react';

type OwnProps = {
  width?: number;
  diameter?: number;
  duration?: number;
  easing?: string;
  color?: string;
};

export default function Spinner({
  width = 10,
  diameter = 200,
  duration = 1000,
  easing = 'ease-out',
  color = 'black',
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
      // eslint-disable-next-line
      duration,
      iterations: Infinity,
      // eslint-disable-next-line
      easing,
    });
  });

  return (
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
  );
}
