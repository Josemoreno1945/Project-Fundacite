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
  cilXCircle
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
  }
])


    return(
        <>
        <CCard>
          <CCardHeader>TABLA DE USUARIOS</CCardHeader>
          <CCardBody>
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>Nombre de usuario</CTableHeaderCell>
                  <CTableHeaderCell>Rol</CTableHeaderCell>
                  <CTableHeaderCell>Correo electronico</CTableHeaderCell>
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
                    <CButton><CIcon icon={cilPencil}></CIcon></CButton>
                  </CTableDataCell>
                  <CTableDataCell>
                    <CButton><CIcon icon={cilXCircle}></CIcon></CButton>
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

