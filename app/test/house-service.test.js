describe('house service test', () => {
    const { assert } = chai;

    beforeEach(
      angular.mock.module('services', { apiUrl: '/api' })
    );

    let $httpBackend = null;
    let houseService = null;

    beforeEach(angular.mock.inject((_houseService_, _$httpBackend_) => {
        houseService = _houseService_;
        $httpBackend = _$httpBackend_;
    }));

    afterEach(() => {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('gets houses', done => {
        const houses = [1, 2, 3];
        $httpBackend
          .expectGET('/api/houses')
          .respond(houses);

        houseService
                .get()
                .then(allHouses => {
                    assert.deepEqual(allHouses, houses);
                    done();
                })
            .catch(done);

        $httpBackend.flush();
    });


});