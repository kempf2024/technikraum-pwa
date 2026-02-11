
Diese Version entfernt den "E‑Mail öffnen (ohne Bilder)"‑Button.
App ist mit deiner Apps‑Script‑URL vorkonfiguriert. Einfach hochladen und testen.

Unzustellbar? Prüfen:
1) Empfänger: Aufnahme@herbstritt-haustechnik.de korrekt?
2) In Apps Script unter View → Executions nachsehen (Fehler?)
3) Test an eigene Adresse senden (MailApp.sendEmail anpassen) 
4) Quota: MailApp.getRemainingDailyQuota() prüfen (optional in Logger)
