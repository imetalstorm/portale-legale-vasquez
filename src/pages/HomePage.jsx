export default function HomePage({

  logout,

  openDenunce,

  openArchivioDenunce,

  openAccessoAtti,

  openQuerele,

  openArchivioQuerele,

  openContrattiLegali,

  openArchivioContratti,

  openClienti,

  openArchivioPratiche,

  openCancellazioneCasellario

}) {

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

      {/* LOGOUT */}

      <button
        onClick={logout}
        style={{
          position: 'fixed',
          top: '30px',
          right: '30px',
          background: '#8b0000',
          color: 'white',
          border: 'none',
          padding: '15px 30px',
          borderRadius: '18px',
          fontWeight: 'bold',
          cursor: 'pointer',
          zIndex: 999
        }}
      >
        LOGOUT
      </button>

      <div
        style={{
          background:
            'rgba(0,0,0,0.78)',
          padding: '60px',
          borderRadius: '40px',
          width: '100%',
          maxWidth: '1550px',
          border:
            '1px solid rgba(212,175,55,0.4)'
        }}
      >

        {/* HEADER */}

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: '50px'
          }}
        >

          <img
            src="/logo.png"
            style={{
              width: '260px',
              objectFit: 'contain'
            }}
          />

          <h1
            style={{
              color: '#d4af37',
              fontSize: '42px',
              textAlign: 'center',
              marginTop: '10px',
              marginBottom: '10px'
            }}
          >
            LOS SANTOS • CIVICO 389
          </h1>

          <p
            style={{
              color: 'white',
              opacity: 0.8
            }}
          >
            studiolegalevasquez@gammarp.com
          </p>

        </div>

        {/* GRID */}

        <div
          style={{
            display: 'grid',
            gridTemplateColumns:
              'repeat(auto-fit,minmax(280px,1fr))',
            gap: '25px'
          }}
        >

          <button
            onClick={openDenunce}
            style={buttonStyle}
          >
            DENUNCE
          </button>

          <button
            onClick={
              openArchivioDenunce
            }
            style={buttonStyle}
          >
            ARCHIVIO DENUNCE
          </button>

          <button
            onClick={
              openAccessoAtti
            }
            style={buttonStyle}
          >
            ACCESSO AGLI ATTI
          </button>

          <button
            onClick={
              openQuerele
            }
            style={buttonStyle}
          >
            QUERELE
          </button>

          <button
            onClick={
              openArchivioQuerele
            }
            style={buttonStyle}
          >
            ARCHIVIO QUERELE
          </button>

          <button
            onClick={
              openContrattiLegali
            }
            style={buttonStyle}
          >
            CONTRATTI LEGALI
          </button>

          <button
            onClick={
              openArchivioContratti
            }
            style={buttonStyle}
          >
            ARCHIVIO CONTRATTI
          </button>

          <button
            onClick={
              openClienti
            }
            style={buttonStyle}
          >
            CLIENTI
          </button>

          <button
            onClick={
              openArchivioPratiche
            }
            style={buttonStyle}
          >
            ARCHIVIO PRATICHE
          </button>

          <button
            onClick={
              openCancellazioneCasellario
            }
            style={buttonStyle}
          >
            CANCELLAZIONE CASELLARIO
          </button>

        </div>

      </div>

    </div>
  )
}

const buttonStyle = {

  padding: '24px',

  borderRadius: '20px',

  border:
    '1px solid rgba(212,175,55,0.4)',

  background:
    'rgba(15,15,15,0.95)',

  color: '#d4af37',

  fontWeight: 'bold',

  fontSize: '20px',

  cursor: 'pointer',

  transition: '0.2s'
}