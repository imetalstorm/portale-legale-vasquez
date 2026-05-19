import { useEffect, useState }
from 'react'

import { supabase }
from './services/supabase'

import LoginPage
from './pages/LoginPage'

import HomePage
from './pages/HomePage'

import DenuncePage
from './pages/DenuncePage'

import ArchivioDenunce
from './pages/ArchivioDenunce'

import AccessoAttiPage
from './pages/AccessoAttiPage'

import QuerelePage
from './pages/QuerelePage'

import ArchivioQuerele
from './pages/ArchivioQuerele'

import ContrattiLegaliPage
from './pages/ContrattiLegaliPage'

import ArchivioContratti
from './pages/ArchivioContratti'

import ClientiPage
from './pages/ClientiPage'

import ArchivioPratiche
from './pages/ArchivioPratiche'

export default function App() {

  const [user, setUser] =
    useState(null)

  const [loading, setLoading] =
    useState(true)

  const [page, setPage] =
    useState('home')

  // CONTROLLO SESSIONE

  useEffect(() => {

    checkUser()

  }, [])

  async function checkUser() {

    const {
      data
    } =
      await supabase.auth.getSession()

    setUser(
      data.session?.user || null
    )

    setLoading(false)
  }

  // LOGOUT

  async function logout() {

    await supabase.auth.signOut()

    setUser(null)
  }

  // LOADING

  if (loading) {

    return (

      <div
        style={{
          minHeight: '100vh',
          background: '#050505',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
          fontSize: '30px'
        }}
      >
        Caricamento...
      </div>

    )
  }

  // LOGIN

  if (!user) {

    return (

      <LoginPage
        onLogin={(loggedUser) =>
          setUser(loggedUser)
        }
      />

    )
  }

  // DENUNCE

  if (page === 'denunce') {

    return (

      <DenuncePage
        goHome={() =>
          setPage('home')
        }
      />

    )
  }

  // ARCHIVIO DENUNCE

  if (
    page ===
    'archivio-denunce'
  ) {

    return (

      <ArchivioDenunce
        goHome={() =>
          setPage('home')
        }
      />

    )
  }

  // ACCESSO AGLI ATTI

  if (
    page ===
    'accesso-atti'
  ) {

    return (

      <AccessoAttiPage
        goHome={() =>
          setPage('home')
        }
      />

    )
  }

  // QUERELE

  if (
    page ===
    'querele'
  ) {

    return (

      <QuerelePage
        goHome={() =>
          setPage('home')
        }
      />

    )
  }

  // ARCHIVIO QUERELE

  if (
    page ===
    'archivio-querele'
  ) {

    return (

      <ArchivioQuerele
        goHome={() =>
          setPage('home')
        }
      />

    )
  }

  // CONTRATTI

  if (
    page ===
    'contratti-legali'
  ) {

    return (

      <ContrattiLegaliPage
        goHome={() =>
          setPage('home')
        }
      />

    )
  }

  // ARCHIVIO CONTRATTI

  if (
    page ===
    'archivio-contratti'
  ) {

    return (

      <ArchivioContratti
        goHome={() =>
          setPage('home')
        }
      />

    )
  }

  // CLIENTI

  if (
    page ===
    'clienti'
  ) {

    return (

      <ClientiPage
        goHome={() =>
          setPage('home')
        }
      />

    )
  }

  // ARCHIVIO PRATICHE

  if (
    page ===
    'archivio-pratiche'
  ) {

    return (

      <ArchivioPratiche
        goHome={() =>
          setPage('home')
        }
      />

    )
  }

  // HOMEPAGE

  return (

    <HomePage

      logout={logout}

      openDenunce={() =>
        setPage('denunce')
      }

      openArchivioDenunce={() =>
        setPage(
          'archivio-denunce'
        )
      }

      openAccessoAtti={() =>
        setPage(
          'accesso-atti'
        )
      }

      openQuerele={() =>
        setPage(
          'querele'
        )
      }

      openArchivioQuerele={() =>
        setPage(
          'archivio-querele'
        )
      }

      openContrattiLegali={() =>
        setPage(
          'contratti-legali'
        )
      }

      openArchivioContratti={() =>
        setPage(
          'archivio-contratti'
        )
      }

      openClienti={() =>
        setPage(
          'clienti'
        )
      }

      openArchivioPratiche={() =>
        setPage(
          'archivio-pratiche'
        )
      }

    />

  )
}