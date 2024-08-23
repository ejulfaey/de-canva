import useShapeAtom from "@/hooks/useShapeAtom";
import { ShapeType } from "@/lib";
import { Circle, Rect, Ellipse } from "react-konva";

interface Props {
  index: number;
  shape: ShapeType;
}

const CustomShape = ({ shape, index }: Props) => {
  const { selectShape, editShape } = useShapeAtom();
  const commonProps = {
    id: shape.id,
    x: shape.x,
    y: shape.y,
    fill: shape?.fill as string,
    scaleX: shape?.scaleX as number,
    scaleY: shape?.scaleY as number,
    rotation: shape?.rotation as number,
    stroke: shape?.stroke as string,
    strokeWidth: shape?.strokeWidth as number,
    draggable: true,
    onClick: () => shape.id && selectShape(shape.id),
    onDragEnd: (e: any) => editShape(index, e.target.attrs),
    onTransformEnd: (e: any) => editShape(index, e.target.attrs),
  };

  switch (shape.type) {
    case "circle":
      return (
        <Circle {...commonProps} radius={shape.radius as number} />
      );
    case "rect":
      return (
        <Rect
          {...commonProps}
          width={shape.width as number}
          height={shape.height as number}
          // fill={shape.fill as string}
        />
      );
    case "ellipse":
      return (
        <Ellipse
          {...commonProps}
          radiusX={shape.radiusX as number}
          radiusY={shape.radiusY as number}
          // fill={shape.fill as string}
        />
      );
    default:
      return null;
  }
};

export default CustomShape;
