import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import useShapeAtom from "@/hooks/useShapeAtom";
import { BringToFrontIcon, Download, Redo, SendToBackIcon, Trash, Trash2, Undo } from "lucide-react";
import { Button } from "../ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu"


const Navbar = () => {

    const { clearShapes, selectedShapeId, removeShape, moveForward, bringBackward, exportPNG, exportJPG, exportPDF } = useShapeAtom();

    const handleExportPNG = () => {
        exportPNG('konvas-id');
    };

    const handleExportJPG = () => {
        exportJPG('konvas-id');
    };

    const handleExportPDF = () => {
        exportPDF('konvas-id');
    };

    return (
        <div className="px-4 py-2 bg-primary text-primary-foreground">
            <div className="flex justify-between">
                <div className="inline-flex items-center gap-x-4 xl:gap-x-6">
                    <a href="#" className="font-mono">Kanvas</a>
                    <div className="inline-flex items-center gap-x-2 xl:gap-x-4">
                        <Undo size={20} />
                        <Redo size={20} />
                        <Button onClick={() => clearShapes()} className="bg-red-400 flex gap-2 items-center p-2 rounded">
                            <Trash2 />
                            Clear All Shapes
                        </Button>
                        {selectedShapeId && (
                            <>
                                <Button onClick={moveForward} className="bg-slate-400 flex gap-2 items-center p-2 rounded">
                                    <BringToFrontIcon size={20} />
                                    Move Forward
                                </Button>
                                <Button onClick={bringBackward} className="bg-slate-400 flex gap-2 items-center p-2 rounded">
                                    <SendToBackIcon size={20} />
                                    Bring Backward
                                </Button>
                                <Button onClick={() => removeShape(selectedShapeId)} className="bg-red-400 flex gap-2 items-center p-2 rounded">
                                    <Trash size={20} />
                                    Remove Selected Shapes
                                </Button>

                            </>
                        )}
                        {/* <Button onClick={handleExportPNG} className="flex items-center gap-2">
                            <Download size={20} />
                            Export PNG
                        </Button>
                        <Button onClick={handleExportPDF} className="flex items-center gap-2">
                            <Download size={20} />
                            Export PDF
                        </Button> */}

                        <DropdownMenu>
                            <DropdownMenuTrigger className="p-2 bg-green-500 rounded flex items-center gap-2 focus:ring-0 focus-visible:outline-none">
                                <Download size={20} />
                                Export
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start">
                                <DropdownMenuLabel className="text-base">Export As</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <Button onClick={handleExportJPG} className="flex items-center gap-2 w-full">
                                        <Download size={20} />
                                        JPG
                                    </Button>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Button onClick={handleExportPNG} className="flex items-center gap-2 w-full">
                                        <Download size={20} />
                                        PNG
                                    </Button>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Button onClick={handleExportPDF} className="flex items-center gap-2 w-full">
                                        <Download size={20} />
                                        PDF
                                    </Button>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

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