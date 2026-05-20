export async function createPDFTemplate(
  doc
) {

  try {

    const img =
      '/pdf-background.png'

    doc.addImage(
      img,
      'PNG',
      0,
      0,
      210,
      297
    )

  } catch (err) {

    console.log(err)

    throw new Error(
      'Errore caricamento template PDF'
    )
  }
}

// COMPATIBILITÀ

export const addPdfTemplate =
  createPDFTemplate