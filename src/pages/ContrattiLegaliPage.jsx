import { useState }
from 'react'

import jsPDF
from 'jspdf'

import {
  createPDFTemplate
} from '../utils/pdfTemplate'

export default function ContrattiLegaliPage({
  goHome
}) {

  const [clientName, setClientName] =
    useState('')

  const [clientType, setClientType] =
    useState('Persona fisica')

  const [businessName, setBusinessName] =
    useState('')

  const [payment, setPayment] =
    useState('')

  const [lawyer, setLawyer] =
    useState('Eddy Vasquez')

  async function generatePDF() {

    if (
      !clientName ||
      !payment
    ) {

      alert(
        'Compila i campi obbligatori'
      )

      return
    }

    const protocol =
      `SLV-${Date.now()}`

    const today =
      new Date().toLocaleDateString()

    const doc =
      new jsPDF()

    // TEMPLATE

    await createPDFTemplate(doc)

    // HEADER

    doc.setFont(
      'times',
      'bold'
    )

    doc.setFontSize(18)

    doc.text(
      'CONTRATTO DI ASSISTENZA LEGALE',
      105,
      72,
      {
        align: 'center'
      }
    )

    // INFO

    doc.setFont(
      'times',
      'normal'
    )

    doc.setFontSize(11)

    doc.text(
      `Protocollo: ${protocol}`,
      22,
      92
    )

    doc.text(
      `Data: ${today}`,
      150,
      92
    )

    // PARTI

    doc.setFont(
      'times',
      'bold'
    )

    doc.text(
      'PARTI CONTRAENTI',
      22,
      110
    )

    doc.setFont(
      'times',
      'normal'
    )

    const businessText =
      clientType === 'Attività'
        ? `Attività rappresentata: ${businessName}`
        : 'Cliente privato'

    doc.text(
      `Studio Legale: Studio Legale Vasquez`,
      22,
      122
    )

    doc.text(
      `Cliente: ${clientName}`,
      22,
      134
    )

    doc.text(
      `Tipologia cliente: ${clientType}`,
      22,
      146
    )

    doc.text(
      businessText,
      22,
      158
    )

    // CLAUSOLE

    doc.setFont(
      'times',
      'bold'
    )

    doc.text(
      'OGGETTO DELL’INCARICO',
      22,
      178
    )

    doc.setFont(
      'times',
      'normal'
    )

    doc.setFontSize(10)

    const legalText =
`Lo Studio Legale Vasquez garantisce assistenza legale professionale e continuativa al cliente relativamente a procedimenti civili, penali, contrattuali ed amministrativi, assicurando tutela giuridica, consulenza e rappresentanza legale secondo la normativa vigente.

Il cliente si impegna a collaborare in buona fede con il professionista incaricato e a rispettare gli obblighi economici previsti dal presente accordo.

Lo Studio Legale garantisce riservatezza e professionalità nello svolgimento dell’incarico.`

    doc.text(
      legalText,
      22,
      190,
      {
        maxWidth: 165,
        lineHeightFactor: 1.35
      }
    )

    // COMPENSO E VALIDITÀ

    doc.setFont(
      'times',
      'bold'
    )

    doc.setFontSize(11)

    doc.text(
      'COMPENSO E VALIDITÀ',
      22,
      235
    )

    doc.setFont(
      'times',
      'normal'
    )

    doc.setFontSize(10)

    doc.text(
      `Il compenso pattuito tra le parti è stabilito in ${payment}. Il presente contratto rimane valido fino a revoca consensuale o cessazione del rapporto professionale tra le parti.`,
      22,
      248,
      {
        maxWidth: 165,
        lineHeightFactor: 1.3
      }
    )

    // FIRME

    doc.setFont(
      'times',
      'bold'
    )

    doc.setFontSize(10)

    // CLIENTE

    doc.line(
      22,
      276,
      80,
      276
    )

    doc.text(
      'FIRMA CLIENTE',
      22,
      282
    )

    doc.setFont(
      'times',
      'normal'
    )

    // SEMPRE PERSONA FISICA

    doc.text(
      clientName,
      22,
      288
    )

    // AVVOCATO

    doc.setFont(
      'times',
      'bold'
    )

    doc.line(
      125,
      276,
      185,
      276
    )

    doc.text(
      'FIRMA AVVOCATO',
      125,
      282
    )

    doc.setFont(
      'times',
      'normal'
    )

    doc.text(
      lawyer,
      125,
      288
    )

    // DOWNLOAD

    doc.save(
      `contratto_assistenza_legale_${Date.now()}.pdf`
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
          maxWidth: '950px',
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
          CONTRATTO ASSISTENZA LEGALE
        </h1>

        <input
          placeholder="Nome cliente"
          value={clientName}
          onChange={(e) =>
            setClientName(
              e.target.value
            )
          }
          style={inputStyle}
        />

        <select
          value={clientType}
          onChange={(e) =>
            setClientType(
              e.target.value
            )
          }
          style={inputStyle}
        >
          <option>
            Persona fisica
          </option>

          <option>
            Attività
          </option>
        </select>

        {
          clientType ===
          'Attività' && (

            <input
              placeholder="Nome attività"
              value={businessName}
              onChange={(e) =>
                setBusinessName(
                  e.target.value
                )
              }
              style={inputStyle}
            />

          )
        }

        <input
          placeholder="Compenso pattuito"
          value={payment}
          onChange={(e) =>
            setPayment(
              e.target.value
            )
          }
          style={inputStyle}
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
          GENERA CONTRATTO PDF
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