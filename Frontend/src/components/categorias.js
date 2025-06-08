import { react, useEffect, useState } from 'react'
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
} from '@coreui/react'

import '../scss/buscador.scss'
import Paginacion from './paginacion'
import '../scss/botonadd.scss'
import axios from 'axios'

const categorias = () => {
  const [carga, setcarga] = useState(true)
  const [categorias, setcategorias] = useState([])

  useEffect(() => {
    const categorias = async () => {
      try {
        const result = await axios.get('http://localhost:4000/categorias')
        setcategorias(result.data)
        setcarga(false)
      } catch (error) {
        console.error('Error al obtener las categorias:', error)
      }
    }
    categorias()
  }, [])

  if (carga) {
    return (
      <div className="pt-3 text-center">
        <CSpinner color="primary" variant="grow" />
      </div>
    )
  }
  return (
    <>
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
            <div>Categorias</div>
            <div>
              <CButton className="botonadd">Agregar</CButton>
            </div>
          </div>
        </CCardHeader>
        <CCardBody>
          <CTable>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>id </CTableHeaderCell>
                <CTableHeaderCell>Nombre </CTableHeaderCell>
                <CTableHeaderCell>Descripcion</CTableHeaderCell>
                <CTableHeaderCell>Editar</CTableHeaderCell>
                <CTableHeaderCell>Eliminar</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {categorias.map((ca, index) => (
                <CTableRow key={index}>
                  <CTableDataCell>{ca.Cate_Id}</CTableDataCell>
                  <CTableDataCell>{ca.Cate_NomCa}</CTableDataCell>
                  <CTableDataCell>{ca.Cate_Descr}</CTableDataCell>
                  <CTableDataCell>
                    <CButton className="botonhover">
                      <CIcon icon={cilPencil} style={{ color: 'blue' }}></CIcon>
                    </CButton>
                  </CTableDataCell>
                  <CTableDataCell>
                    <CButton className="botonhover">
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
export default categorias
