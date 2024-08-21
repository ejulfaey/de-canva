// import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import useShapeAtom from "@/hooks/useShapeAtom";
// import { Skeleton } from "../ui/skeleton";

type ShapeList = {
    id: string;
    label: string;
}

interface Props {
    containerSize: { width: number; height: number }
}

const SidebarDragDrop = ({ containerSize }: Props) => {

    // const handleDragStart = (event: React.DragEvent<HTMLDivElement>, shape: { type: string }) => {
    //     event.dataTransfer.setData("shape", shape.type);
    // };
    // const { addShape, clearShape } = useShapeAtom();
    const { addShape } = useShapeAtom();

    const handleClick = ({ id }: ShapeList) => {

        if (id === 'circle' || id === 'ellipse') {
            addShape({
                type: id,
                x: containerSize.width / 2,
                y: containerSize.height / 2,
            })
        } else {
            addShape({
                type: id,
                x: containerSize.width / 2 - 50,
                y: containerSize.height / 2 - 25,
            })

        }
    }

    const shapes: ShapeList[] = [
        { id: "circle", label: 'Circle' },
        { id: "rect", label: 'Rectangle' },
        { id: "ellipse", label: 'Ellipse' },
    ];

    return (
        <div className="p-4 h-screen max-w-sm w-full bg-gray-800 text-gray-400 flex flex-col space-y-4">
            {/* <Input /> */}
            <ScrollArea className="overflow-y-auto">
                <div className="grid grid-cols-2 gap-2">
                    {
                        shapes.map((shape) => (
                            <div
                                key={shape.id}
                                className="w-full h-44 flex items-center justify-center border border-gray-500 rounded cursor-pointer"
                                // draggable
                                // onDragStart={(e) => handleDragStart(e, shape)}
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

export default SidebarDragDrop;