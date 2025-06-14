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
  cilCommentSquare,
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
  CModalHeader,
  CModalBody,
  CModalFooter,
  CFormTextarea,
} from '@coreui/react'

import '../scss/buscador.scss'
import Paginacion from './paginacion'
import '../scss/botonadd.scss'
import axios from 'axios'

const categorias = () => {
  const [catID, setcatID] = useState(null)
  const [Modal_eli, setModal_eli] = useState(false)
  const [Modal_agg, setModal_agg] = useState(false)
  const [carga, setcarga] = useState(true)
  const [categorias, setcategorias] = useState([])
  const [formData, setFormData] = useState({
    Cate_NomCa: '',
    Cate_Descr: '',
  })

  useEffect(() => {
    const Cargarcategorias = async () => {
      try {
        const result = await axios.get('http://localhost:4000/categorias')
        setcategorias(result.data)
        setcarga(false)
      } catch (error) {
        console.error('Error al obtener las categorias:', error)
      }
    }
    Cargarcategorias()
  }, [])

  if (carga) {
    return (
      <div className="pt-3 text-center">
        <CSpinner color="primary" variant="grow" />
      </div>
    )
  }

  const Cargarcategorias = async () => {
    try {
      const result = await axios.get('http://localhost:4000/categorias')
      setcategorias(result.data)
    } catch (error) {
      console.error('Error al obtener las categorias:', error)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const postCategorias = async () => {
    const formDataToSend = new FormData()
    formDataToSend.append('Cate_NomCa', formData.Cate_NomCa)
    formDataToSend.append('Cate_Descr', formData.Cate_Descr)

    try {
      const postCat = await axios.post('http://localhost:4000/categorias', formDataToSend)
      Cargarcategorias()
    } catch (err) {
      console.error('Error al registrar categoria:', err)
    }
  }

  const deleteCategorias = async (id) => {
    try {
      const deleteCat = await axios.delete(`http://localhost:4000/categorias/${id}`)
      Cargarcategorias()
      setcatID(null)
    } catch (err) {
      console.error('Error al eliminar categoria:', err)
    }
  }

  const putCategorias = async (id) => {
    try {
      const putCat = await axios.delete(`http://localhost:4000/categorias/${id}`)
      Cargarcategorias()
    } catch (err) {
      console.error('Error al editar categoria:', err)
    }
  }

  return (
    <>
      {/*MODAL PARA BOTON ELIMINAR ----------------------------------------------------------------*/}
      <CModal visible={Modal_eli} onClose={() => setModal_eli(false)}>
        <CModalHeader>Eliminar categoria</CModalHeader>
        <CModalBody>
          <p>¿Seguro que desea eliminar una categoria?</p>
        </CModalBody>
        <CModalFooter>
          <div className="caja-boton">
            <CButton
              className="boton"
              onClick={() => {
                deleteCategorias(catID), setModal_eli(false)
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
      {/*MODAL PARA BOTON AGREGAR ----------------------------------------------------------------*/}

      <CModal visible={Modal_agg} onClose={() => setModal_agg(false)}>
        <CModalHeader>Agregar nueva categoria</CModalHeader>
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
                  name="Cate_NomCa"
                  onChange={handleInputChange}
                ></CFormInput>
              </CInputGroup>
            </CInputGroup>
            <CInputGroup className="mb-3">
              <CFormLabel>Descripcion</CFormLabel>
              <CInputGroup>
                <CInputGroupText>
                  <CIcon icon={cilCommentSquare} />
                </CInputGroupText>
                <CFormTextarea
                  placeholder="Descripcion"
                  rows={3}
                  name="Cate_Descr"
                  onChange={handleInputChange}
                ></CFormTextarea>
              </CInputGroup>
            </CInputGroup>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <div className="caja-boton">
            <CButton
              className="boton"
              onClick={() => {
                postCategorias(), setModal_agg(false)
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
            <div>Categorias</div>
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
                    <CButton
                      className="botonhover"
                      onClick={() => {
                        setcatID(ca.Cate_Id), setModal_eli(true)
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
export default categorias
