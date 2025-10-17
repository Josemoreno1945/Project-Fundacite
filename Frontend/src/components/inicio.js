import React from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCarousel,
  CCarouselItem,
  CImage,
  CRow,
  CCol,
} from '@coreui/react'

import '../scss/carrusel.scss'
import img1 from '../assets/images/img1.jpeg'
import img2 from '../assets/images/FUNDACITE_LOGO.png'

const imagenes = [img1, img2]

const Inicio = () => {
  return (
    <div>
      <CCard className="mb-4">
        <CCardHeader>
          <h2>¿Qué es Fundacite?</h2>
        </CCardHeader>
        <CCardBody>
          <p>
            Fundacite Táchira es una institución dedicada al desarrollo científico y tecnológico en
            el estado Táchira, conectando con el mundo científico y las comunidades de la región.
          </p>
        </CCardBody>
      </CCard>

      {/* Mision y vision */}
      <CRow className="mb-4">
        <CCol md={6}>
          <CCard>
            <CCardHeader>Mision</CCardHeader>
            <CCardBody>
              <p>
                Facilitar el acceso y la preservación de proyectos científicos y tecnológicos en
                Fundacite Táchira, proporcionando una plataforma segura, organizada y accesible que
                fomente la colaboración, el aprendizaje y la innovación dentro de la comunidad.
              </p>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol md={6}>
          <CCard>
            <CCardHeader>Vision</CCardHeader>
            <CCardBody>
              <p>
                Ser la plataforma digital de referencia en Fundacite Táchira para la gestión y
                preservación de proyectos científicos y tecnológicos, promoviendo el acceso abierto
                al conocimiento y el desarrollo de soluciones innovadoras que impulsen el progreso
                de la comunidad.
              </p>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {/* Carrusel de imágenes */}
      <CCard>
        <CCardHeader>Galería</CCardHeader>
        <CCardBody>
          <CCarousel controls indicators>
            {imagenes.map((img, idx) => (
              <CCarouselItem key={idx}>
                <CImage
                  className="d-block w-100 carrusel-img"
                  src={img}
                  alt={`Imagen ${idx + 1}`}
                />
              </CCarouselItem>
            ))}
          </CCarousel>
        </CCardBody>
      </CCard>
    </div>
  )
}

export default Inicio
