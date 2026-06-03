const fs = require('fs');
const pdfPath = 'Documentacion_API_Compra_Agil-2-1.pdf';

if (fs.existsSync(pdfPath)) {
  const buffer = fs.readFileSync(pdfPath);
  let text = '';
  for (let i = 0; i < buffer.length; i++) {
    const char = buffer[i];
    if ((char >= 32 && char <= 126) || char === 10 || char === 13) {
      text += String.fromCharCode(char);
    }
  }
  
  // Search for mentions of query parameters
  const lines = text.split('\n');
  const matches = lines.filter(line => line.includes('v2/compra-agil') || line.includes('query') || line.includes('region') || line.includes('estado') || line.includes('pagina'));
  console.log('MENTIONS FOUND:', matches.slice(0, 30));
} else {
  console.log('PDF not found');
}
