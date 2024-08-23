import { Button } from "@/components/ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import useShapeAtom from "@/hooks/useShapeAtom"
import { Palette } from "lucide-react";
import { TwitterPicker } from 'react-color';

export function ColorPicker() {

    const { currentShape, changeColor } = useShapeAtom();
    const handleColorChange = (color: any) => {
        changeColor(color.hex);
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button size='icon' variant="outline">
                    <Palette />
                </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="p-0 bg-transparent border-none shadow-none">
                <TwitterPicker
                    color={currentShape?.fill as string}
                    onChangeComplete={handleColorChange}

                />
            </PopoverContent>
        </Popover>
    )
}
