(function () {
  var root = document.documentElement;
  var saved = null;
  try { saved = localStorage.getItem('theme'); } catch (e) {}
  var dark = saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (dark) root.classList.add('dark');

  var f = document.createElement('link');
  f.rel = 'stylesheet';
  f.href = 'https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&display=swap';
  document.head.appendChild(f);

  var meta = document.createElement('meta');
  meta.name = 'theme-color';
  document.head.appendChild(meta);

  if (window.tailwind) {
    tailwind.config = { theme: { extend: { colors: { blue: {
      50: '#eef4fb', 100: '#dce8f4', 200: '#bcd2e8', 300: '#93b6d8', 400: '#6694c3',
      500: '#4d80b4', 600: '#3a6ea5', 700: '#2f5a88', 800: '#264a70', 900: '#1d3a58'
    } } } } };
  }

  var css = [
    /* أساس */
    "html{--bd:#d9e3f0;color-scheme:light;-webkit-tap-highlight-color:transparent;font-size:16px}",
    "html.dark{--bd:#25364d;color-scheme:dark}",
    "html body{font-family:'IBM Plex Sans Arabic',sans-serif!important;line-height:1.65;color:#0f172a;background-color:#f2f6fc;background-image:radial-gradient(900px 520px at 88% -8%,rgba(58,110,165,.24),transparent 60%),radial-gradient(760px 520px at -8% 38%,rgba(143,177,213,.32),transparent 60%);background-attachment:fixed;background-repeat:no-repeat;padding-bottom:env(safe-area-inset-bottom);font-variant-numeric:tabular-nums}",
    "button,input,select{font-family:inherit}",
    "main{padding-bottom:5rem}",
    /* وضوح الخطوط */
    "html .text-xs{font-size:.8125rem}",
    "html .text-sm{font-size:.9375rem}",
    "html .text-slate-500,html .text-gray-500{color:#475569}",
    "html .text-slate-400{color:#64748b}",
    "html .font-bold{font-weight:700}",
    "html .font-medium{font-weight:600}",
    /* بطاقات وهيدر */
    "html .bg-white.rounded-2xl,html .bg-white.rounded-xl{background:rgba(255,255,255,.58);-webkit-backdrop-filter:blur(14px) saturate(160%);backdrop-filter:blur(14px) saturate(160%);box-shadow:0 0 0 1px rgba(255,255,255,.8),0 8px 28px rgba(31,64,104,.10)}",
    "html header{position:sticky;top:0;z-index:20;box-shadow:none;border-bottom:1px solid var(--bd);background:rgba(255,255,255,.95);backdrop-filter:blur(8px)}",
    /* أزرار وحقول */
    "button{min-height:42px;cursor:pointer;transition:background-color .15s,transform .1s}",
    "button:active{transform:scale(.98)}",
    "button:disabled{opacity:.6;cursor:not-allowed}",
    "a{transition:transform .1s}",
    "input,select{outline:none;transition:border-color .15s,box-shadow .15s}",
    "input:focus,select:focus{border-color:#3a6ea5;box-shadow:0 0 0 3px rgba(58,110,165,.22)}",
    ".fixed.inset-0>div{animation:pop .16s ease-out}",
    "@keyframes pop{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}",
    "#toast{z-index:60}",
    /* زر الدارك مود */
    "#themeToggle{position:fixed;left:14px;bottom:14px;z-index:40;width:46px;height:46px;min-height:46px;border-radius:50%;font-size:20px;line-height:1;background:#fff;color:#0f172a;box-shadow:0 0 0 1px var(--bd),0 4px 12px rgba(15,23,42,.15)}",
    /* ألوان الهوية (صريحة عشان تغلب كلاسات Tailwind الافتراضية) */
    "html .bg-slate-50,html .bg-gray-100{background-color:#f2f6fc}",
    "html .bg-blue-50{background-color:#eef4fb}",
    "html .bg-blue-100{background-color:#dce8f4}",
    "html .bg-blue-600{background-color:#3a6ea5}",
    "html .text-blue-700{color:#2f5a88}",
    "html .text-blue-800{color:#264a70}",
    "html .border-blue-300{border-color:#93b6d8}",
    /* هيدر بلون الهوية */
    "html header.bg-white{background:rgba(255,255,255,.55);-webkit-backdrop-filter:blur(16px) saturate(160%);backdrop-filter:blur(16px) saturate(160%);border-bottom:1px solid rgba(255,255,255,.8)}",
    "html header button{background:rgba(255,255,255,.55);border-color:rgba(58,110,165,.25)}",
    "html .text-slate-700{color:#264a70}",
    "html .fixed.inset-0{-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px)}",
    "html .fixed.inset-0>.bg-white{background:rgba(255,255,255,.9)}",
    "html input,html select{background:rgba(255,255,255,.7)}",
    "html .bg-slate-200{background-color:rgba(58,110,165,.16)}",
    "html .bg-emerald-50{background-color:rgba(16,185,129,.14)}",
    "html #themeToggle{background:rgba(255,255,255,.7);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px)}",
    /* الوضع الداكن */
    "html.dark body{background-color:#0d1623;color:#e5e7eb;background-image:radial-gradient(900px 520px at 88% -8%,rgba(58,110,165,.30),transparent 60%),radial-gradient(760px 520px at -8% 38%,rgba(30,64,110,.34),transparent 60%)}",
    "html.dark .bg-slate-50,html.dark .bg-gray-100{background:#0d1623}",
    "html.dark .bg-white{background:#142133}",
    "html.dark header.bg-white{background:rgba(20,33,51,.55);border-bottom:1px solid rgba(255,255,255,.08)}",
    "html.dark header button{background:rgba(255,255,255,.06);border-color:rgba(255,255,255,.18)}",
    "html.dark .bg-white.rounded-2xl,html.dark .bg-white.rounded-xl{background:rgba(20,33,51,.55);box-shadow:0 0 0 1px rgba(255,255,255,.08),0 8px 28px rgba(0,0,0,.35)}",
    "html.dark .fixed.inset-0>.bg-white{background:rgba(20,33,51,.94)}",
    "html.dark .bg-slate-200{background-color:rgba(58,110,165,.22)}",
    "html.dark header{background:rgba(20,33,51,.95)}",
    "html.dark .bg-slate-200{background:#1c2c42}",
    "html.dark .text-slate-700,html.dark .text-slate-600{color:#cbd5e1}",
    "html.dark .text-slate-500,html.dark .text-slate-400,html.dark .text-gray-500{color:#94a3b8}",
    "html.dark .border,html.dark .border-slate-300{border-color:#2d4260}",
    "html.dark .border-red-300{border-color:#7f1d1d}",
    "html.dark .border-orange-300{border-color:#9a3412}",
    "html.dark .border-blue-300{border-color:#3a6ea5}",
    "html.dark .bg-emerald-50,html.dark .bg-emerald-100{background:rgba(16,185,129,.16)}",
    "html.dark .text-emerald-600,html.dark .text-emerald-700,html.dark .text-emerald-800{color:#6ee7b7}",
    "html.dark .bg-red-100{background:rgba(239,68,68,.18)}",
    "html.dark .text-red-600,html.dark .text-red-700,html.dark .text-red-800{color:#fca5a5}",
    "html.dark .bg-yellow-100,html.dark .bg-amber-100{background:rgba(245,158,11,.18)}",
    "html.dark .text-yellow-800,html.dark .text-amber-700,html.dark .text-amber-800{color:#fcd34d}",
    "html.dark .bg-blue-50,html.dark .bg-blue-100{background:rgba(58,110,165,.25)}",
    "html.dark .text-blue-700,html.dark .text-blue-800{color:#8fb1d5}",
    "html.dark .text-orange-700{color:#fdba74}",
    "html.dark input,html.dark select{background:rgba(13,22,35,.7);color:#e5e7eb;border-color:#2d4260}",
    "html.dark input::placeholder{color:#64748b}",
    "html.dark #themeToggle{background:rgba(20,33,51,.7);color:#e5e7eb}"
  ].join('\n');
  var st = document.createElement('style');
  st.textContent = css;
  document.head.appendChild(st);

  function paint() {
    var isDark = root.classList.contains('dark');
    meta.content = isDark ? '#0d1623' : '#ffffff';
    var b = document.getElementById('themeToggle');
    if (b) { b.textContent = isDark ? '☀️' : '🌙'; b.setAttribute('aria-label', isDark ? 'الوضع الفاتح' : 'الوضع الداكن'); }
  }

  document.addEventListener('DOMContentLoaded', function () {
    var b = document.createElement('button');
    b.id = 'themeToggle';
    b.type = 'button';
    b.onclick = function () {
      root.classList.toggle('dark');
      try { localStorage.setItem('theme', root.classList.contains('dark') ? 'dark' : 'light'); } catch (e) {}
      paint();
    };
    document.body.appendChild(b);
    paint();
  });
})();