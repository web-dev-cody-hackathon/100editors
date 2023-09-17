import ReactQuill from "react-quill";
import * as Y from "yjs";
import { QuillBinding } from "y-quill";
// TODO acutally fix this
// @ts-ignore because the types don't want to work :(
import { WebrtcProvider } from "y-webrtc";

import { useQuery } from "convex/react";
import { useEffect, useRef, useState } from "react";
import { api } from "../../convex/_generated/api";

import type { ReactQuillProps } from "react-quill";

import styles from "./Editor.module.css";
import "react-quill/dist/quill.snow.css";

export default function TextEditor(props: ReactQuillProps) {
  const inputValue = useQuery(api.input.getInputValue);
  const [text, setText] = useState<Y.Text>();
  const [provider, setProvider] = useState<any>();

  const isLoading = (query: unknown): query is undefined | null => {
    return query === undefined || query === null;
  };

  useEffect(() => {
    const yDoc = new Y.Doc();
    const yText = yDoc.getText("quill");
    // default of 20 max connections
    const yProvider = new WebrtcProvider("quill-demo-room", yDoc, { signaling: ['ws://webrtc-production-ed77.up.railway.app',
    ] });

    setText(yText);
    setProvider(yProvider);

    return () => {
      yDoc?.destroy();
      yProvider?.destroy();
    };
  }, []);

  if (!text || !provider) {
    return <h1>your code is broken</h1>;
  }

  return (
    <QuillEditor
      modules={{ toolbar: false }}
      formats={[]}
      yText={text}
      provider={provider}
      readOnly={isLoading(inputValue)}
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
