import React, { useRef } from "react";
import { Stage, Layer, Transformer } from "react-konva";
import Konva from "konva";
import useShapeAtom from "@/hooks/useShapeAtom";
import { CustomShape } from "./CustomShape";

interface Props {
    containerSize: { width: number; height: number };
    containerRef: React.RefObject<HTMLDivElement>;
    id: string;
}

const Canvas = ({ id, containerRef, containerSize }: Props) => {

    const stageRef = useRef<Konva.Stage>(null);
    const transformerRef = useRef<Konva.Transformer>(null);
    const { shapes, selectedShapeId, selectShape } = useShapeAtom();

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
            onDragOver={(e) => e.preventDefault()}
            className="flex-1 flex items-center max-w-3xl w-full h-full"
        >
            <Stage
                ref={stageRef}
                className="bg-slate-100 "
                id = {id}
                width = {containerSize.width}
                height = {containerSize.height}
                onMouseDown = {(e) => {
                    // Deselect when clicked on empty area
                    if (e.target === e.target.getStage()) {
                        selectShape(null);
                    }
                }}
            >
                <Layer>
                {shapes.map((shape, index) => (
                    <CustomShape
                        key={shape.id}
                        shape={shape}
                        index={index}
                    />
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
