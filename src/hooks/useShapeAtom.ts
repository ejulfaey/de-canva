import { ShapeAtom, ShapeType } from "@/lib/atom-service";
import { useAtom } from "jotai/react";

const useShapeAtom = () => {

    const [shapes, setShapes] = useAtom(ShapeAtom);

    const addShape = (shape: ShapeType) => {
        console.log('added shape')
        setShapes([
            ...shapes,
            {
                ...shape,
                id: Math.random().toString(36),
            }
        ])
    }

    const removeShape = (index: number) => {
        const filteredShapes: ShapeType[] = shapes.filter((_: ShapeType, i: number) => i === index);
        setShapes(filteredShapes);
    }

    const editShape = (index: number, options: Partial<ShapeType>) => {
        setShapes((prevShapes) => {
            const newShapes = [...prevShapes];
            const shape = newShapes[index];

            if (shape) {
                newShapes[index] = {
                    ...shape,
                    ...options,
                };
            }

            return newShapes;
        });
    }

    return {
        shapes,
        addShape,
        removeShape,
        editShape,
    }
}

export default useShapeAtom;