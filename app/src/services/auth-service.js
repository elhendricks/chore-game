authService.$inject = ['tokenService', '$http', 'apiUrl'];

export default function authService(token, $http, apiUrl) {
    const current = token.get();
    if(current) {
        $http
      .post(`${apiUrl}/auth/verify`)
      .catch(() => token.remove());
    } 

    function credential(endpoint) {
        return (credentials) => {
            return $http.post(`${apiUrl}/auth/${endpoint}`, credentials)
            .then(result => {
                token.set(result.data.token);
            })
            .catch(error => {
                throw error.data;
            });
        };
    }

    return {
        isAuthenticated() {
            return !!token.get();
        },

        logout() {
            token.remove();
        },

        signin: credential('signin'),
        signup: credential('signup')
    };
}