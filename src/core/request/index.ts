/**
 * Request system
 */

import { storage_set_authkey,storage_get_authkey } from "../storage/index"
const siteBaseUrl = "http://127.0.0.1"

const request_baseurl = `${siteBaseUrl}api/`
const request_router = {
    ping: request_baseurl + "ping",
    auth: request_baseurl + "auth",
}

async function requester(url:string, requestOptions:any) {
    try {
        return (await fetch(url, requestOptions)).json()
    } catch (e) {
        console.log("🐞 req error", e)
    }
    return false;
}

function request_method_get(headers:any) {
    var requestOptions = {
        method: "GET",
        headers: headers,
        redirect: 'follow'
    };
    return requestOptions
}

function request_method_post(bodys:any, headers:any) {
    var requestOptions = {
        method: "POST",
        headers: headers,
        body: bodys,
        redirect: 'follow'
    };
    return requestOptions
}

function auth_header() {
    var myHeaders = new Headers();
    myHeaders.append("token", storage_get_authkey());
    return myHeaders;
}

function request_get_unauth() {
    return request_method_get({});
}

function request_get_auth() {
    return request_method_get(auth_header());
}

function request_post_unauth(data:any) {
    var h = new Headers();
    h.append("Content-Type", "application/json");

    return request_method_post(
        JSON.stringify(data), h
    );
}

function request_post_auth(data:any) {
    var h = auth_header();
    h.append("Content-Type", "application/json");

    return request_method_post(
        JSON.stringify(data), h
    );
}


async function api_ping() {
    return await requester(request_router.ping, request_get_auth())
}


//Get auth token
async function api_auth(data:any) {
    return await requester(
        request_router.auth,
        request_post_unauth(data)
    )
}


export {
    api_auth,
    api_ping,
}
