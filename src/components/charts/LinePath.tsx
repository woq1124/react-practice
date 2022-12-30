/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-plusplus */
import React, { useEffect, useMemo } from 'react';
import { scaleLinear } from '@visx/scale';
import { LinePath as VisxLinePath } from '@visx/shape';
import { curveLinear } from '@visx/curve';
import { useChart } from './Canvas';

const getInterpolatedValue = (key: string, index: number, array: any[]) => {
  let left = null;
  let right = null;
  for (let i = index; i >= 0; i--) {
    if (array[i][key] !== null) {
      left = i;
      break;
    }
  }
  for (let i = index; i < array.length; i++) {
    if (array[i][key] !== null) {
      right = i;
      break;
    }
  }
  if (left === null || right === null) {
    if (left !== null) {
      return array[left][key]!;
    }
    if (right !== null) {
      return array[right][key]!;
    }
    return 0;
  }
  return array[left][key]! + ((array[right][key]! - array[left][key]!) / (right - left)) * (index - left);
};

function LinePath(props: { valueKey: string; color: string; scaleName: string; glyph?: boolean }) {
  // prop destruction
  const { valueKey, color, scaleName, glyph } = props;

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
    <g>
      {glyph &&
        graphs.map((graph) => {
          return (
            graph[valueKey] !== null && (
              <circle
                key={`glyph_efficiency_${getXValue(graph)}`}
                cx={(xScale(getXValue(graph)) || 0) + xScale.bandwidth() / 2}
                cy={yScale(graph[valueKey])}
                r={4}
                fill='#ffffff'
                stroke={color}
                strokeOpacity={0.6}
                strokeWidth={2.5}
                pointerEvents='none'
                aria-label={`efficiency ${getXValue(graph)}`}
              />
            )
          );
        })}
      <VisxLinePath
        stroke={color}
        strokeWidth={2}
        data={graphs}
        x={(graph) => (xScale(getXValue(graph)) || 0) + xScale.bandwidth() / 2}
        y={(graph, i, graphs) => {
          const value = graph[valueKey];
          if ((value ?? null) === null) {
            return yScale(getInterpolatedValue('efficiency', i, graphs));
          }
          return yScale(graph[valueKey]);
        }}
        curve={curveLinear}
      />
    </g>
  );
}

export { LinePath };
