import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import useShapeAtom from "@/hooks/useShapeAtom"
import { Palette } from "lucide-react"

export function ColorPicker() {

    const { currentShape, changeColor } = useShapeAtom();

    const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => changeColor(e.target.value);

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button size='icon' variant="outline">
                    <Palette />
                </Button>
            </PopoverTrigger>
            <PopoverContent align="start">
                <Input
                    type="color"
                    defaultValue={currentShape?.fill as string}
                    onChange={handleColorChange}
                    className="p-1 w-10 h-10 rounded-full"
                />
            </PopoverContent>
        </Popover>
    )
}
