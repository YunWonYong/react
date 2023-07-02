import axios from "axios";
import { SocialLoginAdapterInterface } from "../../type";
import { AnyObjectType } from "../../../type";

class NaverLogin implements SocialLoginAdapterInterface {
    private body: AnyObjectType = {};

    constructor() {}

            
    // const params = hash.split("&");
    // const body: AnyObjectType = {};
    
    // console.log(body);
    public _init(): SocialLoginAdapterInterface {
        return this;
    }

    public _login(body: AnyObjectType): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                const queryParameter = body.query;
                if (queryParameter === undefined || queryParameter.length === 0) {
                    throw new Error(`Naver Login Instance input body.query not found ${body}`);
                }
                
                const params = queryParameter.split("&");
                
                if (params === undefined || params.length === 0) {
                    throw new Error(`Naver Login Instance queryParameter split fail!!! ${params}`);
                }
                
                params.forEach((param: string) => {
                    const tokens = param.split("=", -1);
                    const key = (tokens[0] || "").replace(/[^a-zA-Z_]/g, "");
                    this.body[key] = tokens[1];
                });

                if (this.body["expires_in"] && /[0-9]{1,}/.test(this.body["expires_in"])) {
                    this.body["expires_in"] = parseInt(this.body["expires_in"]);
                }
                resolve(this.body);
            } catch(e) {
                reject(e);
            }
        });
    }

    public _logout(): Promise<any> {
        return new Promise((resolve, reject) => {
            resolve("facebook logout hello")
        });
    }
}

export {
    NaverLogin
};