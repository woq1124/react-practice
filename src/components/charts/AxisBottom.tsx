import React from 'react';
import { AxisBottom as VisxAxisBottom } from '@visx/axis';
import { useChart } from './Canvas';

function AxisBottom(props: { xValueFormatter?: (xValue: { toString(): string }) => string }) {
  // prop destruction
  const { xValueFormatter } = props;

  // lib hooks
  const { xScale, innerHeight } = useChart();

  // state, ref, querystring hooks
  // form hooks
  // query hooks
  // calculated values
  // effects
  // handlers

  return <VisxAxisBottom scale={xScale} top={innerHeight} stroke='#aaaaaa' tickFormat={xValueFormatter} />;
}

export { AxisBottom };
