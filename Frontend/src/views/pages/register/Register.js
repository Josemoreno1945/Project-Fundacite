import { React, useState, useEffect } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CNavGroup,
  CRow,
  CFormSelect,
  CCardFooter,
  CFormLabel,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilLockLocked,
  cilPencil,
  cilUser,
  cilEnvelopeClosed,
  cilGroup,
  cilCalendar,
  cilLockUnlocked,
} from '@coreui/icons'
import { useNavigate } from 'react-router-dom'
import '../../../scss/login.scss'
import axios from 'axios'

const Register = () => {
  const navigate = useNavigate()
  const [usernameAvailable, setUsernameAvailable] = useState(null)
  const [emailAvailable, setEmailAvailable] = useState(null)
  const [formData, setFormData] = useState({
    Usua_PrimN: '',
    Usua_PrimA: '',
    Usua_NomUs: '',
    Usua_Email: '',
    Usua_Contr: '',
  })

  const handleInputChange = async (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))

    // Validación dinámica
    if (name === 'Usua_NomUs') {
      if (value.trim() === '') {
        setUsernameAvailable('')
        console.log('nada')
      }
      if (value) {
        const res = await axios.get(`http://localhost:4000/check_username/${value}`)
        if (res.data.exists === true) {
          setUsernameAvailable(false)
        }
        if (res.data.exists === false) {
          setUsernameAvailable(true)
        }
      }
    }

    if (name === 'Usua_Email') {
      if (value.trim() === '') {
        setEmailAvailable('')
        console.log('nada')
      }
      if (value) {
        const res = await axios.get(`http://localhost:4000/check_email/${value}`)
        if (res.data.exists === true) {
          setEmailAvailable(false)
        }
        if (res.data.exists === false) {
          setEmailAvailable(true)
        }
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:4000/register', formData)
      navigate('/login')
    } catch (err) {
      console.error('Error al registrar usuario:', err)
    }
  }
  return (
    <>
      <div className="login-container">
        <CCard className="mb-4">
          <CCardBody>
            <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '1.5rem', fontWeight: 'bold', color: '#1a237e' }}>
                Registrate!
              </h3>
            </div>
            <CForm>
              <CInputGroup className="mb-3">
                <div className="d-flex  w-100 gap-3">
                  <div className="w-50">
                    <CFormLabel>Primer Nombre</CFormLabel>
                    <CInputGroup>
                      <CInputGroupText>
                        <CIcon icon={cilPencil} />
                      </CInputGroupText>
                      <CFormInput
                        type="Text"
                        placeholder="Primer Nombre"
                        className="input-tamaño"
                        name="Usua_PrimN"
                        onChange={handleInputChange}
                      ></CFormInput>
                    </CInputGroup>
                  </div>
                  <div className="w-50">
                    <CFormLabel>Primer Apellido</CFormLabel>
                    <CInputGroup>
                      <CInputGroupText>
                        <CIcon icon={cilPencil} />
                      </CInputGroupText>
                      <CFormInput
                        type="Text"
                        placeholder="Primer Apellido"
                        className="input-tamaño"
                        name="Usua_PrimA"
                        onChange={handleInputChange}
                      ></CFormInput>
                    </CInputGroup>
                  </div>
                </div>
              </CInputGroup>

              <CInputGroup className="mb-3">
                <div className="d-flex  w-100 gap-3">
                  <div className="w-50">
                    <CFormLabel>Nombre de Usuario</CFormLabel>
                    <CInputGroup>
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        type="Text"
                        placeholder="Nombre de usuario"
                        className="input-tamaño"
                        name="Usua_NomUs"
                        onChange={handleInputChange}
                      ></CFormInput>
                      {usernameAvailable === false && (
                        <small style={{ color: 'red' }}>Usuario ya en uso</small>
                      )}
                      {usernameAvailable === true && (
                        <small style={{ color: 'green' }}>Usuario disponible</small>
                      )}
                    </CInputGroup>
                  </div>
                  <div className="w-50">
                    <CFormLabel>Correo electronico</CFormLabel>
                    <CInputGroup>
                      <CInputGroupText>
                        <CIcon icon={cilEnvelopeClosed} />
                      </CInputGroupText>
                      <CFormInput
                        type="Text"
                        placeholder="Correo electronico"
                        className="input-tamaño"
                        name="Usua_Email"
                        onChange={handleInputChange}
                      ></CFormInput>
                      {emailAvailable === false && (
                        <small style={{ color: 'red' }}>Email ya en uso</small>
                      )}
                      {emailAvailable === true && (
                        <small style={{ color: 'green' }}>Email disponible</small>
                      )}
                    </CInputGroup>
                  </div>
                </div>
              </CInputGroup>

              <CInputGroup className="mb-3">
                <div className="d-flex  w-100 gap-3">
                  <div className="w-50">
                    <CFormLabel>Contraseña</CFormLabel>
                    <CInputGroup>
                      <CInputGroupText>
                        <CIcon icon={cilLockUnlocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Contraseña"
                        className="input-tamaño"
                        name="Usua_Contr"
                        onChange={handleInputChange}
                      ></CFormInput>
                    </CInputGroup>
                  </div>
                </div>
              </CInputGroup>
            </CForm>
            <div>
              <CButton color="link" className="boton-link" onClick={() => navigate('/login')}>
                Ya tienes cuenta ?
              </CButton>
            </div>
          </CCardBody>
          <CCardFooter>
            <div className="caja-boton">
              <CButton className="boton-login" onClick={handleSubmit}>
                Registrar
              </CButton>
            </div>
          </CCardFooter>
        </CCard>
      </div>
    </>
  )
}

export default Register
