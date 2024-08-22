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
    selectedId,
    clearShapes,
    removeShape,
    moveForward,
    bringBackward,
    exportAs,
  } = useShapeAtom();

  return (
    <div className="px-4 py-2 w-full bg-white flex justify-between">
      <div className="flex gap-x-2">
        {selectedId && (
          <>
            <Button onClick={moveForward} size="icon" variant="outline">
              <BringToFrontIcon />
            </Button>
            <Button onClick={bringBackward} size="icon" variant="outline">
              <SendToBackIcon />
            </Button>
            <Button
              onClick={removeShape}
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
          <DropdownMenuContent align="end" className="w-64">
            <DropdownMenuLabel className="text-base">
              Export As
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Button
                onClick={() => exportAs("png", "konvas-id")}
                className="w-full"
              >
                JPG
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Button
                onClick={() => exportAs("jpg", "konvas-id")}
                className="w-full"
              >
                PNG
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Button
                onClick={() => exportAs("pdf", "konvas-id")}
                className="w-full"
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
