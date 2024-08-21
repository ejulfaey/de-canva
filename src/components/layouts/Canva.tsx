import React, { useState, useRef } from "react";
import { Stage, Layer, Circle, Rect, Ellipse, Transformer } from "react-konva";
import Konva from "konva";
import useShapeAtom from "@/hooks/useShapeAtom";

interface Props {
    containerSize: { width: number; height: number };
    containerRef: React.RefObject<HTMLDivElement>;
}

const Canvas = ({containerSize, containerRef}: Props) => {
    const [selectedShapeId, setSelectedShapeId] = useState<string | null>(null);
    const stageRef = useRef<Konva.Stage>(null);
    const transformerRef = useRef<Konva.Transformer>(null);
    const { shapes } = useShapeAtom();

    // const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    //     event.preventDefault();

    //     const stage = stageRef.current;
    //     if (!stage) return;

    //     const point = stage.getPointerPosition();
    //     const shapeType = event.dataTransfer.getData("shape");

    //     if (!point || !shapeType) return;

    //     const newShape = {
    //         x: containerWidth / 2,
    //         y: containerHeight /2,
    //         type: shapeType,
    //         id: `${shapeType}-${shapes.length}`,
    //     };

    //     setShapes([...shapes, newShape]);
    // };

    // const handleSelect = (id: string) => {
    //     setSelectedShapeId(id);
    // };

    // const handleDelete = () => {
    //     if (selectedShapeId) {
    //         setShapes(shapes.filter(shape => shape.id !== selectedShapeId));
    //         setSelectedShapeId(null);
    //     }
    // };

    React.useEffect(() => {
        const transformer = transformerRef.current;
        if (transformer && selectedShapeId) {
            const selectedNode = stageRef.current?.findOne(`#${selectedShapeId}`);
            if (selectedNode) {
                transformer.nodes([selectedNode]);
                transformer.getLayer()?.batchDraw();
            }
        }
    }, [selectedShapeId]);

    return (
        <div
            ref={containerRef}
            // onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            className="max-w-2xl w-full bg-white h-full"
        >
            <Stage
                ref={stageRef}
                className="bg-indigo-100"
                width={containerSize.width}
                height={window.innerHeight}
                onMouseDown={(e) => {
                    // Deselect when clicked on empty area
                    if (e.target === e.target.getStage()) {
                        setSelectedShapeId(null);
                    }
                }}
            >
                <Layer>
                    {shapes.map((shape) => {
                        if (shape.type === "circle") {
                            return (
                                <Circle
                                    key={shape.id}
                                    id={shape.id}
                                    x={shape.x}
                                    y={shape.y}
                                    radius={50}
                                    fill="blue"
                                    draggable
                                // onClick={() => handleSelect(shape.id)}
                                />
                            );
                        } else if (shape.type === "rect") {
                            return (
                                <Rect
                                    key={shape.id}
                                    id={shape.id}
                                    x={shape.x}
                                    y={shape.y}
                                    width={100}
                                    height={50}
                                    fill="red"
                                    draggable
                                // onClick={() => handleSelect(shape.id)}
                                />
                            );
                        } else if (shape.type === "ellipse") {
                            return (
                                <Ellipse
                                    key={shape.id}
                                    id={shape.id}
                                    x={shape.x}
                                    y={shape.y}
                                    radiusX={100}
                                    radiusY={50}
                                    fill="green"
                                    draggable
                                // onClick={() => handleSelect(shape.id)}
                                />
                            );
                        }
                        return null;
                    })}
                    {selectedShapeId && (
                        <Transformer
                            ref={transformerRef}
                            rotateEnabled={true}
                            flipEnabled={true}
                        // onClick={handleDelete}
                        />
                    )}
                </Layer>
            </Stage>
        </div>
    );
};

export default Canvas;
