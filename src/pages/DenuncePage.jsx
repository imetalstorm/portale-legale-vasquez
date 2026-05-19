import { useState }
from 'react'

import jsPDF
from 'jspdf'

import { supabase }
from '../services/supabase'

import logo
from '../assets/logo.png'

import watermark
from '../assets/watermark.png'

export default function DenuncePage({
  goHome
}) {

  const [complainant, setComplainant] =
    useState('')

  const [accused, setAccused] =
    useState('')

  const [location, setLocation] =
    useState('')

  const [facts, setFacts] =
    useState('')

  const [lawyer, setLawyer] =
    useState('Eddy Vasquez')

  async function generatePDF() {

    try {

      const protocol =
        Math.floor(
          Math.random() * 999999
        )

      const doc = new jsPDF()

      // PAGINA

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

      } catch(error) {}

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

      } catch(error) {}

      // HEADER

      doc.setTextColor(0,0,0)

      doc.setFontSize(24)

      doc.text(
        'DENUNCIA UFFICIALE',
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

      // PROTOCOLLO

      doc.text(
        `Protocollo: ${protocol}`,
        20,
        78
      )

      // TESTO

      doc.setFontSize(12)

      const denunciaText =
        `Il sottoscritto ${complainant}, assistito legalmente dall'Avvocato ${lawyer}, presenta formale denuncia nei confronti di ${accused} per fatti verificatisi presso ${location}.`

      doc.text(
        denunciaText,
        20,
        100,
        {
          maxWidth: 170,
          lineHeightFactor: 1.6
        }
      )

      // DINAMICA

      doc.setFontSize(13)

      doc.text(
        'Dinamica dei fatti',
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

      // FIRME

      doc.setFontSize(12)

      doc.text(
        'Firma Assistito',
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
        `denuncia_${complainant}.pdf`
      )

      // FILE NAME

      const fileName =
        `denuncia_${Date.now()}.pdf`

      // UPLOAD

      const {
        error: uploadError
      } =
        await supabase
          .storage
          .from('denunce')
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
          .from('denunce')
          .getPublicUrl(fileName)

      const pdfUrl =
        publicData.publicUrl

      // DATABASE

      await supabase
        .from('denunce')
        .insert({

          complainant,

          accused,

          location,

          facts,

          lawyer,

          protocol:
            protocol.toString(),

          pdf_url:
            pdfUrl
        })

      alert(
        'Denuncia salvata correttamente.'
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
        DENUNCE
      </h1>

      <div
        style={{
          display: 'grid',
          gap: '20px',
          maxWidth: '1000px'
        }}
      >

        <input
          placeholder="Denunciante"
          value={complainant}
          onChange={(e) =>
            setComplainant(
              e.target.value
            )
          }
          style={inputStyle}
        />

        <input
          placeholder="Accusato"
          value={accused}
          onChange={(e) =>
            setAccused(
              e.target.value
            )
          }
          style={inputStyle}
        />

        <input
          placeholder="Luogo dei fatti"
          value={location}
          onChange={(e) =>
            setLocation(
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
            borderRadius: '20px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          GENERA DENUNCIA PDF
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