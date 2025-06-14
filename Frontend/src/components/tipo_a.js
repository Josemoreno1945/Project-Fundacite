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
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
} from '@coreui/react'

import '../scss/buscador.scss'
import Paginacion from './paginacion'
import '../scss/botonadd.scss'
import axios from 'axios'

const tipo_a = () => {
  const [Modal_agg, setModal_agg] = useState(false)
  const [carga, setcarga] = useState(true)
  const [tipo_a, settipo_a] = useState([])
  const [formData, setFormData] = useState({
    TipA_Nombr: '',
  })

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

  const cargarTiposArchivos = async () => {
    try {
      const result = await axios.get('http://localhost:4000/tipoArchivos')
      settipo_a(result.data)
      setcarga(false)
    } catch (error) {
      console.error('Error al obtener los tipos de archivos:', error)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const postTipo_a = async () => {
    const formDataToSend = new FormData()
    formDataToSend.append('TipA_Nombr', formData.TipA_Nombr)
    try {
      const postTa = await axios.post('http://localhost:4000/tipoArchivos', formDataToSend)
      cargarTiposArchivos()
    } catch (err) {
      console.error('Error al registrar tipo de archivo:', err)
    }
  }

  return (
    <>
      {/*MODAL PARA BOTON AGREGAR ----------------------------------------------------------------*/}

      <CModal visible={Modal_agg} onClose={() => setModal_agg(false)}>
        <CModalHeader>Agregar nuevo formato</CModalHeader>
        <CModalBody>
          <CForm>
            <CInputGroup className="mb-3">
              <CFormLabel>Nombre</CFormLabel>
              <CInputGroup>
                <CInputGroupText>
                  <CIcon icon={cilPencil} />
                </CInputGroupText>
                <CFormInput
                  type="Text"
                  placeholder="Nombre"
                  name="TipA_Nombr"
                  onChange={handleInputChange}
                ></CFormInput>
              </CInputGroup>
            </CInputGroup>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <div className="caja-boton">
            <CButton
              className="boton"
              onClick={() => {
                setModal_agg(false)
                postTipo_a()
              }}
            >
              Agregar
            </CButton>
            <CButton className="boton" onClick={() => setModal_agg(false)}>
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
            <div>Tipo de archivos</div>
            <div>
              <CButton className="botonadd" onClick={() => setModal_agg(true)}>
                Agregar
              </CButton>
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
