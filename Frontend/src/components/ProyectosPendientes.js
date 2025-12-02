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
} from '@coreui/icons'
import {
  CNavGroup,
  CNavItem,
  CNavTitle,
  CCard,
  CCardBody,
  CCardHeader,
  CCardFooter,
} from '@coreui/react'
import { useNavigate } from 'react-router-dom'
import '../scss/proyectos.scss'
import Paginacion from './paginacion'
import axios from 'axios'

const Proyectos = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 8
  const [proyectos, setProyectos] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
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
    obtenerProyectos()
  }, [])

  const totalPages = Math.max(1, Math.ceil(proyectos.length / pageSize))
  const start = (currentPage - 1) * pageSize
  const paginateProyectos = proyectos.slice(start, start + pageSize)

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>Lista de Proyectos pendientes</CCardHeader>
        <CCardBody>
          <div className="cuadros">
            {paginateProyectos.map((p, index) => (
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
            ))}
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
