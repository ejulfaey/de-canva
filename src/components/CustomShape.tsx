import useShapeAtom from '@/hooks/useShapeAtom';
import { ShapeType } from '@/lib/atom-service';
import { Circle, Rect, Ellipse } from 'react-konva';

interface Props {
    index:number;
    shape: ShapeType
}

 const CustomShape = ({ shape, index }: Props) => {

    const {selectShape, editShape } = useShapeAtom();
    const commonProps = {
      id: shape.id,
      x: shape.x,
      y: shape.y,
      scaleX: shape?.scaleX as number,
      scaleY: shape?.scaleY as number,
      rotation: shape?.rotation as number,
      draggable: true,
      onClick: () => shape.id && selectShape(shape.id),
      onDragEnd: (e: any) => editShape(index, e.target.attrs),
      onTransformEnd: (e: any) => editShape(index, e.target.attrs),
    };
  
    switch (shape.type) {
      case 'circle':
        return <Circle {...commonProps} radius={shape.radius as number} fill="blue" />;
      case 'rect':
        return <Rect {...commonProps} width={shape.width as number} height={shape.height as number} fill="red" />;
      case 'ellipse':
        return <Ellipse {...commonProps} radiusX={shape.radiusX as number} radiusY={shape.radiusY as number} fill="green" />;
      default:
        return null;
    }
  };

  export default CustomShape;
