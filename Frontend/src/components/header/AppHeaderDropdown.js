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
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCardTitle
} from '@coreui/react'
import {
  cilBell,
  cilCreditCard,
  cilCommentSquare,
  cilEnvelopeOpen,
  cilFile,
  cilLockLocked,
  cilSettings,
  cilTask,
  cilUser,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import "../../scss/perfil.scss"
import avatar8 from './../../assets/images/avatars/8.jpg'

const AppHeaderDropdown = () => {

const [modalVisible, setModalVisible]=useState(false)

  return (
<>
   <CModal  className='modal-c' visible={modalVisible} onClose={() => setModalVisible(false)}>
  <CModalHeader className="header_edit">Perfil de usuario</CModalHeader>
  <CModalBody className="profile-module" >
      <h5 className="profile-module__title text-center mb-4">Perfil de usuario</h5>
      <div className="profile-module__field">
        <label htmlFor="nombre" className="form-label">
          Nombre
        </label>
        <div className="profile-module__input-group">
          <CFormInput type="text" id="nombre" value="Juan" disabled />

        </div>
      </div>

      <div className="profile-module__field">
        <label htmlFor="apellido" className="form-label">
          Apellido
        </label>
        <div className="profile-module__input-group">
          <CFormInput type="text" id="apellido" value="Pérez" disabled />

        </div>
      </div>

      <div className="profile-module__field">
        <label htmlFor="username" className="form-label">
          Nombre de usuario
        </label>
        <div className="profile-module__input-group">
          <CFormInput type="text" id="username" value="juanp123" disabled />

        </div>
      </div>
      <div className="profile-module__field">
        <label htmlFor="email" className="form-label">
          Correo electrónico
        </label>
        <div className="profile-module__input-group">
          <CFormInput type="email" id="email" value="juan.perez@example.com" disabled />
        </div>
      </div>
  </CModalBody>
  <CModalFooter>
    <div className='caja-boton'>
      <CButton className='boton' onClick={()=>{setModalVisible(false)}}>Cerrar</CButton>
    </div>
    
  </CModalFooter>
</CModal>


    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}>
        <CAvatar src={avatar8} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-body-secondary fw-semibold my-2">Settings</CDropdownHeader>
        <CButton  onClick={() => setModalVisible(true)}>
          <CIcon icon={cilUser} className="me-2" />
          Profile
        </CButton>
        {/*}
        <CDropdownItem href="#">
          <CIcon icon={cilSettings} className="me-2" />
          Settings
        </CDropdownItem>
        {*/}
        <CDropdownDivider />
        <CDropdownItem href="#">
          <CIcon icon={cilLockLocked} className="me-2" />
          Lock Account
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
</>
  )
}

export default AppHeaderDropdown
