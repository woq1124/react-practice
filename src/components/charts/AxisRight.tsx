import React, { ComponentProps, useMemo } from 'react';
import { AxisRight as VisxAxisRight } from '@visx/axis';
import { useChart } from './Canvas';

function AxisRight(props: {
  scaleName: string;
  label?: string;
  labelProps?: ComponentProps<typeof VisxAxisRight>['labelProps'];
}) {
  // prop destruction
  const { scaleName, label } = props;

  // lib hooks
  const { yScales, innerWidth } = useChart();

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
    <VisxAxisRight
      scale={yScale}
      top={0}
      left={innerWidth}
      label={label}
      labelProps={{ fontSize: '12px', fontWeight: 'bold', textAnchor: 'middle' }}
      stroke='#aaaaaa'
    />
  );
}

export { AxisRight };
