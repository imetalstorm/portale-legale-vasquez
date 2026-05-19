import background
from '../assets/pdf-background.png'

export async function createPDFTemplate(
  doc
) {

  try {

    doc.addImage(
      background,
      'PNG',
      0,
      0,
      210,
      297
    )

  } catch (err) {

    console.log(
      'Errore caricamento template PDF'
    )
  }
}

// COMPATIBILITÀ

export const addPdfTemplate =
  createPDFTemplate