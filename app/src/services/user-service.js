userService.$inject = ['$resource', 'apiUrl'];

export default function userService($resource, apiUrl) {
    return $resource(`${apiUrl}/users/`);
}