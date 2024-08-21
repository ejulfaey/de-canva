// import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
// import { Skeleton } from "../ui/skeleton";

const Sidebar = () => {

    const handleDragStart = (event: React.DragEvent<HTMLDivElement>, shape: { type: string }) => {
        event.dataTransfer.setData("shape", shape.type);
    };

    const shapes = [
        { id: "circle", type: "circle" },
        { id: "rect", type: "rectangle" },
        { id: "ellipse", type: "ellipse" },
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
                                draggable
                                onDragStart={(e) => handleDragStart(e, shape)}
                            >
                                {shape.type}
                            </div>
                        ))
                    }
                </div>
            </ScrollArea>
        </div>

    );
};

export default Sidebar;