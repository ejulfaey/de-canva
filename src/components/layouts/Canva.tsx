import React, { useRef } from "react";
import { Stage, Layer, Circle, Rect, Ellipse, Transformer } from "react-konva";
import Konva from "konva";
import useShapeAtom from "@/hooks/useShapeAtom";

interface Props {
    containerSize: { width: number; height: number };
    containerRef: React.RefObject<HTMLDivElement>;
}

const Canvas = ({ containerSize, containerRef }: Props) => {
    // const [selectedShapeId, setSelectedShapeId] = useState<string | null>(null);
    const stageRef = useRef<Konva.Stage>(null);
    const transformerRef = useRef<Konva.Transformer>(null);
    const { shapes, selectShape, selectedShapeId, editShape } = useShapeAtom();


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
            } else {
                selectShape(null); // Deselect shape if not found
            }
        }
        else if (transformer) {
            transformer.nodes([]);
        }

    }, [selectedShapeId, shapes, selectShape]);

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
                    //     if (e.target === e.target.getStage()) {
                    //         setSelectedShapeId(null);
                    //     }
                    // }}

                    // Deselect when clicked on empty area
                    if (e.target === e.target.getStage()) {
                        selectShape(null);
                    }
                }}
            >
                <Layer>
                    {shapes.map((shape, index) => {
                        if (shape.type === "circle") {
                            return (
                                <Circle
                                    key={shape.id}
                                    id={shape.id}
                                    x={shape.x}
                                    y={shape.y}
                                    radius={shape.radius as number}
                                    scaleX={shape?.scaleX as number}
                                    scaleY={shape?.scaleY as number}
                                    rotation={shape?.rotation as number}
                                    fill="blue"
                                    draggable
                                    onClick={() => shape.id && selectShape(shape.id)}
                                    onDragEnd={(e) => editShape(index, e.target.attrs)}
                                    onTransformEnd={(e) => editShape(index, e.target.attrs)}
                                />
                            );
                        } else if (shape.type === "rect") {
                            return (
                                <Rect
                                    key={shape.id}
                                    id={shape.id}
                                    x={shape.x}
                                    y={shape.y}
                                    width={shape.width as number}
                                    height={shape.height as number}
                                    scaleX={shape?.scaleX as number}
                                    scaleY={shape?.scaleY as number}
                                    rotation={shape?.rotation as number}
                                    fill="red"
                                    draggable
                                    onClick={() => selectShape(shape?.id as string)}
                                    onDragEnd={(e) => editShape(index, e.target.attrs)}
                                    onTransformEnd={(e) => editShape(index, e.target.attrs)}
                                />
                            );
                        } else if (shape.type === "ellipse") {
                            return (
                                <Ellipse
                                    key={shape.id}
                                    id={shape.id}
                                    x={shape.x}
                                    y={shape.y}
                                    radiusX={shape.radiusX as number}
                                    radiusY={shape.radiusY as number}
                                    scaleX={shape?.scaleX as number}
                                    scaleY={shape?.scaleY as number}
                                    rotation={shape?.rotation as number}
                                    fill="green"
                                    draggable
                                    onClick={() => shape.id && selectShape(shape.id)}
                                    onDragEnd={(e) => editShape(index, e.target.attrs)}
                                    onTransformEnd={(e) => editShape(index, e.target.attrs)}

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
