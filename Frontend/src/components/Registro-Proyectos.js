import {React,  useState } from 'react'
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
import axios from 'axios';
import MyDropzone from './subirarchivos'; 

const Registro_Proyectos =()=>{


const [documentos, setDocumentos] = useState([]); // Array para almacenar archivos seleccionados
const [categorias, setCategorias] = useState([]);


const [formData, setFormData] = useState({
    Proy_Titul: '',
    Proy_Descr: '',
	Proy_Resum:'',
	Proy_FecRe:'',
	proy_statu:'',
	Proy_CatId:'',
});





const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
        ...prevState,
        [name]: value
    }));
};


//-----------------------------------------------------------------------------------------------------


const cargarCategorias = async () => {
    try {
        const result = await axios.get('http://localhost:4000/categorias'); 
        setCategorias(result.data); 
    } catch (error) {
        console.error('Error al obtener las categorías', error);
    }
};
//--------------------------------------------------------------------------------------------------------------







const handleSubmit =async (e) => {
	e.preventDefault();


	const formDataToSend = new FormData();
	formDataToSend.append('Proy_Titul',formData.Proy_Titul);
	formDataToSend.append('Proy_Descr',formData.Proy_Descr);
	formDataToSend.append('Proy_Resum',formData.Proy_Resum);
	formDataToSend.append('Proy_FecRe',formData.Proy_FecRe);
	formDataToSend.append('proy_statu',formData.proy_statu);
	formDataToSend.append('Proy_CatId',formData.Proy_CatId);


	try{
		console.log("🚀 Datos que se envían a /proyectos:", [...formDataToSend.entries()]);
		const postProyect=await axios.post("http://localhost:4000/proyectos", formDataToSend)
		
	}catch (err) {
    	console.error('Error al registrar proyecto o documentos:', err)
	};
}



	return(
		
		<>
		<CCard className='mb-4'>
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
												name="Proy_Titul" 
												onChange={handleInputChange}
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
											<CFormTextarea 
											name="Proy_Descr" 
											onChange={handleInputChange}
											placeholder='Descripcion' 
											id="descripcion" rows={3}></CFormTextarea>
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
											placeholder='Resumen' 
											id="descripcion" 
											rows={3}></CFormTextarea>
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
												name="Proy_FecRe" 
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
											<CFormSelect  name="proy_statu" 
														onChange={handleInputChange}>
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
							<div className='d-flex  w-100 gap-3'>
								<div className="w-50">
										<CFormLabel>Categorias</CFormLabel>
										<CInputGroup>
											<CInputGroupText>
											<CIcon icon={cilOptions} />
											</CInputGroupText>
											<CFormSelect onFocus={cargarCategorias} onChange={handleInputChange} name='Proy_CatId'
											value={formData.Proy_CatId}> 
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
					 {/*}
						<MyDropzone onFilesAccepted={handleDocumentChange} />
						{*/}




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
						<CButton className='boton-registro' onClick={handleSubmit}>Registrar</CButton>
						</div>
				</CCardFooter>
		</CCard>
		</>
	)
}
export default Registro_Proyectos