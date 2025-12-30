import { React, useState, useEffect } from 'react'

import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CContainer,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CNavGroup,
  CRow,
  CFormSelect,
  CCardFooter,
  CFormLabel,
  CSpinner,
} from '@coreui/react'

import CIcon from '@coreui/icons-react'
import fundaciteLogo from '../../../assets/images/logoFundacite.png'
import { cilPencil } from '@coreui/icons'
import { useNavigate } from 'react-router-dom'
import '../../../scss/login.scss'
import '../../../scss/botones.scss'
import axios from 'axios'

const Login = () => {
  const navigate = useNavigate()
  // modal y mensaje de exito ---------------------------
  const [Modalexito, setModalexito] = useState(false)

  const [loadingAction, setLoadingAction] = useState(false)
  const [actionLabel, setActionLabel] = useState('')

  const [modalRecuperar, setModalRecuperar] = useState(false)
  const [emailRecuperar, setEmailRecuperar] = useState('')
  const [mensajeRecuperar, setMensajeRecuperar] = useState('')

  const [mensajeError, setmensajeError] = useState('')
  const [ModalmensajeError, setModalmensajeError] = useState(false)

  const [formData, setFormData] = useState({
    Usua_NomUs: '',
    Usua_Contr: '',
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }
  //axios.post('http://localhost:4000/login
  //const response = await api.post('/login', formData, {
  const postLogin = async () => {
    setLoadingAction(true)
    setActionLabel('Cargando...')
    try {
      const response = await axios.post('http://localhost:4000/login', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      localStorage.setItem('token', response.data.token)
      navigate('/Inicio')
    } catch (err) {
      if (err.response.data.error) {
        setmensajeError(err.response.data.error)
      } else {
        setmensajeError('')
        const mensajes = err.response.data.errors.map((issue) => issue.message)
        setmensajeError(mensajes)
      }

      setModalmensajeError(true)
    } finally {
      setLoadingAction(false)
      setActionLabel('')
    }
  }

  const handleRecuperar = async () => {
    setLoadingAction(true)
    setActionLabel('Cargando...')
    try {
      const result = await axios.post(
        'http://localhost:4000/forgot-password',
        { email: emailRecuperar },
        {
          headers: { 'Content-Type': 'application/json' },
        },
      )
      setMensajeRecuperar(result.data.message)

      setModalexito(true)
    } catch (err) {
      setmensajeError('')
      setmensajeError(err.response.data.error)
      setModalmensajeError(true)
    } finally {
      setLoadingAction(false)
      setActionLabel('')
    }
  }

  return (
    <>
      <CModal
        visible={loadingAction}
        backdrop="static"
        keyboard={false}
        alignment="center"
        onClose={() => {}}
      >
        <CModalHeader closeButton={false}>{actionLabel}</CModalHeader>
        <CModalBody className="d-flex align-items-center gap-3">
          <CSpinner />
          <span>{actionLabel}</span>
        </CModalBody>
      </CModal>

      <CModal
        visible={Modalexito}
        backdrop="static"
        keyboard={false}
        onClose={() => setModalexito(false)}
      >
        <CModalHeader>Mensaje</CModalHeader>
        <CModalBody>
          <div>{String(mensajeRecuperar)}</div>
        </CModalBody>
        <CModalFooter>
          <div className="button-box">
            <CButton
              className="boton-regresar"
              onClick={() => {
                setMensajeRecuperar('')
                setModalexito(false)
              }}
            >
              Cerrar
            </CButton>
          </div>
        </CModalFooter>
      </CModal>

      <CModal visible={modalRecuperar} onClose={() => setModalRecuperar(false)}>
        <CModalHeader>Recuperar contraseña</CModalHeader>
        <CModalBody>
          <CFormLabel>Ingresa tu correo electronico</CFormLabel>
          <CFormInput
            type="email"
            value={emailRecuperar}
            onChange={(e) => setEmailRecuperar(e.target.value)}
          />
        </CModalBody>
        <CModalFooter>
          <CButton
            className="boton-generar"
            onClick={() => {
              setModalRecuperar(false)
              handleRecuperar()
            }}
          >
            Enviar
          </CButton>
          <CButton className="boton-eliminar" onClick={() => setModalRecuperar(false)}>
            Cerrar
          </CButton>
        </CModalFooter>
      </CModal>

      <CModal visible={ModalmensajeError} onClose={() => setModalmensajeError(false)}>
        <CModalHeader>Error</CModalHeader>
        <CModalBody>
          {Array.isArray(mensajeError) ? (
            <ul>
              {mensajeError.map((msg, idx) => (
                <li key={idx}>{msg}</li>
              ))}
            </ul>
          ) : (
            <div>{String(mensajeError)}</div>
          )}
        </CModalBody>
        <CModalFooter>
          <div className="button-box">
            <CButton
              className="boton-regresar"
              onClick={() => {
                setModalmensajeError(false)
              }}
            >
              Cerrar
            </CButton>
          </div>
        </CModalFooter>
      </CModal>

      <div className="login-container">
        <CCard>
          <CCardBody>
            <div style={{ textAlign: 'center' }}>
              <div
                style={{
                  width: '100%',
                  maxWidth: '420px',
                  height: '200px',
                  margin: '0 auto',
                  padding: '0.5rem 0',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <img
                  src={fundaciteLogo}
                  alt="Fundacite"
                  style={{
                    width: 'auto',
                    height: '200%',
                    maxHeight: 'none',
                    objectFit: 'contain',
                    display: 'block',
                    margin: '0 auto',
                  }}
                />
              </div>
            </div>

            <CForm>
              <CRow className="justify-content-center">
                <CCol md={11}>
                  <CFormLabel>Nombre de usuario</CFormLabel>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilPencil} />
                    </CInputGroupText>
                    <CFormInput
                      type="text"
                      placeholder="Nombre de usuario"
                      className="input-tamaño"
                      name="Usua_NomUs"
                      onChange={handleInputChange}
                    />
                  </CInputGroup>
                  <CFormLabel>Contraseña</CFormLabel>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilPencil} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Contraseña"
                      className="input-tamaño"
                      name="Usua_Contr"
                      onChange={handleInputChange}
                    />
                  </CInputGroup>
                </CCol>
              </CRow>
            </CForm>
            <div>
              <CButton color="link" className="boton-link" onClick={() => navigate('/register')}>
                ¿ No tienes cuenta ?
              </CButton>

              <CButton color="link" className="boton-link" onClick={() => setModalRecuperar(true)}>
                Recuperar contraseña
              </CButton>
            </div>
          </CCardBody>
          <CCardFooter>
            <div className="caja-boton">
              <CButton
                className="boton-generar"
                onClick={() => {
                  postLogin()
                }}
              >
                Iniciar Sesion
              </CButton>
            </div>
          </CCardFooter>
        </CCard>
      </div>
    </>
  )
}

export default Login
