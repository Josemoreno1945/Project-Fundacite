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
  const [proyectos, setProyectos] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const obtenerProyectos = async () => {
      try {
        const res = await axios.get('http://localhost:4000/proyectos')
        setProyectos(res.data)
      } catch (error) {
        console.error('Error al obtener proyectos:', error)
      }
    }
    obtenerProyectos()
  }, [])

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>Lista de Proyectos</CCardHeader>
        <CCardBody>
          <div className="cuadros">
            {proyectos.map((p, index) => (
              <CCard
                className="cuadro2"
                key={p.Proy_Id}
                onClick={() => navigate(`/ProyectosDetalle/${p.Proy_Id}`)}
              >
                <CCardHeader>{p.Proy_Titul}</CCardHeader>
                <CCardBody>Haz clic para ver más detalles</CCardBody>
              </CCard>
            ))}
          </div>
        </CCardBody>
        <CCardFooter>
          <Paginacion />
        </CCardFooter>
      </CCard>
    </>
  )
}
export default Proyectos
