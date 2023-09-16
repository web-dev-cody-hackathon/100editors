import ReactQuill from "react-quill";
import * as Y from "yjs";
import { QuillBinding } from "y-quill";
// TODO figure out how to make the types work here
// @ts-ignore because the types don't want to work :(
import { WebrtcProvider } from 'y-webrtc'
import { useEffect, useRef, useState } from "react";

import type { ReactQuillProps } from "react-quill";

import styles from "./Editor.module.css";

export default function TextEditor(props: ReactQuillProps) {
  const [text, setText] = useState<Y.Text>();
  const [provider, setProvider] = useState<any>();

   useEffect(() => {
    const yDoc = new Y.Doc();
    const yText = yDoc.getText("quill");
    const yProvider = new WebrtcProvider('quill-demo-room', yDoc)

    setText(yText);
    setProvider(yProvider);

    return () => {
      yDoc?.destroy();
      yProvider?.destroy();
    };
  }, []);


  // TODO actually error handle?
  if (!text || !provider) {
    return <h1>your code is broken</h1>;
  }

  return (
    <QuillEditor
      modules={{ toolbar: false }}
      formats={[]}
      yText={text}
      provider={provider}
      {...props}
    />
  );
}

type EditorProps = {
  yText: Y.Text;
  provider: any;
};

function QuillEditor({ yText, provider }: EditorProps) {
  const reactQuillRef = useRef<ReactQuill>(null);
  // Set up Yjs and Quill
  useEffect(() => {
    if (!reactQuillRef.current) {
      return;
    }

    let quill = reactQuillRef.current.getEditor();
    let binding = new QuillBinding(yText, quill, provider.awareness);

    return () => {
      binding?.destroy?.();
    };
  }, [provider.awareness, yText]);

  return (
    // TODO use tailwind for this
    <div className={styles.container}>
      <div className={styles.editorContainer}>
        <ReactQuill
          className={styles.editor}
          placeholder="Start typing here…"
          ref={reactQuillRef}
          theme="snow"
          modules={{
            toolbar: false,
            history: {
              // Local undo shouldn't undo changes from remote users
              userOnly: true,
            },
          }}
        />
      </div>
    </div>
  );
}