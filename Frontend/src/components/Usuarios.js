import React, { useEffect, useState } from 'react'
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
  cilLowVision,
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
  CTableDataCell,
  CSpinner,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
} from '@coreui/react'

import '../scss/buscador.scss'
import '../scss/lista-usuarios.scss'
import axios from 'axios'

import Paginacion from './paginacion'

const Usuarios = () => {
  const [userID, setuserID] = useState(null)
  const [Modal_eli, setModal_eli] = useState(false)
  const [carga, setcarga] = useState(true)
  const [users, setUsers] = useState([])

  useEffect(() => {
    const usuarios = async () => {
      try {
        const result = await axios.get('http://localhost:4000/users')
        setUsers(result.data)
        setcarga(false)
      } catch (error) {
        console.error('Error al obtener los usuarios:', error)
      }
    }
    usuarios()
  }, [])

  if (carga) {
    return (
      <div className="pt-3 text-center">
        <CSpinner color="primary" variant="grow" />
      </div>
    )
  }

  const cargarusuarios = async () => {
    try {
      const result = await axios.get('http://localhost:4000/users')
      setUsers(result.data)
      setcarga(false)
    } catch (error) {
      console.error('Error al obtener los usuarios:', error)
    }
  }

  const deleteUsuario = async (id) => {
    try {
      const deleteU = await axios.delete(`http://localhost:4000/users/${id}`)
      cargarusuarios()
      setuserID(null)
    } catch (err) {
      console.error('Error al eliminar usuario:', err)
    }
  }

  return (
    <>
      {/*MODAL PARA BOTON ELIMINAR ----------------------------------------------------------------*/}
      <CModal visible={Modal_eli} onClose={() => setModal_eli(false)}>
        <CModalHeader>Eliminar usuario</CModalHeader>
        <CModalBody>
          <p>¿Seguro que desea eliminar un usuario?</p>
        </CModalBody>
        <CModalFooter>
          <div className="caja-boton">
            <CButton
              className="boton"
              onClick={() => {
                deleteUsuario(userID), setModal_eli(false)
              }}
            >
              Eliminar
            </CButton>
            <CButton className="boton" onClick={() => setModal_eli(false)}>
              Cancelar
            </CButton>
          </div>
        </CModalFooter>
      </CModal>

      <div className="buscador">
        <CForm className="d-flex">
          <CFormInput
            className="input-buttom-search"
            type="text"
            placeholder="Buscar..."
          ></CFormInput>
          <CButton className="search-buttom">
            <CIcon className="icon-search" icon={cilSearch} />
          </CButton>
        </CForm>
      </div>

      <CCard className="mb-4">
        <CCardHeader>
          <div className="box-buttom">
            <div>Usuarios</div>
            <div>
              <CForm>
                <CFormSelect className="filter-input">
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
              {users.map((u, index) => (
                <CTableRow key={index}>
                  <CTableDataCell>{u.Usua_NomUs}</CTableDataCell>
                  <CTableDataCell>{u.Rol_Nombre}</CTableDataCell>
                  <CTableDataCell>{u.Usua_Email}</CTableDataCell>
                  <CTableDataCell>
                    <CButton className="botonhover" onClick={() => {}}>
                      <CIcon icon={cilLowVision} />
                    </CButton>
                  </CTableDataCell>
                  <CTableDataCell>
                    <CButton className="botonhover">
                      <CIcon icon={cilPencil} style={{ color: 'blue' }}></CIcon>
                    </CButton>
                  </CTableDataCell>
                  <CTableDataCell>
                    <CButton
                      className="botonhover"
                      onClick={() => {
                        setuserID(u.Usua_Id)
                        setModal_eli(true)
                      }}
                    >
                      <CIcon icon={cilXCircle} style={{ color: 'red' }} />
                    </CButton>
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
            <CTableFoot></CTableFoot>
          </CTable>
        </CCardBody>
        <CCardFooter>
          <Paginacion />
        </CCardFooter>
      </CCard>
    </>
  )
}
export default Usuarios
