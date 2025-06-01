import React ,{useState} from 'react'
import CIcon from '@coreui/icons-react'
import { 
cilLockLocked, 
cilPencil, 
cilUser ,
cilEnvelopeClosed ,
cilGroup,cilCalendar,
cilLockUnlocked,
cilCommentSquare,
cilBookmark,
cilOptions
} from '@coreui/icons'
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
CFormTextarea,
CCardTitle,
CAvatar,
CCardText
} from '@coreui/react'
import '../scss/perfil.scss'


import '../scss/perfil.scss'


const ProfileModule = () => {
  return (
    <CCard className="profile-module">
      <CCardBody>
        <CCardTitle className="profile-module__title text-center mb-4">Perfil de usuario</CCardTitle>

        <div className="profile-module__field">
          <label htmlFor="nombre" className="form-label">
            Nombre
          </label>
          <div className="profile-module__input-group">
            <CFormInput type="text" id="nombre" value="Juan" disabled />
            <CButton color="dark" className="profile-module__edit-btn">
              Editar
            </CButton>
          </div>
        </div>

        <div className="profile-module__field">
          <label htmlFor="apellido" className="form-label">
            Apellido
          </label>
          <div className="profile-module__input-group">
            <CFormInput type="text" id="apellido" value="Pérez" disabled />
            <CButton color="dark" className="profile-module__edit-btn">
              Editar
            </CButton>
          </div>
        </div>


        <div className="profile-module__field">
          <label htmlFor="username" className="form-label">
            Nombre de usuario
          </label>
          <div className="profile-module__input-group">
            <CFormInput type="text" id="username" value="juanp123" disabled />
            <CButton color="dark" className="profile-module__edit-btn">
              Editar
            </CButton>
          </div>
        </div>

        <div className="profile-module__field">
          <label htmlFor="email" className="form-label">
            Correo electrónico
          </label>
          <div className="profile-module__input-group">
            <CFormInput type="email" id="email" value="juan.perez@example.com" disabled />
            <CButton color="dark" className="profile-module__edit-btn">
              Editar
            </CButton>
          </div>
        </div>
      </CCardBody>
    </CCard>
  )
}


export default ProfileModule



