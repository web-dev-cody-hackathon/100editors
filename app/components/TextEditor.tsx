import dynamic from "next/dynamic";
// we must disable SSR since ReactQuill attempts to access the `document`
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

import type { ReactQuillProps } from "react-quill";

import "react-quill/dist/quill.snow.css";

export default function TextEditor(props: ReactQuillProps) {
  return <ReactQuill modules={{ toolbar: false }} formats={[]} {...props} />;
}
