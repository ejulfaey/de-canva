import { useState, useRef, useEffect } from "react";
import { Stage, Layer, Circle, Rect, Ellipse, Transformer } from "react-konva";
import Konva from "konva";
import SidebarClick from './SidebarClick'; // Adjust the import path as needed

interface Props {
    onShapeClick: (shapeType: string) => void;
}

const CanvaClick = ({ onShapeClick }: Props) => {
    const [shapes, setShapes] = useState<{ x: number, y: number, type: string, id: string }[]>([]);
    const [selectedShapeId, setSelectedShapeId] = useState<string | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const stageRef = useRef<Konva.Stage>(null);
    const transformerRef = useRef<Konva.Transformer>(null);

    // State variables for container dimensions
    const [containerWidth, setContainerWidth] = useState<number>(0);
    const [containerHeight, setContainerHeight] = useState<number>(0);

    // Update container dimensions on mount and resize
    useEffect(() => {
        const updateDimensions = () => {
            if (containerRef.current) {
                setContainerWidth(containerRef.current.offsetWidth);
                setContainerHeight(containerRef.current.offsetHeight);
            }
        };

        updateDimensions();
        window.addEventListener('resize', updateDimensions);

        return () => window.removeEventListener('resize', updateDimensions);
    }, []);

    // Update transformer when a shape is selected
    useEffect(() => {
        const transformer = transformerRef.current;
        if (transformer && selectedShapeId) {
            const selectedNode = stageRef.current?.findOne(`#${selectedShapeId}`);
            if (selectedNode) {
                transformer.nodes([selectedNode]);
                transformer.getLayer()?.batchDraw();
            }
        }
    }, [selectedShapeId]);

    // Handle shape clicks from the sidebar
    const handleShapeClick = (shapeType: string) => {
        if (containerRef.current) {
            const newShape = {
                x: containerWidth / 2,
                y: containerHeight / 2,
                type: shapeType,
                id: `${shapeType}-${shapes.length}`,
            };

            setShapes([...shapes, newShape]);
        }
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

    return (
        <div className="flex">
            <SidebarClick onShapeClick={onShapeClick} />
            <div
                ref={containerRef}
                className="flex-1 bg-white"
                onDragOver={(e) => e.preventDefault()}
            >
                <Stage
                    ref={stageRef}
                    className="bg-indigo-100 h-full"
                    width={containerWidth}
                    height={containerHeight}
                    onMouseDown={(e) => {
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
        </div>
    );
};

export default CanvaClick;
