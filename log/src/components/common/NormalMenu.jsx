import { Link } from "react-router-dom";

const NormalMenu = ({menuList, styleModule}) => {
    if(!menuList || menuList.length < 1) {
        return null;
    }
    return (    
        <ul className={styleModule.menu}>
            { menuList.map(({url, name, state}) => {
                return (
                    <li className={styleModule.item} key={url}>
                        <Link className={styleModule.link} to={url} state={state ? state: null}>
                            { name }
                        </Link>
                    </li>
                ) 
            })}
        </ul>
    );
};

export default NormalMenu;