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

import "react-quill/dist/quill.snow.css";
import { validateText } from "./RuleSet/RuleValidation";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

interface TextEditorProps extends ReactQuillProps {
  slug: string;
  setPassedRules: React.Dispatch<React.SetStateAction<Rule[]>>;
  setFailedRules: React.Dispatch<React.SetStateAction<Rule[]>>;
  setIsCompleted: React.Dispatch<React.SetStateAction<boolean>>;
  slugId: Id<"slugs"> | undefined;
  passedRules: Rule[];
  failedRules: Rule[];
}

export default function TextEditor(props: TextEditorProps) {
  const {
    setPassedRules,
    setFailedRules,
    setIsCompleted,
    slug,
    slugId,
    passedRules,
    failedRules,
  } = props;
  const [text, setText] = useState<Y.Text>();
  const [provider, setProvider] = useState<WebrtcProviderType>();

  useEffect(() => {
    const yDoc = new Y.Doc();
    const yText = yDoc.getText(slug);

    // default of 20 max connections
    const yProvider: WebrtcProviderType = new WebrtcProvider(
      "quill-demo-room",
      yDoc,
      { signaling: ["wss://webrtc-production-ed77.up.railway.app"] }
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
    <div className="flex flex-col items-center align-items border-2">
      <h3>Editor</h3>
      <QuillEditor
        modules={{ toolbar: false }}
        formats={[]}
        yText={text}
        provider={provider}
        {...props}
        setFailedRules={setFailedRules}
        setPassedRules={setPassedRules}
        setIsCompleted={setIsCompleted}
        slugId={slugId}
        passedRules={passedRules}
        failedRules={failedRules}
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
  slugId: Id<"slugs"> | undefined;
  passedRules: Rule[];
  failedRules: Rule[];
};

function QuillEditor(props: EditorProps) {
  const updateSlug = useMutation(api.slugs.updateSlug);
  const {
    yText,
    provider,
    setPassedRules,
    setFailedRules,
    setIsCompleted,
    slugId,
    passedRules,
    failedRules,
  } = props;
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
    validateText({
      text: "",
      rules: Rules,
      setFailedRules,
      setPassedRules,
      setIsCompleted,
    });
  }, []);

  useEffect(() => {
    if (slugId) {
      updateSlug({
        id: slugId,
        passedTests: passedRules.length,
        failedTests: failedRules.length,
      });
    }
  }, [passedRules, failedRules]);

  return (
    <div className="flex flex-col relative min-w-[50vw] h-[70vh] border-2">
      <div className="relative h-full">
        <ReactQuill
          className="h-full w-full"
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
          onChange={(value: string, delta: any, source: any, editor: any) => {
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
