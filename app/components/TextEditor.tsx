import dynamic from "next/dynamic";
// we must disable SSR since ReactQuill attempts to access the `document`
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import { useQuery, useMutation } from "convex/react";
import { useState } from "react";
import { api } from "../../convex/_generated/api";

import type { ReactQuillProps } from "react-quill";
type OnChange = ReactQuillProps["onChange"];

import "react-quill/dist/quill.snow.css";

const LOCAL_STORAGE_KEY = "local storage key";

export default function TextEditor(props: ReactQuillProps) {
  const inputValue = useQuery(api.input.getInputValue);
  const mutateValue = useMutation(api.input.updateInputValue);
  const [text, setText] = useState(
    localStorage.getItem(LOCAL_STORAGE_KEY) ?? "New Document Text!"
  );

  const isLoading = (query: unknown): query is undefined | null => {
    return query === undefined || query === null;
  };

  const handleOnChange: OnChange = (_value, _delta, _source, editor) => {
    if (isLoading(inputValue)) {
      return;
    }

    const currentText = editor.getHTML();

    localStorage.setItem(LOCAL_STORAGE_KEY, currentText);
    setText(currentText);
    mutateValue({
      id: inputValue._id,
      text: currentText,
    });
  };

  return (
    <ReactQuill
      modules={{ toolbar: false }}
      formats={[]}
      value={text}
      readOnly={isLoading(inputValue)}
      onChange={handleOnChange}
      {...props}
    />
  );
}
