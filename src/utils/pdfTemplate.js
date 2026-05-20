import jsPDF
from 'jspdf'

import background
from '../assets/pdf-background.png'

export async function createPDFTemplate(
  doc
) {

  try {

    const img =
      new Image()

    img.src =
      background

    await new Promise(
      (resolve, reject) => {

        img.onload =
          resolve

        img.onerror =
          reject
      }
    )

    // IMPORTANTISSIMO

    if (
      typeof doc.addImage !==
      'function'
    ) {

      throw new Error(
        'doc non valido'
      )
    }

    doc.addImage(
      img,
      'PNG',
      0,
      0,
      210,
      297
    )

  } catch (err) {

    console.log(
      'ERRORE TEMPLATE:',
      err
    )

    throw new Error(
      'Errore template PDF'
    )
  }
}

// COMPATIBILITÀ

export const addPdfTemplate =
  createPDFTemplate