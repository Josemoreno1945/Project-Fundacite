import { useState, useEffect } from 'react'

import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import axios from 'axios'
import { CChartPie } from '@coreui/react-chartjs'
import '../../scss/dashboard.scss'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const navigate = useNavigate()
  const [Paprobados, setPaprobados] = useState(null)
  const [Prechazados, setPrechazados] = useState(null)
  const [Parchivados, setParchivados] = useState(null)
  const [Ppendientes, setPpendientes] = useState(null)

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
    obtenerProyectosArchivados()
    obtenerProyectosAprobados()
    obtenerProyectosRechazados()
    obtenerProyectosPendientes()
  }, [])

  return (
    <>
      <div className="contador-proyectos">
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
                      <h3>{String(Paprobados)}</h3>
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
                      <h3>{String(Ppendientes)}</h3>
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
                      <h3>{String(Prechazados)}</h3>
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
                      <h3>{String(Parchivados)}</h3>
                    </CCardBody>
                    <div style={{ height: '4px', backgroundColor: '#dc3545' }}></div>
                  </CCard>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
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
                  labels: ['Investigación', 'Desarrollo', 'Educación', 'Innovación', 'Otros'],
                  datasets: [
                    {
                      backgroundColor: ['#007bff', '#28a745', '#ffc107', '#dc3545', '#6c757d'],
                      hoverBackgroundColor: ['#0056b3', '#1e7e34', '#d39e00', '#a71d2a', '#5a6268'],
                      hoverOffset: 10,
                      data: [20, 35, 25, 10, 15],
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
