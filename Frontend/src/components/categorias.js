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
import '../scss/botones.scss'
import axios from 'axios'

const categorias = () => {
  const [Cargando, setCargando] = useState(true)

  const [loadingAction, setLoadingAction] = useState(false)
  const [actionLabel, setActionLabel] = useState('')

  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 5
  //FILTRO Y BUSQUEDA----------------------------------------------------------
  const [Busqueda, setBusqueda] = useState('')
  const [Filtro, setFiltro] = useState('')
  const Filtroactivo = Filtro && Filtro !== 'Filtrar'
  const Buscaractivo = Filtroactivo && Busqueda.trim().length > 0
  //---------------------------------------------------------------------------
  // modal y mensaje de error ---------------------------
  const [ModalError, setModalError] = useState(false)
  const [MensajeError, setMensajeError] = useState('')
  //-----------------------------------------------------

  // modal y mensaje de exito ---------------------------
  const [Modalexito, setModalexito] = useState(false)
  const [Mensajeexito, setMensajeexito] = useState('')
  // -----------------------------------------------------

  const [catID, setcatID] = useState(null)
  const [Modal_agg, setModal_agg] = useState(false)
  const [carga, setcarga] = useState(true)
  const [categorias, setcategorias] = useState([])
  const [formData, setFormData] = useState({
    Cate_NomCa: '',
    Cate_Descr: '',
  })

  // Estados y handlers para editar categoria
  const [editingCatId, setEditingCatId] = useState(null)
  const [editModalVisible, setEditModalVisible] = useState(false)
  const [editFormData, setEditFormData] = useState({
    Cate_NomCa: '',
    Cate_Descr: '',
  })

  const openEditModal = (cat) => {
    setEditingCatId(cat.Cate_Id || cat.Cate_Id === 0 ? cat.Cate_Id : cat.id || null)
    setEditFormData({
      Cate_NomCa: cat.Cate_NomCa || '',
      Cate_Descr: cat.Cate_Descr || '',
    })
    setEditModalVisible(true)
  }

  const closeEditModal = () => {
    setEditModalVisible(false)
    setEditingCatId(null)
    setEditFormData({ Cate_NomCa: '', Cate_Descr: '' })
  }

  const handleEditChange = (e) => {
    const { name, value } = e.target
    setEditFormData((prev) => ({ ...prev, [name]: value }))
  }

  const submitEdit = async () => {
    setLoadingAction(true)
    setActionLabel('Editando...')
    try {
      const token = localStorage.getItem('token')
      await axios.put(`http://localhost:4000/categorias/${editingCatId}`, editFormData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setMensajeexito('Categoría actualizada correctamente')
      setModalexito(true)
      closeEditModal()
      Cargarcategorias()
    } catch (err) {
      if (err.response.data.error) {
        setMensajeError(err.response.data.error)
      } else {
        setMensajeError('')
        const mensajes = err.response.data.errors.map((issue) => issue.message)
        setMensajeError(mensajes)
      }
      setModalError(true)
      console.error('Error al registrar categoria:', err)
    } finally {
      setLoadingAction(false)
      setActionLabel('')
    }
  }

  useEffect(() => {
    const Cargarcategorias = async () => {
      setCargando(true)
      try {
        const result = await axios.get('http://localhost:4000/categorias')
        setcategorias(result.data)
        setcarga(false)
      } catch (error) {
        console.error('Error al obtener las categorias:', error)
      } finally {
        setCargando(false)
      }
    }
    Cargarcategorias()
  }, [])

  const totalPages = Math.max(1, Math.ceil(categorias.length / pageSize))
  const start = (currentPage - 1) * pageSize
  const paginateCategorias = categorias.slice(start, start + pageSize)

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
    setLoadingAction(true)
    setActionLabel('Registrando...')
    try {
      const token = localStorage.getItem('token')
      const result = await axios.post('http://localhost:4000/categorias', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setMensajeexito(result.data.message)
      setModalexito(true)

      Cargarcategorias()
    } catch (err) {
      if (err.response.data.error) {
        setMensajeError(err.response.data.error)
      } else {
        setMensajeError('')
        const mensajes = err.response.data.errors.map((issue) => issue.message)
        setMensajeError(mensajes)
      }
      setModalError(true)
      console.error('Error al registrar categoria:', err)
    } finally {
      setLoadingAction(false)
      setActionLabel('')
    }
  }

  const handleFiltroChange = (e) => {
    setFiltro(e.target.value)
  }
  const limpiarFiltro = () => {
    setFiltro('')
    setBusqueda('')
    Cargarcategorias()
  }
  const handleBusquedaChange = (e) => {
    setBusqueda(e.target.value)
  }

  const HandleBuscar = async () => {
    setLoadingAction(true)
    setActionLabel('Buscando...')
    try {
      if (Filtro === 'Nombre de categoria') {
        const token = localStorage.getItem('token')
        const result = await axios.post(
          'http://localhost:4000/FNombrecat',
          { Cate_NomCa: Busqueda },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        setcategorias(result.data)
        setCurrentPage(1)
      } else {
        Cargarcategorias()
      }
    } catch (error) {
      console.error('Error al obtener el nombre del tipo de archivo:', error)
    } finally {
      setLoadingAction(false)
      setActionLabel('')
    }
  }

  const renderCount = (value) => {
    if (!value || value.length === 0) {
      return (
        <CTableRow>
          <CTableDataCell>
            <CSpinner size="lg" />
          </CTableDataCell>
        </CTableRow>
      )
    }
    return value
  }

  return (
    <>
      <CModal
        visible={loadingAction}
        backdrop="static"
        keyboard={false}
        alignment="center"
        onClose={() => {}}
      >
        <CModalHeader closeButton={false}>{actionLabel}</CModalHeader>
        <CModalBody className="d-flex align-items-center gap-3">
          <CSpinner />
          <span>{actionLabel}</span>
        </CModalBody>
      </CModal>
      {/*MODAL PARA error y exito ----------------------------------------------------------------*/}

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

      {/*MODAL PARA EDITAR CATEGORIA ----------------------------------------------------------------*/}

      <CModal
        visible={editModalVisible}
        backdrop="static"
        keyboard={false}
        onClose={() => closeEditModal()}
      >
        <CModalHeader>Editar categoria</CModalHeader>
        <CModalBody>
          <CForm>
            <CInputGroup className="mb-3">
              <CFormLabel>Nombre</CFormLabel>
              <CInputGroup>
                <CInputGroupText>
                  <CIcon icon={cilPencil} />
                </CInputGroupText>
                <CFormInput
                  type="text"
                  placeholder="Nombre"
                  name="Cate_NomCa"
                  value={editFormData.Cate_NomCa}
                  onChange={handleEditChange}
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
                  value={editFormData.Cate_Descr}
                  onChange={handleEditChange}
                ></CFormTextarea>
              </CInputGroup>
            </CInputGroup>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <div className="caja-boton">
            <CButton className="boton-eliminar" onClick={() => closeEditModal()}>
              Cancelar
            </CButton>
            <CButton className="boton-generar" onClick={() => submitEdit()}>
              Guardar
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
              className="boton-generar"
              onClick={() => {
                setModal_agg(false)
                postCategorias()
              }}
            >
              Agregar
            </CButton>
            <CButton className="boton-eliminar" onClick={() => setModal_agg(false)}>
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
            placeholder={Filtroactivo ? 'Buscar...' : 'Seleccione un filtro primero'}
            name="busqueda"
            value={Busqueda}
            onChange={handleBusquedaChange}
            disabled={!Filtroactivo}
          ></CFormInput>
          <CButton className="search-buttom" onClick={HandleBuscar} disabled={!Buscaractivo}>
            <CIcon className="icon-search" icon={cilSearch} />
          </CButton>
        </CForm>
      </div>

      <CCard className="mb-4">
        <CCardHeader>
          <div>Categorias</div>
          <div className="box-buttom">
            <div className="boton-agregar">
              <CButton className="boton-descargar" onClick={() => setModal_agg(true)}>
                Agregar
              </CButton>
            </div>
            <div>
              <CForm>
                <CFormSelect
                  value={Filtro}
                  className="filter-input"
                  name="filtro"
                  onChange={handleFiltroChange}
                >
                  <option value={''}>Filtrar</option>
                  <option>Nombre de categoria</option>
                </CFormSelect>
              </CForm>
              <CButton className="boton-eliminar" onClick={() => limpiarFiltro()}>
                Limpiar Filtro
              </CButton>
            </div>
          </div>
        </CCardHeader>
        <CCardBody>
          <CTable>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>Nombre </CTableHeaderCell>
                <CTableHeaderCell>Descripcion</CTableHeaderCell>
                <CTableHeaderCell>Editar</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {Cargando ? (
                renderCount(null)
              ) : paginateCategorias.length === 0 ? (
                <CTableRow>
                  <CTableDataCell colSpan={6} className="text-center">
                    No hay categorias por ese nombre
                  </CTableDataCell>
                </CTableRow>
              ) : (
                paginateCategorias.map((ca, index) => (
                  <CTableRow key={index}>
                    <CTableDataCell>{ca.Cate_NomCa}</CTableDataCell>
                    <CTableDataCell>{ca.Cate_Descr}</CTableDataCell>
                    <CTableDataCell>
                      <CButton className="botonhover" onClick={() => openEditModal(ca)}>
                        <CIcon icon={cilPencil} style={{ color: 'blue' }}></CIcon>
                      </CButton>
                    </CTableDataCell>
                  </CTableRow>
                ))
              )}
            </CTableBody>
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
export default categorias
