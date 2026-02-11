
// === KONFIGURATION ===
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxoJ6iQgfa7K48mfafzhydcGzN8c-jGzKn0KaPMkpYQTVXyJ4mXfmsrK4CIepLobAxYOw/exec";

document.getElementById('sendMailLocal').addEventListener('click', () => {
  const data = readForm();
  const body = buildBody(data);
  const mailto = `mailto:Aufnahme@herbstritt-haustechnik.de?subject=${encodeURIComponent('Technikraum Aufnahme ' + (data.kundenname||''))}&body=${encodeURIComponent(body)}`;
  window.location.href = mailto;
});

document.getElementById('sendMailServer').addEventListener('click', async () => {
  const data = readForm();
  const files = [ ...document.getElementById('cameraInput').files, ...document.getElementById('galleryInput').files ];
  const images = [];
  for (const f of files) {
    const base64 = await toBase64(f);
    const pure = base64.split(',')[1];
    images.push({ name: f.name || 'bild.jpg', type: f.type || 'image/jpeg', data: pure });
  }

  try {
    await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      mode: 'no-cors',
      body: JSON.stringify({ data, images })
    });
    alert('✅ E-Mail wird versendet. Du erhältst sie in wenigen Sekunden.');
  } catch (err) {
    console.error(err);
    alert('❌ Konnte nicht senden. Prüfe Internetverbindung oder Apps‑Script URL.');
  }
});

function readForm(){
  const form = document.getElementById('aufnahmeForm');
  return Object.fromEntries(new FormData(form).entries());
}

function buildBody(d){
  return `Technikraum Aufnahme

Mitarbeiter: ${d.mitarbeiter||''}
Datum: ${d.datum||''}
Kundenname: ${d.kundenname||''}
Adresse: ${d.adresse||''}

--- Heizungsdaten ---
Heizart: ${d.heizart||''}
Heizung: ${d.hersteller_heizung||''}
Brenner: ${d.hersteller_brenner||''}
Seriennummer Kessel: ${d.sn_kessel||''}
Seriennummer Brenner: ${d.sn_brenner||''}
Warmwasserspeicher: ${d.wws||''}
Pufferspeicher: ${d.puffer||''}
Öltank: ${d.oeltank||''}
Schmalster Durchgang: ${d.durchgang||''}
Enthärtungsanlage: ${d.enthaertung||''}

Bilder als Anhang (wenn über Server gesendet).`;
}

function toBase64(file){
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result);
    r.onerror = reject;
    r.readAsDataURL(file);
  });
}
