import { useEffect, useState }
from 'react'

import { supabase }
from '../services/supabase'

export default function ClientiPage({
  goHome
}) {

  const [fullName, setFullName] =
    useState('')

  const [phone, setPhone] =
    useState('')

  const [email, setEmail] =
    useState('')

  const [clientType, setClientType] =
    useState('Privato')

  const [notes, setNotes] =
    useState('')

  const [clienti, setClienti] =
    useState([])

  const [search, setSearch] =
    useState('')

  useEffect(() => {

    loadClienti()

  }, [])

  async function loadClienti() {

    const {
      data,
      error
    } =
      await supabase
        .from('clienti')
        .select('*')
        .order(
          'created_at',
          {
            ascending: false
          }
        )

    if (!error) {

      setClienti(data || [])

    }
  }

  async function saveCliente() {

    if (!fullName)
      return

    const {
      error
    } =
      await supabase
        .from('clienti')
        .insert({

          full_name:
            fullName,

          phone,

          email,

          client_type:
            clientType,

          notes
        })

    if (error) {

      alert(
        'Errore salvataggio cliente'
      )

      return
    }

    setFullName('')
    setPhone('')
    setEmail('')
    setClientType('Privato')
    setNotes('')

    loadClienti()

    alert(
      'Cliente salvato.'
    )
  }

  async function deleteCliente(
    cliente
  ) {

    const confirmDelete =
      confirm(
        'Eliminare questo cliente?'
      )

    if (!confirmDelete)
      return

    await supabase
      .from('clienti')
      .delete()
      .eq(
        'id',
        cliente.id
      )

    loadClienti()
  }

  const filteredClienti =
    clienti.filter((c) => {

      const text =
        `
        ${c.full_name}
        ${c.phone}
        ${c.email}
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
            CLIENTI
          </h1>

          <p
            style={{
              color: '#aaa'
            }}
          >
            CRM Studio Legale Vasquez
          </p>

        </div>

      </div>

      {/* FORM */}

      <div
        style={{
          background: '#101010',
          border:
            '1px solid rgba(212,175,55,0.3)',
          borderRadius: '30px',
          padding: '35px',
          marginBottom: '40px',
          display: 'grid',
          gap: '20px'
        }}
      >

        <input
          placeholder="Nome completo"
          value={fullName}
          onChange={(e) =>
            setFullName(
              e.target.value
            )
          }
          style={inputStyle}
        />

        <input
          placeholder="Telefono"
          value={phone}
          onChange={(e) =>
            setPhone(
              e.target.value
            )
          }
          style={inputStyle}
        />

        <input
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(
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
          placeholder="Note legali"
          value={notes}
          onChange={(e) =>
            setNotes(
              e.target.value
            )
          }
          rows={6}
          style={textareaStyle}
        />

        <button
          onClick={saveCliente}
          style={saveButton}
        >
          SALVA CLIENTE
        </button>

      </div>

      {/* SEARCH */}

      <input
        placeholder="Cerca cliente..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        style={{
          ...inputStyle,
          marginBottom: '30px'
        }}
      />

      {/* LISTA */}

      <div
        style={{
          display: 'grid',
          gap: '25px'
        }}
      >

        {
          filteredClienti.map((c) => (

            <div
              key={c.id}
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
                  gap: '30px',
                  flexWrap: 'wrap'
                }}
              >

                <div>

                  <h2
                    style={{
                      color: '#d4af37'
                    }}
                  >
                    {c.full_name}
                  </h2>

                  <p>
                    <strong>
                      Telefono:
                    </strong>
                    {' '}
                    {c.phone}
                  </p>

                  <p>
                    <strong>
                      Email:
                    </strong>
                    {' '}
                    {c.email}
                  </p>

                  <p>
                    <strong>
                      Tipologia:
                    </strong>
                    {' '}
                    {c.client_type}
                  </p>

                  <p>
                    <strong>
                      Note:
                    </strong>
                    {' '}
                    {c.notes}
                  </p>

                </div>

                <div>

                  <button
                    onClick={() =>
                      deleteCliente(c)
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

const inputStyle = {

  background: '#1a1a1a',

  border: '1px solid #333',

  borderRadius: '16px',

  padding: '18px',

  color: 'white',

  fontSize: '16px',

  width: '100%'
}

const textareaStyle = {

  background: '#1a1a1a',

  border: '1px solid #333',

  borderRadius: '16px',

  padding: '18px',

  color: 'white',

  fontSize: '16px',

  resize: 'none',

  width: '100%'
}

const saveButton = {

  background: '#d4af37',

  color: 'black',

  border: 'none',

  padding: '18px',

  borderRadius: '18px',

  fontWeight: 'bold',

  fontSize: '18px',

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