import React, { useRef } from "react";
import { Stage, Layer, Transformer } from "react-konva";
import Konva from "konva";
import useShapeAtom from "@/hooks/useShapeAtom";
import CustomShape from "./CustomShape";
import useContainer from "@/hooks/useContainer";

interface Props {
  id: string;
}

const Canvas = ({ id }: Props) => {
  const { containerRef, containerSize } = useContainer();
  const stageRef = useRef<Konva.Stage>(null);
  const transformerRef = useRef<Konva.Transformer>(null);
  const { shapes, selectedId: selectedShapeId, selectShape } = useShapeAtom();

  React.useEffect(() => {
    const transformer = transformerRef.current;
    if (transformer && selectedShapeId) {
      const selectedNode = stageRef.current?.findOne(`#${selectedShapeId}`);
      if (selectedNode) {
        transformer.nodes([selectedNode]);
        transformer.getLayer()?.batchDraw();
      } else {
        selectShape(null); // Deselect shape if not found
      }
    } else if (transformer) {
      transformer.nodes([]);
    }
  }, [selectedShapeId, shapes, selectShape]);

  return (
    <div
      ref={containerRef}
      onDragOver={(e) => e.preventDefault()}
      className="flex-1 flex items-center max-w-3xl w-full h-full"
    >
      <Stage
        ref={stageRef}
        className="bg-slate-100"
        id={id}
        width={containerSize.width}
        height={containerSize.height}
        onMouseDown={(e) => {
          if (e.target === e.target.getStage()) selectShape(null);
        }}
      >
        <Layer>
          {shapes.map((shape, index) => (
            <CustomShape key={index} shape={shape} index={index} />
          ))}
          {selectedShapeId && (
            <Transformer
              ref={transformerRef}
              rotateEnabled={true}
              flipEnabled={true}
            />
          )}
        </Layer>
      </Stage>
    </div>
  );
};

export default Canvas;
