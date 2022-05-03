import { useLocation } from "react-router";
import { useState } from "react";
import axios from "axios";
import Table from "../common/Table";

const Search = () => {
    const [userNumber, setUserNumber] = useState("");
    const [showFlag, setShowFlag] = useState(false);
    const {state:{requestUrl}} = useLocation();
    const [table, setTable] = useState(null);
    const userNumberChange = (e) => {
        const input = e.target.value;
        if (/[^0-9]/g.test(input)) {
            return;
        }
        setUserNumber(input);
        setShowFlag(input.length > 0);
    };
    const resetUserNumber = () => {
        setUserNumber("");
        setShowFlag(false);
    };
    const search = async () => {
        if(!userNumber || userNumber.length === 0) {
            alert("유저번호를 입력해 주세요.");
            return;
        }
        const {data} = await axios.get(`http://localhost:3000${requestUrl}/${userNumber}`);
        setTable(<Table data={data.myState}/>);
    };
    return (
        <section>
           <article style={
               {
                    height: "2rem"
               }
           }>
               {/* <select style={
                   {
                        height: "100%",
                        padding: "0px",
                        outline: "none", 
                        verticalAlign: "middle",
                        boxSizing: "content-box",
                        marginRight: "10px",
                        textAlign: "center"
                   }
               }>
                   <option value="all">
                       전 체
                   </option>
                   <option value="asset">
                       자 산
                   </option>
                   <option value="asset">
                       슬 롯
                   </option>
               </select> */}
               <div style={{
                   height: "100%",
                   display: "inline-block",
                   outline: "green solid 1px",
                   width: "18rem",
                   textAlign: "start"
                }}>
                    <input type="text" placeholder="유저번호 입력" style={
                        {
                            height: "100%",
                            margin: "0px",
                            padding: "0px 5px",
                            border: "0",
                            outline: "none",
                            verticalAlign: "middle",
                            fontSize: "18px",
                            width: "88%",
                        }
                    } maxLength="30" minLength="10" onChange={userNumberChange} value={userNumber}/>
                    { showFlag && <button style={
                        {
                            backgroundColor: "#e7e7e7",
                            outline: "none",
                            border: "1px solid #e7e7e7",
                            borderRadius: "48%",
                            fontWeight: "bold",
                            cursor: "pointer",
                            visibility: showFlag ? "show" : "hidden"
                        }
                    } onClick={resetUserNumber}>
                        X
                    </button>
                    }
               </div>
               <button style={
                   {
                    all: "unset",
                    height: "100%",
                    width: "3rem",
                    outline: "green solid 1px",
                    textAlign: "center",
                    verticalAlign: "middle",
                    color: "white",
                    backgroundColor: "green",
                    cursor: "pointer"
                   }
               } onClick={search}>
                    검색
                </button>
            </article>
            <section>
                {table}
            </section>
        </section>
    );
};

export default Search;