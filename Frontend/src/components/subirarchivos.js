import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { CCard, CCardBody, CCardHeader, CFormLabel } from '@coreui/react';

const MyDropzone = ({ onFilesAccepted }) => {
  const onDrop = useCallback((acceptedFiles) => {
    // Llama a la función del padre para actualizar el estado de documentos
    onFilesAccepted(acceptedFiles);
  }, [onFilesAccepted]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true, // Para permitir cargar múltiples archivos
  });


  return (
    <CCard className="my-3">
      <CCardBody {...getRootProps()} style={{
          textAlign: 'center',
          padding: '20px',
          borderRadius: '8px',
          backgroundColor: isDragActive ? '#e9f5ff' : '#fafafa',
          cursor: 'pointer'
        }}>
        <input {...getInputProps()} multiple />
        <p>Suelta los archivos aquí...</p> 
      </CCardBody>
    </CCard>
  );
};

export default MyDropzone;
