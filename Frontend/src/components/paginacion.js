import React, { useState } from 'react';
import { CPagination, CPaginationItem } from '@coreui/react';
import '../scss/paginacion.scss'

const Paginacion = () => {
const [paginaactual, setpaginaactual] = useState(1);
const totalpaginas = 10;

return (
    <CPagination align="center">
    <CPaginationItem 
        disabled={paginaactual === 1} 
        onClick={() => setpaginaactual(paginaactual - 1)}
    >
        Anterior
    </CPaginationItem>

    {[...Array(totalpaginas)].map((_, index) => (
        <CPaginationItem
        className='select'
        key={index}
        active={index + 1 === paginaactual}
        onClick={() => setpaginaactual(index + 1)}

        >
        {index + 1}
        </CPaginationItem>
    ))}

    <CPaginationItem 
        disabled={paginaactual === totalpaginas} 
        onClick={() => setpaginaactual(paginaactual + 1)}
    >
        Siguiente
    </CPaginationItem>
    </CPagination>
);
};

export default Paginacion;
