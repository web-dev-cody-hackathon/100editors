"use client";
import { useQuery, useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import TextEditor from "./components/TextEditor";

import type { ReactQuillProps } from "react-quill";

type OnChange = ReactQuillProps["onChange"];

export default function Home() {
  const inputValue = useQuery(api.input.getInputValue);

  const mutateValue = useMutation(api.input.updateInputValue);

  const handleOnChange: OnChange = (_value, _delta, _source, editor) => {
    if (inputValue === undefined || inputValue === null) {
      console.log("Convex query loading...");
      return;
    }

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
        value={isLoading(inputValue) ? "Loading" : inputValue.text}
        readOnly={isLoading(inputValue)}
        onChange={handleOnChange}
      />
    </main>
  );
}
