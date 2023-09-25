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
import "react-quill/dist/quill.core.css";
import { Sources } from "quill";
type OnChange = NonNullable<ReactQuill.ReactQuillProps["onChange"]>;
type OnChangeParams = Parameters<OnChange>;
export type DeltaStatic = OnChangeParams[1];
import createDebouce from "../helpers/debouce";
import debounce from "../helpers/debouce";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

interface TextEditorProps extends ReactQuillProps {
  slug: string;
  setPassedRules: React.Dispatch<React.SetStateAction<Rule[]>>;
  setFailedRules: React.Dispatch<React.SetStateAction<Rule[]>>;
  setIsCompleted: React.Dispatch<React.SetStateAction<boolean>>;
  setUsersInRoom: React.Dispatch<React.SetStateAction<string[]>>;
  isCompleted: boolean;
  text: Y.Text | undefined;
  setText: React.Dispatch<React.SetStateAction<Y.Text | undefined>>;
  textDelta: string;
  setTextDelta: React.Dispatch<React.SetStateAction<string>>;
  setIsLoaded: React.Dispatch<React.SetStateAction<boolean>>;
  slugId?: Id<"slugs"> | undefined;
  passedRules: Rule[];
  failedRules: Rule[];
}

export default function TextEditor(props: TextEditorProps) {
  const {
    setPassedRules,
    setFailedRules,
    setIsCompleted,
    slug,
    setUsersInRoom,
    isCompleted,
    text,
    setText,
    setTextDelta,
    textDelta,
    setIsLoaded,
    slugId,
    passedRules,
    failedRules,
  } = props;

  const [provider, setProvider] = useState<WebrtcProviderType>();

  useEffect(() => {
    const yDoc = new Y.Doc();
    const yText = yDoc.getText(slug);

    // default: ~20 max connections. Updated ~75 max connections
    const yProvider: WebrtcProviderType = new WebrtcProvider(slug, yDoc, {
      signaling: [
        "wss://webrtc-production-ed77.up.railway.app",
        // "ws://localhost:4444",
      ],
      maxConns: 75 + Math.floor(Math.random() * 15),
    });

    // log when a user joins or leaves
    yProvider.awareness.on(
      "change",
      ({
        added,
        _updated,
        removed,
      }: {
        added: string[];
        _updated: string[];
        removed: string[];
      }) => {
        setUsersInRoom((prev) => {
          const newUsers = new Set([...prev, ...added]);
          removed.forEach((user) => newUsers.delete(user));
          return Array.from(newUsers);
        });
      }
    );

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
        modules={{ toolbar: false, clipboard: false }}
        formats={[]}
        yText={text}
        provider={provider}
        {...props}
        setFailedRules={setFailedRules}
        setPassedRules={setPassedRules}
        setIsCompleted={setIsCompleted}
        isCompleted={isCompleted}
        slug={slug}
        textDelta={textDelta}
        setTextDelta={setTextDelta}
        setIsLoaded={setIsLoaded}
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
  slug: string;
  isCompleted: boolean;
  textDelta: string;
  setTextDelta: React.Dispatch<React.SetStateAction<string>>;
  setIsLoaded: React.Dispatch<React.SetStateAction<boolean>>;
  slugId?: Id<"slugs"> | undefined;
  passedRules: Rule[];
  failedRules: Rule[];
};

function QuillEditor(props: EditorProps) {
  const {
    yText,
    provider,
    setPassedRules,
    setFailedRules,
    setIsCompleted,
    slug,
    isCompleted,
    textDelta,
    setTextDelta,
    setIsLoaded,
    slugId,
    passedRules,
    failedRules,
  } = props;
  const reactQuillRef = useRef<ReactQuill>(null);
  const debounceRef = useRef<ReturnType<typeof debounce>>();
  const updateSlugRef = useRef<ReturnType<typeof debounce>>();
  const updateSlug = useMutation(api.slugs.updateSlug);
  // Set up Yjs and Quill
  useEffect(() => {
    if (!reactQuillRef.current) {
      return;
    }

    const quill = reactQuillRef.current.getEditor();
    const binding = new QuillBinding(yText, quill, provider.awareness);
    if (provider?.room?.bcConns.size === 0) {
      quill.setText(textDelta || "");
    }

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
      text: reactQuillRef.current?.getEditor().getText() || "",
      slug: slug,
      rules: Rules,
      setFailedRules,
      setPassedRules,
      setIsCompleted,
      setIsLoaded,
    });
  }, [setFailedRules, setIsCompleted, setPassedRules]);

  useEffect(() => {
    debounceRef.current = createDebouce(() => {
      validateText({
        text: reactQuillRef.current?.getEditor().getText() || "",
        slug: slug,
        rules: Rules,
        setFailedRules,
        setPassedRules,
        setIsCompleted,
        setIsLoaded,
      });
    }, 1000);

    updateSlugRef.current = createDebouce(async (source: Sources) => {
      if (slugId && source === "user") {
        await updateSlug({
          id: slugId,
          docText: reactQuillRef.current?.getEditor().getText() || "",
          passedTests: passedRules.length,
          failedTests: failedRules.length,
          endTime: Date.now(),
        });
      }
    }, 1000);
  }, []);

  return (
    <div className="flex flex-col relative w-20 min-w-[50vw] min-w-h-[70vh] h-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 break-words">
      <div className="relative h-full px-4 py-2 bg-white rounded-b-lg dark:bg-gray-800">
        <ReactQuill
          className="h-full w-full block px-0 text-sm text-gray-800 bg-white border-0 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 focus:ring-0 focus:ring-offset-0"
          ref={reactQuillRef}
          readOnly={isCompleted}
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
            _delta: DeltaStatic,
            source: Sources,
            editor: ReactQuill.UnprivilegedEditor
          ) => {
            setIsLoaded(false);
            setTextDelta(editor.getText());

            // debounce()
            debounceRef.current?.();
            if (source === "user") {
              updateSlugRef.current?.(source);
            }
          }}
        />
      </div>
    </div>
  );
}
