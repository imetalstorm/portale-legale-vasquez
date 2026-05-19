import { useState }
from 'react'

import { supabase }
from '../services/supabase'

import {
  createPDFTemplate
}
from '../utils/pdfTemplate'

export default function QuerelePage({
  goHome
}) {

  const [complainant, setComplainant] =
    useState('')

  const [accused, setAccused] =
    useState('')

  const [facts, setFacts] =
    useState('')

  const [damages, setDamages] =
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
          'QUERELA FORMALE'
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
        `Il sottoscritto ${complainant}, assistito legalmente dall'Avvocato ${lawyer}, propone formale querela nei confronti di ${accused} per i fatti di seguito descritti.`

      doc.text(
        bodyText,
        20,
        105,
        {
          maxWidth: 170,
          lineHeightFactor: 1.6
        }
      )

      // FATTI

      doc.setFontSize(13)

      doc.text(
        'Descrizione dei fatti',
        20,
        145
      )

      doc.setFontSize(11)

      doc.text(
        facts,
        20,
        160,
        {
          maxWidth: 170,
          lineHeightFactor: 1.6
        }
      )

      // DANNI

      doc.setFontSize(13)

      doc.text(
        'Danni dichiarati',
        20,
        210
      )

      doc.setFontSize(11)

      doc.text(
        damages,
        20,
        222,
        {
          maxWidth: 170,
          lineHeightFactor: 1.6
        }
      )

      // FIRME

      doc.setFontSize(12)

      doc.text(
        'Firma Querelante',
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
        complainant,
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
        `querela_${complainant}.pdf`
      )

      // FILE NAME

      const fileName =
        `querela_${Date.now()}.pdf`

      // UPLOAD

      const {
        error: uploadError
      } =
        await supabase
          .storage
          .from('querele')
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
          .from('querele')
          .getPublicUrl(fileName)

      const pdfUrl =
        publicData.publicUrl

      // DATABASE

      const {
        error: dbError
      } =
        await supabase
          .from('querele')
          .insert({

            complainant,

            accused,

            facts,

            damages,

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
        'Querela salvata correttamente.'
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
        QUERELE
      </h1>

      <div
        style={{
          display: 'grid',
          gap: '20px',
          maxWidth: '1000px'
        }}
      >

        <input
          placeholder="Querelante"
          value={complainant}
          onChange={(e) =>
            setComplainant(
              e.target.value
            )
          }
          style={inputStyle}
        />

        <input
          placeholder="Querelato"
          value={accused}
          onChange={(e) =>
            setAccused(
              e.target.value
            )
          }
          style={inputStyle}
        />

        <textarea
          placeholder="Descrizione dei fatti"
          value={facts}
          onChange={(e) =>
            setFacts(
              e.target.value
            )
          }
          rows={8}
          style={textareaStyle}
        />

        <textarea
          placeholder="Danni morali/materiali"
          value={damages}
          onChange={(e) =>
            setDamages(
              e.target.value
            )
          }
          rows={5}
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
            borderRadius: '20px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
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

  fontSize: '16px',

  resize: 'none'
}