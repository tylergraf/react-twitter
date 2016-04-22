const API_URL = '/api/twitter';
var TIMEOUT = 10000;

var _pendingRequests = {};

export default class API {
  constructor(){

  }
  makeUrl() => {
    return API_URL + part;
  }
  get() => {
    return request
        .get(url)
        .timeout(TIMEOUT);
  }
  abortPendingRequests(key) => {
      if (_pendingRequests[key]) {
          _pendingRequests[key]._callback = function(){};
          _pendingRequests[key].abort();
          _pendingRequests[key] = null;
      }
  }
};

function dispatch(key, response, params) {
    var payload = {actionType: key, response: response};
    if (params) {
        payload.queryParams = params;
    }
    AppDispatcher.handleRequestAction(payload);
}

// return successful response, else return request Constants
function makeDigestFun(key, params) {
    return function (err, res) {
        if (err && err.timeout === TIMEOUT) {
            dispatch(key, Constants.request.TIMEOUT, params);
        } else if (res.status === 400) {
            UserActions.logout();
        } else if (!res.ok) {
            dispatch(key, Constants.request.ERROR, params);
        } else {
            dispatch(key, res, params);
        }
    };
}

// a get request with an authtoken param
function get(url) {
    return request
        .get(url)
        .timeout(TIMEOUT);
}

var Api = {
    getEntityData: function(entityId) {
        var url = makeUrl("/entities/" + entityId);
        var key = Constants.api.GET_ENTITY_DATA;
        var params = {entityId: entityId};
        abortPendingRequests(key);
        dispatch(key, Constants.request.PENDING, params);
        _pendingRequests[key] = get(url).end(
            makeDigestFun(key, params)
        );
    }
};
