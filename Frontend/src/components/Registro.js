import React from 'react'
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
CFormLabel
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilPencil, cilUser ,cilEnvelopeClosed ,cilGroup,cilCalendar,cilLockUnlocked} from '@coreui/icons'
import "../scss/registro-u.scss";



const Registro =()=>{
    return(
        <>
        <CCard className='mb-4'>
            <CCardHeader>REGISTRO DE USUARIO</CCardHeader>
            <CCardBody>
                <CForm>
                    <CInputGroup className="mb-3">
                        <div className='d-flex  w-100 gap-3'>
                            <div className="w-50">
                                <CFormLabel>Primer Nombre</CFormLabel>
                                <CInputGroup>
                                    <CInputGroupText>
                                    <CIcon icon={cilPencil} />
                                    </CInputGroupText>
                                    <CFormInput 
                                        type='Text'
                                        placeholder='Primer Nombre'
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
                                        type='Text'
                                        placeholder='Primer Apellido'
                                    ></CFormInput>
                                </CInputGroup>
                                
                            </div>
                        </div>
                        
                    </CInputGroup>

                    <CInputGroup className="mb-3">
                        <div className='d-flex  w-100 gap-3'>
                            <div className="w-50">
                                <CFormLabel>Nombre de Usuario</CFormLabel>
                                <CInputGroup>
                                    <CInputGroupText>
                                    <CIcon icon={cilUser} />
                                    </CInputGroupText>
                                    <CFormInput 
                                        type='Text'
                                        placeholder='Nombre de usuario'
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
                                        type='Text'
                                        placeholder='Correo electronico'
                                    ></CFormInput>
                                </CInputGroup>
                                
                            </div>
                        </div>
                        
                    </CInputGroup>

                    <CInputGroup className="mb-3">
                        <div className='d-flex  w-100 gap-3'>
                            <div className="w-50">
                                <CFormLabel>Contraseña</CFormLabel>
                                <CInputGroup>
                                    <CInputGroupText>
                                    <CIcon icon={cilLockUnlocked} />
                                    </CInputGroupText>
                                    <CFormInput 
                                        type='Text'
                                        placeholder='Contraseña'
                                    ></CFormInput>
                                </CInputGroup>
                                
                            </div>
                            <div className="w-50">
                                <CFormLabel>Repetir contraseña</CFormLabel>
                                <CInputGroup>
                                    <CInputGroupText>
                                        <CIcon icon={cilLockUnlocked} />
                                    </CInputGroupText>
                                    <CFormInput 
                                        type='Text'
                                        placeholder='Repetir contraseña'
                                    ></CFormInput>
                                </CInputGroup>
                                
                            </div>
                        </div>
                        
                    </CInputGroup>

                    <CInputGroup className="mb-3">
                        <div className='d-flex  w-100 gap-3'>
                            <div className="w-50">
                                <CFormLabel>Fecha de nacimiento</CFormLabel>
                                <CInputGroup>
                                    <CInputGroupText>
                                    <CIcon icon={cilCalendar} />
                                    </CInputGroupText>
                                    <CFormInput 
                                        type='Text'
                                        placeholder='Fecha de nacimiento'
                                    ></CFormInput>
                                </CInputGroup>
                                
                            </div>
                            <div className="w-50">
                                <CFormLabel>Rol</CFormLabel>
                                <CInputGroup>
                                    <CInputGroupText>
                                        <CIcon icon={cilGroup} />
                                    </CInputGroupText>
                                    <CFormSelect>
                                        <option value="">Selecciona el Rol</option>
                                        <option value="Rol1">Rol1</option>
                                        <option value="Rol2">Rol2</option>
                                    </CFormSelect>
                                </CInputGroup>
                                
                            </div>
                        </div>
                        
                    </CInputGroup>





                </CForm>
            </CCardBody>
                <CCardFooter>
                    <div className='caja-boton'>
                    <CButton className='boton-registro'>Registrar</CButton>
                    </div>
                </CCardFooter>
        </CCard>
        </>
    )
}
export default Registro