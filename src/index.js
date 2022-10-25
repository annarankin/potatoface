console.log("hi");
import React from "react";
import { createRoot } from 'react-dom/client';
import { Stage, Star, Layer, Text } from 'react-konva';

const App = () => {
  return (<Stage width={window.innerWidth} height={window.innerHeight}>
    <Layer>

    <Star 
      fill="#89b717" 
      numPoints={5}
      innerRadius={20}
      outerRadius={40}
      draggable
    />
    </Layer>
  </Stage>)
};

const app = document.getElementById("main");
const root = createRoot(app);
root.render(<App />)
