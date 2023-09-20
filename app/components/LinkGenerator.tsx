import { useState } from "react";
import Link from "next/link";

export default function LinkGenerator() {
  const [url, setUrl] = useState("");

  return (
    <div className="flex flex-col gap-5 sm:w-96 justify-center">
      <label
        htmlFor="roomId"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Room ID
      </label>
      <input
        type="text"
        id="roomId"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Put your room ID here!"
        required
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 h-11"
      />
      <div className="flex gap-3">
        <Link
          href={url}
          className="text-center text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 h-15 sm:h-22 w-1/2"
        >
          Join Room
        </Link>
        <button
          onClick={() => setUrl(crypto.randomUUID().slice(0, 6))}
          type="button"
          className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 h-15 sm:h-22 w-1/2"
        >
          Generate ID
        </button>
      </div>
    </div>
  );
}
