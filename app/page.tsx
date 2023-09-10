"use client";
import { useQuery, useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import ReactQuill from "react-quill";

import type { ReactQuillProps } from "react-quill";
import type { Id } from "@/convex/_generated/dataModel";

type OnChange = ReactQuillProps["onChange"];

export default function Home() {
  const inputValue = useQuery(api.input.getInputValue);

  const mutateValue = useMutation(api.input.updateInputValue);

  const handleOnChange: OnChange = (_value, _delta, _source, editor) => {
    const payload = {
      id: inputValue?._id as Id<"input">,
      text: editor.getHTML(),
    };
    mutateValue(payload);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ReactQuill
        hidden-id={inputValue?._id}
        className="w-full"
        modules={{ toolbar: false }}
        formats={[]}
        value={inputValue?.text ?? ""}
        onChange={handleOnChange}
      />
    </main>
  );
}
