
function doPost(e) {
  try {
    var obj = JSON.parse(e.postData.contents || '{}');
    var d = obj.data || {};
    var images = obj.images || [];

    if (!d.kundenname) d.kundenname = '';
    if (!d.mitarbeiter) d.mitarbeiter = '';

    var body =
      'Technikraum Aufnahme

' +
      'Mitarbeiter: ' + (d.mitarbeiter || '') + '
' +
      'Datum: ' + (d.datum || '') + '
' +
      'Kundenname: ' + (d.kundenname || '') + '
' +
      'Adresse: ' + (d.adresse || '') + '

' +
      '--- Heizungsdaten ---
' +
      'Heizart: ' + (d.heizart || '') + '
' +
      'Heizung: ' + (d.hersteller_heizung || '') + '
' +
      'Brenner: ' + (d.hersteller_brenner || '') + '
' +
      'Seriennummer Kessel: ' + (d.sn_kessel || '') + '
' +
      'Seriennummer Brenner: ' + (d.sn_brenner || '') + '
' +
      'Warmwasserspeicher: ' + (d.wws || '') + '
' +
      'Pufferspeicher: ' + (d.puffer || '') + '
' +
      'Öltank: ' + (d.oeltank || '') + '
' +
      'Schmalster Durchgang: ' + (d.durchgang || '') + '
' +
      'Enthärtungsanlage: ' + (d.enthaertung || '') + '
';

    var blobs = [];
    for (var i = 0; i < images.length; i++) {
      var img = images[i];
      if (!img || !img.data) continue;
      var bytes = Utilities.base64Decode(img.data);
      var blob = Utilities.newBlob(bytes, img.type || 'application/octet-stream', img.name || ('bild_' + (i+1) + '.jpg'));
      blobs.push(blob);
    }

    var options = {
      name: 'Technikraum Aufnahme',
      replyTo: (d.mitarbeiter_email || ''),
      attachments: blobs
    };

    MailApp.sendEmail('Aufnahme@herbstritt-haustechnik.de', 'Technikraum Aufnahme ' + d.kundenname, body, options);

    return ContentService.createTextOutput('OK').setMimeType(ContentService.MimeType.TEXT);
  } catch (err) {
    return ContentService.createTextOutput('ERROR: ' + err).setMimeType(ContentService.MimeType.TEXT);
  }
}
