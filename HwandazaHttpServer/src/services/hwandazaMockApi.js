var axios = require('axios');
var MockAdapter = require('axios-mock-adapter');

// This sets the mock adapter on the default instance
var mock = new MockAdapter(axios);

// Mock any GET request to /hwandazaautomation/status
// arguments for reply are (status, data, headers)
mock.onGet('/hwandazaautomation/status').reply(200, {
    systemUpTime: "2018-09-21 02:31:07 AM",
    statusDate: "2018-09-21 02:35:32 AM",
    status: {
        modules: {
            waterPump: {
                power: 1,
                lastUpdate: "2018-09-21 02:32:33 AM",
                adcFloatValue: 0
            },
            irrigator: {
                power: 1,
                lastUpdate: "2018-09-21 02:32:32 AM",
                adcFloatValue: 0
            },
            fishPond: {
                power: 0,
                lastUpdate: "2018-09-21 02:35:35 AM",
                adcFloatValue: 1.5
            }
        },
        lights: {
            m1: {
                power: 0,
                lastUpdate: "2019-09-21 02:32:33 AM",
            },
            m2: {
                power: 1,
                lastUpdate: "2019-09-21 08:32:33 PM",
            },
            l3: {
                power: 0,
                lastUpdate: "2019-09-21 02:32:33 AM",
            },
            l4: {
                power: 0,
                lastUpdate: "2019-09-21 02:32:33 AM",
            },
            l5: {
                power: 0,
                lastUpdate: "2019-09-21 02:32:33 AM",
            },
            l6: {
                power: 0,
                lastUpdate: "2019-09-21 02:32:33 AM",
            },
        }
    }
});

export const getMockStatusApi = () => {
    return axios.get('/hwandazaautomation/status');
};

export default getMockStatusApi;