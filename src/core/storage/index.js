/**
 * Storage util
 *
 * Control cookies * local storage
 */
const router_storage = {
  authkey: "",
  uid: "",
  user_data_tg: "user_data_telegram",
  raw_init_data: {
    isTelegram: false,
    initData: {},
    hasStarData: false,
    starData: "",
  },
  invite:""
};

function storage_get_authkey() {
  const key = router_storage.authkey;
  if (key) {
    return key;
  }
  return "false";
}

function storage_set_authkey(key) {
  router_storage.authkey = key;
}

function storage_get_raw_init_data() {
  const key = router_storage.raw_init_data;
  if (key) {
    return key;
  }
  return false;
}

function storage_set_raw_init_data(raw_init_data) {
  router_storage.raw_init_data = raw_init_data;
}

function storage_get_uid() {
  const key = router_storage.uid;
  if (key) {
    return key;
  }
  return false;
}

function storage_set_uid(uid) {
  router_storage.uid = uid;
}

function storage_get_user_tg_data() {
  const key = router_storage.user_data_tg;
  if (key) {
    return key;
  }
  return false;
}

function storage_set_user_tg_data(uid) {
  router_storage.user_data_tg = uid;
}

function storage_get_user_invite_code() {
  const key = router_storage.user_data_tg;
  if (key) {
    return key;
  }
  return false;
}

function storage_set_user_invite_code(code) {
  router_storage.invite = code;
}

export {
  storage_get_authkey,
  storage_set_authkey,
  storage_get_uid,
  storage_set_uid,
  storage_get_user_tg_data,
  storage_get_raw_init_data,
  storage_set_raw_init_data,
  storage_set_user_tg_data,
  storage_get_user_invite_code,
  storage_set_user_invite_code
};
