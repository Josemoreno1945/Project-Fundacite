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
import '../scss/registro-u.scss'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Registro = () => {
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

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
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
    const formDataToSend = new FormData()

    formDataToSend.append('Usua_PrimN', formData.Usua_PrimN)
    formDataToSend.append('Usua_PrimA', formData.Usua_PrimA)
    formDataToSend.append('Usua_NomUs', formData.Usua_NomUs)
    formDataToSend.append('Usua_Email', formData.Usua_Email)
    formDataToSend.append('Usua_Contr', formData.Usua_Contr)
    formDataToSend.append('Usua_RolId', formData.Usua_RolId)
    try {
      console.log('🚀 Datos que se envían a /users:', [...formDataToSend.entries()])
      const postUsers = await axios.post('http://localhost:4000/users', formDataToSend)
      navigate('/components/Usuarios')
    } catch (err) {
      console.error('Error al registrar usuario:', err)
    }
  }

  return (
    <>
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
              <CButton className="boton-registro" onClick={handleSubmit}>
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
