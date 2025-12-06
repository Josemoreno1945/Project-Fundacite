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
import '../scss/botones.scss'

const tipo_a = () => {
  //FILTRO Y BUSQUEDA----------------------------------------------------------
  const [Busqueda, setBusqueda] = useState('')
  const [Filtro, setFiltro] = useState('')
  const Filtroactivo = Filtro && Filtro !== 'Filtrar'
  const Buscaractivo = Filtroactivo && Busqueda.trim().length > 0
  //---------------------------------------------------------------------------
  // modal y mensaje de error ---------------------------
  const [ModalError, setModalError] = useState(false)
  const [MensajeError, setMensajeError] = useState('')
  // modal y mensaje de error ---------------------------

  // modal y mensaje de exito ---------------------------
  const [Modalexito, setModalexito] = useState(false)
  const [Mensajeexito, setMensajeexito] = useState('')
  // modal y mensaje de exito ---------------------------
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 5
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
    try {
      const result = await axios.post('http://localhost:4000/tipoArchivos', formData)
      setMensajeexito(result.data.message)
      setModalexito(true)
      setModal_agg(false)
      cargarTiposArchivos()
    } catch (err) {
      if (err.response.data.error) {
        setMensajeError(err.response.data.error)
      } else {
        setMensajeError('')
        const mensajes = err.response.data.errors.map((issue) => issue.message)
        setMensajeError(mensajes)
      }
      setModalError(true)
      console.error('Error al registrar tipo de archivo:', err)
    }
  }
  const totalPages = Math.max(1, Math.ceil(tipo_a.length / pageSize))
  const start = (currentPage - 1) * pageSize
  const paginateTipo_a = tipo_a.slice(start, start + pageSize)

  const handleFiltroChange = (e) => {
    setFiltro(e.target.value)
  }
  const limpiarFiltro = () => {
    setFiltro('')
    setBusqueda('')
    cargarTiposArchivos()
  }
  const handleBusquedaChange = (e) => {
    setBusqueda(e.target.value)
  }

  return (
    <>
      <CModal
        visible={Modalexito}
        backdrop="static"
        keyboard={false}
        onClose={() => setModalexito(false)}
      >
        <CModalHeader>Mensaje</CModalHeader>
        <CModalBody>
          <div>{String(Mensajeexito)}</div>
        </CModalBody>
        <CModalFooter>
          <div className="button-box">
            <CButton
              className="boton-regresar"
              onClick={() => {
                setMensajeexito('')
                setModalexito(false)
              }}
            >
              Cerrar
            </CButton>
          </div>
        </CModalFooter>
      </CModal>

      <CModal
        visible={ModalError}
        backdrop="static"
        keyboard={false}
        onClose={() => setModalError(false)}
      >
        <CModalHeader>Error</CModalHeader>
        <CModalBody>
          {Array.isArray(MensajeError) ? (
            <ul>
              {MensajeError.map((msg, idx) => (
                <li key={idx}>{msg}</li>
              ))}
            </ul>
          ) : (
            <div>{String(MensajeError)}</div>
          )}
        </CModalBody>
        <CModalFooter>
          <div className="button-box">
            <CButton
              className="boton-regresar"
              onClick={() => {
                setMensajeError('')
                setModalError(false)
              }}
            >
              Cerrar
            </CButton>
          </div>
        </CModalFooter>
      </CModal>
      {/*MODAL PARA BOTON AGREGAR ----------------------------------------------------------------*/}

      <CModal
        visible={Modal_agg}
        backdrop="static"
        keyboard={false}
        onClose={() => setModal_agg(false)}
      >
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
            <CButton className="boton-eliminar" onClick={() => setModal_agg(false)}>
              Cancelar
            </CButton>
            <CButton
              className="boton-generar"
              onClick={() => {
                postTipo_a()
              }}
            >
              Agregar
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
              {paginateTipo_a.map((ta, index) => (
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
          <Paginacion
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </CCardFooter>
      </CCard>
    </>
  )
}
export default tipo_a
