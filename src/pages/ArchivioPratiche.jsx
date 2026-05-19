import { useEffect, useState }
from 'react'

import { supabase }
from '../services/supabase'

export default function ArchivioPratiche({
  goHome
}) {

  const [pratiche, setPratiche] =
    useState([])

  const [loading, setLoading] =
    useState(true)

  const [search, setSearch] =
    useState('')

  useEffect(() => {

    loadAll()

  }, [])

  async function loadAll() {

    setLoading(true)

    // DENUNCE

    const {
      data: denunce
    } =
      await supabase
        .from('denunce')
        .select('*')

    // QUERELE

    const {
      data: querele
    } =
      await supabase
        .from('querele')
        .select('*')

    // CONTRATTI

    const {
      data: contratti
    } =
      await supabase
        .from('contratti_legali')
        .select('*')

    // FORMATTA

    const allPratiche = [

      ...(denunce || []).map(
        (d) => ({

          type: 'DENUNCIA',

          protocol:
            d.protocol,

          client:
            d.complainant,

          lawyer:
            d.lawyer,

          pdf:
            d.pdf_url
        })
      ),

      ...(querele || []).map(
        (q) => ({

          type: 'QUERELA',

          protocol:
            q.protocol,

          client:
            q.complainant,

          lawyer:
            q.lawyer,

          pdf:
            q.pdf_url
        })
      ),

      ...(contratti || []).map(
        (c) => ({

          type: 'CONTRATTO',

          protocol:
            c.protocol,

          client:
            c.client_name,

          lawyer:
            c.lawyer,

          pdf:
            c.pdf_url
        })
      )
    ]

    setPratiche(allPratiche)

    setLoading(false)
  }

  const filteredPratiche =
    pratiche.filter((p) => {

      const text =
        `
        ${p.type}
        ${p.protocol}
        ${p.client}
        ${p.lawyer}
        `
        .toLowerCase()

      return text.includes(
        search.toLowerCase()
      )
    })

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
          borderRadius: '20px',
          fontWeight: 'bold',
          cursor: 'pointer',
          zIndex: 999
        }}
      >
        HOME
      </button>

      {/* HEADER */}

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '25px',
          marginBottom: '40px'
        }}
      >

        <img
          src="/logo.png"
          style={{
            width: '120px',
            height: '120px',
            objectFit: 'contain'
          }}
        />

        <div>

          <h1
            style={{
              color: '#d4af37',
              fontSize: '55px',
              marginBottom: '10px'
            }}
          >
            ARCHIVIO PRATICHE
          </h1>

          <p
            style={{
              color: '#aaa'
            }}
          >
            Dashboard Centrale Studio Legale
          </p>

        </div>

      </div>

      {/* SEARCH */}

      <input
        placeholder="Cerca pratica, protocollo, cliente..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        style={{
          width: '100%',
          maxWidth: '700px',
          marginBottom: '35px',
          background: '#101010',
          border: '1px solid #333',
          borderRadius: '18px',
          padding: '18px',
          color: 'white',
          fontSize: '16px'
        }}
      />

      {/* LOADING */}

      {
        loading && (

          <h2>
            Caricamento...
          </h2>

        )
      }

      {/* LISTA */}

      <div
        style={{
          display: 'grid',
          gap: '25px'
        }}
      >

        {
          filteredPratiche.map(
            (
              pratica,
              index
            ) => (

              <div
                key={index}
                style={{
                  background: '#101010',
                  border:
                    '1px solid rgba(212,175,55,0.3)',
                  borderRadius: '25px',
                  padding: '30px'
                }}
              >

                <div
                  style={{
                    display: 'flex',
                    justifyContent:
                      'space-between',
                    alignItems:
                      'flex-start',
                    gap: '30px',
                    flexWrap: 'wrap'
                  }}
                >

                  {/* INFO */}

                  <div>

                    <h2
                      style={{
                        color: '#d4af37',
                        marginBottom: '15px'
                      }}
                    >
                      {pratica.type}
                    </h2>

                    <p>
                      <strong>
                        Protocollo:
                      </strong>
                      {' '}
                      {pratica.protocol}
                    </p>

                    <p>
                      <strong>
                        Cliente:
                      </strong>
                      {' '}
                      {pratica.client}
                    </p>

                    <p>
                      <strong>
                        Avvocato:
                      </strong>
                      {' '}
                      {pratica.lawyer}
                    </p>

                  </div>

                  {/* BUTTON */}

                  <button
                    onClick={() =>
                      window.open(
                        pratica.pdf,
                        '_blank'
                      )
                    }
                    style={{
                      background:
                        '#d4af37',
                      color: 'black',
                      border: 'none',
                      padding:
                        '15px 25px',
                      borderRadius:
                        '16px',
                      fontWeight:
                        'bold',
                      cursor:
                        'pointer'
                    }}
                  >
                    APRI PDF
                  </button>

                </div>

              </div>

            )
          )
        }

      </div>

    </div>
  )
}