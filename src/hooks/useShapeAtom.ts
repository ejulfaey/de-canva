import { ShapeAtom, ShapeType } from "@/lib/atom-service";
import { useAtom } from "jotai/react";
import { atom } from 'jotai';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const selectedShapeIdAtom = atom<string | null>(null);

const useShapeAtom = () => {

    const [shapes, setShapes] = useAtom(ShapeAtom);

    const [selectedShapeId, setSelectedShapeId] = useAtom(selectedShapeIdAtom);


    const addShape = (shape: ShapeType) => {
        console.log('added shape')
        setShapes([
            ...shapes,
            {
                ...shape,
                id: Math.random().toString(36),
            }
        ])
    }

    const removeShape = (id: string) => {
        // const filteredShapes: ShapeType[] = shapes.filter((_: ShapeType, i: number) => i === index);
        // const filteredShapes = shapes.filter((x) => id !== x.id);
        // setShapes(filteredShapes);

        setShapes((prevShapes) => {
            // Find index of the shape to remove
            const index = prevShapes.findIndex((shape) => shape.id === id);
            if (index !== -1) {
                // Remove the shape at the found index
                const newShapes = prevShapes.slice();
                newShapes.splice(index, 1);
                return newShapes;
            }
            return prevShapes;
        });
    }

    const editShape = (index: number, options: Partial<ShapeType>) => {
        setShapes((prevShapes) => {
            // Create a new array with the updated shape
            const updatedShapes = [...prevShapes];
            const shapeToUpdate = updatedShapes[index];

            if (shapeToUpdate) {
                updatedShapes[index] = {
                    type: shapeToUpdate.type,
                    ...options,
                };
            }

            console.log(updatedShapes[index], updatedShapes[index]?.width)
            return updatedShapes;
        });
    };



    const selectShape = (id: string | null) => {
        setSelectedShapeId(id);
    };

    const clearShapes = () => {
        setShapes([]);
        setSelectedShapeId(null);
    }

    const moveForward = () => {
        if (!selectedShapeId) return;
        const index = shapes.findIndex(shape => shape.id === selectedShapeId);
        // if (index < shapes.length - 1) {
        //     const newShapes = [...shapes];
        //     [newShapes[index], newShapes[index + 1]] = [newShapes[index + 1], newShapes[index]];
        //     setShapes(newShapes);
        // }

        if (index >= 0 && index < shapes.length - 1) {
            const newShapes = [...shapes];
            const [movedShape] = newShapes.splice(index, 1);
            newShapes.push(movedShape);
            setShapes(newShapes);
        }
    };

    const bringBackward = () => {
        if (!selectedShapeId) return;
        const index = shapes.findIndex(shape => shape.id === selectedShapeId);
        // if (index > 0) {
        //     const newShapes = [...shapes];
        //     [newShapes[index], newShapes[index - 1]] = [newShapes[index - 1], newShapes[index]];
        //     setShapes(newShapes);
        // }
        if (index > 0) {
            const newShapes = [...shapes];
            const [movedShape] = newShapes.splice(index, 1);
            newShapes.unshift(movedShape);
            setShapes(newShapes);
        }
    };

    const exportJPG = (id: string) => {
        const stage = document.getElementById(id) as HTMLDivElement | null;
        if (stage) {
            const stageCanvas = stage.querySelector("canvas") as HTMLCanvasElement;
            if (stageCanvas) {
                const context = stageCanvas.getContext("2d");
                if (context) {
                    // Get the computed background color from the stage element
                    const computedStyle = getComputedStyle(stage);
                    const bgColor = computedStyle.backgroundColor || "white";

                    // Create a temporary canvas to merge the background color
                    const tempCanvas = document.createElement("canvas");
                    const tempContext = tempCanvas.getContext("2d");

                    if (tempContext) {
                        tempCanvas.width = stageCanvas.width;
                        tempCanvas.height = stageCanvas.height;

                        // Fill with background color
                        tempContext.fillStyle = bgColor;
                        tempContext.fillRect(0, 0, stageCanvas.width, stageCanvas.height);

                        // Draw the original canvas on top of the background
                        tempContext.drawImage(stageCanvas, 0, 0);

                        // Get the data URL from the temporary canvas
                        const dataURL = tempCanvas.toDataURL("image/jpeg");

                        // Create a link to download the image
                        const link = document.createElement("a");
                        link.href = dataURL;
                        link.download = "canvas-export.jpg";
                        link.click();
                    } else {
                        console.error("Unable to get context for temporary canvas");
                    }
                } else {
                    console.error("Unable to get 2D context from the canvas");
                }
            } else {
                console.error("Canvas element not found within the stage");
            }
        } else {
            console.error("Stage element not found");
        }
    };


    const exportPNG = (id: string) => {
        const stage = document.getElementById(id) as HTMLDivElement | null;
        if (stage) {
            const stageCanvas = stage.querySelector("canvas") as HTMLCanvasElement;
            if (stageCanvas) {
                const dataURL = stageCanvas.toDataURL();
                const link = document.createElement("a");
                link.href = dataURL;
                link.download = "canvas-export.png";
                link.click();
            } else {
                console.error("Canvas element not found within the stage");
            }
        } else {
            console.error("Stage element not found");
        }
    }

    const exportPDF = (id: string) => {
        const stage = document.getElementById(id) as HTMLDivElement | null;

        if (!stage) {
            console.error('No error found with ID ${canvasId}');
            return;
        }

        html2canvas(stage).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('portrait', 'mm', [210, 297]);
            pdf.addImage(imgData, 'PNG', 0, 0, 210, 297);
            pdf.save('canvas-export.pdf');
        }).catch((error) => {
            console.error('Failed to export PDF:', error);
        });

    }


    return {
        shapes,
        addShape,
        removeShape,
        editShape,
        selectShape,
        selectedShapeId,
        clearShapes,
        moveForward,
        bringBackward,
        exportPNG,
        exportJPG,
        exportPDF,
    }
}

export default useShapeAtom;