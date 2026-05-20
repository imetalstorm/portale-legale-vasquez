const backgroundBase64 =
'data:image/png;base64,INSERISCI_BASE64'

export async function createPDFTemplate(
  doc
) {

  try {

    doc.addImage(
      backgroundBase64,
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