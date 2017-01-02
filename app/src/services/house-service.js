houseService.$inject = ['$resource', 'apiUrl'];

export default function houseService($resource, apiUrl) {
    return $resource(`${apiUrl}/houses/:id`, { id: '@_id' });
}