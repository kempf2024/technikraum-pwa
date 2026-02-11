
// === KONFIGURATION ===
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxoJ6iQgfa7K48mfafzhydcGzN8c-jGzKn0KaPMkpYQTVXyJ4mXfmsrK4CIepLobAxYOw/exec";

const statusEl = document.getElementById('status');

function setStatus(msg, ok=true) {
  statusEl.textContent = msg;
  statusEl.style.color = ok ? '#124A74' : '#b00020';
}

document.getElementById('sendMailServer').addEventListener('click', async () => {
  const data = readForm();
  const files = [ ...document.getElementById('cameraInput').files, ...document.getElementById('galleryInput').files ];

  if (files.length === 0) {
    if(!confirm('Keine Bilder ausgewählt. Trotzdem senden?')) return;
  }

  setStatus('Sende ... bitte kurz warten');

  try {
    const images = [];
    for (const f of files) {
      const base64 = await toBase64(f);
      const pure = base64.split(',')[1];
      images.push({ name: f.name || 'bild.jpg', type: f.type || 'image/jpeg', data: pure });
    }

    await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      mode: 'no-cors',
      body: JSON.stringify({ data, images })
    });

    setStatus('✅ E‑Mail wird versendet. Bitte Posteingang prüfen.');
    alert('E‑Mail wird versendet.');
  } catch (err) {
    console.error(err);
    setStatus('❌ Konnte nicht senden. Bitte später erneut versuchen.', false);
    alert('Fehler beim Senden.');
  }
});

function readForm(){
  const form = document.getElementById('aufnahmeForm');
  return Object.fromEntries(new FormData(form).entries());
}

function toBase64(file){
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result);
    r.onerror = reject;
    r.readAsDataURL(file);
  });
}
