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
  cilBookmark,
  cilCommentSquare,
  cilCalendar,
  cilOptions,
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
  CInputGroup,
  CInputGroupText,
  CFormLabel,
  CFormTextarea,
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
} from '@coreui/react'
import '../scss/proyectos.scss'
import '../scss/botones.scss'
import { useNavigate, useParams, useLocation } from 'react-router-dom'

import axios from 'axios'

const ProyectosDetalle = () => {
  const { id } = useParams()
  const [proyecto, setProyecto] = useState([])
  const [mensajeAprobado, setmensajeAprobado] = useState('')
  const [ModalmensajeAprobado, setModalmensajeAprobado] = useState(false)
  const navigate = useNavigate()

  const location = useLocation()
  const origen =
    location.state?.from || '/components/ProyectosPendientes' || '/components/Proyectos'

  useEffect(() => {
    const getidProyecto = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/proyectos/${id}`)
        setProyecto(res.data)
      } catch (error) {
        console.error('Error al obtener el proyecto:', error)
      }
    }
    getidProyecto()
  }, [id])

  const getidProyecto = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/proyectos/${id}`)
      setProyecto(res.data)
    } catch (error) {
      console.error('Error al obtener el proyecto:', error)
    }
  }
  getidProyecto()

  const Aprobarproyecto = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.put('http://localhost:4000/aprobar', proyecto[0], {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      getidProyecto()
      setmensajeAprobado(response.data.message)
      setModalmensajeAprobado(true)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <CModal visible={ModalmensajeAprobado} onClose={() => setModalmensajeAprobado(false)}>
        <CModalHeader>Mensaje</CModalHeader>
        <CModalBody>
          <div>{String(mensajeAprobado)}</div>
        </CModalBody>
        <CModalFooter>
          <div className="button-box">
            <CButton className="boton-regresar" onClick={() => setModalmensajeAprobado(false)}>
              Cerrar
            </CButton>
          </div>
        </CModalFooter>
      </CModal>

      <div>
        <CCard className="mb-4">
          <CCardHeader>PROYECTO ID : {id} </CCardHeader>
          <CCardBody>
            {proyecto.map((P, index) => (
              <CForm key={index}>
                <CInputGroup className="mb-3">
                  <div className="d-flex  w-100 gap-3">
                    <div className="w-50">
                      <CFormLabel>Usuario</CFormLabel>
                      <CInputGroup>
                        <CInputGroupText>
                          <CIcon icon={cilUser} />
                        </CInputGroupText>
                        <CFormInput type="Text" value={P.Proy_NomAu} readOnly></CFormInput>
                      </CInputGroup>
                    </div>
                  </div>

                  <div className="d-flex  w-100 gap-3">
                    <div className="w-50">
                      <CFormLabel>Titulo del proyecto</CFormLabel>
                      <CInputGroup>
                        <CInputGroupText>
                          <CIcon icon={cilBookmark} />
                        </CInputGroupText>
                        <CFormInput
                          type="Text"
                          name="Proy_Titul"
                          placeholder="Titulo"
                          className="input-tamaño"
                          value={P.Proy_Titul}
                          readOnly
                        ></CFormInput>
                      </CInputGroup>
                    </div>
                  </div>
                </CInputGroup>

                <CInputGroup className="mb-3">
                  <div className="d-flex  w-100 gap-3">
                    <div className="w-50">
                      <CFormLabel>Descripcion</CFormLabel>
                      <CInputGroup>
                        <CInputGroupText>
                          <CIcon icon={cilCommentSquare} />
                        </CInputGroupText>
                        <CFormTextarea
                          name="Proy_Descr"
                          placeholder="Descripcion"
                          id="descripcion"
                          className="input-tamaño"
                          rows={3}
                          value={P.Proy_Descr}
                          readOnly
                        ></CFormTextarea>
                      </CInputGroup>
                    </div>
                    <div className="w-50">
                      <CFormLabel>Resumen</CFormLabel>
                      <CInputGroup>
                        <CInputGroupText>
                          <CIcon icon={cilCommentSquare} />
                        </CInputGroupText>
                        <CFormTextarea
                          name="Proy_Resum"
                          placeholder="Resumen"
                          id="descripcion"
                          className="input-tamaño"
                          rows={3}
                          value={P.Proy_Resum}
                          readOnly
                        ></CFormTextarea>
                      </CInputGroup>
                    </div>
                  </div>
                </CInputGroup>

                <CInputGroup className="mb-3">
                  <div className="d-flex  w-100 gap-3">
                    <div className="w-50">
                      <CFormLabel>Fecha de registro</CFormLabel>
                      <CInputGroup>
                        <CInputGroupText>
                          <CIcon icon={cilCalendar} />
                        </CInputGroupText>
                        <CFormInput
                          type="text"
                          placeholder="Fecha"
                          name="Proy_FecRe"
                          className="input-tamaño"
                          value={P.Proy_FecRe}
                          readOnly
                        ></CFormInput>
                      </CInputGroup>
                    </div>
                    <div className="w-50">
                      <CFormLabel>Estado</CFormLabel>
                      <CInputGroup>
                        <CInputGroupText>
                          <CIcon icon={cilOptions} />
                        </CInputGroupText>
                        <CFormInput
                          name="proy_statu"
                          className="input-tamaño"
                          value={P.proy_statu}
                          readOnly
                        ></CFormInput>
                      </CInputGroup>
                    </div>
                  </div>
                </CInputGroup>
                <CInputGroup className="mb-3">
                  <div className="d-flex  w-100 gap-3">
                    <div className="w-50">
                      <CFormLabel>Categorias</CFormLabel>
                      <CInputGroup>
                        <CInputGroupText>
                          <CIcon icon={cilOptions} />
                        </CInputGroupText>
                        <CFormInput
                          className="input-tamaño"
                          name="Proy_CatId"
                          value={P.Cate_NomCa}
                          readOnly
                        ></CFormInput>
                      </CInputGroup>
                    </div>
                  </div>
                </CInputGroup>
              </CForm>
            ))}
          </CCardBody>
          <CCardFooter>
            {proyecto[0]?.proy_statu !== 'aprobado' && (
              <CButton
                className="boton-generar"
                onClick={() => {
                  Aprobarproyecto()
                }}
              >
                Aprobar
              </CButton>
            )}
            <CButton
              className="boton-regresar"
              onClick={() => {
                navigate(origen)
              }}
            >
              Regresar
            </CButton>
          </CCardFooter>
        </CCard>
      </div>
    </>
  )
}

export default ProyectosDetalle
