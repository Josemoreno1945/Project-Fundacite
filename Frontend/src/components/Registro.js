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
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CPopover,
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
import '../scss/registro-u.scss'
import '../scss/botones.scss'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Registro = () => {
  const [usernameAvailable, setUsernameAvailable] = useState(null)
  const [emailAvailable, setEmailAvailable] = useState(null)
  const [mensajeAprobado, setmensajeAprobado] = useState('')
  const [ModalmensajeAprobado, setModalmensajeAprobado] = useState(false)

  const [mensajeError, setmensajeError] = useState('')
  const [ModalmensajeError, setModalmensajeError] = useState(false)
  const navigate = useNavigate()
  const [roles, Setroles] = useState([])
  const [formData, setFormData] = useState({
    Usua_PrimN: '',
    Usua_PrimA: '',
    Usua_NomUs: '',
    Usua_Email: '',
    Usua_Contr: '',
    Usua_RolId: '',
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

  const cargarRoles = async () => {
    try {
      const result = await axios.get('http://localhost:4000/roles')
      Setroles(result.data)
    } catch (error) {
      console.error('Error al obtener los roles', error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem('token')
      const postUsers = await axios.post('http://localhost:4000/users', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      setmensajeAprobado(postUsers.data.message)
      setModalmensajeAprobado(true)
    } catch (err) {
      if (err.response.data.error) {
        setmensajeError(err.response.data.error)
      } else {
        setmensajeError('')
        const mensajes = err.response.data.errors.map((issue) => issue.message)
        setmensajeError(mensajes)
      }

      setModalmensajeError(true)
    }
  }

  return (
    <>
      <CModal visible={ModalmensajeAprobado} onClose={() => setModalmensajeAprobado(false)}>
        <CModalHeader>Mensaje</CModalHeader>
        <CModalBody>
          <div>{String(mensajeAprobado)}</div>
        </CModalBody>
        <CModalFooter>
          <div className="button-box">
            <CButton
              className="boton-regresar"
              onClick={() => {
                setModalmensajeAprobado(false), navigate('/components/Usuarios')
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

      <div className="usuarios-caja">
        <CCard className="mb-4">
          <CCardHeader>REGISTRO DE USUARIO</CCardHeader>
          <CCardBody>
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

                  <div className="w-50">
                    <CFormLabel>Rol</CFormLabel>
                    <CInputGroup>
                      <CInputGroupText>
                        <CIcon icon={cilGroup} />
                      </CInputGroupText>
                      <CFormSelect
                        className="input-tamaño"
                        onFocus={cargarRoles}
                        onChange={handleInputChange}
                        name="Usua_RolId"
                        value={formData.Usua_RolId}
                      >
                        <option value="">Seleccionar rol</option>
                        {roles.map((r) => (
                          <option key={r.Rol_Id} value={r.Rol_Id}>
                            {r.Rol_Nombre}
                          </option>
                        ))}
                      </CFormSelect>
                    </CInputGroup>
                  </div>
                </div>
              </CInputGroup>
            </CForm>
          </CCardBody>
          <CCardFooter>
            <div className="caja-boton">
              <CButton className="boton-generar" onClick={handleSubmit}>
                Registrar
              </CButton>
            </div>
          </CCardFooter>
        </CCard>
      </div>
    </>
  )
}
export default Registro
