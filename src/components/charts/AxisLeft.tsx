import React, { ComponentProps, useMemo } from 'react';
import { AxisLeft as VisxAxisLeft } from '@visx/axis';
import { useChart } from './Canvas';

function AxisLeft(props: {
  scaleName: string;
  label?: string;
  labelProps?: ComponentProps<typeof VisxAxisLeft>['labelProps'];
}) {
  // prop destruction
  const { scaleName, label } = props;

  // lib hooks
  const { yScales } = useChart();

  // state, ref, querystring hooks
  // form hooks
  // query hooks
  // calculated values
  const yScale = useMemo(() => yScales[scaleName], [yScales, scaleName]);

  // effects
  // handlers
  if (!yScale) {
    return null;
  }

  return (
    <VisxAxisLeft
      scale={yScale}
      top={0}
      label={label}
      labelProps={{ fontSize: '12px', fontWeight: 'bold', textAnchor: 'middle' }}
      stroke='#aaaaaa'
    />
  );
}

export { AxisLeft };
