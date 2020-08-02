var expect = require('chai').expect;
const got = require('got');
const { describe, it } = require('mocha');

//setting global auth since token is same
const header = {token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'}

describe('Test 3 codifyIndi APIs', () => {
    it('should create new agency and client', done => {
        (async () => {
            try {
                const response = await got.post('http://localhost:3000/createAgencyAndClient', {headers: header}, {
                    json: {
                        "agencyDetails": {
                            "name": "agency2",
                            "address1": "address1",
                            "address2": "address2 optional field",
                            "state": "mh",
                            "city": "mumbai",
                            "phoneNumber": 1234567890
                        },
                        "clientDetails": {
                            "name": "client1",
                            "email": "client1@agency1.com",
                            "totalBill": 99999,
                            "phoneNumber": 9876543210
                        }
                    }
                });
                console.log('statusCode: ', response.statusCode);
                console.log('body', response.body);
                expect(response.statusCode).to.equal(201)
            } catch (e) {
                console.log('error:', e);
            }
        })();
        done()
    });

    it('should update existing client', done => {
        (async () => {
            try {
                const response = await got.put('http://localhost:3000/updateClient', {headers: header}, {
                    json: {
                        "name": "client1",
                        "email": "client11123@agency1.com",
                        "totalBill": 20000023,
                        "phoneNumber": 9876543210
                    }
                })
                console.log('statusCode: ', response.statusCode);
                console.log('body', response.body);
                expect(response.statusCode).to.equal(200)
            } catch (e) {
                console.error('error:', e);
            }
        })();
        done()
    })

    it('should get client with highest totalBill', done => {
        (async () => {
            try {
                const response = await got('http://localhost:3000/getMaxBill', {headers: header});
                console.log('statusCode: ', response.statusCode);
                console.log('body', response.body);
                expect(response.statusCode).to.equal(200)
            } catch (e) {
                console.error('error: ', e);
            }
        })();
        done()
    })
})