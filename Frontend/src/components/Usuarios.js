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
  cilEnvelopeClosed,
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
import '../scss/lista-usuarios.scss'
import axios from 'axios'
import '../scss/botones.scss'
import Paginacion from './paginacion'

const Usuarios = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 5
  const [roles, Setroles] = useState([])
  const [userID, setuserID] = useState(null)
  const [Modal_eli, setModal_eli] = useState(false)
  const [carga, setcarga] = useState(true)
  const [users, setUsers] = useState([])
  const [deleteMensaje, SetdeleteMensaje] = useState(false)

  //Modal de ver --------------------------------------------------------------
  const [Modal_ver, setModal_ver] = useState(false)
  const [UserName, setUserName] = useState(null)

  //---------------------------------------------------------------------------

  //FILTRO Y BUSQUEDA----------------------------------------------------------
  const [Busqueda, setBusqueda] = useState('')
  const [Filtro, setFiltro] = useState('')
  const [usersVer, setusersVer] = useState([])
  //---------------------------------------------------------------------------
  const [editingUserId, setEditingUserId] = useState(null)
  const [editModalVisible, setEditModalVisible] = useState(false)
  const [editFormData, setEditFormData] = useState({
    Usua_PrimN: '',
    Usua_PrimA: '',
    Usua_NomUs: '',
    Usua_Email: '',
    Usua_RolId: '',
  })
  const openEditModal = (user) => {
    setEditingUserId(user.Usua_Id)
    setEditFormData({
      Usua_PrimN: user.Usua_PrimN || '',
      Usua_PrimA: user.Usua_PrimA || '',
      Usua_NomUs: user.Usua_NomUs || '',
      Usua_Email: user.Usua_Email || '',
      Usua_RolId: user.Usua_RolId || '',
    })
    setEditModalVisible(true)
  }

  const closeEditModal = () => {
    setEditModalVisible(false)
    setEditingUserId(null)
    setEditFormData({
      Usua_PrimN: '',
      Usua_PrimA: '',
      Usua_NomUs: '',
      Usua_Email: '',
      Usua_RolId: '',
    })
  }

  //FILTRO Y BUSQUEDA-----------------------------------------------
  const Filtroactivo = Filtro && Filtro !== 'Filtrar'
  const Buscaractivo = Filtroactivo && Busqueda.trim().length > 0

  const handleFiltroChange = (e) => {
    setFiltro(e.target.value)
  }
  const limpiarFiltro = () => {
    setFiltro('')
    setBusqueda('')
    cargarusuarios()
  }
  const handleBusquedaChange = (e) => {
    setBusqueda(e.target.value)
  }

  const HandleBuscar = async () => {
    try {
      if (Filtro === 'Nombre de usuario') {
        const token = localStorage.getItem('token')
        const result = await axios.post(
          'http://localhost:4000/FNombreUsuario',
          { Usua_NomUs: Busqueda },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        setUsers(result.data)
        setCurrentPage(1)
      } else if (Filtro === 'Correo Electronico') {
        const token = localStorage.getItem('token')
        const result = await axios.post(
          'http://localhost:4000/FEmail',
          { Usua_Email: Busqueda },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        setUsers(result.data)
        setCurrentPage(1)
      } else if (Filtro === 'Rol') {
        const token = localStorage.getItem('token')
        const result = await axios.post(
          'http://localhost:4000/FRol',
          { Rol_Nombre: Busqueda },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        setUsers(result.data)
        setCurrentPage(1)
      } else {
        cargarusuarios()
      }
    } catch (error) {
      console.error('Error al obtener el nombre de usuario:', error)
    }
  }
  //VER-------------------------------------------------------------------

  const UsuarioVer = async (id) => {
    try {
      const token = localStorage.getItem('token')
      const result = await axios.get(`http://localhost:4000/usersVer/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setusersVer(result.data)
    } catch (err) {
      console.error('Error al mostrar usuario:', err)
    }
  }

  //VER-------------------------------------------------------------------
  //------------------------------------------------------------------
  const handleEditChange = (e) => {
    const { name, value } = e.target
    setEditFormData((prev) => ({ ...prev, [name]: value }))
  }

  const submitEdit = async (e) => {
    // si lo llamas desde onClick sin evento, permite e ser opcional
    if (e && e.preventDefault) e.preventDefault()
    try {
      const token = localStorage.getItem('token')
      const payload = { ...editFormData }
      await axios.put(`http://localhost:4000/users/${editingUserId}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      cargarusuarios()
      closeEditModal()
    } catch (err) {
      console.error('Error actualizando usuario:', err)
    }
  }

  const cargarRoles = async () => {
    try {
      const result = await axios.get('http://localhost:4000/roles')
      Setroles(result.data)
    } catch (error) {
      console.error('Error al obtener los roles', error)
    }
  }

  useEffect(() => {
    const usuarios = async () => {
      try {
        const token = localStorage.getItem('token')
        const result = await axios.get('http://localhost:4000/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setUsers(result.data)
        setcarga(false)
      } catch (error) {
        console.error('Error al obtener los usuarios:', error)
      }
    }
    usuarios()
  }, [])

  if (carga) {
    return (
      <div className="pt-3 text-center">
        <CSpinner color="primary" variant="grow" />
      </div>
    )
  }

  const cargarusuarios = async () => {
    try {
      const token = localStorage.getItem('token')
      const result = await axios.get('http://localhost:4000/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setUsers(result.data)
      setcarga(false)
    } catch (error) {
      console.error('Error al obtener los usuarios:', error)
    }
  }

  const deleteUsuario = async (id) => {
    try {
      const token = localStorage.getItem('token')
      await axios.delete(`http://localhost:4000/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      SetdeleteMensaje(true)
      cargarusuarios()
      setuserID(null)
    } catch (err) {
      console.error('Error al eliminar usuario:', err)
    }
  }

  const totalPages = Math.max(1, Math.ceil(users.length / pageSize))
  const start = (currentPage - 1) * pageSize
  const paginatedUsers = users.slice(start, start + pageSize)

  return (
    <>
      {/*MODAL PARA BOTON VER ----------------------------------------------------------------*/}
      <CModal
        visible={Modal_ver}
        onClose={() => setModal_ver(false)}
        backdrop="static"
        keyboard={false}
      >
        <CModalHeader>Usuario : {String(UserName)}</CModalHeader>
        <CModalBody>
          <CForm>
            <CInputGroup className="mb-3">
              <div className="d-flex  w-100 gap-3">
                <div className="w-50">
                  <CFormLabel>Primer Nombre</CFormLabel>
                  <CInputGroup>
                    <CInputGroupText>
                      <CIcon icon={cilPencil} />
                    </CInputGroupText>
                    <CFormInput value={usersVer.Usua_PrimN || ''} disabled />
                  </CInputGroup>
                </div>
                <div className="w-50">
                  <CFormLabel>Primer Apellido</CFormLabel>
                  <CInputGroup>
                    <CInputGroupText>
                      <CIcon icon={cilPencil} />
                    </CInputGroupText>
                    <CFormInput value={usersVer.Usua_PrimA || ''} disabled />
                  </CInputGroup>
                </div>
              </div>
            </CInputGroup>

            <CInputGroup className="mb-3">
              <div className="d-flex  w-100 gap-3">
                <div className="w-50">
                  <CFormLabel>Nombre de Usuario</CFormLabel>
                  <CInputGroup>
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput value={usersVer.Usua_NomUs || ''} disabled />
                  </CInputGroup>
                </div>
                <div className="w-50">
                  <CFormLabel>Correo electronico</CFormLabel>
                  <CInputGroup>
                    <CInputGroupText>
                      <CIcon icon={cilEnvelopeClosed} />
                    </CInputGroupText>
                    <CFormInput value={usersVer.Usua_Email || ''} disabled />
                  </CInputGroup>
                </div>
              </div>
            </CInputGroup>

            <CInputGroup className="mb-3">
              <div className="d-flex  w-100 gap-3">
                <div className="w-50">
                  <CFormLabel>Rol</CFormLabel>
                  <CInputGroup>
                    <CInputGroupText>
                      <CIcon icon={cilGroup} />
                    </CInputGroupText>
                    <CFormInput value={usersVer.Rol_Nombre || ''} disabled></CFormInput>
                  </CInputGroup>
                </div>
              </div>
            </CInputGroup>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton
            className="boton-eliminar"
            onClick={() => {
              setModal_ver(false)
              setusersVer({
                Usua_PrimN: '',
                Usua_PrimA: '',
                Usua_NomUs: '',
                Usua_Email: '',
                Usua_Rol_Nombre: '',
              })
            }}
          >
            Cerrar
          </CButton>
        </CModalFooter>
      </CModal>
      {/*MODAL PARA BOTON VER ----------------------------------------------------------------*/}

      <CModal
        visible={editModalVisible}
        onClose={closeEditModal}
        backdrop="static"
        keyboard={false}
      >
        <CModalHeader>Editar usuario</CModalHeader>
        <CModalBody>
          <CForm>
            <CInputGroup className="mb-3">
              <div className="d-flex  w-100 gap-3">
                <div className="w-50">
                  <CFormLabel>Primer Nombre</CFormLabel>
                  <CInputGroup>
                    <CInputGroupText>
                      <CIcon icon={cilPencil} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Primer Nombre"
                      name="Usua_PrimN"
                      value={editFormData.Usua_PrimN}
                      onChange={handleEditChange}
                    />
                  </CInputGroup>
                </div>
                <div className="w-50">
                  <CFormLabel>Primer Apellido</CFormLabel>
                  <CInputGroup>
                    <CInputGroupText>
                      <CIcon icon={cilPencil} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Primer Apellido"
                      name="Usua_PrimA"
                      value={editFormData.Usua_PrimA}
                      onChange={handleEditChange}
                    />
                  </CInputGroup>
                </div>
              </div>
            </CInputGroup>

            <CInputGroup className="mb-3">
              <div className="d-flex  w-100 gap-3">
                <div className="w-50">
                  <CFormLabel>Nombre de Usuario</CFormLabel>
                  <CInputGroup>
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Nombre de usuario"
                      name="Usua_NomUs"
                      value={editFormData.Usua_NomUs}
                      onChange={handleEditChange}
                    />
                  </CInputGroup>
                </div>
                <div className="w-50">
                  <CFormLabel>Correo electronico</CFormLabel>
                  <CInputGroup>
                    <CInputGroupText>
                      <CIcon icon={cilEnvelopeClosed} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Correo electrónico"
                      name="Usua_Email"
                      value={editFormData.Usua_Email}
                      onChange={handleEditChange}
                    />
                  </CInputGroup>
                </div>
              </div>
            </CInputGroup>

            <CInputGroup className="mb-3">
              <div className="d-flex  w-100 gap-3">
                <div className="w-50">
                  <CFormLabel>Rol</CFormLabel>
                  <CInputGroup>
                    <CInputGroupText>
                      <CIcon icon={cilGroup} />
                    </CInputGroupText>
                    <CFormSelect
                      name="Usua_RolId"
                      value={editFormData.Usua_RolId}
                      onChange={handleEditChange}
                      className="input-tamaño"
                      onFocus={cargarRoles}
                    >
                      <option value="">Seleccionar rol</option>
                      {roles.map((r) => (
                        <option key={r.Rol_Id} value={r.Rol_Id}>
                          {r.Rol_Nombre}
                        </option>
                      ))}
                    </CFormSelect>
                  </CInputGroup>
                </div>
              </div>
            </CInputGroup>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton className="boton-eliminar" onClick={closeEditModal}>
            Cancelar
          </CButton>
          <CButton className="boton-generar" onClick={submitEdit}>
            Guardar
          </CButton>
        </CModalFooter>
      </CModal>

      <CModal visible={deleteMensaje} onClose={() => SetdeleteMensaje(false)}>
        <CModalHeader></CModalHeader>
        <CModalBody>
          <div>Eliminacion exitosa</div>
        </CModalBody>
        <CModalFooter>
          <div className="button-box">
            <CButton className="button-register" onClick={() => SetdeleteMensaje(false)}>
              Cerrar
            </CButton>
          </div>
        </CModalFooter>
      </CModal>

      {/*MODAL PARA BOTON ELIMINAR ----------------------------------------------------------------*/}
      <CModal
        visible={Modal_eli}
        backdrop="static"
        keyboard={false}
        onClose={() => setModal_eli(false)}
      >
        <CModalHeader>Eliminar usuario</CModalHeader>
        <CModalBody>
          <p>¿Seguro que desea eliminar un usuario?</p>
        </CModalBody>
        <CModalFooter>
          <div className="caja-boton">
            <CButton
              className="boton"
              onClick={() => {
                deleteUsuario(userID), setModal_eli(false)
              }}
            >
              Eliminar
            </CButton>
            <CButton
              className="boton"
              onClick={() => {
                setModal_eli(false)
                setuserID(null)
              }}
            >
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
            <div>Usuarios</div>

            <div>
              <CForm>
                <CFormSelect className="filter-input" name="filtro" onChange={handleFiltroChange}>
                  <option value={''}>Filtrar</option>
                  <option>Nombre de usuario</option>
                  <option>Correo Electronico</option>
                  <option>Rol</option>
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
                <CTableHeaderCell>Nombre de usuario</CTableHeaderCell>
                <CTableHeaderCell>Rol</CTableHeaderCell>
                <CTableHeaderCell>Correo electronico</CTableHeaderCell>
                <CTableHeaderCell>Ver</CTableHeaderCell>
                <CTableHeaderCell>Editar</CTableHeaderCell>
                <CTableHeaderCell>Eliminar</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {paginatedUsers.length === 0 ? (
                <CTableRow>
                  <CTableDataCell colSpan={6} className="text-center">
                    No hay usuarios
                  </CTableDataCell>
                </CTableRow>
              ) : (
                paginatedUsers.map((u, index) => (
                  <CTableRow key={index}>
                    <CTableDataCell>{u.Usua_NomUs}</CTableDataCell>
                    <CTableDataCell>{u.Rol_Nombre}</CTableDataCell>
                    <CTableDataCell>{u.Usua_Email}</CTableDataCell>
                    <CTableDataCell>
                      <CButton
                        className="botonhover"
                        onClick={() => {
                          setModal_ver(true)
                          setUserName(u.Usua_NomUs)
                          UsuarioVer(u.Usua_Id)
                        }}
                      >
                        <CIcon icon={cilLowVision} />
                      </CButton>
                    </CTableDataCell>
                    <CTableDataCell>
                      <CButton className="botonhover" onClick={() => openEditModal(u)}>
                        <CIcon icon={cilPencil} style={{ color: 'blue' }} />
                      </CButton>
                    </CTableDataCell>
                    <CTableDataCell>
                      <CButton
                        className="botonhover"
                        onClick={() => {
                          setuserID(u.Usua_Id)
                          setModal_eli(true)
                        }}
                      >
                        <CIcon icon={cilXCircle} style={{ color: 'red' }} />
                      </CButton>
                    </CTableDataCell>
                  </CTableRow>
                ))
              )}
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
export default Usuarios
