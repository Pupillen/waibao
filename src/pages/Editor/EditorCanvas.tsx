import React, { forwardRef } from 'react';

interface EditorCanvasProps {
  content: string;
  onMouseUp: () => void;
}

export const EditorCanvas = forwardRef<HTMLDivElement, EditorCanvasProps>(
  ({ content, onMouseUp }, ref) => (
    <div
      className="flex-1 p-12 overflow-y-auto outline-none prose prose-slate max-w-none"
      contentEditable
      suppressContentEditableWarning
      onMouseUp={onMouseUp}
      dangerouslySetInnerHTML={{ __html: content }}
      ref={ref}
    />
  )
);

EditorCanvas.displayName = 'EditorCanvas';
