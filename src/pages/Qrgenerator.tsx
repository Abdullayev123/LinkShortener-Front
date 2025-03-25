import React, { FormEvent, useRef, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

const App = () => {
  const [value, setValue] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [size, setSize] = useState<number>(256);
  const [bgColor, setBgColor] = useState<string>("#ffffff");
  const [fgColor, setFgColor] = useState<string>("#000000");
  const [level, setLevel] = useState<string>("L");
  const [margin, setMargin] = useState<number>(0);
  const [isTransparent, setIsTransparent] = useState<boolean>(true);
  const qrRef = useRef<HTMLCanvasElement | null>(null);

  const validUrl = (url: string): boolean => {
    const urlPattern = /^(https?:\/\/)[\w\\-]+(\.[\w-]+)+[/#?]?.*$/;
    return urlPattern.test(url);
  };

  const handleGenerate = (e: React.FormEvent): void => {
    setError("");
    e.preventDefault();
    if (validUrl(inputValue)) {
      setValue(inputValue);
      setInputValue("");
    } else {
      setError("Invalid URL format. Please enter a valid URL.");
    }
  };

  // Function to download the QR code as an image
  const handleDownload = () => {
    if (!qrRef.current) return;
    const canvas = qrRef.current;
    const url = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = url;
    link.download = "qrcode.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center  text-white">
      <h1 className="text-4xl font-extrabold mb-2 text-center">
        QR Code Generator
      </h1>
      <h2 className="text-lg mb-8 text-gray-300 text-center">
        Easily create and customize your QR Code
      </h2>

      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <form onSubmit={handleGenerate} className="flex flex-col gap-4">
          <input
            type="text"
            className="p-2 border rounded-md text-black outline-none"
            placeholder="Enter URL here..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            type="submit"
            className="bg-gray-900 text-white p-2 rounded-md hover:bg-gray-800 cursor-pointer transition"
          >
            Generate QR Code
          </button>
        </form>

        {error && <p className="text-red-500 mt-4">{error}</p>}

        {value && !error && (
          <div className="mt-6 flex flex-col items-center">
            <h3 className="text-xl font-semibold text-black">
              Generated QR Code
            </h3>
            <div className="flex justify-center my-4">
              <QRCodeCanvas
                ref={qrRef}
                value={value}
                size={size}
                bgColor={!isTransparent ? "transparent" : bgColor}
                fgColor={fgColor}
                level={level}
                title="hello"
                marginSize={margin}
              />
            </div>
            <button
              onClick={handleDownload}
              className="bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-700 cursor-pointer transition"
            >
              Download QR Code (PNG)
            </button>
          </div>
        )}

        {/* Customization Section */}
        <div className="mt-8 bg-gray-100 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            QR Code Customization
          </h3>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col text-black">
              <label className="text-sm text-black">Size (px)</label>
              <select
                value={size}
                onChange={(e) => setSize(Number(e.target.value))}
                className="p-2 border rounded-md text-black"
              >
                <option value="128">128</option>
                <option value="256">256</option>
              </select>
            </div>
            <div className="flex gap-5 text-black">
              <label htmlFor="transparent" className="text-sm text-black">
                Transparent Background
              </label>
              <input
                type="checkbox"
                id="transparent"
                value={bgColor}
                onChange={() => setIsTransparent(!isTransparent)}
                className="p-2 border rounded-md"
              />
            </div>
            {!isTransparent ? (
              ""
            ) : (
              <div className="flex flex-col text-black">
                <label className="text-sm text-black">Background Color</label>
                <input
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="p-2 border rounded-md"
                />
              </div>
            )}

            <div className="flex flex-col text-black">
              <label className="text-sm text-black">Foreground Color</label>
              <input
                type="color"
                value={fgColor}
                onChange={(e) => setFgColor(e.target.value)}
                className="p-2 border rounded-md"
              />
            </div>
            <div className="flex flex-col text-black">
              <label className="text-sm text-black">
                Error Correction Level
              </label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="p-2 border rounded-md"
              >
                <option value="L">Low (L)</option>
                <option value="M">Medium (M)</option>
                <option value="Q">Quartile (Q)</option>
                <option value="H">High (H)</option>
              </select>
            </div>
            <div className="flex flex-col col-span-2 text-black">
              <label className="text-sm text-black">Margin Size</label>
              <select
                value={margin}
                onChange={(e): void => setMargin(Number(e.target.value))}
                className="p-2 border rounded-md"
              >
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
