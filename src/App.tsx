import React, { useState } from 'react';
import { AxisBottom, AxisLeft, BarStack, Canvas, mock } from './components';
import { AxisRight } from './components/charts/AxisRight';
import { LinePath } from './components/charts/LinePath';

function App() {
  const [enableLeft, setEnableLeft] = useState(true);
  const [enableRight, setEnableRight] = useState(true);
  const [enableBottom, setEnableBottom] = useState(true);

  return (
    <div css={{ width: '100%', height: '500px' }}>
      <button onClick={() => setEnableLeft((enable) => !enable)}>left toggle</button>
      <button onClick={() => setEnableRight((enable) => !enable)}>right toggle</button>
      <button onClick={() => setEnableBottom((enable) => !enable)}>bottom toggle</button>
      <Canvas graphs={[...mock]} getXValue={(g) => g.date}>
        {enableBottom && <AxisBottom />}
        {enableLeft && <AxisLeft scaleName='barStack' label='Total Collections' />}
        {enableLeft && (
          <BarStack
            keys={['inefficientCollections', 'standardCollections', 'efficientCollections']}
            scaleName='barStack'
            colorMap={{
              inefficientCollections: 'green',
              standardCollections: 'yellow',
              efficientCollections: 'red',
            }}
          />
        )}
        {enableRight && <LinePath valueKey='efficiency' scaleName='linePath' color='blue' glyph />}
        {enableRight && <AxisRight scaleName='linePath' label='Collection Efficiency' />}
      </Canvas>
    </div>
  );
}

export default App;
