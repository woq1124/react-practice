import React, { useEffect, useMemo } from 'react';
import { scaleLinear, scaleOrdinal } from '@visx/scale';
import { BarStack as VisxBarStack } from '@visx/shape';
import { useChart } from './Canvas';

function BarStack<K extends string>(props: { keys: K[]; colorMap: Record<K, string>; scaleName: string }) {
  // prop destruction
  const { keys, colorMap, scaleName } = props;

  // lib hooks
  const { graphs, getXValue, xScale, innerHeight, registerYAxis } = useChart();

  // state, ref, querystring hooks
  // form hooks
  // query hooks
  // calculated values
  const yScale = useMemo(() => {
    const sumValues = graphs.map((graph) => keys.reduce((sum, key) => sum + (graph[key] || 0), 0));
    return scaleLinear({
      range: [innerHeight, 0],
      domain: [0, Math.max(...sumValues)],
      nice: true,
    });
  }, [graphs, innerHeight]);

  const colorScale = useMemo(() => {
    return scaleOrdinal({
      domain: Object.keys(colorMap),
      range: Object.values(colorMap) as string[],
    });
  }, [colorMap]);

  // effects
  useEffect(() => {
    registerYAxis(scaleName, yScale);
  }, [scaleName, yScale, registerYAxis]);

  // handlers

  return (
    <VisxBarStack data={graphs} keys={keys} x={getXValue} xScale={xScale} yScale={yScale} color={colorScale}>
      {(barStacks) =>
        barStacks.map((barStack) =>
          barStack.bars.map((bar) => {
            return (
              <rect
                key={`bar-stack-${barStack.index}-${bar.index}`}
                x={bar.x}
                y={bar.y}
                height={bar.height}
                width={bar.width}
                fill={bar.color}
                fillOpacity={0.8}
              />
            );
          }),
        )
      }
    </VisxBarStack>
  );
}

export { BarStack };
