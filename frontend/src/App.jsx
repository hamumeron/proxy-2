// frontend/src/App.jsx
import React, { useState } from "react";

export default function App() {
  const [url, setUrl] = useState("");
  const [iframeUrl, setIframeUrl] = useState("");

  const handleGo = () => {
    if (!url) return;
    // プロキシ経由URL生成
    // encodeURIComponentしつつ /proxy/ の後に転送先URLをそのまま付ける
    const proxied = "/proxy/" + encodeURIComponent(url);
    setIframeUrl(proxied);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-4">
      <h1 className="text-3xl mb-6 font-bold">匿名プロキシ</h1>
      <input
        className="w-full max-w-xl p-2 rounded text-black"
        placeholder="URLを入力してください (例: https://www.youtube.com)"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button
        className="mt-3 px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
        onClick={handleGo}
      >
        開く
      </button>
      {iframeUrl && (
        <iframe
          className="mt-6 w-full max-w-4xl h-[80vh] border-0 rounded"
          src={iframeUrl}
          title="匿名プロキシ表示"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        />
      )}
    </div>
  );
}
