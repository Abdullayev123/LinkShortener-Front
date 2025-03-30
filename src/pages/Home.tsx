import React, { useState } from "react";
import { Link } from "react-router-dom";

const URL = "https://linkshortener-back.onrender.com/";

const Home = () => {
  const [originalUrl, setOriginalUrl] = useState<string>("");
  const [shortenedUrl, setShortenedUrl] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [copy, setCopy] = useState<string>("Copy");

  const isValidUrl = (url: string): boolean => {
    const urlPattern = /^(https?:\/\/)[\w\\-]+(\.[\w-]+)+[/#?]?.*$/;
    return urlPattern.test(url);
  };

  const shortenedURL = async () => {
    setError("");

    if (!isValidUrl(originalUrl)) {
      setError("Invalid URL format. Please enter a valid URL.");
      return;
    }

    try {
      const res = await fetch(`${URL}shorten`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orgURL: originalUrl }),
      });

      if (res.ok) {
        const data = await res.json();
        setShortenedUrl(data.shortURL);
        setOriginalUrl("");
      } else {
        setError("Error shortening URL. Please try again.");
      }
    } catch (error) {
      console.log(error);
      setError("Network error. Please check your connection.");
    }
  };

  return (
    <>
      <div className=" text-white">
        <h1 className="text-4xl text-center font-extrabold leading-10">
          Welcome to QuickLink
        </h1>
        <h2 className="text-2xl text-center mb-10">
          Create and share shortened URLs easily.
        </h2>
      </div>
      <div className="bg-white p-5 rounded-xl">
        <form
          onSubmit={(e: React.FormEvent<HTMLFormElement>): void => {
            e.preventDefault();
            shortenedURL();
          }}
          className="flex flex-col gap-3 p-4"
        >
          <input
            type="text"
            className="p-2 outline-none border rounded"
            placeholder="Enter URL here..."
            value={originalUrl}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setOriginalUrl(e.target.value)
            }
          />

          <button className="bg-gray-900 border border-gray90 text-white p-2 cursor-pointer hover:bg-gray-600 transition-all duration-300 rounded">
            Shorten URL
          </button>
        </form>

        {error ? (
          <p className="text-red-500 mt-5 text-center">{error}</p>
        ) : (
          shortenedUrl && (
            <p className="mt-5 text-center flex flex-col items-center text-[18px]">
              <Link
                to={`${URL}${shortenedUrl}`}
                target="_blank"
                className="text-gray-900"
              >
                {URL}
                {shortenedUrl}
              </Link>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(`${URL}${shortenedUrl}`);
                  setCopy("Copied!");
                  setTimeout(() => setCopy("Copy"), 2000);
                }}
                className="ml-2 text-white hover:text-gray-200 transition-all duration-300 bg-black px-10 py-1 rounded"
              >
                <span className="text-white">{copy}</span>
              </button>
            </p>
          )
        )}
      </div>
      <div id="howToUse" className="text-white px-2 mt-6">
        <h2 className="text-xl font-bold text-center mt-10">
          How to use QuickLink?
        </h2>
        <ul className="list-disc pl-5 text-lg">
          <li>Enter a URL.</li>
          <li>
            Press the "Shorten URL" button to generate a shortened URL in
            seconds.
          </li>
          <li>Copy and share your URL's</li>
        </ul>
        <div className="text-center mt-10">
          <Link
            to={"https://www.linkedin.com/in/xezer-abdullayev-26691a33a/"}
            target="_blank"
            className="text-gray-900 bg-white px-4 py-2 font-bold"
          >
            LinkedIn
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
