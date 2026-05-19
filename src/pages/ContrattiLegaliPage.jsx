import { useState }
from 'react'

import { supabase }
from '../services/supabase'

import {
  createPDFTemplate
}
from '../utils/pdfTemplate'

export default function ContrattiLegaliPage({
  goHome
}) {

  const [clientName, setClientName] =
    useState('')

  const [clientType, setClientType] =
    useState('Privato')

  const [service, setService] =
    useState('')

  const [compensation, setCompensation] =
    useState('')

  const [duration, setDuration] =
    useState('')

  const [clauses, setClauses] =
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
          'CONTRATTO LEGALE'
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
        `Il presente contratto viene stipulato tra lo Studio Legale Vasquez, rappresentato dall'Avvocato ${lawyer}, e ${clientName} (${clientType}) per la prestazione dei seguenti servizi legali: ${service}.`

      doc.text(
        bodyText,
        20,
        105,
        {
          maxWidth: 170,
          lineHeightFactor: 1.6
        }
      )

      // COMPENSO

      doc.setFontSize(13)

      doc.text(
        'Compenso professionale',
        20,
        145
      )

      doc.setFontSize(11)

      doc.text(
        compensation,
        20,
        158
      )

      // DURATA

      doc.setFontSize(13)

      doc.text(
        'Durata contratto',
        20,
        178
      )

      doc.setFontSize(11)

      doc.text(
        duration,
        20,
        191
      )

      // CLAUSOLE

      doc.setFontSize(13)

      doc.text(
        'Clausole',
        20,
        211
      )

      doc.setFontSize(11)

      doc.text(
        clauses,
        20,
        224,
        {
          maxWidth: 170,
          lineHeightFactor: 1.5
        }
      )

      // FIRME

      doc.setFontSize(12)

      doc.text(
        'Firma Cliente',
        20,
        255
      )

      doc.line(
        20,
        265,
        80,
        265
      )

      doc.text(
        clientName,
        20,
        275
      )

      doc.text(
        'Firma Avvocato',
        120,
        255
      )

      doc.line(
        120,
        265,
        180,
        265
      )

      doc.text(
        lawyer,
        120,
        275
      )

      // CREA PDF

      const pdfBlob =
        doc.output('blob')

      // DOWNLOAD

      doc.save(
        `contratto_${clientName}.pdf`
      )

      // FILE NAME

      const fileName =
        `contratto_${Date.now()}.pdf`

      // UPLOAD

      const {
        error: uploadError
      } =
        await supabase
          .storage
          .from('contratti-legali')
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
          .from('contratti-legali')
          .getPublicUrl(fileName)

      const pdfUrl =
        publicData.publicUrl

      // DATABASE

      const {
        error: dbError
      } =
        await supabase
          .from('contratti_legali')
          .insert({

            client_name:
              clientName,

            client_type:
              clientType,

            service,

            compensation,

            duration,

            clauses,

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
        'Contratto salvato correttamente.'
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
        CONTRATTI LEGALI
      </h1>

      <div
        style={{
          display: 'grid',
          gap: '20px',
          maxWidth: '1000px'
        }}
      >

        <input
          placeholder="Cliente"
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
            Privato
          </option>

          <option>
            Azienda
          </option>

          <option>
            Assistito Penale
          </option>
        </select>

        <textarea
          placeholder="Servizi legali forniti"
          value={service}
          onChange={(e) =>
            setService(
              e.target.value
            )
          }
          rows={5}
          style={textareaStyle}
        />

        <input
          placeholder="Compenso"
          value={compensation}
          onChange={(e) =>
            setCompensation(
              e.target.value
            )
          }
          style={inputStyle}
        />

        <input
          placeholder="Durata contratto"
          value={duration}
          onChange={(e) =>
            setDuration(
              e.target.value
            )
          }
          style={inputStyle}
        />

        <textarea
          placeholder="Clausole contrattuali"
          value={clauses}
          onChange={(e) =>
            setClauses(
              e.target.value
            )
          }
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

const textareaStyle = {

  background: '#1a1a1a',

  border: '1px solid #333',

  borderRadius: '16px',

  padding: '18px',

  color: 'white',

  fontSize: '16px',

  resize: 'none'
}