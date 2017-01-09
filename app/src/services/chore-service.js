choreService.$inject = ['$http', 'apiUrl'];

export default function choreService($http, apiUrl) {
    return {
        updateMany(data) {
            return $http.put(`${apiUrl}/chores/many`, data)
                .then(res => res.data);
        },
        getHouseChores(data) {
            return $http.post(`${apiUrl}/chores/house`, data)
            .then(res => res.data);
        },
        add(chore) {
            return $http.post(`${apiUrl}/chores`, chore)
                .then(res => res.data);
        }
    };

}