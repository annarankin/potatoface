console.log("hi");
import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { Stage, Star, Layer, Image, Transformer } from "react-konva";
import useImage from "use-image";
import * as kevImgs from "./images/kev/*.png";
import * as courtImgs from "./images/court/*.png";
import blankFace from "./images/blank-face.png";
import beard from "./images/beard.png";

console.log(kevImgs);

const imgUrls = [
  ...Object.keys(kevImgs).map((k) => kevImgs[k]),
  ...Object.keys(courtImgs).map((k) => courtImgs[k]),
];

const OFFSET = 100;

const SimpleImage = ({ filepath, ...props }) => {
  const [image] = useImage(filepath);
  return <Image image={image} {...props} />;
};

const ResizableImage = ({ filepath, ...props }) => {
  const [image] = useImage(filepath);
  const shapeRef = useRef();
  const transformRef = useRef();

  const [selected, setSelected] = useState(false);

  useEffect(() => {
    if (selected) {
      // we need to attach transformer manually
      transformRef.current.nodes([shapeRef.current]);
      transformRef.current.getLayer().batchDraw();
    }
  }, [selected]);

  return (
    <>
      <Image
        image={image}
        draggable
        onClick={() => setSelected(!selected)}
        ref={shapeRef}
        {...props}
      />
      {selected ? (
        <Transformer
          ref={transformRef}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      ) : null}
    </>
  );
};

const App = () => {
  const images = imgUrls.map((filepath, i) => (
    <ResizableImage draggable filepath={filepath} x={0 + i * OFFSET} y={0} />
  ));

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <SimpleImage filepath={blankFace} height={400} width={400} />
        <ResizableImage filepath={beard} />
        {images}
      </Layer>
    </Stage>
  );
};

const app = document.getElementById("main");
const root = createRoot(app);
root.render(<App />);
