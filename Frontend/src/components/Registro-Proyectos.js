import { React, use, useState } from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilLockLocked,
  cilPencil,
  cilUser,
  cilEnvelopeClosed,
  cilGroup,
  cilCalendar,
  cilLockUnlocked,
  cilCommentSquare,
  cilBookmark,
  cilOptions,
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
  CFormTextarea,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
} from '@coreui/react'
import '../scss/registro-u.scss'
import '../scss/botones.scss'
import axios from 'axios'
import MyDropzone from './subirarchivos'
import { useNavigate } from 'react-router-dom'

const Registro_Proyectos = () => {
  const [mensajeAprobado, setmensajeAprobado] = useState('')

  const [mensajeError, setmensajeError] = useState('')
  const [ModalmensajeError, setModalmensajeError] = useState(false)
  const [ModalmensajeAprobado, setModalmensajeAprobado] = useState(false)
  const [documentos, setDocumentos] = useState([]) // Array para almacenar archivos seleccionados
  const [categorias, setCategorias] = useState([])
  const [TipoArchivos, setTipoArchivos] = useState([])
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    Proy_Titul: '',
    Proy_Descr: '',
    Proy_Resum: '',
    Proy_FecRe: '',
    Proy_NomAu: '',
    Proy_CatId: '',
  })

  const [formData_doc, setFormData_doc] = useState({
    Doc_NomArc: '',
    Doc_RutaAr: '',
    Doc_TiArId: '',
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleDocumentChange = (files) => {
    setDocumentos(files)
  }

  const handleDocInputChange = (e) => {
    const { name, value } = e.target
    setFormData_doc((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  //-----------------------------------------------------------------------------------------------------

  const cargarCategorias = async () => {
    try {
      const result = await axios.get('http://localhost:4000/categorias')
      setCategorias(result.data)
    } catch (error) {
      console.error('Error al obtener las categorías', error)
    }
  }
  //--------------------------------------------------------------------------------------------------------------

  //-----------------------------------------------------------------------------------------------------

  //--------------------------------------------------------------------------------------------------------------

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const formDataToSend = new FormData()
      formDataToSend.append('Proy_Titul', formData.Proy_Titul)
      formDataToSend.append('Proy_Descr', formData.Proy_Descr)
      formDataToSend.append('Proy_Resum', formData.Proy_Resum)
      formDataToSend.append('Proy_FecRe', formData.Proy_FecRe)
      formDataToSend.append('Proy_NomAu', formData.Proy_NomAu)
      formDataToSend.append('Proy_CatId', formData.Proy_CatId)
      const token = localStorage.getItem('token')
      documentos.forEach((file) => formDataToSend.append('images', file))
      const postProyect = await axios.post('http://localhost:4000/proyectos', formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      setmensajeAprobado(postProyect.data.Message)
      setModalmensajeAprobado(true)
    } catch (err) {
      if (err.response.data.error) {
        setmensajeError(err.response.data.error)
      } else {
        setmensajeError('')
        const mensajes = err.response.data.errors.map((issue) => issue.message)
        setmensajeError(mensajes)
      }
      setModalmensajeError(true)
    }
  }

  //------------------------------------------------------------------------------------------------

  const handleGenerateAndDownload = async () => {
    if (!documentos || documentos.length === 0) return alert('Agrega imágenes') //HACER ALERTA A MANO ---
    try {
      const fd = new FormData()
      documentos.forEach((f) => fd.append('images', f))
      const res = await axios.post('http://localhost:4000/documentos/generate-pdf', fd, {
        responseType: 'blob',
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      const url = URL.createObjectURL(new Blob([res.data], { type: 'application/pdf' }))
      const a = document.createElement('a')
      a.href = url
      a.download = `preview_${Date.now()}.pdf`
      document.body.appendChild(a)
      a.click()
      a.remove()
      URL.revokeObjectURL(url)
    } catch (err) {
      console.error('Error generando PDF de preview:', err)
      alert('Error generando PDF')
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

      <CModal visible={ModalmensajeError} onClose={() => setModalmensajeError(false)}>
        <CModalHeader>Error</CModalHeader>
        <CModalBody>
          {Array.isArray(mensajeError) ? (
            <ul>
              {mensajeError.map((msg, idx) => (
                <li key={idx}>{msg}</li>
              ))}
            </ul>
          ) : (
            <div>{String(mensajeError)}</div>
          )}
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

      <div className="proyecto-caja">
        <CCard className="mb-4">
          <CCardHeader>REGISTRO DE PROYECTO</CCardHeader>
          <CCardBody>
            <CForm>
              <CInputGroup className="mb-3">
                <div className="d-flex  w-100 gap-3">
                  <div className="w-50">
                    <CFormLabel>Nombre de Autor</CFormLabel>
                    <CInputGroup>
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        type="Text"
                        name="Proy_NomAu"
                        onChange={handleInputChange}
                        placeholder="Nombre del autor"
                        className="input-tamaño"
                      ></CFormInput>
                    </CInputGroup>
                  </div>
                  <div className="w-50">
                    <CFormLabel>Titulo del proyecto</CFormLabel>
                    <CInputGroup>
                      <CInputGroupText>
                        <CIcon icon={cilBookmark} />
                      </CInputGroupText>
                      <CFormInput
                        type="Text"
                        name="Proy_Titul"
                        onChange={handleInputChange}
                        placeholder="Titulo"
                        className="input-tamaño"
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
                        onChange={handleInputChange}
                        placeholder="Descripcion"
                        id="descripcion"
                        className="input-tamaño"
                        rows={3}
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
                        onChange={handleInputChange}
                        placeholder="Resumen"
                        id="descripcion"
                        className="input-tamaño"
                        rows={3}
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
                        type="date"
                        placeholder="Fecha"
                        name="Proy_FecRe"
                        className="input-tamaño"
                        onChange={handleInputChange}
                      ></CFormInput>
                    </CInputGroup>
                  </div>

                  <div className="w-50">
                    <CFormLabel>Categorias</CFormLabel>
                    <CInputGroup>
                      <CInputGroupText>
                        <CIcon icon={cilOptions} />
                      </CInputGroupText>
                      <CFormSelect
                        className="input-tamaño"
                        onFocus={cargarCategorias}
                        onChange={handleInputChange}
                        name="Proy_CatId"
                        value={formData.Proy_CatId}
                      >
                        <option value="">Seleccionar categoría</option>
                        {categorias.map((categoria) => (
                          <option key={categoria.Cate_Id} value={categoria.Cate_Id}>
                            {categoria.Cate_NomCa}
                          </option>
                        ))}
                      </CFormSelect>
                    </CInputGroup>
                  </div>
                </div>
              </CInputGroup>

              <CCard>
                <CCardHeader>Anexar Documentos</CCardHeader>
                <CCardBody>
                  <MyDropzone onFilesAccepted={handleDocumentChange} />

                  <div>
                    {documentos && documentos.length > 0 && (
                      <ul>
                        {documentos.map((doc, idx) => (
                          <li key={idx}>{doc.name}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </CCardBody>
              </CCard>
            </CForm>
          </CCardBody>
          <CCardFooter>
            <div className="caja-boton" style={{ display: 'flex', gap: 8 }}>
              <CButton className="boton-descargar" onClick={handleGenerateAndDownload}>
                Generar y descargar PDF
              </CButton>
              <CButton className="boton-generar" onClick={handleSubmit}>
                Registrar
              </CButton>
            </div>
          </CCardFooter>
        </CCard>
      </div>
    </>
  )
}
export default Registro_Proyectos
