console.log("hi");
import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { Stage, Star, Layer, Image, Transformer, Text } from "react-konva";
import useImage from "use-image";
import * as faceImgs from "./images/face-parts/*.png";
import * as accessoryImgs from "./images/accessories/*.png";
import blankFace from "./images/blank-face.png";

const faceUrls = Object.keys(faceImgs).map((k) => faceImgs[k]);
const accessoryUrls = Object.keys(accessoryImgs).map((k) => accessoryImgs[k]);

const OFFSET = 150;
const FACE_OFFSET = 600;
const ACC_OFFSET = 700;

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
  const faceParts = faceUrls.map((filepath, i) => {
    const column = (i % 3) + 1
    const row = Math.floor(i / 3)
    return (
    <ResizableImage
      draggable
      filepath={filepath}
      x={FACE_OFFSET + (column * OFFSET)}
      y={row * OFFSET}

    />
  )});
  const accessories = accessoryUrls.map((filepath, i) => {
    const column = (i % 2)
    const row = Math.floor(i / 2)
    return (
    <ResizableImage
      draggable
      filepath={filepath}
      x={column * (OFFSET * 2)}
      y={ACC_OFFSET + (row * OFFSET)}

    />
  )});
  

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <SimpleImage
          filepath={blankFace}
          height={400}
          width={400}
          x={100}
          y={200}
        />
        {accessories}
        {faceParts}
      </Layer>
    </Stage>
  );
};

const app = document.getElementById("main");
const root = createRoot(app);
root.render(<App />);
