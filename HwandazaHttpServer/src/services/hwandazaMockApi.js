var axios = require('axios');
var MockAdapter = require('axios-mock-adapter');

// This sets the mock adapter on the default instance
var mock = new MockAdapter(axios);

// Mock any GET request to /hwandazaautomation/status
// arguments for reply are (status, data, headers)
mock.onGet('/hwandazaautomation/status').reply(200, {
    "statusId": 10,
    "statusDate": "2018-08-28 03:21:44",
    "status": {
        "modules": {
            "WaterPump": {
                "power": 1,
                "adcFloatValue": 0
            },
            "Irrigator": {
                "power": 0,
                "adcFloatValue": 0
            },
            "FishPond": {
                "power": 0,
                "adcFloatValue": 1.25
            }
        },
        "lights": {
            "M1": 0,
            "M2": 0,
            "L3": 1,
            "L4": 0,
            "L5": 0,
            "L6": 0
        }
    }
});

export const getMockStatusApi = () => {
    return axios.get('/hwandazaautomation/status');
};

export default getMockStatusApi;