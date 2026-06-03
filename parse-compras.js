const fs = require('fs');
const path = require('path');
const readline = require('readline');

const COMPRAS_DIR = path.join(__dirname, 'compras agiles');
const OUTPUT_FILE = path.join(__dirname, 'extracted_historical.json');

// Scan the directory dynamically for all CSV files
if (!fs.existsSync(COMPRAS_DIR)) {
  fs.mkdirSync(COMPRAS_DIR, { recursive: true });
}
const files = fs.readdirSync(COMPRAS_DIR).filter(file => file.endsWith('.csv') || file.endsWith('.CSV'));


// Helper to clean quotes
function clean(str) {
  if (!str) return '';
  return str.replace(/^"|"$/g, '').trim();
}

// Simple normalization helper for rubros/categories with strict product matching
function getNormalizedName(genericName, productDesc) {
  const descLower = productDesc.toLowerCase();
  const genLower = genericName.toLowerCase();
  
  // Specific match first to avoid false categorization
  if (descLower.includes('papa ') || descLower.includes('papas') || descLower === 'papa' || descLower.includes('papa,') || descLower.includes('papa/')) {
    if (!descLower.includes('papel') && !descLower.includes('arroz') && !descLower.includes('fideo') && !descLower.includes('pastas') && !descLower.includes('abarrote')) {
      return 'Papa';
    }
  }
  
  if (descLower.includes('tomate')) return 'Tomate';
  if (descLower.includes('cebolla')) return 'Cebolla';
  if (descLower.includes('almohada')) return 'Almohada';
  
  if (descLower.includes('amonio') || descLower.includes('cuaternario') || descLower.includes('cloro') || descLower.includes('desinfectante')) {
    return 'Amonio Cuaternario';
  }
  
  if (descLower.includes('notebook') || descLower.includes('laptop')) {
    return 'Notebook';
  }
  
  if (descLower.includes('papel') && (descLower.includes('carta') || descLower.includes('resma') || descLower.includes('oficio'))) {
    return 'Papel Carta';
  }
  
  if (descLower.includes('colacion') || descLower.includes('colación') || descLower.includes('almuerzo') || descLower.includes('comida') || descLower.includes('cena')) {
    if (!descLower.includes('arrend') && !descLower.includes('aseo')) {
      return 'Servicio Colaciones';
    }
  }
  
  if (descLower.includes('aseo') || descLower.includes('limpieza') || descLower.includes('desinfecc')) {
    return 'Útiles de Aseo';
  }
  
  return 'Otros';
}


function cleanRegion(regionStr) {
  let r = clean(regionStr);
  // Remove accents for matching
  const lower = r.toLowerCase();
  
  if (lower.includes('metropolitana')) return 'Metropolitana';
  if (lower.includes('valpara')) return 'Valparaíso';
  if (lower.includes('tarapa')) return 'Tarapacá';
  if (lower.includes('antofagasta')) return 'Antofagasta';
  if (lower.includes('arica')) return 'Arica y Parinacota';
  if (lower.includes('atacama')) return 'Atacama';
  if (lower.includes('coquimbo')) return 'Coquimbo';
  if (lower.includes('higgins') || lower.includes('o\'higgins')) return "O'Higgins";
  if (lower.includes('maule')) return 'Maule';
  if (lower.includes('nuble') || lower.includes('ñuble')) return 'Ñuble';
  if (lower.includes('bio')) return 'Biobío';
  if (lower.includes('arauca')) return 'Araucanía';
  if (lower.includes('rios') || lower.includes('ríos')) return 'Los Ríos';
  if (lower.includes('lagos')) return 'Los Lagos';
  if (lower.includes('aysen') || lower.includes('aysén')) return 'Aysén';
  if (lower.includes('magallanes')) return 'Magallanes';

  return r;
}

