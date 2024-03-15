import {useNavigate} from 'react-router-dom'
import "./navbar.css"

export const Navbar = (props) =>{
    const navigate = useNavigate();
    const navigateOneDimensional = () => { navigate('/') };
    const navigateMultidimensional = () => { navigate('/multicriteria') };
    return (
        <div>
            <nav className="nav">
                <ul className="flex items-center justify-center nav-ul">
                    <li className={props.activName === 'OneDimensional'&& "activ"} onClick={navigateOneDimensional}>Одномерная оптимизация</li>
                    <li className={props.activName === 'Multidimensional'&& "activ"} onClick={navigateMultidimensional}>Многомерная оптимизацияы</li>
                </ul>
                <hr/>
            </nav>
        </div>
    )
}