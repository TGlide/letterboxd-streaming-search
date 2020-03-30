import Vue from "vue";
import Vuex from "vuex";

import axios from "axios";
import qs from "qs";
import { v4 as uuidv4 } from "uuid";
import sha256 from "crypto-js/sha256";
import hmacSHA512 from "crypto-js/hmac-sha512";
import Base64 from "crypto-js/enc-base64";

Vue.use(Vuex);

function addUniqueParams(params, state) {
  params.apikey = state.letterboxdAPIKey;
  params.nonce = uuidv4();
  params.timestamp = new Date().getTime();

  return params;
}

function getUrlWithParams(url, params) {
  url += "?";
  for (let [k, v] of Object.entries(params)) {
    if (k && v) url += `${k}=${v}&`;
  }
  return url.substring(0, url.length - 1);
}

function generateSignature(method, url, body) {}

function prepareRequest(url, params, body, headers, method, state) {
  params = addUniqueParams(params, state);

  const signature = generateSignature(
    method,
    getUrlWithParams(url, params),
    body
  );
  console.log(signature);
}

export default new Vuex.Store({
  state: {
    letterboxdAPIKey: ""
  },
  mutations: {
    refreshLetterboxdAPIKey(state, newAPIKey) {
      state.letterboxdAPIKey = newAPIKey;
    }
  },
  actions: {
    refreshLetterboxdAPIKey({ state }) {
      const headers = {
        "content-Type": "application/x-www-form-urlencoded",
        accept: "application/json"
      };
      const requestURL = `${process.env.VUE_APP_LETTERBOXD_API_URL}/auth/token`;
      prepareRequest(requestURL, {}, {}, {}, "post", state);
      if (state.letterboxdAPIKey) {
        const body = qs.stringify({
          grant_type: "refresh_token",
          refresh_token: state.letterboxdAPIKey
        });
        return axios.post(requestURL, body, { headers: headers }).then(res => {
          console.log(res);
        });
      }

      const body = qs.stringify({
        grant_type: "password",
        username: process.env.VUE_APP_LETTERBOXD_API_USERNAME,
        password: process.env.VUE_APP_LETTERBOXD_API_PASSWORD
      });
      console.log(body);

      axios
        .post(`${requestURL}?signature={}`, body, { headers: headers })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log("Error fetching API token:", err);
        });
    }
  },
  modules: {}
});
