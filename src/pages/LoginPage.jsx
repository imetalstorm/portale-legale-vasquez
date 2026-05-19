import { useState }
from 'react'

import { supabase }
from '../services/supabase'

export default function LoginPage({
  onLogin
}) {

  const [email, setEmail] =
    useState('')

  const [password, setPassword] =
    useState('')

  const [loading, setLoading] =
    useState(false)

  async function handleLogin() {

    setLoading(true)

    const {
      data,
      error
    } =
      await supabase.auth.signInWithPassword({

        email,

        password

      })

    setLoading(false)

    if (error) {

      alert(
        'Credenziali non valide'
      )

      return
    }

    onLogin(data.user)
  }

  return (

    <div
      style={{
        minHeight: '100vh',
        backgroundImage:
          "url('/background.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '40px'
      }}
    >

      <div
        style={{
          width: '100%',
          maxWidth: '500px',
          background:
            'rgba(0,0,0,0.82)',
          borderRadius: '35px',
          padding: '50px',
          border:
            '1px solid rgba(212,175,55,0.4)',
          display: 'grid',
          gap: '25px'
        }}
      >

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >

          <img
            src="/logo.png"
            style={{
              width: '180px',
              marginBottom: '20px'
            }}
          />

          <h1
            style={{
              color: '#d4af37',
              textAlign: 'center',
              marginBottom: '10px'
            }}
          >
            PORTALE LEGALE
          </h1>

          <p
            style={{
              color: '#aaa'
            }}
          >
            Studio Legale Vasquez
          </p>

        </div>

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

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
          style={inputStyle}
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          style={buttonStyle}
        >

          {
            loading
              ? 'ACCESSO...'
              : 'ACCEDI'
          }

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