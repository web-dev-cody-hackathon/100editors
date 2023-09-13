import dynamic from "next/dynamic";
import ReactQuill from "react-quill";
import { useQuery, useMutation } from "convex/react";
import { useEffect, useState } from "react";
import { api } from "../../convex/_generated/api";

import type { ReactQuillProps } from "react-quill";
type OnChange = ReactQuillProps["onChange"];

import "react-quill/dist/quill.snow.css";

const LOCAL_STORAGE_KEY = "local storage key";

export default function TextEditor(props: ReactQuillProps) {
  const inputValue = useQuery(api.input.getInputValue);
  const mutateValue = useMutation(api.input.updateInputValue);
  const [text, setText] = useState(
    localStorage.getItem(LOCAL_STORAGE_KEY) ?? ""
  );

  const isLoading = (query: unknown): query is undefined | null => {
    return query === undefined || query === null;
  };

  // update local copy when db updates
  useEffect(() => {
    if (!isLoading(inputValue)) {
      setText(inputValue.text);
      localStorage.setItem(LOCAL_STORAGE_KEY, inputValue.text);
    }
  }, [inputValue]);

  const handleOnChange: OnChange = (_value, _delta, _source, editor) => {
    // update local copy
    const currentText = editor.getHTML();
    setText(currentText);
    localStorage.setItem(LOCAL_STORAGE_KEY, currentText);

    // update db when loaded
    if (!isLoading(inputValue)) {
      mutateValue({
        id: inputValue._id,
        text: currentText,
      });
    }
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
