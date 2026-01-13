import { useState, useEffect } from 'react'

import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CSpinner,
  CModal,
  CModalBody,
  CModalFooter,
  CButton,
  CImage,
} from '@coreui/react'
import axios from 'axios'
import { CChartPie } from '@coreui/react-chartjs'
import '../../scss/dashboard.scss'
import { useNavigate } from 'react-router-dom'
import DashboardAyuda from '../../assets/images/manualdeusuario/dashboard (2).png'

const Dashboard = () => {
  const [imagenAyuda, setImagenAyuda] = useState(null)
  const [ModalAyuda, setModalAyuda] = useState(false)
  const navigate = useNavigate()
  const [Paprobados, setPaprobados] = useState(null)
  const [Prechazados, setPrechazados] = useState(null)
  const [Parchivados, setParchivados] = useState(null)
  const [Ppendientes, setPpendientes] = useState(null)

  const [PEnergiayAmbiente, setPEnergiayAmbiente] = useState(null)
  const [PCienciaBasica, setPCienciaBasica] = useState(null)
  const [PtecnologiaInnovacion, setPtecnologiaInnovacion] = useState(null)
  const [PAstronomiayEspacio, setPAstronomiayEspacio] = useState(null)
  const [PSemillerosCientificos, setPSemillerosCientificos] = useState(null)
  const [PCienciasSocialesyHumanas, setPCienciasSocialesyHumanas] = useState(null)
  const [PSaludyBiotecnologia, setPSaludyBiotecnologia] = useState(null)
  const [PeducacionCientifica, setPeducacionCientifica] = useState(null)

  useEffect(() => {
    const obtenerProyectosAprobados = async () => {
      try {
        const token = localStorage.getItem('token')
        const res = await axios.get('http://localhost:4000/countAprobados', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setPaprobados(res.data.count)
      } catch (error) {
        console.error('Error al obtener proyectos:', error)
      }
    }
    const obtenerProyectosRechazados = async () => {
      try {
        const token = localStorage.getItem('token')
        const res = await axios.get('http://localhost:4000/countRechazados', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setPrechazados(res.data.count)
      } catch (error) {
        console.error('Error al obtener proyectos:', error)
      }
    }
    const obtenerProyectosArchivados = async () => {
      try {
        const token = localStorage.getItem('token')
        const res = await axios.get('http://localhost:4000/countArchivados', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setParchivados(res.data.count)
      } catch (error) {
        console.error('Error al obtener proyectos:', error)
      }
    }
    const obtenerProyectosPendientes = async () => {
      try {
        const token = localStorage.getItem('token')
        const res = await axios.get('http://localhost:4000/countPendientes', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setPpendientes(res.data.count)
      } catch (error) {
        console.error('Error al obtener proyectos:', error)
      }
    }

    const obtenerProyectosEnergiayAmbiente = async () => {
      try {
        const token = localStorage.getItem('token')
        const res = await axios.get('http://localhost:4000/countEnergiayAmbiente', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setPEnergiayAmbiente(res.data.count)
      } catch (error) {
        console.error('Error al obtener proyectos:', error)
      }
    }

    const obtenerProyectosCienciaBasica = async () => {
      try {
        const token = localStorage.getItem('token')
        const res = await axios.get('http://localhost:4000/countCienciaBasica', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setPCienciaBasica(res.data.count)
      } catch (error) {
        console.error('Error al obtener proyectos:', error)
      }
    }

    const obtenerProyectosTecnologiaeInnovacion = async () => {
      try {
        const token = localStorage.getItem('token')
        const res = await axios.get('http://localhost:4000/countTecnologiaeInnovacion', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setPtecnologiaInnovacion(res.data.count)
      } catch (error) {
        console.error('Error al obtener proyectos:', error)
      }
    }

    const obtenerProyectosAstronomiayEspacio = async () => {
      try {
        const token = localStorage.getItem('token')
        const res = await axios.get('http://localhost:4000/countAstronomiayEspacio', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setPAstronomiayEspacio(res.data.count)
      } catch (error) {
        console.error('Error al obtener proyectos:', error)
      }
    }

    const obtenerProyectosSemillerosCientificos = async () => {
      try {
        const token = localStorage.getItem('token')
        const res = await axios.get('http://localhost:4000/countSemillerosCientificos', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setPSemillerosCientificos(res.data.count)
      } catch (error) {
        console.error('Error al obtener proyectos:', error)
      }
    }

    const obtenerProyectosCienciasSocialesyHumanas = async () => {
      try {
        const token = localStorage.getItem('token')
        const res = await axios.get('http://localhost:4000/countCienciasSocialesyHumanas', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setPCienciasSocialesyHumanas(res.data.count)
      } catch (error) {
        console.error('Error al obtener proyectos:', error)
      }
    }

    const obtenerSaludyBiotecnologia = async () => {
      try {
        const token = localStorage.getItem('token')
        const res = await axios.get('http://localhost:4000/countSaludyBiotecnologia', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setPSaludyBiotecnologia(res.data.count)
      } catch (error) {
        console.error('Error al obtener proyectos:', error)
      }
    }

    const obtenerEducacionCientifica = async () => {
      try {
        const token = localStorage.getItem('token')
        const res = await axios.get('http://localhost:4000/countEducacionCientifica', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setPeducacionCientifica(res.data.count)
      } catch (error) {
        console.error('Error al obtener proyectos:', error)
      }
    }

    obtenerProyectosArchivados()
    obtenerProyectosAprobados()
    obtenerProyectosRechazados()
    obtenerProyectosPendientes()
    obtenerProyectosEnergiayAmbiente()
    obtenerProyectosCienciaBasica()
    obtenerProyectosTecnologiaeInnovacion()
    obtenerProyectosAstronomiayEspacio()
    obtenerProyectosSemillerosCientificos()
    obtenerProyectosCienciasSocialesyHumanas()
    obtenerSaludyBiotecnologia()
    obtenerEducacionCientifica()
  }, [])

  const renderCount = (value) => {
    if (value === null) {
      return (
        <div className="d-flex align-items-center">
          <CSpinner size="lg" />
        </div>
      )
    }
    return value
  }

  const abrirModalConImagen = (imagen) => {
    setImagenAyuda(imagen), setModalAyuda(true)
  }

  return (
    <>
      <CModal visible={ModalAyuda} backdrop="static" keyboard={false} alignment="center" size="lg">
        <CModalBody>
          {imagenAyuda && <CImage className="d-block w-100" src={imagenAyuda} />}
        </CModalBody>
        <CModalFooter>
          <div className="button-box">
            <CButton
              className="boton-regresar"
              onClick={() => {
                setModalAyuda(false)
              }}
            >
              Cerrar
            </CButton>
          </div>
        </CModalFooter>
      </CModal>

      <div className="contador-proyectos">
        <div className="vacio-spacer"></div>
        {/* Tarjeta de Resumen de Proyectos */}
        <CCol xs={12} sm={6}>
          <CCard className="mb-4 project-container">
            <CCardHeader className="text-center">Resumen de Proyectos</CCardHeader>
            <CCardBody>
              <CRow>
                {/* Proyectos Aprobados */}
                <CCol xs={12} sm={3}>
                  <CCard className="mb-3 project-card">
                    <CCardBody
                      className="d-flex flex-column align-items-center justify-content-center"
                      onClick={() => navigate('../../components/Proyectos')}
                    >
                      <h5>Proyectos Aprobados</h5>
                      <h3>{renderCount(Paprobados)}</h3>
                    </CCardBody>
                    <div style={{ height: '4px', backgroundColor: '#28a745' }}></div>
                  </CCard>
                </CCol>

                {/* Proyectos Pendientes */}
                <CCol xs={12} sm={3}>
                  <CCard className="mb-3 project-card">
                    <CCardBody
                      className="d-flex flex-column align-items-center justify-content-center"
                      onClick={() => navigate('../../components/ProyectosPendientes')}
                    >
                      <h5>Proyectos Pendientes</h5>
                      <h3>{renderCount(Ppendientes)}</h3>
                    </CCardBody>
                    <div style={{ height: '4px', backgroundColor: '#ffc107' }}></div>
                  </CCard>
                </CCol>

                {/* Proyectos Rechazados */}
                <CCol xs={12} sm={3}>
                  <CCard className="mb-3 project-card">
                    <CCardBody
                      className="d-flex flex-column align-items-center justify-content-center"
                      onClick={() => navigate('../../components/proyecto-rechazados')}
                    >
                      <h5>Proyectos Rechazados</h5>
                      <h3>{renderCount(Prechazados)}</h3>
                    </CCardBody>
                    <div style={{ height: '4px', backgroundColor: '#dc3545' }}></div>
                  </CCard>
                </CCol>

                {/* Proyectos Archivados */}
                <CCol xs={12} sm={3}>
                  <CCard className="mb-3 project-card">
                    <CCardBody
                      className="d-flex flex-column align-items-center justify-content-center"
                      onClick={() => navigate('../../components/proyecto-archivados')}
                    >
                      <h5>Proyectos Archivados</h5>
                      <h3>{renderCount(Parchivados)}</h3>
                    </CCardBody>
                    <div style={{ height: '4px', backgroundColor: '#dc3545' }}></div>
                  </CCard>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>

        <div className="contenedor-boton-derecha">
          <CButton
            className="boton-ayuda"
            onClick={() => {
              abrirModalConImagen(DashboardAyuda)
            }}
          >
            ¿Ayuda?
          </CButton>
        </div>
      </div>
      {/* Gráfico de Distribución */}
      <div className="contador-categorias">
        <CCard className="mb-4 chart-card">
          <CCardHeader className="text-center">
            Distribución de Proyectos por Categorías
          </CCardHeader>
          <CCardBody className="d-flex justify-content-center">
            <div className="chart-container">
              <CChartPie
                data={{
                  labels: [
                    'Ciencia Básica',
                    'Tecnología e Innovación',
                    'Astronomía y Espacio',
                    'Semilleros Científicos',
                    'Ciencias Sociales y Humanas',
                    'Energía y Ambiente',
                    'Salud y Biotecnología',
                    'Educación Científica',
                  ],
                  datasets: [
                    {
                      backgroundColor: [
                        '#007bff',
                        '#28a745',
                        '#ffc107',
                        '#dc3545',
                        '#6c757d',
                        '#c300b6ff',
                        '#cd6d00ff',
                        '#009898ff',
                      ],
                      hoverBackgroundColor: [
                        '#0056b3',
                        '#1e7e34',
                        '#d39e00',
                        '#a71d2a',
                        '#5a6268',
                        '#9a0090',
                        '#a34a00',
                        '#006f6f',
                      ],

                      hoverOffset: 10,
                      data: [
                        PCienciaBasica,
                        PtecnologiaInnovacion,
                        PAstronomiayEspacio,
                        PSemillerosCientificos,
                        PCienciasSocialesyHumanas,
                        PEnergiayAmbiente,
                        PSaludyBiotecnologia,
                        PeducacionCientifica,
                      ],
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                }}
              />
            </div>
          </CCardBody>
        </CCard>
      </div>
    </>
  )
}

export default Dashboard
