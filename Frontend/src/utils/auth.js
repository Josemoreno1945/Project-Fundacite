import { jwtDecode } from 'jwt-decode'

export const getUserRole = () => {
  const token = localStorage.getItem('token')
  if (!token) {
    return null
  }
  try {
    const decodedToken = jwtDecode(token)
    return decodedToken.rol || null
  } catch (error) {
    console.error('Error al decodificar el token:', error)
    return null
  }
}
