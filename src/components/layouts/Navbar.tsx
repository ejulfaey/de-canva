import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import useShapeAtom from "@/hooks/useShapeAtom";
import { Redo, Trash, Undo } from "lucide-react";

const Navbar = () => {

    const { clearShapes, selectedShapeId, removeShape } = useShapeAtom();

    return (
        <div className="px-4 py-2 bg-primary text-primary-foreground">
            <div className="flex justify-between">
                <div className="inline-flex items-center gap-x-4 xl:gap-x-6">
                    <a href="#" className="font-mono">Kanvas</a>
                    <div className="inline-flex items-center gap-x-2 xl:gap-x-4">
                        <Undo size={20} />
                        <Redo size={20} />
                        <button onClick={() => clearShapes()} className="bg-red-400 text-white p-2 rounded">
                            Clear All Shapes
                        </button>
                        {selectedShapeId && <Trash onClick={() => removeShape(selectedShapeId)} size={20} className="cursor-pointer" />}
                    </div>
                </div>
                <div className="inline-flex items-center">
                    <Avatar className="bg-primary">
                        <AvatarFallback className="w-full text-primary-foreground flex justify-center items-center">DF</AvatarFallback>
                    </Avatar>
                </div>
            </div>
        </div>
    );
};

export default Navbar;