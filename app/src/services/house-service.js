houseService.$inject = ['$http', 'apiUrl'];

export default function houseService($http, apiUrl) {
    return {
        getAll() {
            return $http.get(`${apiUrl}/houses`)
            .then(res => res.data);
        },
        get(id) {
            if(!id) return this.getAll();
            return $http.get(`${apiUrl}/houses/${id}`)
            .then(res => res.data);
        },
        add(house) {
            return $http.post(`${apiUrl}/houses`, house)
            .then(res => res.data);
        },
        join(credentials) {
            return $http.post(`${apiUrl}/houses/house`, credentials)
            .then(res => res.data);
        },
        update(id, data) {
            return $http.put(`${apiUrl}/houses/${id}`, data)
            .then(res => res.data);
        },
        remove(id) {
            return $http.delete(`${apiUrl}/houses/${id}`)
            .then(res => res.data);
        },

    };
}
