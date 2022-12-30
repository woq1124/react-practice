import React, { useState } from 'react';
import { AxisBottom, AxisLeft, BarStack, Canvas, mock } from './components';
import { AxisRight } from './components/charts/AxisRight';
import { Bar } from './components/charts/Bar';
import { LinePath } from './components/charts/LinePath';

function App() {
  const [enableLeftAxis, setEnableLeftAxis] = useState(true);
  const [enableLeftGraph, setEnableLeftGraph] = useState(true);
  const [enableRightAxis, setEnableRightAxis] = useState(true);
  const [enableRightGraph, setEnableRightGraph] = useState(true);
  const [enableBottom, setEnableBottom] = useState(true);
  const [enableLineGlyph, setEnableLineGlyph] = useState(true);
  const [width, setWidth] = useState<number>();
  const [height, setHeight] = useState<number>();

  return (
    <div>
      <div>
        <button onClick={() => setEnableLeftAxis((enable) => !enable)}>left Axis toggle</button>
        <button onClick={() => setEnableLeftGraph((enable) => !enable)}>left Graph toggle</button>
        <button onClick={() => setEnableRightAxis((enable) => !enable)}>right Axis toggle</button>
        <button onClick={() => setEnableRightGraph((enable) => !enable)}>right Graph toggle</button>
        <button onClick={() => setEnableBottom((enable) => !enable)}>bottom toggle</button>
        <button onClick={() => setEnableLineGlyph((enable) => !enable)}>line glyph toggle</button>
      </div>
      <div>
        <label>
          <span>width</span>
          <input type='number' value={width} onChange={(e) => setWidth(Number(e.target.value))} />
        </label>
        <label>
          <span>height</span>
          <input type='number' value={height} onChange={(e) => setHeight(Number(e.target.value))} />
        </label>
      </div>
      <div
        css={{
          width: '1500px',
          height: '700px',
          padding: '8px',
          border: '1px solid #000',
        }}
      >
        <Canvas width={width} height={height} graphs={[...mock]} getXValue={(g) => g.date}>
          {enableLeftGraph ? (
            <BarStack
              keys={['inefficientCollections', 'standardCollections', 'efficientCollections']}
              scaleName='barStack'
              colorMap={{
                inefficientCollections: 'green',
                standardCollections: 'yellow',
                efficientCollections: 'red',
              }}
            />
          ) : (
            <Bar valueKey='efficientCollections' color='purple' scaleName='bar' />
          )}

          {enableRightGraph && (
            <LinePath valueKey='efficiency' scaleName='linePath' color='blue' glyph={enableLineGlyph} />
          )}
          {enableLeftAxis && (
            <AxisLeft
              scaleName={enableLeftGraph ? 'barStack' : 'bar'}
              label={enableLeftGraph ? 'Total Collections' : 'Efficiency Collections'}
            />
          )}
          {enableRightAxis && <AxisRight scaleName='linePath' label='Collection Efficiency' />}
          {enableBottom && <AxisBottom />}
        </Canvas>
      </div>
    </div>
  );
}

export default App;
