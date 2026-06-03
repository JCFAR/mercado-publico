// Mercado Público Inteligente - Base de Datos Simulada (Mock Data)
// Proporciona datos realistas del ecosistema de Compras Públicas en Chile (Compras Ágiles, Historial de Precios, Compradores y Proveedores)

const MPI_DATA = {
  // Configuración del usuario (Catálogo, Perfil, Ofertas y Documentos)
  user: {
    profile: {
      rut: "76.452.129-K",
      companyName: "Distribuidora AgroTech Ltda",
      region: "Tarapacá",
      categories: ["Alimentos y Hortalizas", "Tecnología y Oficina", "Productos de Aseo"]
    },
    catalog: [
      { id: "CAT001", code: "PROD-PAPA-SUP", name: "Papa Granel Selección Especial", description: "Papa de primera calidad seleccionada, ideal para casinos y alimentación institucional. Malla de 25 kg.", brand: "AgroNord", unit: "Malla 25kg", refPrice: 18500, stock: 450, category: "Alimentos y Hortalizas", image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=500&auto=format&fit=crop&q=60" },
      { id: "CAT002", code: "PROD-TOM-PRIM", name: "Tomate Larga Vida Grado A", description: "Tomate fresco larga vida, despachado en cajas de madera protegidas.", brand: "ValleAzul", unit: "Caja 15kg", refPrice: 14200, stock: 320, category: "Alimentos y Hortalizas", image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500&auto=format&fit=crop&q=60" },
      { id: "CAT003", code: "PROD-CEB-EXTR", name: "Cebolla Guarda Calibre Primera", description: "Cebolla de guarda seleccionada, seca, calibre uniforme.", brand: "AgroNord", unit: "Saco 20kg", refPrice: 11000, stock: 500, category: "Alimentos y Hortalizas", image: "https://images.unsplash.com/photo-1508747705-3df207a84b9f?w=500&auto=format&fit=crop&q=60" },
      { id: "CAT004", code: "PROD-ASE-AMON", name: "Amonio Cuaternario Concentrado 5L", description: "Desinfectante industrial de alto espectro con certificación sanitaria.", brand: "CleanPro", unit: "Bidón 5L", refPrice: 8900, stock: 1200, category: "Productos de Aseo", image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=500&auto=format&fit=crop&q=60" },
      { id: "CAT005", code: "PROD-TEC-LAP", name: "Notebook Enterprise 15.6' Ryzen 5", description: "Notebook corporativo 8GB RAM, 256GB SSD, Windows 11 Pro.", brand: "Lenovo", unit: "Unidad", refPrice: 420000, stock: 15, category: "Tecnología y Oficina", image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500&auto=format&fit=crop&q=60" }
    ],
    documents: [
      { id: "DOC001", name: "Resolución Sanitaria AgroTech.pdf", type: "Certificación", size: "2.4 MB", uploadDate: "2026-01-10" },
      { id: "DOC002", name: "Ficha Técnica Papa Selección.pdf", type: "Ficha Técnica", size: "1.1 MB", uploadDate: "2026-03-15" },
      { id: "DOC003", name: "Certificado de Distribución Autorizada Lenovo.pdf", type: "Garantía", size: "3.2 MB", uploadDate: "2026-02-20" }
    ],
    offers: [
      { id: "OFF001", code: "2233-14-CO26", name: "Adquisición de Papas y Tomates para Casino", buyer: "Ilustre Municipalidad de Iquique", date: "2026-05-10", amount: 821000, status: "Adjudicado", winRate: 100, feedback: "Excelente cumplimiento y calidad del producto." },
      { id: "OFF002", code: "1055-89-CO26", name: "Suministro de Sanitizantes de Superficie", buyer: "Servicio de Salud Tarapacá", date: "2026-05-18", amount: 1068000, status: "En evaluación", winRate: 60, feedback: "-" },
      { id: "OFF003", code: "852-12-CO26", name: "Renovación Equipamiento Computacional", buyer: "Junaeb Regional Antofagasta", date: "2026-04-05", amount: 4200000, status: "No Adjudicado", winRate: 0, feedback: "Nuestra propuesta fue superada en precio por un 2%." }
    ]
  },

  // Regiones de Chile
  regions: [
    "Arica y Parinacota", "Tarapacá", "Antofagasta", "Atacama", "Coquimbo", "Valparaíso", 
    "Metropolitana", "O'Higgins", "Maule", "Ñuble", "Biobío", "Araucanía", "Los Ríos", 
    "Los Lagos", "Aysén", "Magallanes"
  ],

  // Rubros principales
  rubros: [
    "Alimentos y Hortalizas", "Tecnología y Computación", "Productos de Aseo y Limpieza", 
    "Papelería y Oficina", "Servicios de Mantención", "Construcción y Ferretería"
  ],

  // Compradores del Estado (Fichas 360°)
  buyers: [
    {
      id: "BUY001",
      name: "Servicio de Salud Tarapacá",
      rut: "61.602.000-8",
      region: "Tarapacá",
      annualSpend: 345000000,
      frequency: "Semanal",
      preferredRubro: "Productos de Aseo y Limpieza",
      topSuppliers: ["CleanPro Chile", "Distribuidora AgroTech Ltda", "Química del Norte"],
      monthlySpend: [28, 32, 45, 38, 29, 35, 42, 50, 48, 30, 28, 40], // En millones
      description: "Organismo público encargado de coordinar la red asistencial de la región de Tarapacá."
    },
    {
      id: "BUY002",
      name: "Ilustre Municipalidad de Iquique",
      rut: "69.010.100-3",
      region: "Tarapacá",
      annualSpend: 620000000,
      frequency: "Diario",
      preferredRubro: "Alimentos y Hortalizas",
      topSuppliers: ["AgroComercial Iquique", "Feria del Campesino", "Distribuidora AgroTech Ltda"],
      monthlySpend: [45, 50, 58, 62, 48, 52, 55, 60, 65, 50, 40, 55],
      description: "Gobierno comunal enfocado en el desarrollo local, ayuda comunitaria y colegios municipales."
    },
    {
      id: "BUY003",
      name: "Junaeb Regional Metropolitana",
      rut: "61.503.200-K",
      region: "Metropolitana",
      annualSpend: 1850000000,
      frequency: "Mensual",
      preferredRubro: "Alimentos y Hortalizas",
      topSuppliers: ["Soprole S.A.", "Alimentos Fruna", "AgroChile Distribuidores"],
      monthlySpend: [120, 140, 160, 180, 150, 155, 170, 190, 200, 150, 110, 125],
      description: "Junta Nacional de Auxilio Escolar y Becas del Estado de Chile."
    },
    {
      id: "BUY004",
      name: "Hospital Ernesto Torres Galdames",
      rut: "61.602.105-5",
      region: "Tarapacá",
      annualSpend: 950000000,
      frequency: "Semanal",
      preferredRubro: "Tecnología y Computación",
      topSuppliers: ["TechSolutions Chile", "Sonda S.A.", "Lenovo Direct Chile"],
      monthlySpend: [70, 75, 85, 90, 80, 82, 88, 95, 100, 78, 68, 80],
      description: "Hospital principal de Iquique que requiere constantes insumos e infraestructura digital."
    }
  ],

  // Competencia / Proveedores Históricos
  providers: [
    { id: "PROV001", name: "AgroComercial Iquique", rut: "76.102.304-5", baseRegion: "Tarapacá", totalWon: 245000000, activeRegions: ["Tarapacá", "Arica y Parinacota"], topProduct: "Papa consumo", successRate: 72, primaryClient: "Ilustre Municipalidad de Iquique" },
    { id: "PROV002", name: "CleanPro Chile", rut: "77.892.400-K", baseRegion: "Metropolitana", totalWon: 512000000, activeRegions: ["Metropolitana", "Valparaíso", "Tarapacá"], topProduct: "Amonio Cuaternario", successRate: 65, primaryClient: "Servicio de Salud Tarapacá" },
    { id: "PROV003", name: "TechSolutions Chile", rut: "76.992.311-2", baseRegion: "Antofagasta", totalWon: 890000000, activeRegions: ["Antofagasta", "Tarapacá", "Coquimbo"], topProduct: "Computadores portátiles", successRate: 58, primaryClient: "Hospital Ernesto Torres Galdames" },
    { id: "PROV004", name: "Papelería Providencia", rut: "76.455.221-3", baseRegion: "Metropolitana", totalWon: 130000000, activeRegions: ["Metropolitana"], topProduct: "Papel Carta Multiuso", successRate: 48, primaryClient: "Junaeb Regional Metropolitana" }
  ],

  // Radar de Oportunidades Activas (Compras Ágiles)
  opportunities: [
    {
      id: "OP001",
      code: "CA-7640-2026",
      name: "Compra de Hortalizas Frescas para Internados de Junaeb",
      buyer: "Ilustre Municipalidad de Iquique",
      region: "Tarapacá",
      rubro: "Alimentos y Hortalizas",
      estimatedAmount: 950000,
      publishDate: "2026-05-28",
      closeDate: "2026-06-02",
      status: "Publicada",
      deliveryAddress: "Av. Salvador Allende 2040, Iquique",
      deliveryTerms: "Despacho inmediato dentro de 3 días post orden",
      items: [
        { name: "Papa consumo de primera", qty: 25, unit: "Malla 25kg", spec: "Papas sin tierra, tamaño mediano." },
        { name: "Tomates larga vida primera", qty: 30, unit: "Caja 15kg", spec: "Tomates rojos y firmes de tamaño estándar." }
      ]
    },
    {
      id: "OP002",
      code: "CA-9932-2026",
      name: "Adquisición Insumos Sanitización Hospital Iquique",
      buyer: "Hospital Ernesto Torres Galdames",
      region: "Tarapacá",
      rubro: "Productos de Aseo y Limpieza",
      estimatedAmount: 1800000,
      publishDate: "2026-05-29",
      closeDate: "2026-06-03",
      status: "Publicada",
      deliveryAddress: "Plaza Prat 10, Iquique",
      deliveryTerms: "Entrega total en bodega central",
      items: [
        { name: "Amonio Cuaternario concentrado", qty: 150, unit: "Bidón 5L", spec: "Concentración mínima 10% certificado." }
      ]
    },
    {
      id: "OP003",
      code: "CA-3341-2026",
      name: "Renovación Licencias y Notebooks para Oficina Dirección",
      buyer: "Servicio de Salud Tarapacá",
      region: "Tarapacá",
      rubro: "Tecnología y Computación",
      estimatedAmount: 3200000,
      publishDate: "2026-05-29",
      closeDate: "2026-06-01",
      status: "Publicada",
      deliveryAddress: "Esmeralda 450, Iquique",
      deliveryTerms: "Productos nuevos y sellados, con garantía extendida",
      items: [
        { name: "Notebook corporativo gama media", qty: 7, unit: "Unidad", spec: "Ryzen 5 o superior, 8GB RAM, SSD 256GB." }
      ]
    },
    {
      id: "OP004",
      code: "CA-4521-2026",
      name: "Adquisición Papelería e Insumos de Oficina primer semestre",
      buyer: "Junaeb Regional Metropolitana",
      region: "Metropolitana",
      rubro: "Papelería y Oficina",
      estimatedAmount: 4800000,
      publishDate: "2026-05-27",
      closeDate: "2026-05-30",
      status: "En evaluación",
      deliveryAddress: "Catedral 1139, Santiago",
      deliveryTerms: "Distribución directa en oficinas de atención",
      items: [
        { name: "Resma de Papel tamaño Carta", qty: 1000, unit: "Unidad", spec: "Resma 500 hojas, 75gr/m2 de alta blancura." }
      ]
    }
  ],

  // Historial de compras y base de precios para la normalización de productos e inteligencia de precios
  historicalPurchases: [
    // Alimentos y Hortalizas (Normalizado bajo 'PAPA')
    { id: "HP001", code: "4412-192-COT26", normalizedName: "Papa", rawName: "Papa consumo", buyer: "Ilustre Municipalidad de Iquique", supplier: "AgroComercial Iquique", qty: 30, unit: "Malla 25kg", unitPrice: 19500, totalPrice: 585000, region: "Tarapacá", processType: "Compra Ágil", date: "2025-06-15" },
    { id: "HP002", code: "1055-322-COT26", normalizedName: "Papa", rawName: "Papa lavada", buyer: "Servicio de Salud Tarapacá", supplier: "Distribuidora AgroTech Ltda", qty: 20, unit: "Malla 25kg", unitPrice: 18200, totalPrice: 364000, region: "Tarapacá", processType: "Compra Ágil", date: "2025-08-10" },
    { id: "HP003", code: "2201-443-COT26", normalizedName: "Papa", rawName: "Papa malla 25 kg", buyer: "Junaeb Regional Metropolitana", supplier: "AgroChile Distribuidores", qty: 200, unit: "Malla 25kg", unitPrice: 16500, totalPrice: 3300000, region: "Metropolitana", processType: "Licitación Pública", date: "2025-10-05" },
    { id: "HP004", code: "3447-226-COT26", normalizedName: "Papa", rawName: "Papa consumo primera", buyer: "Ilustre Municipalidad de Iquique", supplier: "Feria del Campesino", qty: 50, unit: "Malla 25kg", unitPrice: 20500, totalPrice: 1025000, region: "Tarapacá", processType: "Compra Ágil", date: "2026-01-20" },
    { id: "HP005", code: "1055-322-COT26", normalizedName: "Papa", rawName: "Papa 25 kg", buyer: "Hospital Ernesto Torres Galdames", supplier: "Distribuidora AgroTech Ltda", qty: 15, unit: "Malla 25kg", unitPrice: 19000, totalPrice: 285000, region: "Tarapacá", processType: "Compra Ágil", date: "2026-03-12" },
    { id: "HP006", code: "2201-443-COT26", normalizedName: "Papa", rawName: "Papa consumo", buyer: "Junaeb Regional Metropolitana", supplier: "Alimentos Fruna", qty: 500, unit: "Malla 25kg", unitPrice: 15800, totalPrice: 7900000, region: "Metropolitana", processType: "Convenio Marco", date: "2026-04-18" },

    // Alimentos (Normalizado bajo 'TOMATE')
    { id: "HP101", code: "4412-192-COT26", normalizedName: "Tomate", rawName: "Tomate larga vida", buyer: "Ilustre Municipalidad de Iquique", supplier: "Feria del Campesino", qty: 10, unit: "Caja 15kg", unitPrice: 13500, totalPrice: 135000, region: "Tarapacá", processType: "Compra Ágil", date: "2025-06-20" },
    { id: "HP102", code: "1055-322-COT26", normalizedName: "Tomate", rawName: "Tomate grado A caja", buyer: "Servicio de Salud Tarapacá", supplier: "Distribuidora AgroTech Ltda", qty: 15, unit: "Caja 15kg", unitPrice: 14500, totalPrice: 217500, region: "Tarapacá", processType: "Compra Ágil", date: "2025-09-05" },
    { id: "HP103", code: "2201-443-COT26", normalizedName: "Tomate", rawName: "Tomate larga vida granel", buyer: "Junaeb Regional Metropolitana", supplier: "AgroChile Distribuidores", qty: 120, unit: "Caja 15kg", unitPrice: 12100, totalPrice: 1452000, region: "Metropolitana", processType: "Licitación Pública", date: "2025-11-12" },
    { id: "HP104", code: "4412-192-COT26", normalizedName: "Tomate", rawName: "Tomate caja 15 kg", buyer: "Ilustre Municipalidad de Iquique", supplier: "AgroComercial Iquique", qty: 35, unit: "Caja 15kg", unitPrice: 13900, totalPrice: 486500, region: "Tarapacá", processType: "Compra Ágil", date: "2026-02-14" },

    // Alimentos (Normalizado bajo 'CEBOLLA')
    { id: "HP201", code: "4412-192-COT26", normalizedName: "Cebolla", rawName: "Cebolla de guarda", buyer: "Ilustre Municipalidad de Iquique", supplier: "Feria del Campesino", qty: 20, unit: "Saco 20kg", unitPrice: 10500, totalPrice: 210000, region: "Tarapacá", processType: "Compra Ágil", date: "2025-07-02" },
    { id: "HP202", code: "1055-322-COT26", normalizedName: "Cebolla", rawName: "Cebolla guarda seleccionada", buyer: "Servicio de Salud Tarapacá", supplier: "Distribuidora AgroTech Ltda", qty: 12, unit: "Saco 20kg", unitPrice: 11200, totalPrice: 134400, region: "Tarapacá", processType: "Compra Ágil", date: "2025-09-28" },
    { id: "HP203", code: "2201-443-COT26", normalizedName: "Cebolla", rawName: "Cebolla saco 20 kg", buyer: "Junaeb Regional Metropolitana", supplier: "Alimentos Fruna", qty: 150, unit: "Saco 20kg", unitPrice: 9200, totalPrice: 1380000, region: "Metropolitana", processType: "Convenio Marco", date: "2026-03-20" },

    // Productos de Aseo (Normalizado bajo 'AMONIO CUATERNARIO')
    { id: "HP301", code: "1055-322-COT26", normalizedName: "Amonio Cuaternario", rawName: "Amonio Cuaternario 5L", buyer: "Servicio de Salud Tarapacá", supplier: "CleanPro Chile", qty: 80, unit: "Bidón 5L", unitPrice: 8500, totalPrice: 680000, region: "Tarapacá", processType: "Compra Ágil", date: "2025-07-25" },
    { id: "HP302", code: "4134-287-COT26", normalizedName: "Amonio Cuaternario", rawName: "Desinfectante Amonio Concentrado", buyer: "Hospital Ernesto Torres Galdames", supplier: "Química del Norte", qty: 120, unit: "Bidón 5L", unitPrice: 9100, totalPrice: 1092000, region: "Tarapacá", processType: "Compra Ágil", date: "2025-10-18" },
    { id: "HP303", code: "1055-322-COT26", normalizedName: "Amonio Cuaternario", rawName: "Amonio Bidón de 5 lts", buyer: "Servicio de Salud Tarapacá", supplier: "Distribuidora AgroTech Ltda", qty: 100, unit: "Bidón 5L", unitPrice: 8200, totalPrice: 820000, region: "Tarapacá", processType: "Compra Ágil", date: "2026-02-05" },

    // Tecnología (Normalizado bajo 'NOTEBOOK')
    { id: "HP401", code: "2013-844-COT26", normalizedName: "Notebook", rawName: "Notebook corporativo Ryzen 5", buyer: "Hospital Ernesto Torres Galdames", supplier: "TechSolutions Chile", qty: 5, unit: "Unidad", unitPrice: 415000, totalPrice: 2075000, region: "Tarapacá", processType: "Compra Ágil", date: "2025-08-20" },
    { id: "HP402", code: "2013-844-COT26", normalizedName: "Notebook", rawName: "Laptop Enterprise 15 pulgadas", buyer: "Servicio de Salud Tarapacá", supplier: "Sonda S.A.", qty: 10, unit: "Unidad", unitPrice: 435000, totalPrice: 4350000, region: "Tarapacá", processType: "Licitación Pública", date: "2025-12-15" }
  ],

  // Historial de alertas configuradas
  alerts: [
    { id: "AL001", region: "Tarapacá", rubro: "Alimentos y Hortalizas", keyword: "Papa", minAmount: 500000, active: true },
    { id: "AL002", region: "Tarapacá", rubro: "Productos de Aseo y Limpieza", keyword: "Amonio", minAmount: 1000000, active: true }
  ]
};
