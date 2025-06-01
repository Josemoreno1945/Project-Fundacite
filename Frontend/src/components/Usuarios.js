import React, { useState } from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilExternalLink,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
  cilUser,
  cilGroup,
  cilHome,
  cilBarChart,
  cilXCircle,
  cilSearch,
  cilLowVision
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
CTable,
CTableHead,
CTableFoot,
CTableBody,
CTableRow,
CTableHeaderCell,
CTableDataCell
} from '@coreui/react'

import '../scss/buscador.scss'
import '../scss/lista-usuarios.scss'

import Paginacion from './paginacion';

const Usuarios =()=>{

const [users,setUsers]=useState([
  {
    nombre:'jmoreno',
    rol:'usuario',
    correo:'example@gmail.com'
  },

    {
    nombre:'mperez',
    rol:'usuario',
    correo:'example2@gmail.com'
  },

      {
    nombre:'mperez',
    rol:'usuario',
    correo:'example2@gmail.com'
  },
  
      {
    nombre:'mperez',
    rol:'usuario',
    correo:'example2@gmail.com'
  },

      {
    nombre:'mperez',
    rol:'usuario',
    correo:'example2@gmail.com'
  }

  
])


    return(
        <>


          <div className="buscador">
          <CForm className="d-flex">
              <CFormInput
              className="input-buttom-search"
              type="text"
              placeholder="Buscar..."
              ></CFormInput>
              <CButton className="search-buttom"><CIcon className="icon-search" icon={cilSearch} /></CButton>
          </CForm>
          </div>



        <CCard className='mb-4'>
          <CCardHeader>
              <div className='box-buttom'>
                  <div>Usuarios</div>
                  <div >
                      <CForm >
                          <CFormSelect className='filter-input'>
                          <option>Filtrar</option>
                          <option>Nombre de usuario</option>
                          <option>Correo Electronico</option>
                          <option>Rol</option>
                          <option>Nombre</option>
                          <option>Apellido</option>
                      </CFormSelect>
                      </CForm>
                  </div>
              </div>
          </CCardHeader>
          <CCardBody>
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>Nombre de usuario</CTableHeaderCell>
                  <CTableHeaderCell>Rol</CTableHeaderCell>
                  <CTableHeaderCell>Correo electronico</CTableHeaderCell>
                  <CTableHeaderCell>Ver</CTableHeaderCell>
                  <CTableHeaderCell>Editar</CTableHeaderCell>
                  <CTableHeaderCell>Eliminar</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {users.map((u,index)=>(
                  <CTableRow key={index}>
                  <CTableDataCell>{u.nombre}</CTableDataCell>
                  <CTableDataCell>{u.rol}</CTableDataCell>
                  <CTableDataCell>{u.correo}</CTableDataCell>
                  <CTableDataCell>
                    <CButton className='botonhover' onClick={() => {}}><CIcon  icon={cilLowVision} /></CButton>
                  </CTableDataCell>
                  <CTableDataCell>
                    <CButton className='botonhover'><CIcon icon={cilPencil} style={{color:'blue'}}></CIcon></CButton>
                  </CTableDataCell>
                  <CTableDataCell>
                    <CButton className='botonhover'><CIcon icon={cilXCircle} style={{ color: 'red' }} /></CButton>
                  </CTableDataCell>
                </CTableRow>
                ))}
                
              </CTableBody>
              <CTableFoot>
              </CTableFoot>
            </CTable>
          </CCardBody>
          <CCardFooter>
            <Paginacion/>
          </CCardFooter>
        </CCard>
        </>
    )
}
export default Usuarios

