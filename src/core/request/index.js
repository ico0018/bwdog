/**
 * Request system
 */

import { storage_get_authkey } from "../storage/index";
const siteBaseUrl = "https://app.tonmeme.xyz/";

const request_baseurl = `${siteBaseUrl}api/`;
const request_router = {
  ping: request_baseurl + "ping",
  auth: request_baseurl + "auth",
  login : request_baseurl + "user/login",
  action_update : request_baseurl + "action/update",
  action_list : request_baseurl + "action/list",
  invite_count : request_baseurl + "invite/count",
  credit_list: request_baseurl + "credit/list",
};

async function requester(url, requestOptions) {
  try {
    return (await fetch(url, requestOptions)).json();
  } catch (e) {
    console.log("🐞 req error", e);
  }
  return false;
}

function request_method_get(headers) {
  const requestOptions = {
    method: "GET",
    headers: headers,
    redirect: "follow",
  };
  return requestOptions;
}

function request_method_post(bodys, headers) {
  const requestOptions = {
    method: "POST",
    headers: headers,
    body: bodys,
    redirect: "follow",
  };
  return requestOptions;
}

function auth_header() {
  const myHeaders = new Headers();
  myHeaders.append("token", storage_get_authkey());
  return myHeaders;
}

function request_get_unauth() {
    return request_method_get({});
}

function request_get_auth() {
  return request_method_get(auth_header());
}

function request_post_unauth(data) {
  const h = new Headers();
  h.append("Content-Type", "application/json");

  return request_method_post(JSON.stringify(data), h);
}

function request_post_auth(data) {
    const h = auth_header();
    h.append("Content-Type", "application/json");

    return request_method_post(
        JSON.stringify(data), h
    );
}

async function api_ping() {
  return await requester(request_router.ping, request_get_auth());
}

//Get auth token
async function api_auth(data) {
  return await requester(request_router.auth, request_post_unauth(data));
}

async function api_login(data) {
  return await requester(request_router.login, request_post_unauth(data));
}

async function api_login_data() {
  return await requester(request_router.login, request_get_auth());
}

async function api_action_update(data) {
  return await requester(request_router.action_update, request_post_auth(data));
}
async function api_action_list() {
  return await requester(request_router.action_list, request_get_auth());
}

async function api_invite_count() {
  return await requester(request_router.invite_count, request_get_auth());
}

async function api_credit_list() {
  return await requester(request_router.credit_list, request_get_auth());
}

export { api_auth, api_ping ,api_login,api_login_data,api_action_update,api_action_list,api_invite_count,api_credit_list};
