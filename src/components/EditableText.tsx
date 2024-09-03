import React, { useRef, useState, useEffect } from 'react';
import { Text, Transformer, Group } from 'react-konva';
import Konva from 'konva';

const EditableText: React.FC = () => {
  const [text, setText] = useState<string>('Some text here');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const textRef = useRef<Konva.Text>(null);
  const groupRef = useRef<Konva.Group>(null);
  const trRef = useRef<Konva.Transformer>(null);
  const [textareaPosition, setTextareaPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [textareaSize, setTextareaSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 });

  useEffect(() => {
    if (textRef.current) {
      const { x, y, width, height } = textRef.current.getClientRect();
      setTextareaPosition({ x, y });
      setTextareaSize({ width, height });
    }
  }, [text]);

  useEffect(() => {
    if (trRef.current && textRef.current) {
      trRef.current.nodes([textRef.current]);
    }
  }, [text]);

  const handleTransform = () => {
    const node = textRef.current;
    if (node) {
      node.setAttrs({
        width: node.width() * node.scaleX(),
        scaleX: 1,
      });
    }
  };

  const handleDblClick = () => {
    if (textRef.current) {
      const { x, y, width, height } = textRef.current.getClientRect();
      setTextareaPosition({ x, y });
      setTextareaSize({ width, height });
      setIsEditing(true);
    }
  };

  const handleTextAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const handleTextAreaBlur = () => {
    setIsEditing(false);
  };

  return (
    <>
      <Group ref={groupRef}>
        <Text
          text={text}
          x={50}
          y={80}
          fontSize={20}
          width={200}
          ref={textRef}
          onTransform={handleTransform}
          onDblClick={handleDblClick}
          draggable
        />
        {isEditing && (
          <Transformer
            ref={trRef}
            enabledAnchors={['middle-left', 'middle-right']}
            boundBoxFunc={(oldBox, newBox) => {
              newBox.width = Math.max(30, newBox.width);
              return newBox;
            }}
          />
        )}
      </Group>
      {isEditing && (
        <textarea
          value={text}
          onChange={handleTextAreaChange}
          onBlur={handleTextAreaBlur}
          style={{
            position: 'absolute',
            top: textareaPosition.y,
            left: textareaPosition.x,
            width: textareaSize.width,
            height: textareaSize.height,
            fontSize: '20px',
            border: 'none',
            padding: '0px',
            margin: '0px',
            overflow: 'hidden',
            background: 'none',
            outline: 'none',
            resize: 'none',
            lineHeight: '1.2',
            fontFamily: 'Arial',
            color: '#000',
            zIndex: 1,
          }}
        />
      )}
    </>
  );
};

export default EditableText;