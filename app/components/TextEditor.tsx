import ReactQuill from "react-quill";
import * as Y from "yjs";
import { QuillBinding } from "y-quill";

import { useQuery, useMutation } from "convex/react";
import { useEffect, useRef, useState } from "react";
import { api } from "../../convex/_generated/api";


import type { ReactQuillProps } from "react-quill";

import styles from "./Editor.module.css";
import "react-quill/dist/quill.snow.css";

const LOCAL_STORAGE_KEY = "local storage key";

export default function TextEditor(props: ReactQuillProps) {
  const inputValue = useQuery(api.input.getInputValue);
  const [text, setText] = useState<Y.Text>();
  // const [provider, setProvider] = useState<any>();

  const isLoading = (query: unknown): query is undefined | null => {
    return query === undefined || query === null;
  };

  // update local copy when db updates
   useEffect(() => {
    const yDoc = new Y.Doc();
    const yText = yDoc.getText("quill");
    // const yProvider = new LiveblocksProvider(room, yDoc);

    setText(yText);
    // setProvider(yProvider);

    return () => {
      yDoc?.destroy();
      // yProvider?.destroy();
    };

  }, []);


  if (!text 
    // || !provider
    ) {
    return null;
  }

  return (
    <QuillEditor
      modules={{ toolbar: false }}
      formats={[]}
      yText={text}
      provider={4}
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
    let quill: ReturnType<ReactQuill["getEditor"]>;
    let binding: QuillBinding;

    if (!reactQuillRef.current) {
      return;
    }

    quill = reactQuillRef.current.getEditor();
    binding = new QuillBinding(yText, quill, provider.awareness);
    return () => {
      binding?.destroy?.();
    };
  }, [yText, provider]);

  return (
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