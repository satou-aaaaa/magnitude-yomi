// アプリのアイコン（icon-192.png・icon-512.png）を作る。紺の地に、地震の波（大きい波と小さい波）と「M」の字。
// 使い方: node tools/make-icons.cjs（qa/ の playwright を使う）
const path = require("path");
const { chromium } = require(path.join(__dirname, "..", "qa", "node_modules", "playwright"));
(async () => {
  const b = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
  for (const s of [192, 512]) {
    const p = await b.newPage({ viewport: { width: s, height: s } });
    await p.setContent(`<body style="margin:0"><svg width="${s}" height="${s}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" fill="#123554"/>
      <g fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M10 70 L22 70 L28 58 L34 84 L42 40 L50 92 L58 50 L64 76 L70 64 L76 70 L90 70" stroke="#f6d77a" stroke-width="5"/></g><text x="50" y="36" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="30" fill="#fffdf7">M</text></svg></body>`);
    await p.screenshot({ path: path.join(__dirname, "..", `icon-${s}.png`), clip: { x: 0, y: 0, width: s, height: s } });
  }
  await b.close();
})();
