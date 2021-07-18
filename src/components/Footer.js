import {Link} from 'react-router-dom'
import { useLocation } from 'react-router-dom'
const Footer = () => {
    const location = useLocation()

    return (
            <>
            {location.pathname === '/' && 
            <footer>
            <p>Testing React</p>
            <Link to='/about'>About</Link>
            </footer>
           }
            </>
    )
}

export default Footer
