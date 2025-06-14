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
} from '@coreui/react'
import '../scss/registro-u.scss'
import axios from 'axios'
import MyDropzone from './subirarchivos'

const Registro_Proyectos = () => {
  const [documentos, setDocumentos] = useState([]) // Array para almacenar archivos seleccionados
  const [categorias, setCategorias] = useState([])
  const [TipoArchivos, setTipoArchivos] = useState([])

  const [formData, setFormData] = useState({
    Proy_Titul: '',
    Proy_Descr: '',
    Proy_Resum: '',
    Proy_FecRe: '',
    proy_statu: '',
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

  const cargarTarchivos = async () => {
    try {
      const result = await axios.get('http://localhost:4000/tipoArchivos')
      setTipoArchivos(result.data)
    } catch (error) {
      console.error('Error al obtener los tipos', error)
    }
  }
  //--------------------------------------------------------------------------------------------------------------

  const handleSubmit = async (e) => {
    e.preventDefault()
    //------------------------------------------------------------------proy
    const formDataToSend = new FormData()
    formDataToSend.append('Proy_Titul', formData.Proy_Titul)
    formDataToSend.append('Proy_Descr', formData.Proy_Descr)
    formDataToSend.append('Proy_Resum', formData.Proy_Resum)
    formDataToSend.append('Proy_FecRe', formData.Proy_FecRe)
    formDataToSend.append('proy_statu', formData.proy_statu)
    formDataToSend.append('Proy_CatId', formData.Proy_CatId)

    try {
      const postProyect = await axios.post('http://localhost:4000/proyectos', formDataToSend)
      const proyectoId = postProyect.data.id

      // 2. Registrar documentos asociados al proyecto------------------------------------------

      for (const doc of documentos) {
        const docForm = new FormData()
        docForm.append('Doc_NomArc', formData_doc.Doc_NomArc || doc.name)
        docForm.append('Doc_RutaAr', doc) // El archivo
        docForm.append('Doc_TiArId', formData_doc.Doc_TiArId)
        docForm.append('Doc_ProyId', String(proyectoId)) // Asocia el documento al proyecto

        await axios.post('http://localhost:4000/documentos', docForm, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
      }
    } catch (err) {
      console.error('Error al registrar proyecto o documentos:', err)
    }
  }

  //------------------------------------------------------------------------------------------------

  return (
    <>
      <div className="proyecto-caja">
        <CCard className="mb-4">
          <CCardHeader>REGISTRO DE PROYECTO</CCardHeader>
          <CCardBody>
            <CForm>
              <CInputGroup className="mb-3">
                <div className="d-flex  w-100 gap-3">
                  <div className="w-50">
                    <CFormLabel>Usuario</CFormLabel>
                    <CInputGroup>
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput type="Text" readOnly></CFormInput>
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
                    <CFormLabel>Estado</CFormLabel>
                    <CInputGroup>
                      <CInputGroupText>
                        <CIcon icon={cilOptions} />
                      </CInputGroupText>
                      <CFormSelect
                        name="proy_statu"
                        onChange={handleInputChange}
                        className="input-tamaño"
                      >
                        <option>Estado</option>
                        <option>aprobado</option>
                        <option>pendiente</option>
                        <option>rechazado</option>
                      </CFormSelect>
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
                  <CInputGroup className="mb-3">
                    <div className="d-flex  w-100 gap-3">
                      <div className="w-50">
                        <CFormLabel>Nombre del archivo</CFormLabel>
                        <CInputGroup>
                          <CInputGroupText>
                            <CIcon icon={cilPencil} />
                          </CInputGroupText>
                          <CFormInput
                            className="input-tamaño"
                            type="text"
                            placeholder="Nombre del archivo"
                            name="Doc_NomArc"
                            onChange={handleDocInputChange}
                          ></CFormInput>
                        </CInputGroup>
                      </div>
                      <div className="w-50">
                        <CFormLabel>Tipo de archivo</CFormLabel>
                        <CInputGroup>
                          <CInputGroupText>
                            <CIcon icon={cilOptions} />
                          </CInputGroupText>
                          <CFormSelect
                            className="input-tamaño"
                            onFocus={cargarTarchivos}
                            name="Doc_TiArId"
                            value={formData_doc.Doc_TiArId}
                            onChange={handleDocInputChange}
                          >
                            <option value="">Tipo de archivo</option>
                            {TipoArchivos.map((archivo) => (
                              <option key={archivo.TipA_Id} value={archivo.TipA_Id}>
                                {archivo.TipA_Nombr}
                              </option>
                            ))}
                          </CFormSelect>
                        </CInputGroup>
                      </div>
                    </div>
                  </CInputGroup>

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
            <div className="caja-boton">
              <CButton className="boton-registro" onClick={handleSubmit}>
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
