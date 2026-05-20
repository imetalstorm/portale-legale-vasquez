import background
from '../assets/pdf-background.png'

export async function createPDFTemplate(
  doc
) {

  try {

    const response =
      await fetch(background)

    const blob =
      await response.blob()

    const reader =
      new FileReader()

    const base64 =
      await new Promise(
        (resolve) => {

          reader.onloadend =
            () => resolve(
              reader.result
            )

          reader.readAsDataURL(
            blob
          )
        }
      )

    doc.addImage(
      base64,
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