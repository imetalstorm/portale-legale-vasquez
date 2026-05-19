import { useState }
from 'react'

import { supabase }
from '../services/supabase'

import {
  createPDFTemplate
}
from '../utils/pdfTemplate'

export default function AccessoAttiPage({
  goHome
}) {

  const [requester, setRequester] =
    useState('')

  const [protocolCase, setProtocolCase] =
    useState('')

  const [authority, setAuthority] =
    useState('')

  const [motivation, setMotivation] =
    useState('')

  const [lawyer, setLawyer] =
    useState('Eddy Vasquez')

  async function generatePDF() {

    try {

      const protocol =
        Math.floor(
          Math.random() * 999999
        )

      const doc =
        createPDFTemplate(
          'ISTANZA ACCESSO AGLI ATTI'
        )

      // PROTOCOLLO

      doc.setFontSize(11)

      doc.text(
        `Protocollo: ${protocol}`,
        20,
        78
      )

      // TESTO

      doc.setFontSize(12)

      const bodyText =
        `Il sottoscritto ${requester}, rappresentato legalmente dall'Avvocato ${lawyer}, richiede formalmente accesso agli atti relativi al protocollo/caso ${protocolCase} presso ${authority}.`

      doc.text(
        bodyText,
        20,
        105,
        {
          maxWidth: 170,
          lineHeightFactor: 1.6
        }
      )

      // MOTIVAZIONE

      doc.setFontSize(13)

      doc.text(
        'Motivazione della richiesta',
        20,
        145
      )

      doc.setFontSize(11)

      doc.text(
        motivation,
        20,
        160,
        {
          maxWidth: 170,
          lineHeightFactor: 1.6
        }
      )

      // DATA

      doc.text(
        `Data: ${new Date().toLocaleDateString()}`,
        20,
        230
      )

      // FIRME

      doc.setFontSize(12)

      doc.text(
        'Firma Richiedente',
        20,
        250
      )

      doc.line(
        20,
        260,
        80,
        260
      )

      doc.text(
        requester,
        20,
        270
      )

      doc.text(
        'Firma Avvocato',
        120,
        250
      )

      doc.line(
        120,
        260,
        180,
        260
      )

      doc.text(
        lawyer,
        120,
        270
      )

      // CREA PDF

      const pdfBlob =
        doc.output('blob')

      // DOWNLOAD

      doc.save(
        `accesso_atti_${requester}.pdf`
      )

      // FILE NAME

      const fileName =
        `accesso_atti_${Date.now()}.pdf`

      // UPLOAD

      const {
        error: uploadError
      } =
        await supabase
          .storage
          .from('accesso-atti')
          .upload(
            fileName,
            pdfBlob,
            {
              upsert: true,
              contentType:
                'application/pdf'
            }
          )

      if (uploadError) {

        alert(
          'Errore upload storage'
        )

        return
      }

      // URL

      const {
        data: publicData
      } =
        supabase
          .storage
          .from('accesso-atti')
          .getPublicUrl(fileName)

      const pdfUrl =
        publicData.publicUrl

      // DATABASE

      const {
        error: dbError
      } =
        await supabase
          .from('accesso_atti')
          .insert({

            requester,

            protocol_case:
              protocolCase,

            authority,

            motivation,

            lawyer,

            protocol:
              protocol.toString(),

            pdf_url:
              pdfUrl
          })

      if (dbError) {

        alert(
          'Errore database'
        )

        return
      }

      alert(
        'Istanza salvata correttamente.'
      )

    } catch(error) {

      console.log(error)

      alert(
        'Errore generale.'
      )
    }
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
          borderRadius: '20px',
          fontWeight: 'bold',
          cursor: 'pointer'
        }}
      >
        HOME
      </button>

      <h1
        style={{
          color: '#d4af37',
          fontSize: '55px',
          marginBottom: '40px'
        }}
      >
        ACCESSO AGLI ATTI
      </h1>

      <div
        style={{
          display: 'grid',
          gap: '20px',
          maxWidth: '1000px'
        }}
      >

        <input
          placeholder="Richiedente"
          value={requester}
          onChange={(e) =>
            setRequester(
              e.target.value
            )
          }
          style={inputStyle}
        />

        <input
          placeholder="Numero protocollo/caso"
          value={protocolCase}
          onChange={(e) =>
            setProtocolCase(
              e.target.value
            )
          }
          style={inputStyle}
        />

        <input
          placeholder="Ente competente"
          value={authority}
          onChange={(e) =>
            setAuthority(
              e.target.value
            )
          }
          style={inputStyle}
        />

        <textarea
          placeholder="Motivazione richiesta accesso agli atti"
          value={motivation}
          onChange={(e) =>
            setMotivation(
              e.target.value
            )
          }
          rows={10}
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
          style={{
            background: '#d4af37',
            color: 'black',
            border: 'none',
            padding: '20px',
            borderRadius: '22px',
            fontWeight: 'bold',
            fontSize: '18px',
            cursor: 'pointer'
          }}
        >
          GENERA ISTANZA PDF
        </button>

      </div>

    </div>
  )
}

const inputStyle = {

  background: '#1a1a1a',

  border: '1px solid #333',

  borderRadius: '18px',

  padding: '18px',

  color: 'white',

  fontSize: '16px'
}

const textareaStyle = {

  background: '#1a1a1a',

  border: '1px solid #333',

  borderRadius: '18px',

  padding: '18px',

  color: 'white',

  fontSize: '16px',

  resize: 'none'
}