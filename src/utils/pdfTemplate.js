import background
from '../assets/pdf-background.png'

export async function addPdfTemplate(
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
      'Errore background PDF'
    )
  }
}

// COMPATIBILITÀ FILE VECCHI

export const createPDFTemplate =
  addPdfTemplate