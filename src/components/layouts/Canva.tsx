import React, { useState, useRef } from "react";
import { Stage, Layer, Circle, Rect, Ellipse, Transformer } from "react-konva";
import Konva from "konva";


const Canvas = () => {
    const [shapes, setShapes] = useState<{ x: number, y: number, type: string, id: string }[]>([]);
    const [selectedShapeId, setSelectedShapeId] = useState<string | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const stageRef = useRef<Konva.Stage>(null);
    const transformerRef = useRef<Konva.Transformer>(null);
    const [containerWidth, setContainerWidth] = useState<number>(0);
    const [containerHeight, setContainerHeight] = useState<number>(0);


    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();

        const stage = stageRef.current;
        if (!stage) return;

        const point = stage.getPointerPosition();
        const shapeType = event.dataTransfer.getData("shape");

        if (!point || !shapeType) return;

        const newShape = {
            x: containerWidth / 2,
            y: containerHeight /2,
            type: shapeType,
            id: `${shapeType}-${shapes.length}`,
        };

        setShapes([...shapes, newShape]);
    };

    const handleSelect = (id: string) => {
        setSelectedShapeId(id);
    };

    const handleDelete = () => {
        if (selectedShapeId) {
            setShapes(shapes.filter(shape => shape.id !== selectedShapeId));
            setSelectedShapeId(null);
        }
    };

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

    React.useEffect(() => {
        const updatePosition = () => {
            if (containerRef.current) {
                setContainerWidth(containerRef.current.offsetWidth);
                setContainerHeight(containerRef.current.offsetHeight);

            }
        };

        // Update width on initial render and when window resizes
        updatePosition();
        window.addEventListener('resize', updatePosition);

        // Clean up event listener on component unmount
        return () => window.removeEventListener('resize', updatePosition);
    }, []);


    return (
        <div
            ref={containerRef}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            className="max-w-2xl w-full bg-white h-full"
        >
            <Stage
                ref={stageRef}
                className="bg-indigo-100"
                width={containerWidth}
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
                                    onClick={() => handleSelect(shape.id)}
                                />
                            );
                        } else if (shape.type === "rectangle") {
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
                                    onClick={() => handleSelect(shape.id)}
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
                                    onClick={() => handleSelect(shape.id)}
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
                            onClick={handleDelete}
                        />
                    )}
                </Layer>
            </Stage>
        </div>
    );
};

export default Canvas;
