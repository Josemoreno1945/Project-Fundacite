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
  cilSearch,
} from '@coreui/icons'
import {
  CNavGroup,
  CNavItem,
  CNavTitle,
  CCard,
  CCardBody,
  CCardHeader,
  CCardFooter,
  CForm,
  CFormInput,
  CFormSelect,
  CButton,
  CSpinner,
  CModal,
  CModalHeader,
  CModalBody,
} from '@coreui/react'
import { useNavigate } from 'react-router-dom'
import '../scss/proyectos.scss'
import '../scss/botones.scss'
import '../scss/buscador.scss'
import Paginacion from './paginacion'
import axios from 'axios'

const Proyectos = () => {
  const [loadingAction, setLoadingAction] = useState(false)
  const [actionLabel, setActionLabel] = useState('')
  const [Cargando, setCargando] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 8
  const [proyectos, setProyectos] = useState([])
  const navigate = useNavigate()
  //FILTRO Y BUSQUEDA----------------------------------------------------------
  const [Busqueda, setBusqueda] = useState('')
  const [Filtro, setFiltro] = useState('')
  const Filtroactivo = Filtro && Filtro !== 'Filtrar'
  const Buscaractivo = Filtroactivo && Busqueda.trim().length > 0
  //---------------------------------------------------------------------------

  useEffect(() => {
    const obtenerProyectos = async () => {
      setCargando(true)
      try {
        const token = localStorage.getItem('token')
        const res = await axios.get('http://localhost:4000/proyectos', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setProyectos(res.data)
      } catch (error) {
        console.error('Error al obtener proyectos:', error)
      } finally {
        setCargando(false)
      }
    }
    obtenerProyectos()
  }, [])

  const obtenerProyectos = async () => {
    try {
      const token = localStorage.getItem('token')
      const res = await axios.get('http://localhost:4000/proyectos', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setProyectos(res.data)
    } catch (error) {
      console.error('Error al obtener proyectos:', error)
    }
  }

  const totalPages = Math.max(1, Math.ceil(proyectos.length / pageSize))
  const start = (currentPage - 1) * pageSize
  const paginateProyectos = proyectos.slice(start, start + pageSize)

  const handleFiltroChange = (e) => {
    setFiltro(e.target.value)
  }
  const limpiarFiltro = () => {
    setFiltro('')
    setBusqueda('')
    obtenerProyectos()
  }
  const handleBusquedaChange = (e) => {
    setBusqueda(e.target.value)
  }
  const HandleBuscar = async () => {
    setLoadingAction(true)
    setActionLabel('Buscando...')
    try {
      if (Filtro === 'Titulo de proyecto') {
        const token = localStorage.getItem('token')
        const result = await axios.post(
          'http://localhost:4000/FTituloPendiente',
          { Proy_Titul: Busqueda }, //'''''''''''''''''''''''''''''''
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        setProyectos(result.data)
        setCurrentPage(1)
      } else {
        obtenerProyectos()
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
        <div className="d-flex align-items-center">
          <CSpinner size="lg" />
        </div>
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
        <CModalHeader>{actionLabel}</CModalHeader>
        <CModalBody className="d-flex align-items-center gap-3">
          <CSpinner />
          <span>{actionLabel}</span>
        </CModalBody>
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
          <div className="box-buttom">
            <div>Lista de Proyectos pendientes</div>
            <div>
              <CForm>
                <CFormSelect
                  value={Filtro}
                  className="filter-input"
                  name="filtro"
                  onChange={handleFiltroChange}
                >
                  <option value={''}>Filtrar</option>
                  <option>Titulo de proyecto</option>
                </CFormSelect>
              </CForm>
              <CButton className="boton-eliminar" onClick={() => limpiarFiltro()}>
                Limpiar Filtro
              </CButton>
            </div>
          </div>
        </CCardHeader>
        <CCardBody>
          <div className="cuadros">
            {Cargando ? (
              renderCount(null)
            ) : paginateProyectos.length === 0 ? (
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ gridColumn: '1 / -1', minHeight: '200px', width: '100%' }}
              >
                No hay proyectos por ese nombre
              </div>
            ) : (
              paginateProyectos.map((p, index) => (
                <CCard
                  className="cuadro2"
                  key={p.Proy_Id}
                  onClick={() =>
                    navigate(`/ProyectosDetalle/${p.Proy_Id}`, {
                      state: { from: '/components/ProyectosPendientes' },
                    })
                  }
                >
                  <CCardHeader>{p.Proy_Titul}</CCardHeader>
                  <CCardBody>Haz clic para ver más detalles</CCardBody>
                </CCard>
              ))
            )}
          </div>
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
export default Proyectos
