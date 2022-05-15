import { useState } from "react";
import MarketOption from "../common/mock/MarketOption.json";
import SlotItem from "../common/mock/SlotItem.json";

import coin_48px from "../assets/image/coin_48px.png";
import refresh_32px from "../assets/image/refresh_32px.png";
import arrow_down_16px_abab from "../assets/image/arrow_down_16px_abab.png";
import arrow_up_16px_ababab from "../assets/image/arrow_up_16px_ababab.png";
import slot from "../assets/image/slot.png";

import "../common/css/box.css";
import "../common/css/market.css";
const Card = ({slotInfo:{slotID, tID, img, color, price, wemixPrice, info}}) => {
    console.log(slotID, tID, img, color, price, wemixPrice, info);
    return (
        <section style={{
            width: "24%",
            height: "300px",
            textAlign: "center",
            border: "1px solid #c0c0c0",
            borderRadius: "5px",
            display: "inline-block",
            marginBottom: "5px"
        }}>
            <header>
                <h3 style={{
                    color
                }}>
                    {slotID}
                </h3>
            </header>
            <article>
                <p>
                    TID {tID}
                </p>
                <div>
                    <img src={img? img: slot} alt="slot" width="120px" height="150px"/>
                </div>
                <div>
                    {wemixPrice} ${price}
                </div>
            </article>
        </section>
    );
}

const OptionBox = ({title, count, options}) => {
    const [optionShowFlag, setOptionShowFlag] = useState(false);
    let src = arrow_down_16px_abab;
    let alt = "arrow_down_16px_abab";
    if (optionShowFlag) {
        src = arrow_up_16px_ababab;
        alt = "arrow_up_16px_ababab";
    }
    return (
        <section>   
            <div    
                onClick={() =>{
                    setOptionShowFlag(!optionShowFlag);
                }}  
                style={{
                    overflow: "hidden"
                }}
            >
                <div className="left option-box-title">
                    {title}
                </div>
                <div className="right">
                    <img src={src} alt={alt}/>
                </div>  
                <div className="right option-box-count">
                    {count}
                </div>
            </div>
            <div>
                {optionShowFlag && options?.map(({title, count, checked}) => {
                    return (
                        <div key={title} style={{
                            margin: "5px 0px"
                        }}>
                            <input type="checkbox" name={title} defaultChecked={checked}/>
                            <label htmlFor={title}>{title}</label>
                            <div className="right">
                                {count}
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};
const Market = () => {
    return (
        <article>
            <section 
                style={{overflow: "hidden"}}
            >
                <article className="left">
                    <select style={{
                        marginRight: "10px"
                    }} defaultValue="slot">
                        <option value="slot">
                            슬롯
                        </option>
                        <option value="avatara">
                            아바타
                        </option>
                    </select>
                    <select defaultValue="lowest">
                        <option value="lowest">
                            최저가
                        </option>
                        <option value="highest">
                            최고가
                        </option>
                        <option>
                            최근등록
                        </option>
                    </select>
                </article>
                <article className="right">
                    <section className="wemix-log-box">
                        <div className="button">
                            <img src={coin_48px} alt="coin" width="28px" height="28px"/>
                            <span>
                                WIMX LOGIN
                            </span>
                        </div>
                        <h3>
                            Log in with WEMIX WALLET
                        </h3>
                    </section>
                </article>
            </section>
            <section
                style={{overflow: "hidden"}}
            >
                <article className="tab">
                    <button className="tab-button">
                        판매 중 목록
                    </button>
                    <button className="tab-button">
                        최근 판매 목록
                    </button>
                    <img src={refresh_32px} alt="refresh"/>
                </article>
                <article className="left option-box" style={{
                    width: "15%"
                }}>
                    {
                        MarketOption?.map(({title, count, options}) => {
                            return <OptionBox key={title} title={title} count={count} options={options}/>
                        })
                    }
                </article>
                <div className="left" style={{
                    width: "1%",
                    height: "100%"
                }}></div>
                <article className="right" style={{
                    width: "84%",
                    display: "flex",
                    justifyContent: "space-between",
                    flexWrap: "wrap"
                }}>
                    {
                        SlotItem?.map((slotInfo) => <Card key={slotInfo.tID} slotInfo={slotInfo} />)
                    }
                </article>
            </section>
        </article>
    );
};
export default Market;