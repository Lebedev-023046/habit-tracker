import React, { useEffect, useState } from 'react';
import styles from './Diagram.module.css';

interface DiagramProps extends React.HTMLAttributes<HTMLDivElement> {
  progress: number;
  thicknessVar?: string;
  widthVar?: string;
  children?: React.ReactNode;
}

export function Diagram({
  children,
  progress,
  thicknessVar = '2.5rem',
  widthVar = '24rem',
  ...props
}: DiagramProps) {
  const { className, ...rest } = props;

  // const currentDay = 10;
  // const totalDays = 45;
  // const streak = 7;

  // const persentage = Math.ceil((currentDay / totalDays) * 100); // или можно считать сколько процентов выполнено (кол-во выполненых / кол-во дней которые ты прошел)

  // ?? это нужно чтобы при первом рендере происходила анимация
  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    setDisplayed(progress);
  }, [progress]);
  // =======

  return (
    <div
      className={`${styles.diagram} ${className}`}
      style={
        {
          '--progress': displayed,
          '--thickness': thicknessVar,
          '--width': widthVar,
        } as React.CSSProperties
      }
      {...rest}
    >
      <div className={styles.diagramInfo}>{children}</div>
    </div>
  );
}
