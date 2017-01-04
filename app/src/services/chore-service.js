choreService.$inject = ['$http', 'apiUrl'];

export default function choreService($http, apiUrl) {
    return {
        add(chore) {
            return $http.post(`${apiUrl}/chores`, chore)
      .then(res => res.data);
        }
    };
}