import React from 'react'
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
  cilBarChart
} from '@coreui/icons'
import { CNavGroup, 
  CNavItem, 
  CNavTitle,
  CCard,
  CCardBody,
  CCardHeader, 
  CCardFooter} from '@coreui/react'
import { useNavigate } from 'react-router-dom';
import '../scss/proyectos.scss'
import Paginacion from './paginacion';

const Proyectos =()=>{

  const proyectos = [
  { nombre: 'Proyecto A', ruta: '#' },
  { nombre: 'Proyecto B', ruta: '#' },
  { nombre: 'Proyecto C', ruta: '#' },
  { nombre: 'Proyecto D', ruta: '#' },
  { nombre: 'Proyecto E', ruta: '#' },
  { nombre: 'Proyecto F', ruta: '#' },
  { nombre: 'Proyecto G', ruta: '#' },
  { nombre: 'Proyecto H', ruta: '#' },
  { nombre: 'Proyecto I', ruta: '#' },
];

const colores = ['#FF5733', '#33FF57', '#3357FF', '#F3FF33'];

const navigate = useNavigate();

    return(
        <>
        <CCard>
          <CCardHeader>Lista de Proyectos</CCardHeader>
          <CCardBody>
            <div className='cuadros'>
            {proyectos.map((p, index) => (
              <CCard className='cuadro2' key={index} onClick={() => navigate(p.ruta)}>
                <CCardHeader>{p.nombre}</CCardHeader>
                <CCardBody>Haz clic para ver más detalles</CCardBody>
              </CCard>
            ))}
          </div>
          </CCardBody>
          <CCardFooter>
            <Paginacion/>
          </CCardFooter>
        </CCard>


          
        </>
    )
}
export default Proyectos



