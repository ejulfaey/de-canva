import { ScrollArea } from "../ui/scroll-area";
import useShapeAtom from "@/hooks/useShapeAtom";

type ShapeList = {
    id: string;
    label: string;
}

interface Props {
    containerSize: { width: number; height: number }
}

const Sidebar = ({ containerSize }: Props) => {

    const { addShape } = useShapeAtom();

    const handleClick = ({ id }: ShapeList) => {

        if (id === 'circle' || id === 'ellipse') {
            addShape({
                type: id,
                x: containerSize.width / 2,
                y: containerSize.height / 2,
                radius: 50,
                radiusX: 100,
                radiusY: 50, 
            })
        } else {
            addShape({
                type: id,
                x: containerSize.width / 2 - 50,
                y: containerSize.height / 2 - 25,
                height: 50,
                width: 100,
            })
        }
    }

    const shapes: ShapeList[] = [
        { id: "circle", label: 'Circle' },
        { id: "rect", label: 'Rectangle' },
        { id: "ellipse", label: 'Ellipse' },
    ];

    return (
        <div className="h-full max-w-sm w-full bg-gray-800 text-gray-400 flex flex-col space-y-4">
            <ScrollArea className="p-4 overflow-y-auto">
                <div className="grid grid-cols-2 gap-2">
                    {
                        shapes.map((shape) => (
                            <div
                                key={shape.id}
                                className="w-full h-44 flex items-center justify-center border border-gray-500 rounded cursor-pointer"
                                onClick={() => handleClick(shape)}
                            >
                                {shape.label}
                            </div>
                        ))
                    }
                </div>
            </ScrollArea>
        </div>

    );
};

export default Sidebar;