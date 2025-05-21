import React, { useState } from 'react'
import CIcon from '@coreui/icons-react'
import { 
cilLockLocked, 
cilPencil, 
cilUser ,
cilEnvelopeClosed ,
cilGroup,cilCalendar,
cilLockUnlocked,
cilCommentSquare,
cilBookmark,
cilOptions
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
CFormTextarea
} from '@coreui/react'
import '../scss/registro-u.scss'
import MyDropzone from './subirarchivos'; 

const Registro_Proyectos =()=>{

const [projectTitle, setProjectTitle] = useState('');
const [documentos, setDocumentos] = useState([]); // Array para almacenar archivos seleccionados

const handleDocumentChange = (acceptedFiles) => {
// Esto acumula los archivos, en lugar de reemplazarlos
setDocumentos((prevDocs) => [...prevDocs, ...acceptedFiles]);
};

const handleSubmit = (e) => {
	e.preventDefault();
	// Aquí construirás el objeto a enviar al backend, 
	// usando FormData si vas a enviar archivos
	const formData = new FormData();
	formData.append('projectTitle', projectTitle);
	documentos.forEach((file) => {
		formData.append('documentos', file);
	});
	console.log('Datos a enviar:', formData);
	// Aquí envías el formulario con fetch o axios
	// Ejemplo:
	// axios.post('/api/projects', formData)
	//   .then(response => console.log(response.data))
	//   .catch(error => console.error(error));
};
















	return(
		
		<>
		<CCard>
			<CCardHeader>REGISTRO DE PROYECTO</CCardHeader>
			<CCardBody>
				<CForm>
						<CInputGroup className="mb-3">

						<div className='d-flex  w-100 gap-3'>
								<div className="w-50">
										<CFormLabel>Usuario</CFormLabel>
										<CInputGroup>
											<CInputGroupText>
											<CIcon icon={cilUser} />
											</CInputGroupText>
											<CFormInput 
												type='Text'
												
												readOnly
											></CFormInput>
										</CInputGroup>
										
								</div>
							</div>

							<div className='d-flex  w-100 gap-3'>
								<div className="w-50">
										<CFormLabel>Titulo del proyecto</CFormLabel>
										<CInputGroup>
											<CInputGroupText>
											<CIcon icon={cilBookmark} />
											</CInputGroupText>
											<CFormInput 
												type='Text'
												placeholder='Titulo'
											></CFormInput>
										</CInputGroup>
										
								</div>
							</div>
							
						</CInputGroup>

						<CInputGroup className="mb-3">
							<div className='d-flex  w-100 gap-3'>
								<div className="w-50">
										<CFormLabel>Descripcion</CFormLabel>
										<CInputGroup>
											<CInputGroupText>
											<CIcon icon={cilCommentSquare} />
											</CInputGroupText>
											<CFormTextarea placeholder='Descripcion' id="descripcion" rows={3}></CFormTextarea>
										</CInputGroup>
										
								</div>
								<div className="w-50">
										<CFormLabel>Resumen</CFormLabel>
										<CInputGroup>
											<CInputGroupText>
												<CIcon icon={cilCommentSquare} />
											</CInputGroupText>
											<CFormTextarea placeholder='Resumen' id="descripcion" rows={3}></CFormTextarea>
										</CInputGroup>
										
								</div>
							</div>
							
						</CInputGroup>

						<CInputGroup className="mb-3">
							<div className='d-flex  w-100 gap-3'>
								<div className="w-50">
										<CFormLabel>Fecha de registro</CFormLabel>
										<CInputGroup>
											<CInputGroupText>
											<CIcon icon={cilCalendar} />
											</CInputGroupText>
											<CFormInput 
												type='date'
												placeholder='Fecha'
											></CFormInput>
										</CInputGroup>
										
								</div>
								<div className="w-50">
										<CFormLabel>Estado</CFormLabel>
										<CInputGroup>
											<CInputGroupText>
												<CIcon icon={cilOptions} />
											</CInputGroupText>
											<CFormSelect>
												<option>Estado</option>
												<option>x</option>
												<option>x</option>
											</CFormSelect>
										</CInputGroup>
										
								</div>
							</div>
							
						</CInputGroup>

						<CInputGroup className="mb-3">
							<div className='d-flex  w-100 gap-3'>
								<div className="w-50">
										<CFormLabel>Categorias</CFormLabel>
										<CInputGroup>
											<CInputGroupText>
											<CIcon icon={cilOptions} />
											</CInputGroupText>
											<CFormSelect>
												<option>Categoria</option>
												<option>x</option>
												<option>x</option>
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
						<div className='caja-boton'>
						<CButton className='boton-registro'>Registrar</CButton>
						</div>
				</CCardFooter>
		</CCard>
		</>
	)
}
export default Registro_Proyectos