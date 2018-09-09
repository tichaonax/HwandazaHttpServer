using System;
using System.Threading.Tasks;
using Windows.ApplicationModel.AppService;

namespace HwandazaHttpServer.ServerUtils
{
    class AppServiceInstance
    {
        private static AppServiceConnection _appServiceConnection;

        private AppServiceInstance()
        {
            Task.Run(async () =>
            {
                await SetAppServiceConnection();
            });
        }

        static AppServiceInstance()
        {
        }

        public static AppServiceInstance Instance { get; } = new AppServiceInstance();

        public AppServiceConnection GetAppServiceConnection()
        {
            return _appServiceConnection;
        }

        public static async Task SetAppServiceConnection()
        {
            _appServiceConnection = new AppServiceConnection
            {
                PackageFamilyName = "HwandazaWebService_7c1xvdqapnqy0",
                AppServiceName = "HwandazaAppCommunicationService",
            };

            // Send a initialize request 
            AppServiceConnectionStatus appServiceConnectionStatus1 = await _appServiceConnection.OpenAsync();
            AppServiceConnectionStatus appServiceConnectionStatus = appServiceConnectionStatus1;
            var res = appServiceConnectionStatus;
            if (res != AppServiceConnectionStatus.Success)
            {
                throw new Exception("Failed to connect to the AppService");
            }
        }
    }

}
