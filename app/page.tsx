"use client";
import { useQuery, useMutation } from "convex/react";
import { useState } from "react";
import { api } from "../convex/_generated/api";
import TextEditor from "./components/TextEditor";

import type { ReactQuillProps } from "react-quill";

type OnChange = ReactQuillProps["onChange"];

const LOCAL_STORAGE_KEY = "local storage key";

export default function Home() {
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

    localStorage.setItem(LOCAL_STORAGE_KEY, editor.getHTML());
    setText(editor.getHTML());

    const payload = {
      id: inputValue._id,
      text: editor.getHTML(),
    };
    mutateValue(payload);
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="mb-6 text-3xl">100Editors</h1>
      <TextEditor
        className="w-full"
        value={text}
        readOnly={isLoading(inputValue)}
        onChange={handleOnChange}
      />
    </main>
  );
}
