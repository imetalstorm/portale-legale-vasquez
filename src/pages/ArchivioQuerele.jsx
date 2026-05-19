import { useEffect, useState }
from 'react'

import { supabase }
from '../services/supabase'

export default function ArchivioQuerele({
  goHome
}) {

  const [querele, setQuerele] =
    useState([])

  const [loading, setLoading] =
    useState(true)

  const [search, setSearch] =
    useState('')

  useEffect(() => {

    loadQuerele()

  }, [])

  async function loadQuerele() {

    setLoading(true)

    const {
      data,
      error
    } =
      await supabase
        .from('querele')
        .select('*')
        .order(
          'id',
          {
            ascending: false
          }
        )

    if (!error) {

      setQuerele(data || [])

    }

    setLoading(false)
  }

  async function deleteQuerela(
    querela
  ) {

    const confirmDelete =
      confirm(
        'Eliminare questa querela?'
      )

    if (!confirmDelete)
      return

    // DATABASE

    await supabase
      .from('querele')
      .delete()
      .eq(
        'id',
        querela.id
      )

    // STORAGE

    try {

      const fileName =
        querela.pdf_url
          .split('/')
          .pop()

      await supabase
        .storage
        .from('querele')
        .remove([
          fileName
        ])

    } catch(error) {}

    loadQuerele()
  }

  const filteredQuerele =
    querele.filter((q) => {

      const text =
        `
        ${q.complainant}
        ${q.accused}
        ${q.protocol}
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
            ARCHIVIO QUERELE
          </h1>

          <p
            style={{
              color: '#aaa'
            }}
          >
            Studio Legale Vasquez
          </p>

        </div>

      </div>

      {/* SEARCH */}

      <input
        placeholder="Cerca per protocollo, querelante o querelato"
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
          filteredQuerele.map((q) => (

            <div
              key={q.id}
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
                    Protocollo:
                    {' '}
                    {q.protocol}
                  </h2>

                  <p>
                    <strong>
                      Querelante:
                    </strong>
                    {' '}
                    {q.complainant}
                  </p>

                  <p>
                    <strong>
                      Querelato:
                    </strong>
                    {' '}
                    {q.accused}
                  </p>

                  <p>
                    <strong>
                      Avvocato:
                    </strong>
                    {' '}
                    {q.lawyer}
                  </p>

                </div>

                {/* BOTTONI */}

                <div
                  style={{
                    display: 'flex',
                    gap: '15px',
                    flexWrap: 'wrap'
                  }}
                >

                  <button
                    onClick={() =>
                      window.open(
                        q.pdf_url,
                        '_blank'
                      )
                    }
                    style={openButton}
                  >
                    APRI PDF
                  </button>

                  <button
                    onClick={() =>
                      deleteQuerela(q)
                    }
                    style={deleteButton}
                  >
                    ELIMINA
                  </button>

                </div>

              </div>

            </div>

          ))
        }

      </div>

    </div>
  )
}

const openButton = {

  background: '#d4af37',

  color: 'black',

  border: 'none',

  padding: '15px 25px',

  borderRadius: '16px',

  fontWeight: 'bold',

  cursor: 'pointer'
}

const deleteButton = {

  background: '#8b0000',

  color: 'white',

  border: 'none',

  padding: '15px 25px',

  borderRadius: '16px',

  fontWeight: 'bold',

  cursor: 'pointer'
}