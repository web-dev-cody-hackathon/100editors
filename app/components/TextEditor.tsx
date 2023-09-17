import ReactQuill from "react-quill";
import * as Y from "yjs";
import { QuillBinding } from "y-quill";
// @ts-ignore types aren't exported correctly. They are taken directly from a copy of the type file below
import { WebrtcProvider } from "y-webrtc";
import type { WebrtcProvider as WebrtcProviderType } from "../types/y-webrtc";

import { useEffect, useRef, useState } from "react";

import type { ReactQuillProps } from "react-quill";

import "react-quill/dist/quill.snow.css";

export default function TextEditor(props: ReactQuillProps) {
  const [text, setText] = useState<Y.Text>();
  const [provider, setProvider] = useState<WebrtcProviderType>();

  useEffect(() => {
    const yDoc = new Y.Doc();
    const yText = yDoc.getText("quill");
    // default of 20 max connections
    const yProvider: WebrtcProviderType = new WebrtcProvider(
      "quill-demo-room",
      yDoc,
      { signaling: ["ws://webrtc-production-ed77.up.railway.app"] }
    );

    setText(yText);
    setProvider(yProvider);

    return () => {
      yDoc.destroy();
      yProvider.destroy();
    };
  }, []);

  // TODO proper error handling
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
  provider: WebrtcProviderType;
};

function QuillEditor({ yText, provider }: EditorProps) {
  const reactQuillRef = useRef<ReactQuill>(null);
  // Set up Yjs and Quill
  useEffect(() => {
    if (!reactQuillRef.current) {
      return;
    }

    const quill = reactQuillRef.current.getEditor();
    const binding = new QuillBinding(yText, quill, provider.awareness);

    return () => {
      binding?.destroy?.();
    };
  }, [provider.awareness, yText]);

  return (
    <div className="flex flex-col relative w-full h-ful rounded-xl">
      <div className="relative h-full">
        <ReactQuill
          className="grow w-full h-full p-4 rounded-[inherit]"
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
