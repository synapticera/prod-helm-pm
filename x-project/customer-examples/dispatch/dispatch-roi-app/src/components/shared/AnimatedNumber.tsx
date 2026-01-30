'use client';

import { useSpring, animated } from '@react-spring/web';
import { useEffect, useState } from 'react';

interface AnimatedNumberProps {
  value: number;
  formatter?: (value: number) => string;
  className?: string;
}

export default function AnimatedNumber({
  value,
  formatter,
  className = '',
}: AnimatedNumberProps) {
  const [displayValue, setDisplayValue] = useState(value);

  const { number } = useSpring({
    from: { number: displayValue },
    number: value,
    config: { duration: 600 },
    onRest: () => setDisplayValue(value),
  });

  useEffect(() => {
    setDisplayValue(value);
  }, [value]);

  return (
    <animated.span className={className}>
      {number.to((n) => (formatter ? formatter(n) : n.toFixed(0)))}
    </animated.span>
  );
}
