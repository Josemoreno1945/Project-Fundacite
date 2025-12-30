import { React, useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
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
import '../scss/botones.scss'
import axios from 'axios'

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

const ResetPassword = () => {
  const [loadingAction, setLoadingAction] = useState(false)
  const [actionLabel, setActionLabel] = useState('')

  const [Modalexito, setModalexito] = useState(false)
  const [mensajeRecuperar, setMensajeRecuperar] = useState('')

  const [mensajeError, setmensajeError] = useState('')
  const [ModalmensajeError, setModalmensajeError] = useState(false)

  const navigate = useNavigate()
  const query = useQuery()
  const token = query.get('token')

  const [password, setPassword] = useState('')

  const handleSubmit = async () => {
    setLoadingAction(true)
    setActionLabel('Cargando...')
    try {
      const result = await axios.post(
        'http://localhost:4000/reset-password',
        { token, password },
        {
          headers: { 'Content-Type': 'application/json' },
        },
      )
      setModalexito(true)
      setMensajeRecuperar(result.data.message)
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

  if (!token) {
    return (
      <CContainer>
        <p>Token no proporcionado.</p>
      </CContainer>
    )
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
        <CModalHeader>{actionLabel}</CModalHeader>
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
                navigate('/login')
              }}
            >
              Cerrar
            </CButton>
          </div>
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

      <CContainer className="mt-5" style={{ maxWidth: '480px' }}>
        <CCard>
          <CCardBody>
            <h4>Cambiar contraseña</h4>
            <CForm>
              <CFormLabel>Nueva contraseña</CFormLabel>
              <CFormInput
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </CForm>
          </CCardBody>
          <CCardFooter className="d-flex justify-content-end">
            <CButton className="boton-generar" onClick={handleSubmit}>
              Guardar
            </CButton>
            <CButton className="boton-eliminar" onClick={() => navigate('/login')}>
              Cancelar
            </CButton>
          </CCardFooter>
        </CCard>
      </CContainer>
    </>
  )
}

export default ResetPassword
