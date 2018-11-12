window.futch = (function () {
    return {
        get: (url, options) => {
            options = options || {};
            options.method = 'GET';
            return makeRequest(url, options);
        },

        save: (url, options) => {
            options = options || {};
            options.id = options.body[options.idAttribute || 'id'];
            options.method = options.id ? 'PUT' : 'POST';
            return makeRequest(url, options);
        },

        delete: (url, options) => {
            options = options || {};
            options.method = 'DELETE';
            if (!options.id) return Promise.reject('options.id is missing.');
            return makeRequest(url, options);
        }
    };

    function makeRequest(url, options) {
        if (options.id) url += `/${options.id}`;
        url = new URL(url);
        if (options.params) Object.keys(options.params).forEach(key => url.searchParams.append(key, options.params[key]));
        if (options.body) options.body = JSON.stringify(options.body);
        options.headers = {'Content-type': 'application/json; charset=UTF-8'};

        return fetch(url.toString(), options).then(res => {
            if (res.ok) {
                return res.json();
            }
            else {
                throw new Error('Network response was not ok.');
            }
        })
    }

})();
