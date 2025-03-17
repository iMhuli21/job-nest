'use client';

import Toolbar from './toolbar';
import StarterKit from '@tiptap/starter-kit';
import ListItem from '@tiptap/extension-list-item';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import { useEditor, EditorContent } from '@tiptap/react';

interface Props {
  value: string;
  onChange: (content: string) => void;
}

export default function RichTextEditor({ onChange, value }: Props) {
  const editor = useEditor({
    extensions: [StarterKit, ListItem, BulletList, OrderedList],
    content: value,
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'border h-[45vh] w-full rounded-md p-4 text-sm overflow-y-auto',
      },
    },
  });

  if (!editor) {
    return null;
  }
  return (
    <div className='space-y-4 w-full rich-text-editor'>
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
