export async function addPdfTemplate(
  doc
) {

  // SFONDO COMPLETO

  try {

    doc.addImage(
      '/pdf-background.png',
      'PNG',
      0,
      0,
      210,
      297
    )

  } catch (err) {

    console.log(
      'Background non caricato'
    )
  }
}

// COMPATIBILITÀ FILE VECCHI

export const createPDFTemplate =
  addPdfTemplate