import { useState }
from 'react'

import jsPDF
from 'jspdf'

import {
  createPDFTemplate
} from '../utils/pdfTemplate'

export default function CancellazioneCasellarioPage({
  goHome
}) {

  const [fullName, setFullName] =
    useState('')

  const [birthDate, setBirthDate] =
    useState('')

  const [currentJob, setCurrentJob] =
    useState('')

  const [lawyer, setLawyer] =
    useState('Eddy Vasquez')

  const declarationText =
`Il sottoscritto dichiara formalmente di assumersi le proprie responsabilità in relazione ai fatti contestati, dimostrando piena consapevolezza delle condotte poste in essere e manifestando concreta volontà di reinserimento nella società, conformemente alle modalità e disposizioni previste dalla normativa vigente.`

  async function generatePDF() {

    if (
      !fullName ||
      !birthDate
    ) {

      alert(
        'Compila i campi obbligatori'
      )

      return
    }

    const protocol =
      `CAS-${Date.now()}`

    const doc =
      new jsPDF()

    // TEMPLATE

    await createPDFTemplate(doc)

    // TITOLO

    doc.setFont(
      'times',
      'bold'
    )

    doc.setFontSize(20)

    doc.text(
      'ISTANZA DI CANCELLAZIONE DEL CASELLARIO',
      105,
      120,
      {
        align: 'center'
      }
    )

    doc.text(
      'GIUDIZIARIO',
      105,
      134,
      {
        align: 'center'
      }
    )

    // DATI

    doc.setFont(
      'times',
      'normal'
    )

    doc.setFontSize(13)

    doc.text(
      `Protocollo: ${protocol}`,
      22,
      165
    )

    doc.text(
      `Nome e cognome: ${fullName}`,
      22,
      190
    )

    doc.text(
      `Data di nascita: ${birthDate}`,
      22,
      210
    )

    doc.text(
      `Impiego lavorativo attuale: ${currentJob}`,
      22,
      230
    )

    // TESTO PRINCIPALE

    doc.setFontSize(12)

    doc.text(
      declarationText,
      22,
      265,
      {
        maxWidth: 165,
        lineHeightFactor: 1.8
      }
    )

    // FIRMA

    doc.setFont(
      'times',
      'bold'
    )

    doc.text(
      `Avvocato: ${lawyer}`,
      22,
      330
    )

    // DOWNLOAD

    doc.save(
      `istanza_casellario_${Date.now()}.pdf`
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

      {/* HOME */}

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

      {/* CONTAINER */}

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
          ISTANZA CANCELLAZIONE CASELLARIO
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

        <input
          placeholder="Impiego lavorativo attuale"
          value={currentJob}
          onChange={(e) =>
            setCurrentJob(
              e.target.value
            )
          }
          style={inputStyle}
        />

        <textarea
          value={declarationText}
          readOnly
          rows={7}
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
          GENERA PDF
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