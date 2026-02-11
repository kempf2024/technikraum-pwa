document.getElementById('createPdfBtn').addEventListener('click', async ()=>{
 const form=document.getElementById('aufnahmeForm');
 const data=Object.fromEntries(new FormData(form).entries());
 const pdf=new window.jspdf.jsPDF();
 let y=10;
 pdf.setFontSize(18);pdf.text('Technikraum Aufnahme',10,y);y+=10;
 pdf.setFontSize(12);
 for(const key in data){pdf.text(key+': '+data[key],10,y);y+=8;if(y>270){pdf.addPage();y=10;}}
 const files=[...document.getElementById('cameraInput').files,...document.getElementById('galleryInput').files];
 for(const file of files){const img=await readFile(file);pdf.addPage();pdf.addImage(img,'JPEG',10,20,180,180);} 
 const blob=pdf.output('blob');const url=URL.createObjectURL(blob);
 window.location.href='mailto:Aufnahme@herbstritt-haustechnik.de?subject=Technikraum%20Aufnahme';
 const a=document.createElement('a');a.href=url;a.download='technikraum.pdf';a.click();
});
function readFile(file){return new Promise(res=>{const r=new FileReader();r.onload=e=>res(e.target.result);r.readAsDataURL(file);});}