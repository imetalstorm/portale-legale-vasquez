import { useState }
from 'react'

import jsPDF
from 'jspdf'

import {
  createPDFTemplate
} from '../utils/pdfTemplate'

export default function QuerelePage({
  goHome
}) {

  const [fullName, setFullName] =
    useState('')

  const [birthDate, setBirthDate] =
    useState('')

  const [facts, setFacts] =
    useState('')

  const [lawyer, setLawyer] =
    useState('Eddy Vasquez')

  async function generatePDF() {

    if (
      !fullName ||
      !facts
    ) {

      alert(
        'Compila i campi obbligatori'
      )

      return
    }

    const protocol =
      `QUE-${Date.now()}`

    // IMPORTANTISSIMO

    const doc =
      new jsPDF()

    // TEMPLATE

    await createPDFTemplate(doc)

    // TITOLO

    doc.setFont(
      'times',
      'bold'
    )

    doc.setFontSize(19)

    doc.text(
      'QUERELA',
      105,
      82,
      {
        align: 'center'
      }
    )

    // DATI

    doc.setFont(
      'times',
      'normal'
    )

    doc.setFontSize(12)

    doc.text(
      `Protocollo: ${protocol}`,
      22,
      102
    )

    doc.text(
      `Nome e cognome: ${fullName}`,
      22,
      116
    )

    doc.text(
      `Data di nascita: ${birthDate}`,
      22,
      130
    )

    // FATTI

    doc.setFont(
      'times',
      'bold'
    )

    doc.text(
      'ESPOSIZIONE DEI FATTI',
      22,
      152
    )

    doc.setFont(
      'times',
      'normal'
    )

    doc.setFontSize(11)

    doc.text(
      facts,
      22,
      168,
      {
        maxWidth: 165,
        lineHeightFactor: 1.6
      }
    )

    // FIRMA

    doc.setFont(
      'times',
      'bold'
    )

    doc.setFontSize(11)

    doc.text(
      `Avvocato: ${lawyer}`,
      22,
      270
    )

    // DOWNLOAD

    doc.save(
      `querela_${Date.now()}.pdf`
    )
  }

  return (

    <div
      style={{
        minHeight: '100vh',
        background: '#050505',
        color: 'white',
        padding: '40px'
      }}
    >

      <button
        onClick={goHome}
        style={{
          position: 'fixed',
          top: '30px',
          right: '30px',
          background: '#d4af37',
          color: 'black',
          border: 'none',
          padding: '15px 30px',
          borderRadius: '18px',
          fontWeight: 'bold',
          cursor: 'pointer'
        }}
      >
        HOME
      </button>

      <div
        style={{
          maxWidth: '900px',
          margin: '0 auto',
          background: '#101010',
          border:
            '1px solid rgba(212,175,55,0.3)',
          borderRadius: '30px',
          padding: '40px',
          display: 'grid',
          gap: '20px'
        }}
      >

        <img
          src="/logo.png"
          style={{
            width: '180px',
            margin: '0 auto',
            objectFit: 'contain'
          }}
        />

        <h1
          style={{
            color: '#d4af37',
            textAlign: 'center',
            fontSize: '38px'
          }}
        >
          QUERELA
        </h1>

        <input
          placeholder="Nome e cognome"
          value={fullName}
          onChange={(e) =>
            setFullName(
              e.target.value
            )
          }
          style={inputStyle}
        />

        <input
          placeholder="Data di nascita"
          value={birthDate}
          onChange={(e) =>
            setBirthDate(
              e.target.value
            )
          }
          style={inputStyle}
        />

        <textarea
          placeholder="Esposizione dei fatti"
          value={facts}
          onChange={(e) =>
            setFacts(
              e.target.value
            )
          }
          rows={8}
          style={textareaStyle}
        />

        <input
          placeholder="Avvocato"
          value={lawyer}
          onChange={(e) =>
            setLawyer(
              e.target.value
            )
          }
          style={inputStyle}
        />

        <button
          onClick={generatePDF}
          style={buttonStyle}
        >
          GENERA QUERELA PDF
        </button>

      </div>

    </div>
  )
}

const inputStyle = {

  background: '#1a1a1a',

  border: '1px solid #333',

  borderRadius: '16px',

  padding: '18px',

  color: 'white',

  fontSize: '16px'
}

const textareaStyle = {

  background: '#1a1a1a',

  border: '1px solid #333',

  borderRadius: '16px',

  padding: '18px',

  color: 'white',

  fontSize: '15px',

  resize: 'none'
}

const buttonStyle = {

  background: '#d4af37',

  color: 'black',

  border: 'none',

  padding: '20px',

  borderRadius: '20px',

  fontWeight: 'bold',

  fontSize: '18px',

  cursor: 'pointer'
}