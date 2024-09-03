import { selectedShape, selectedText, ShapeAtom } from "@/lib/jotai-service";
import { useAtom } from "jotai/react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { ShapeType } from "@/lib";

const useShapeAtom = () => {
  const [shapes, setShapes] = useAtom(ShapeAtom);
  const [selectedId, setSelectedId] = useAtom(selectedShape);
  const [editTextId, setEditTextId] = useAtom(selectedText);

  const selectShape = (id: string | null) => setSelectedId(id);

  const currentShape: ShapeType | undefined = selectedId ? shapes.find(shape => shape.id === selectedId) : undefined;

  const addShape = (shape: ShapeType) =>
    setShapes([
      ...shapes,
      {
        ...shape,
        id: Math.random().toString(36),
      },
    ]);

  const removeShape = () =>
    setShapes((prev) => prev.filter((x) => selectedId !== x.id));

  const editShape = (index: number, options: Partial<ShapeType>) =>
    setShapes((prev) => {
      const updatedShapes = [...prev];
      const shapeToUpdate = updatedShapes[index];

      if (shapeToUpdate) {
        updatedShapes[index] = {
          type: shapeToUpdate.type,
          ...options,
        };
      }
      return updatedShapes;
    });

  const clearShapes = () => {
    setShapes([]);
    setSelectedId(null);
  };

  const moveForward = () => {
    if (!selectedId) return;
    const index = shapes.findIndex((shape) => shape.id === selectedId);
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
    if (!selectedId) return;
    const index = shapes.findIndex((shape) => shape.id === selectedId);
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
  };

  const exportPDF = (id: string) => {
    const stage = document.getElementById(id) as HTMLDivElement | null;

    if (!stage) {
      console.error("No error found with ID ${canvasId}");
      return;
    }

    html2canvas(stage)
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("portrait", "mm", [210, 297]);
        pdf.addImage(imgData, "PNG", 0, 0, 210, 297);
        pdf.save("canvas-export.pdf");
      })
      .catch((error) => {
        console.error("Failed to export PDF:", error);
      });
  };

  const exportAs = (type: string, id: string) => {
    switch (type) {
      case "jpg":
        exportJPG(id);
        break;
      case "pdf":
        exportPDF(id);
        break;
      default:
        exportPNG(id);
        break;
    }
    return;
  };

  const changeColor = (color: string) => {
    setShapes((prevShapes) => {
      return prevShapes.map(shape =>
        shape.id === selectedId ? { ...shape, fill: color } : shape
      );
    });
  };


  const textDoubleClick = (id: string) => {
    setEditTextId(id);
  };

  const editTextChange = (id: string, newText: string) => {
    setShapes((prev) => {
      const index = prev.findIndex(shape => shape.id === id); // Find the index of the shape by ID
      if (index === -1) return prev; // Return the previous state if the shape is not found
  
      const updatedShapes = [...prev];
      updatedShapes[index] = {
        ...updatedShapes[index],
        text: newText, // Update the text property
      };
      return updatedShapes;
    });
  
    setEditTextId(null); // Clear the editTextId after updating
  };
  
  

  // const editTextChange = (id: string, newText: string) => {
  //   const numericId = Number(id);
  //   if (!isNaN(numericId)) {
  //     editShape(numericId, { text: newText });
  //   } else {
  //     console.error('Invalid ID');
  //   }
  //   setEditTextId(null);
  // };



  return {
    shapes,
    selectedId,
    currentShape,
    addShape,
    removeShape,
    editShape,
    selectShape,
    clearShapes,
    moveForward,
    bringBackward,
    exportAs,
    changeColor,
    textDoubleClick,
    editTextChange,

  };
};

export default useShapeAtom;