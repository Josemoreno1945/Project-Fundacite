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

const tipo_a = () => {
  const [carga, setcarga] = useState(true)
  const [tipo_a, settipo_a] = useState([])

  useEffect(() => {
    const TiposArchivos = async () => {
      try {
        const result = await axios.get('http://localhost:4000/tipoArchivos')
        settipo_a(result.data)
        setcarga(false)
      } catch (error) {
        console.error('Error al obtener los tipos de archivos:', error)
      }
    }
    TiposArchivos()
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
            <div>Tipo de archivos</div>
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
                <CTableHeaderCell>Editar</CTableHeaderCell>
                <CTableHeaderCell>Eliminar</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {tipo_a.map((ta, index) => (
                <CTableRow key={index}>
                  <CTableDataCell>{ta.TipA_Id}</CTableDataCell>
                  <CTableDataCell>{ta.TipA_Nombr}</CTableDataCell>
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
export default tipo_a
