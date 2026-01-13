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
  cilCheck,
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
  CImage,
} from '@coreui/react'

import '../scss/buscador.scss'
import '../scss/lista-usuarios.scss'
import axios from 'axios'
import '../scss/botones.scss'
import Paginacion from './paginacion'
import UsuarioInactivosAyuda from '../assets/images/manualdeusuario/usuarios inactivos.png'

const Usuarios = () => {
  const [imagenAyuda, setImagenAyuda] = useState(null)
  const [ModalAyuda, setModalAyuda] = useState(false)

  const [Cargando, setCargando] = useState(true)
  const [loadingAction, setLoadingAction] = useState(false)
  const [actionLabel, setActionLabel] = useState('')

  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 5
  const [roles, Setroles] = useState([])
  const [userID, setuserID] = useState(null)
  const [Modal_eli, setModal_eli] = useState(false)
  const [users, setUsers] = useState([])
  const [deleteMensaje, SetdeleteMensaje] = useState(false)
  const [mensajeError, setmensajeError] = useState('')
  const [ModalmensajeError, setModalmensajeError] = useState(false)

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
    setLoadingAction(true)
    setActionLabel('Buscando...')
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
    } finally {
      setLoadingAction(false)
      setActionLabel('')
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
    setLoadingAction(true)
    setActionLabel('Editando...')

    // si lo llamas desde onClick sin evento, permite e ser opcional
    if (e && e.preventDefault) e.preventDefault()
    try {
      const token = localStorage.getItem('token')
      const payload = { ...editFormData }

      await axios.put(`http://localhost:4000/users_editar/${editingUserId}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      cargarusuarios()
      closeEditModal()
    } catch (err) {
      if (err.response.data.error) {
        setmensajeError(err.response.data.error)
      } else {
        setmensajeError('')
        const mensajes = err.response.data.errors.map((issue) => issue.message)
        setmensajeError(mensajes)
      }
      setModalmensajeError(true)
    } finally {
      setLoadingAction(false)
      setActionLabel('')
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
      setCargando(true)
      try {
        const token = localStorage.getItem('token')
        const result = await axios.get('http://localhost:4000/usersInactivo', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setUsers(result.data)
      } catch (error) {
        console.error('Error al obtener los usuarios:', error)
      } finally {
        setCargando(false)
      }
    }
    usuarios()
  }, [])

  const cargarusuarios = async () => {
    try {
      const token = localStorage.getItem('token')
      const result = await axios.get('http://localhost:4000/usersInactivo', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setUsers(result.data)
    } catch (error) {
      console.error('Error al obtener los usuarios:', error)
    }
  }

  const ActivarUsuario = async (id) => {
    setLoadingAction(true)
    setActionLabel('Activando...')
    try {
      const token = localStorage.getItem('token')
      await axios.put(`http://localhost:4000/users_activar/${id}`, users[0], {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      SetdeleteMensaje(true)
      cargarusuarios()
      setuserID(null)
    } catch (err) {
      setModalmensajeError(true)
      setmensajeError(err.response.data.message)
    } finally {
      setLoadingAction(false)
      setActionLabel('')
    }
  }

  const totalPages = Math.max(1, Math.ceil(users.length / pageSize))
  const start = (currentPage - 1) * pageSize
  const paginatedUsers = users.slice(start, start + pageSize)

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

      <CModal
        visible={ModalmensajeError}
        backdrop="static"
        keyboard={false}
        onClose={() => setModalmensajeError(false)}
      >
        <CModalHeader>Error</CModalHeader>
        <CModalBody>
          <div>{String(mensajeError)}</div>
        </CModalBody>
        <CModalFooter>
          <div className="button-box">
            <CButton
              className="boton-regresar"
              onClick={() => {
                setModalmensajeError(false)
              }}
            >
              Cerrar
            </CButton>
          </div>
        </CModalFooter>
      </CModal>

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
          <div>Activacion exitosa</div>
        </CModalBody>
        <CModalFooter>
          <div className="button-box">
            <CButton className="button-register" onClick={() => SetdeleteMensaje(false)}>
              Cerrar
            </CButton>
          </div>
        </CModalFooter>
      </CModal>

      {/*MODAL PARA BOTON ACTIVAR ----------------------------------------------------------------*/}
      <CModal
        visible={Modal_eli}
        backdrop="static"
        keyboard={false}
        onClose={() => setModal_eli(false)}
      >
        <CModalHeader>Activar usuario</CModalHeader>
        <CModalBody>
          <p>¿Seguro que desea activar un usuario?</p>
        </CModalBody>
        <CModalFooter>
          <div className="caja-boton">
            <CButton
              className="boton-descargar"
              onClick={() => {
                ActivarUsuario(userID), setModal_eli(false)
              }}
            >
              Activar
            </CButton>
            <CButton
              className="boton-regresar"
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

      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <CButton
          className="boton-ayuda"
          onClick={() => {
            abrirModalConImagen(UsuarioInactivosAyuda)
          }}
        >
          ¿Ayuda?
        </CButton>
      </div>

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
            <div>Usuarios Inactivos</div>

            <div>
              <CForm>
                <CFormSelect
                  value={Filtro}
                  className="filter-input"
                  name="filtro"
                  onChange={handleFiltroChange}
                >
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
                <CTableHeaderCell>Activar</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {Cargando ? (
                renderCount(null)
              ) : paginatedUsers.length === 0 ? (
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
                        <CIcon icon={cilCheck} style={{ color: 'green' }} />
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
