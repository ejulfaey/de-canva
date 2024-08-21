import { ShapeAtom, ShapeType } from "@/lib/atom-service";
import { useAtom } from "jotai/react";
import { atom } from 'jotai';

const selectedShapeIdAtom = atom<string | null>(null);

const useShapeAtom = () => {

    const [shapes, setShapes] = useAtom(ShapeAtom);

    const [selectedShapeId, setSelectedShapeId] = useAtom(selectedShapeIdAtom);


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

    const removeShape = (id: string) => {
        // const filteredShapes: ShapeType[] = shapes.filter((_: ShapeType, i: number) => i === index);
        // const filteredShapes = shapes.filter((x) => id !== x.id);
        // setShapes(filteredShapes);

        setShapes((prevShapes) => {
            // Find index of the shape to remove
            const index = prevShapes.findIndex((shape) => shape.id === id);
            if (index !== -1) {
                // Remove the shape at the found index
                const newShapes = prevShapes.slice();
                newShapes.splice(index, 1);
                return newShapes;
            }
            return prevShapes;
        });
    }

    const editShape = (index: number, options: Partial<ShapeType>) => {
        setShapes((prevShapes) => {
            // Create a new array with the updated shape
            const updatedShapes = [...prevShapes];
            const shapeToUpdate = updatedShapes[index];
    
            if (shapeToUpdate) {
                updatedShapes[index] = {
                    type: shapeToUpdate.type,
                    ...options,
                };
            }
            
            console.log(updatedShapes[index], updatedShapes[index]?.width)
            return updatedShapes;
        });
    };
    


    const selectShape = (id: string | null) => {
        setSelectedShapeId(id);
    };

    const clearShapes = () => {
        setShapes([]);
        setSelectedShapeId(null);
    }


    return {
        shapes,
        addShape,
        removeShape,
        editShape,
        selectShape,
        selectedShapeId,
        clearShapes,
    }
}

export default useShapeAtom;