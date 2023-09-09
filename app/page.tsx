"use client";
import { useQuery, useMutation } from "convex/react";
import { api } from "../convex/_generated/api";

export default function Home() {
  const inputValue = useQuery(api.input.getInputValue);

  const mutateValue = useMutation(api.input.updateInputValue);

  console.log(inputValue);

  const handleOnChange = (event) => { // Feel free to investigate which would be the correct type :eyes:
    const payload = {
      id: event.target.attributes["hidden-id"].value,
      text: event.target.value
    }
    mutateValue(payload);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <input 
        hidden-id={inputValue?._id}
        className="border-2 border-gray-400 rounded-md p-2 text-slate-950" 
        value={inputValue?.text || ""} 
        onChange={handleOnChange}/>
    </main>
  );
}