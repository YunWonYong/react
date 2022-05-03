import Navigator from "../common/Navigator";
import { Outlet } from "react-router-dom";
const menuList = [
    {
        url:"/",
        name: "Home"
    },
    {
        url: "/user/search",
        name: "유저 조회",
        state: {
            requestUrl: "/plcasino/admin/user" 
        }
    }
];

const Header = () => {
    return (
        <>
            <header style={{
                overflow: "hidden",
                padding: "2em",
                backgroundColor: "#f8f8f8",
                border: "1px solid #e7e7e7",
                borderRadius: "4px",
                margin: "10px 0px"
            }}>
                <Navigator classNm={"left"} menuList={menuList} menuType={"normal"}/>
            </header>
            <Outlet/>
        </>
    )
};
export default Header;