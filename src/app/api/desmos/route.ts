import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const expr = req.nextUrl.searchParams.get("expr") || "y=x^2";

  const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
  html, body { margin: 0; padding: 0; width: 100%; height: 100%; overflow: hidden; background: #18181b; }
  #calc { width: 100%; height: 100%; }
  #fallback { display: none; align-items: center; justify-content: center; height: 100%;
    color: #a1a1aa; font-family: system-ui, sans-serif; padding: 1rem; text-align: center; }
</style>
</head>
<body>
<div id="calc"></div>
<div id="fallback"></div>
<script>
  var s = document.createElement('script');
  s.src = 'https://www.desmos.com/api/v1.11/calculator.js?apiKey=dcb31709b452b1cf9dc26972add0fda6';
  s.onload = function() {
    try {
      var c = Desmos.GraphingCalculator(document.getElementById('calc'), {
        expressions: false, settingsMenu: false, zoomButtons: true, lockViewport: false
      });
      c.setExpression({ id: 'g1', latex: ${JSON.stringify(expr)} });
    } catch(e) {
      showFallback();
    }
  };
  s.onerror = showFallback;
  document.body.appendChild(s);

  function showFallback() {
    document.getElementById('calc').style.display = 'none';
    var fb = document.getElementById('fallback');
    fb.style.display = 'flex';
    fb.innerHTML = 'Desmos could not load.<br><code style="margin-top:8px;color:#71717a">' +
      ${JSON.stringify(expr)} + '</code>';
  }
</script>
</body>
</html>`;

  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
