import useShapeAtom from "@/hooks/useShapeAtom";
import { Button } from "../ui/button";
import {
  BringToFrontIcon,
  Download,
  SendToBackIcon,
  Trash2,
  X,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export const ToolBar = () => {
  const {
    clearShapes,
    selectedShapeId,
    removeShape,
    moveForward,
    bringBackward,
    exportPNG,
    exportJPG,
    exportPDF,
  } = useShapeAtom();

  return (
    <div className="px-4 py-2 bg-white flex justify-between">
      <div className="flex gap-x-2">
        {selectedShapeId && (
          <>
            <Button onClick={moveForward} size="icon" variant="outline">
              <BringToFrontIcon />
            </Button>
            <Button onClick={bringBackward} size="icon" variant="outline">
              <SendToBackIcon />
            </Button>
            <Button
              onClick={() => removeShape(selectedShapeId)}
              size="icon"
              variant="outline"
            >
              <X />
            </Button>
          </>
        )}
      </div>
      <div className="flex gap-x-2">
        <Button onClick={clearShapes} size="icon" variant="outline">
          <Trash2 />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button onClick={clearShapes} size="icon" variant="outline">
              <Download />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuLabel className="text-base">
              Export As
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Button
                onClick={() => exportJPG("konvas-id")}
                className="flex items-center gap-2 w-full"
              >
                JPG
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Button
                onClick={() => exportPNG("konvas-id")}
                className="flex items-center gap-2 w-full"
              >
                PNG
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Button
                onClick={() => exportPDF("konvas-id")}
                className="flex items-center gap-2 w-full"
              >
                PDF
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
