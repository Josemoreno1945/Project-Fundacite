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
  cilBarChart,
  cilChart,
  cilFile,
  cilBook,
  cilLibrary,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav_admin = [
  {
    component: CNavItem,
    name: 'Inicio',
    to: '/inicio',
    icon: <CIcon icon={cilHome} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilChart} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Usuarios',
    icon: <CIcon icon={cilGroup} customClassName="nav-icon" />,

    items: [
      {
        component: CNavItem,
        name: 'Registro de usuarios',
        to: '/components/Registro',
      },
      {
        component: CNavItem,
        name: 'Usuarios Activos',
        to: '/components/Usuarios',
      },
      {
        component: CNavItem,
        name: 'Usuarios Inactivos',
        to: '/components/Usuarios_Inactivos',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Proyectos',
    icon: <CIcon icon={cilBook} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Subir Proyecto',
        to: '/components/Registro-Proyectos',
      },
      {
        component: CNavItem,
        name: 'Lista de Proyectos',
        to: '/components/Proyectos',
      },
      {
        component: CNavItem,
        name: 'Proyectos Pendientes',
        to: '/components/ProyectosPendientes',
      },
      {
        component: CNavItem,
        name: 'Proyectos Archivados',
        to: '/components/proyecto-archivados',
      },
      {
        component: CNavItem,
        name: 'Proyectos Rechazados',
        to: '/components/proyecto-rechazados',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Categorias',
    to: '/categorias',
    icon: <CIcon icon={cilLibrary} customClassName="nav-icon" />,
  },
]

const _nav_user = [
  {
    component: CNavItem,
    name: 'Inicio',
    to: '/inicio',
    icon: <CIcon icon={cilHome} customClassName="nav-icon" />,
  },

  {
    component: CNavGroup,
    name: 'Proyectos',
    icon: <CIcon icon={cilBook} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Subir Proyecto',
        to: '/components/Registro-Proyectos',
      },
      {
        component: CNavItem,
        name: 'Lista de Proyectos',
        to: '/components/Proyectos',
      },
    ],
  },
]

const _nav = (Usua_RolId) => {
  switch (Usua_RolId) {
    case 1:
      return _nav_admin
    case 2:
      return _nav_user
    case 3:
      return _nav_admin
    default:
      return [
        {
          component: CNavItem,
          name: 'Inicio',
          to: '/inicio',
          icon: <CIcon icon={cilHome} customClassName="nav-icon" />,
        },
      ]
  }
}

export default _nav
