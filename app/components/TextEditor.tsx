import ReactQuill, { Quill } from "react-quill";
import QuillCursors from "quill-cursors";
Quill.register("modules/cursors", QuillCursors);

import * as Y from "yjs";
import { QuillBinding } from "y-quill";
// @ts-ignore types aren't exported correctly. They are taken directly from a copy of the type file below
import { WebrtcProvider } from "y-webrtc";
import type { WebrtcProvider as WebrtcProviderType } from "../types/y-webrtc";
import { Rule, Rules } from "./RuleSet/Rules";

import { useEffect, useRef, useState } from "react";

import type { ReactQuillProps } from "react-quill";

import { validateText } from "./RuleSet/RuleValidation";

import "./textEditor.css";
import { Sources } from "quill";

interface TextEditorProps extends ReactQuillProps {
  slug: string;
  setPassedRules: React.Dispatch<React.SetStateAction<Rule[]>>;
  setFailedRules: React.Dispatch<React.SetStateAction<Rule[]>>;
  setIsCompleted: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function TextEditor(props: TextEditorProps) {
  const { setPassedRules, setFailedRules, setIsCompleted, slug } = props;
  const [text, setText] = useState<Y.Text>();
  const [provider, setProvider] = useState<WebrtcProviderType>();

  useEffect(() => {
    const yDoc = new Y.Doc();
    const yText = yDoc.getText(slug);

    // default of 20 max connections
    const yProvider: WebrtcProviderType = new WebrtcProvider(slug, yDoc, {
      signaling: [
        // "wss://webrtc-production-ed77.up.railway.app",
        "ws://localhost:4444",
      ],
    });

    setText(yText);
    setProvider(yProvider);

    return () => {
      yDoc.destroy();
      yProvider.destroy();
    };

    // Do not add slug to dependency arr or it will break everything
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // TODO proper error handling
  if (!text || !provider) {
    return <h1>your code is broken</h1>;
  }

  return (
    <div className="flex flex-col items-center align-items">
      <QuillEditor
        modules={{ toolbar: false }}
        formats={[]}
        yText={text}
        provider={provider}
        {...props}
        setFailedRules={setFailedRules}
        setPassedRules={setPassedRules}
        setIsCompleted={setIsCompleted}
      />
    </div>
  );
}

type EditorProps = {
  yText: Y.Text;
  provider: WebrtcProviderType;
  setPassedRules: React.Dispatch<React.SetStateAction<Rule[]>>;
  setFailedRules: React.Dispatch<React.SetStateAction<Rule[]>>;
  setIsCompleted: React.Dispatch<React.SetStateAction<boolean>>;
};

function QuillEditor(props: EditorProps) {
  const { yText, provider, setPassedRules, setFailedRules, setIsCompleted } =
    props;
  const reactQuillRef = useRef<ReactQuill>(null);
  // Set up Yjs and Quill
  useEffect(() => {
    if (!reactQuillRef.current) {
      return;
    }

    const quill = reactQuillRef.current.getEditor();
    const binding = new QuillBinding(yText, quill, provider.awareness);

    return () => {
      binding.destroy();
    };
  }, [provider.awareness, yText]);

  useEffect(() => {
    if (!reactQuillRef.current) {
      return;
    }

    reactQuillRef.current.focus();
  }, []);

  useEffect(() => {
    validateText({
      text: "",
      rules: Rules,
      setFailedRules,
      setPassedRules,
      setIsCompleted,
    });
  }, [setFailedRules, setIsCompleted, setPassedRules]);

  useEffect(() => {
    if (!reactQuillRef.current) {
      return;
    }

    reactQuillRef.current.focus();
  }, []);

  return (
    <div className="flex flex-col relative w-20 min-w-[50vw] min-w-h-[70vh] h-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 break-words">
      <div className="relative h-full px-4 py-2 bg-white rounded-b-lg dark:bg-gray-800">
        <ReactQuill
          className="h-full w-full block px-0 text-sm text-gray-800 bg-white border-0 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 focus:ring-0 focus:ring-offset-0"
          placeholder="Start typing here…"
          ref={reactQuillRef}
          modules={{
            toolbar: false,
            cursors: {
              cursors: {
                template: '<div class="custom-cursor">...</div>',
                hideDelayMs: 5000,
                hideSpeedMs: 500,
                selectionChangeSource: null,
                transformOnTextChange: true,
              },
            },
            history: {
              // Local undo shouldn't undo changes from remote users
              userOnly: true,
            },
          }}
          onChange={(
            _value: string,
            _delta: any,
            _source: Sources,
            editor: ReactQuill.UnprivilegedEditor
          ) => {
            validateText({
              text: editor.getText(),
              rules: Rules,
              setFailedRules,
              setPassedRules,
              setIsCompleted,
            });
          }}
        />
      </div>
    </div>
  );
}
