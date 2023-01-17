import React, {
  Children,
  ComponentProps,
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { ParentSize } from '@visx/responsive';
import { Group } from '@visx/group';
import { scaleBand } from '@visx/scale';
import type { AxisScale } from '@visx/axis';

type ContextValue = {
  graphs: Record<string, any>[];
  getXValue: (graph: Record<string, any>) => any;
  xScale: ReturnType<typeof scaleBand>;
  yScales: Record<string, AxisScale>;
  registerYAxis: (scaleName: string, scale: AxisScale) => void;
  innerWidth: number;
  innerHeight: number;
};

const ChartContext = createContext<ContextValue>({} as ContextValue);

function CanvasComponent<T extends Record<string, any>>(props: {
  width: number;
  height: number;
  graphs: T[];
  getXValue: (graph: T) => any;
  children: ReactNode;
}) {
  // prop destruction
  const { width, height, graphs, getXValue, children } = props;

  // lib hooks
  // state, ref, querystring hooks
  const [topMargin, setTopMargin] = useState(5);
  const [bottomMargin, setBottomMargin] = useState(5);
  const [startMargin, setStartMargin] = useState(10);
  const [endMargin, setEndMargin] = useState(10);

  const [yScales, setYScales] = useState<ContextValue['yScales']>({});

  // form hooks
  // query hooks
  // calculated values
  const innerWidth = useMemo(() => width - startMargin - endMargin, [endMargin, startMargin, width]);
  const innerHeight = useMemo(() => height - topMargin - bottomMargin, [height, topMargin, bottomMargin]);

  const xScale = useMemo(() => {
    return scaleBand({
      range: [0, innerWidth],
      domain: graphs.map(getXValue),
      padding: 0.2,
    });
  }, [graphs, getXValue, innerWidth]);

  const registerYAxis = useCallback<ContextValue['registerYAxis']>((name, scale) => {
    setYScales((scales) => ({ ...scales, [name]: scale }));
  }, []);

  // @ts-expect-error NOTE:
  const contextValue = useMemo<ContextValue>(() => {
    return {
      graphs,
      getXValue,
      xScale,
      yScales,
      registerYAxis,
      innerWidth,
      innerHeight,
    };
  }, [graphs, getXValue, xScale, yScales, registerYAxis, innerWidth, innerHeight]);

  // effects
  useEffect(() => {
    let topMargin = 5;
    let bottomMargin = 5;
    let startMargin = 10;
    let endMargin = 10;
    Children.forEach(children, (child) => {
      if (!child || typeof child !== 'object') {
        return;
      }
      if ('type' in child) {
        if (typeof child.type === 'string' || !child.type.name) {
          return;
        }
        if (child.type.name === 'AxisTop') {
          topMargin = 25;
        }
        if (child.type.name === 'AxisBottom') {
          bottomMargin = 25;
        }
        if (child.type.name === 'AxisLeft') {
          startMargin = 60;
        }
        if (child.type.name === 'AxisRight') {
          endMargin = 60;
        }
      }
    });
    setTopMargin(topMargin);
    setBottomMargin(bottomMargin);
    setStartMargin(startMargin);
    setEndMargin(endMargin);
  }, [children]);

  // handlers

  if (innerWidth < 0 || innerHeight < 0) {
    return null;
  }

  return (
    <ChartContext.Provider value={contextValue}>
      <div css={{ position: 'relative' }}>
        <svg width={width} height={height}>
          <Group top={topMargin} left={startMargin}>
            {children}
          </Group>
        </svg>
      </div>
    </ChartContext.Provider>
  );
}

function Canvas({
  width,
  height,
  ...props
}: Omit<ComponentProps<typeof CanvasComponent>, 'width' | 'height'> & { width?: number; height?: number }) {
  return (
    <ParentSize>
      {({ width: parentWidth, height: parentHeight }) => (
        <CanvasComponent
          {...props}
          width={width && width < parentWidth ? width : parentWidth}
          height={height && height < parentHeight ? height : parentHeight}
        />
      )}
    </ParentSize>
  );
}

export const useChart = () => {
  return useContext(ChartContext);
};

export { Canvas };
