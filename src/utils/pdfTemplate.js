export async function addPdfTemplate(
  doc
) {

  // LOGO

  const logo =
    '/logo.png'

  try {

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

  // RESET

  doc.setTextColor(
    0,
    0,
    0
  )
}