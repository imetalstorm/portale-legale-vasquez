export async function createPDFTemplate(
  doc
) {

  try {

    const img =
      new Image()

    img.src =
      '/pdf-background.png'

    await new Promise(
      (resolve, reject) => {

        img.onload = resolve

        img.onerror = reject
      }
    )

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
      'Errore template PDF'
    )
  }
}

// COMPATIBILITÀ

export const addPdfTemplate =
  createPDFTemplate