async function processFile(filePath, limit = 500) {
  console.log(`Procesando archivo: ${filePath}...`);
  return new Promise((resolve, reject) => {
    const fileStream = fs.createReadStream(filePath, { encoding: 'latin1' });
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });


    let isHeader = true;
    let headers = [];
    const cotizacionesMap = {};
    let count = 0;

    rl.on('line', (line) => {
      const parts = line.split(/;(?=(?:(?:[^"]*"){2})*[^"]*$)/);

      if (isHeader) {
        headers = parts.map(h => clean(h));
        isHeader = false;
        return;
      }

      const row = {};
      headers.forEach((header, index) => {
        row[header] = parts[index] || '';
      });

      const seleccionado = clean(row['ProveedorSeleccionado']).toLowerCase();
      if (seleccionado === 'si') {
        const qty = parseInt(clean(row['CantidadSolicitada'])) || 1;
        const total = parseFloat(clean(row['MontoTotal'])) || 0;
        const unitPrice = qty > 0 ? Math.round(total / qty) : total;

        if (total > 0) {
          const rawName = clean(row['ProductoCotizado']) || clean(row['NombreCotizacion']);
          const genericName = clean(row['NombreProductoGenerico']);
          const normalized = getNormalizedName(genericName, rawName);
          const region = cleanRegion(row['Region']);
          const codCot = clean(row['CodigoCotizacion']);

          if (!cotizacionesMap[codCot]) {
            cotizacionesMap[codCot] = [];
          }
          
          cotizacionesMap[codCot].push({
            id: `HP_EXT_${path.basename(filePath, '.csv')}_${count++}`,
            code: codCot,
            normalizedName: normalized,
            rawName: rawName.substring(0, 100),
            buyer: clean(row['NombreOOPP']) || clean(row['NombreUnidaddeCompra']),
            supplier: clean(row['RazonSocialProveedor']),
            qty: qty,
            unit: clean(row['ProductoCotizado']).includes('Malla') ? 'Malla' : (clean(row['ProductoCotizado']).includes('Saco') ? 'Saco' : 'Unidad'),
            unitPrice: unitPrice,
            totalPrice: total,
            region: region,
            processType: "Compra Ágil",
            date: clean(row['FechaPublicacionParaCotizar']) || '2026-01-15'
          });
        }
      }
    });

    rl.on('close', () => {
      const results = [];
      Object.keys(cotizacionesMap).forEach(codCot => {
        const items = cotizacionesMap[codCot];
        // Only keep if the cotizacion consists of exactly 1 item to guarantee that MontoTotal is exactly the price of this product
        if (items.length === 1) {
          results.push(items[0]);
        }
      });
      
      console.log(`Archivo procesado. Se extrajeron ${results.length} cotizaciones puras (de un único ítem).`);
      resolve(results);
    });

    rl.on('error', (err) => {
      reject(err);
    });
  });
}


async function run() {
  try {
    let allRecords = [];
    for (const file of files) {
      const fullPath = path.join(COMPRAS_DIR, file);
      if (fs.existsSync(fullPath)) {
        const records = await processFile(fullPath);
        allRecords = allRecords.concat(records);
      } else {
        console.warn(`Archivo no encontrado: ${fullPath}`);
      }
    }

    console.log(`Total registros adjudicados extraídos: ${allRecords.length}`);
    
    // We can filter to get the top/most clean records, e.g., sample 300 interesting records to avoid bloating the frontend code
    // Let's filter to keep records of key products like Papa, Tomate, Cebolla, Amonio, Notebook, Almohada, Útiles de Aseo, etc.
    const keyProducts = ['Papa', 'Tomate', 'Cebolla', 'Notebook', 'Amonio Cuaternario', 'Almohada', 'Papel Carta', 'Servicio Colaciones', 'Útiles de Aseo'];
    const filteredRecords = allRecords.filter(r => keyProducts.includes(r.normalizedName));
    
    console.log(`Registros filtrados de productos de interés: ${filteredRecords.length}`);
    
    // Balanced diverse sampler across regions and products
    const grouped = {};
    filteredRecords.forEach(r => {
      const key = `${r.region}_${r.normalizedName}`;
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(r);
    });

    const finalSample = [];
    const MAX_PER_KEY = 8; // capture up to 8 records per combination of region and product
    Object.keys(grouped).forEach(key => {
      const recordsForKey = grouped[key];
      finalSample.push(...recordsForKey.slice(0, MAX_PER_KEY));
    });

    console.log(`Muestra distribuida y balanceada generada: ${finalSample.length} registros.`);
    
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(finalSample, null, 2), 'utf-8');
    console.log(`Registros guardados en ${OUTPUT_FILE}`);

    
  } catch (err) {
    console.error('Error al procesar los archivos CSV:', err);
  }
}

run();
