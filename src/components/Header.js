import PropTypes from 'prop-types'
import Button from './Button'
import { useLocation } from 'react-router-dom'


const Header = ({title, onShowForm, formStatus}) => {
    const location = useLocation()


    return (
        <header className='header'>
            <h1>{title}</h1>
            {location.pathname === '/' && <Button color={formStatus ? 'green': 'red'} text={formStatus ? 'Done': 'Add'} 
           onClick={onShowForm}/>}
        </header>
    )
}

Header.defaultProps = {
    title: 'Task Tracker',
    formStatus: false,
}


Header.propTypes = {
    title: PropTypes.string.isRequired,
    formStatus: PropTypes.bool.isRequired,
}

export default Header
