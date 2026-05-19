import jsPDF
from 'jspdf'

import logo
from '../assets/logo.png'

import watermark
from '../assets/watermark.png'

export function createPDFTemplate(
  title
) {

  const doc = new jsPDF()

  // SFONDO

  doc.setFillColor(255,255,255)

  doc.rect(
    0,
    0,
    210,
    297,
    'F'
  )

  // FILIGRANA

  try {

    doc.addImage(
      watermark,
      'PNG',
      35,
      70,
      140,
      140
    )

  } catch(error) {

    console.log(error)
  }

  // LOGO

  try {

    doc.addImage(
      logo,
      'PNG',
      150,
      10,
      40,
      40
    )

  } catch(error) {

    console.log(error)
  }

  // HEADER

  doc.setTextColor(0,0,0)

  doc.setFontSize(24)

  doc.text(
    title,
    20,
    25
  )

  doc.setFontSize(11)

  doc.text(
    'Studio Legale Vasquez',
    20,
    40
  )

  doc.text(
    'Los Santos • Civico 389',
    20,
    47
  )

  doc.text(
    'studiolegalevasquez@gammarp.com',
    20,
    54
  )

  // LINEA

  doc.line(
    20,
    65,
    190,
    65
  )

  // FOOTER

  doc.setFontSize(9)

  doc.text(
    'Documento generato automaticamente dal Portale Legale Vasquez.',
    20,
    287
  )

  return doc
}