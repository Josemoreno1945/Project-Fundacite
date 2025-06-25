import { React, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
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
import fundaciteLogo from '../../../assets/images/FUNDACITE_LOGO.png'

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

const Login = () => {
  const navigate = useNavigate()

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

  const postLogin = async () => {
    try {
      const response = await axios.post('http://localhost:4000/login', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      localStorage.setItem('token', response.data.token)
      navigate('/Inicio')
    } catch (err) {
      console.error('Error al iniciar sesion:', err)
    }
  }

  return (
    <>
      <div className="login-container">
        <CCard>
          <CCardBody>
            <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '1.5rem', fontWeight: 'bold', color: '#1a237e' }}>
                Inicia sesión!
              </h3>
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
                No tienes cuenta ?
              </CButton>
            </div>
          </CCardBody>
          <CCardFooter>
            <div className="caja-boton">
              <CButton
                className="boton-login"
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
