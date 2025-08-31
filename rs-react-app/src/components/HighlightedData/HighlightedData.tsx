import React, { useEffect, useState } from 'react';
import './HighlightedData.css';

interface HighlightedValueProps {
  value: React.ReactNode;
  active: boolean;
}

export const HighlightedValue = ({ value, active }: HighlightedValueProps) => {
  const [highlight, setHighlight] = useState(false);

  useEffect(() => {
    if (active) {
      setHighlight(true);
      const t = setTimeout(() => setHighlight(false), 20000);
      return () => clearTimeout(t);
    } else {
      setHighlight(false);
    }
  }, [active]);

  return <span className={highlight ? 'highlighted' : ''}>{value}</span>;
};
