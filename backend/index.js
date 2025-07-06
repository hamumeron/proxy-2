// backend/index.js
import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();

app.use(express.json());

// すべての /proxy/* へのリクエストをターゲットに転送
app.use(
  "/proxy",
  createProxyMiddleware({
    target: "", // リクエストのURLから動的に変えるので空文字
    changeOrigin: true,
    selfHandleResponse: false,
    pathRewrite: (path, req) => path.replace(/^\/proxy/, ""),
    router: (req) => {
      // 動的に転送先を決めるため、クエリやヘッダから取得
      // 例: /proxy/https://example.com => https://example.com
      const target = req.url.substring(1); // 先頭のスラッシュ除去
      return target;
    },
    onProxyReq: (proxyReq, req, res) => {
      // 匿名化処理：不要ヘッダ除去
      proxyReq.removeHeader("cookie");
      proxyReq.setHeader("User-Agent", "Mozilla/5.0 (compatible; AnonProxy/1.0)");
      proxyReq.removeHeader("referer");
      proxyReq.removeHeader("origin");
      proxyReq.removeHeader("x-forwarded-for");
    },
  })
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Proxy server listening on port ${PORT}`);
});
