import React, { useState } from 'react'
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CModal,
  CModalFooter,
  CModalBody,
  CModalHeader,
  CButton,
  CFormInput,
  CForm,
  CInputGroup,
  CInputGroupText,
  CFormLabel,
} from '@coreui/react'
import { cilPencil, cilLockLocked, cilEnvelopeClosed, cilGroup, cilUser } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import '../../scss/perfil.scss'
import '../../scss/botones.scss'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const AppHeaderDropdown = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const [usersVer, setusersVer] = useState([])
  const navigate = useNavigate()

  const UsuarioVer = async () => {
    try {
      const token = localStorage.getItem('token')
      const result = await axios.get(`http://localhost:4000/users_inSesion`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setusersVer(result.data)
    } catch (err) {
      console.error('Error al mostrar usuario:', err)
    }
  }
  return (
    <>
      <CModal
        className="modal-c"
        backdrop="static"
        keyboard={false}
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      >
        <CModalHeader>Usuario</CModalHeader>
        <CModalBody>
          <CForm>
            <CInputGroup className="mb-3">
              <div className="d-flex  w-100 gap-3">
                <div className="w-50">
                  <CFormLabel>Primer Nombre</CFormLabel>
                  <CInputGroup>
                    <CInputGroupText>
                      <CIcon icon={cilPencil} />
                    </CInputGroupText>
                    <CFormInput value={usersVer.Usua_PrimN || ''} disabled />
                  </CInputGroup>
                </div>
                <div className="w-50">
                  <CFormLabel>Primer Apellido</CFormLabel>
                  <CInputGroup>
                    <CInputGroupText>
                      <CIcon icon={cilPencil} />
                    </CInputGroupText>
                    <CFormInput value={usersVer.Usua_PrimA || ''} disabled />
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
                    <CFormInput value={usersVer.Usua_NomUs || ''} disabled />
                  </CInputGroup>
                </div>
                <div className="w-50">
                  <CFormLabel>Correo electronico</CFormLabel>
                  <CInputGroup>
                    <CInputGroupText>
                      <CIcon icon={cilEnvelopeClosed} />
                    </CInputGroupText>
                    <CFormInput value={usersVer.Usua_Email || ''} disabled />
                  </CInputGroup>
                </div>
              </div>
            </CInputGroup>

            <CInputGroup className="mb-3">
              <div className="d-flex  w-100 gap-3">
                <div className="w-50">
                  <CFormLabel>Rol</CFormLabel>
                  <CInputGroup>
                    <CInputGroupText>
                      <CIcon icon={cilGroup} />
                    </CInputGroupText>
                    <CFormInput value={usersVer.Rol_Nombre || ''} disabled></CFormInput>
                  </CInputGroup>
                </div>
              </div>
            </CInputGroup>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton
            className="boton-eliminar"
            onClick={() => {
              setModalVisible(false)
              setusersVer({
                Usua_PrimN: '',
                Usua_PrimA: '',
                Usua_NomUs: '',
                Usua_Email: '',
                Usua_Rol_Nombre: '',
              })
            }}
          >
            Cerrar
          </CButton>
        </CModalFooter>
      </CModal>

      <CDropdown className="conjunto-menu" variant="nav-item">
        <CDropdownToggle>
          <CIcon icon={cilUser} />
        </CDropdownToggle>
        <CDropdownMenu className="conjunto-dentro">
          <CButton
            className="boton-perfil"
            onClick={() => {
              setModalVisible(true), UsuarioVer()
            }}
          >
            <CIcon icon={cilUser} className="me-2" />
            Perfil
          </CButton>
          <CDropdownDivider />
          <CButton
            className="boton-salir"
            onClick={() => {
              localStorage.removeItem('token'), navigate('/login')
            }}
          >
            <CIcon icon={cilLockLocked} className="me-2" />
            Salir
          </CButton>
        </CDropdownMenu>
      </CDropdown>
    </>
  )
}

export default AppHeaderDropdown
