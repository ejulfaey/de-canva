import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import { Skeleton } from "../ui/skeleton";

const Sidebar = () => {
    return (
        <div className="p-4 h-full max-w-sm w-full bg-gray-800 text-gray-400 flex flex-col space-y-4">
            <Input />
            <ScrollArea className="overflow-y-auto">
                <div className="grid grid-cols-2 gap-2">
                    {
                        Array.from({ length: 12 }).map((_, i) => (
                            <Skeleton key={i} className="w-full h-44 animate-none" />
                        ))
                    }
                </div>
            </ScrollArea>
        </div>

    );
};

export default Sidebar;