import useContainer from "@/hooks/useContainer";
import { ScrollArea } from "../ui/scroll-area";
import useShapeAtom from "@/hooks/useShapeAtom";

type ShapeList = {
  id: string;
  label: string;
  fill: string,
};

const Sidebar = () => {
  const { addShape } = useShapeAtom();
  const { containerSize } = useContainer();

  // const handleClick = ({ id, fill }: ShapeList) => {
  //   const commonProps = {
  //     type: id,
  //     x: containerSize.width / 2,
  //     y: containerSize.height / 2,
  //     fill,
  //     stroke: '#252c36',
  //     strokeWidth: 1.5,
  //   };

  //   const shapeProps =
  //     id === "circle" || id === "ellipse"
  //       ? { radius: 50, radiusX: 100, radiusY: 50 }
  //       : { x: commonProps.x - 50, y: commonProps.y - 25, height: 50, width: 100 };

  //   addShape({ ...commonProps, ...shapeProps });
  // };

  const handleClick = ({ id, fill }: ShapeList) => {
    const commonProps = {
      type: id,
      x: containerSize.width / 2,
      y: containerSize.height / 2,
      fill,
      stroke: '#252c36',
      strokeWidth: 1.5,
    };

    if (id === "add-text") {
      addShape({
        ...commonProps,
        text: "Double-click to edit",
        fontSize: 20,
        fontFamily: "Arial",
        align: "center",
        draggable: true,
        width: 200,
      });
    } else {
      const shapeProps =
        id === "circle" || id === "ellipse"
          ? { radius: 50, radiusX: 100, radiusY: 50 }
          : { x: commonProps.x - 50, y: commonProps.y - 25, height: 50, width: 100 };

      addShape({ ...commonProps, ...shapeProps });
    }
  };


  const shapes: ShapeList[] = [
    { id: "circle", label: "Circle", fill: "#fff" },
    { id: "rect", label: "Rectangle", fill: "#fff" },
    { id: "ellipse", label: "Ellipse", fill: "#fff" },
    { id: "add-text", label: "Add Text", fill: "#fff" },
  ];


  return (
    <div className="h-full max-w-sm w-full bg-gray-800 text-gray-400 flex flex-col space-y-4">
      <ScrollArea className="p-4 overflow-y-auto">
        <div className="grid grid-cols-2 gap-2">
          {shapes.map((shape) => (
            <div
              key={shape.id}
              className="w-full h-44 flex items-center justify-center border border-gray-500 rounded cursor-pointer"
              onClick={() => handleClick(shape)}
            >
              {shape.label}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default Sidebar;
