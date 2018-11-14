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
        // Some url work
        url = new URL(url);
        if (options.id) url.pathname += (url.pathname.endsWith('/') ? '' : '/') + options.id;
        if (options.params) Object.keys(options.params).forEach(key => url.searchParams.append(key, options.params[key]));

        // You're welcome
        if (options.body) options.body = JSON.stringify(options.body);

        // Set init defaults, override if provided
        options.credentials = options.credentials || 'include';
        options.headers = {'Content-type': 'application/json; charset=UTF-8'};

        // All ready, send the request
        return fetch(url.toString(), options).then(res => {
            if (res.ok) {
                return res.json();
            }
            else {
                throw new Error('Network response was not ok, i.e. non-200.');
            }
        })
    }

})();
