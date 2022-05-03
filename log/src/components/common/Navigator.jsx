import NavigatorStyle from "../css/NavigatorStyle.module.css";
import NormalMenu from "./NormalMenu";

const Navigator = ({classNm, menuList, menuType}) => {
    let component = null;
    switch(menuType) {
        case "normal": 
        component = <NormalMenu menuList={menuList} styleModule={NavigatorStyle}/>;
        break;
        default:
        break;
    } 

    return (
        <nav className={NavigatorStyle[classNm]}>
            {component}
        </nav>
    );
};
export default Navigator;