export async function addPdfTemplate(
  doc
) {

  try {

    const logo =
      '/logo.png'

    doc.addImage(
      logo,
      'PNG',
      75,
      10,
      60,
      25
    )

  } catch (err) {

    console.log(
      'Logo non caricato'
    )
  }

  // FILIGRANA

  doc.setTextColor(
    230,
    230,
    230
  )

  doc.setFontSize(60)

  doc.text(
    'VASQUEZ',
    35,
    160,
    {
      angle: 45
    }
  )

  // RESET COLORI

  doc.setTextColor(
    0,
    0,
    0
  )
}

// COMPATIBILITÀ CON FILE VECCHI

export const createPDFTemplate =
  addPdfTemplate