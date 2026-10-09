function esc(t) {
  const d = document.createElement('div');
  d.textContent = t ?? '';
  return d.innerHTML;
}

function money(n) {
  return Number(n).toLocaleString('en-US', { maximumFractionDigits: 2 }) + ' ر.س';
}

function toast(msg) {
  let box = document.getElementById('toast');
  if (!box) {
    box = document.createElement('div');
    box.id = 'toast';
    box.className = 'fixed bottom-4 inset-x-4 bg-slate-800 text-white text-sm text-center rounded-xl p-3 hidden';
    document.body.appendChild(box);
  }
  box.textContent = msg;
  box.classList.remove('hidden');
  setTimeout(() => box.classList.add('hidden'), 2500);
}

async function requireRole(role) {
  const { data: { session } } = await db.auth.getSession();
  if (!session) { window.location.href = 'index.html'; return null; }
  const { data: profile, error } = await db
    .from('profiles')
    .select('full_name, role, building_id')
    .eq('id', session.user.id)
    .single();
  if (!profile || profile.role !== role) {
    // نوقف هنا بدل ما نرجّع المستخدم لصفحة الدخول (يمنع التكرار اللانهائي)
    console.log('requireRole failed', { wanted: role, profile, error });
    document.body.innerHTML = '<div style="padding:24px;direction:rtl;font-family:sans-serif">' +
      '<h2 style="font-weight:700;margin-bottom:12px">تعذّر فتح الصفحة</h2>' +
      '<p>الدور المطلوب: ' + esc(role) + '</p>' +
      '<p>دور حسابك: ' + esc(profile ? profile.role : 'غير موجود') + '</p>' +
      '<p>' + esc(error ? error.message : '') + '</p>' +
      '<p style="direction:ltr;color:#64748b;font-size:12px">' + esc(session.user.email) + '</p>' +
      '<button onclick="logout()" style="margin-top:16px;padding:8px 16px;border:1px solid #94a3b8;border-radius:10px">تسجيل خروج</button></div>';
    return null;
  }
  return { userId: session.user.id, profile };
}

async function logout() {
  await db.auth.signOut();
  window.location.href = 'index.html';
}

function fmtDate(d) {
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
}

function today() { return fmtDate(new Date()); }

function addMonths(dateStr, m) {
  const d = new Date(dateStr + 'T00:00:00');
  const day = d.getDate();
  d.setMonth(d.getMonth() + m);
  if (d.getDate() !== day) d.setDate(0);
  return fmtDate(d);
}