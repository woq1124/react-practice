import React, { useEffect, useMemo } from 'react';
import { scaleLinear } from '@visx/scale';
import { Group } from '@visx/group';
import { Bar as VisxBar } from '@visx/shape';
import { useChart } from './Canvas';

function Bar(props: { valueKey: string; color: string; scaleName: string }) {
  // prop destruction
  const { valueKey, color, scaleName } = props;

  // lib hooks
  const { graphs, xScale, innerHeight, registerYAxis, getXValue } = useChart();

  // state, ref, querystring hooks
  // form hooks
  // query hooks
  // calculated values
  const yScale = useMemo(() => {
    return scaleLinear({
      range: [innerHeight, 0],
      domain: [0, Math.max(...graphs.map((graph) => graph[valueKey]))],
      nice: true,
    });
  }, [graphs, innerHeight, valueKey]);

  // effects
  useEffect(() => {
    registerYAxis(scaleName, yScale);
  }, [scaleName, yScale, registerYAxis]);

  // handlers

  return (
    <Group>
      {graphs.map((graph) => {
        const barWidth = xScale.bandwidth();
        const barHeight = innerHeight - yScale(graph[valueKey] ?? 0);
        const barX = xScale(getXValue(graph)) ?? 0;
        const barY = innerHeight - barHeight;
        return (
          <VisxBar
            key={`bar-${graph.xValue}`}
            x={barX}
            y={barY}
            width={barWidth}
            height={barHeight}
            fill={color}
            fillOpacity={0.8}
          />
        );
      })}
    </Group>
  );
}

export { Bar };
