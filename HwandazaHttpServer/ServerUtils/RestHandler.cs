using System;
using System.Diagnostics;
using System.Threading.Tasks;
using Windows.ApplicationModel.AppService;
using Windows.Foundation.Collections;
using Windows.Networking.Sockets;
using Newtonsoft.Json;

namespace HwandazaHttpServer.ServerUtils
{
    class RestHandler
    { 
        private readonly StreamSocket _streamSocket;
        private readonly AppServiceConnection _appServiceConnection;
        private readonly Request _request;
        private const uint BufferSize = 8192;

        public RestHandler(StreamSocket socket, AppServiceConnection appServiceConnection, Request request)
        {
            _appServiceConnection = appServiceConnection;
            _streamSocket = socket;
            _request = request;
        }

        private HwandazaCommand ExtractRequestParameters()
        {
            var hwandazaCommand =
                JsonConvert.DeserializeObject<HwandazaCommand>(_request.Content);
            return hwandazaCommand;
        }

        private string GetResponseContent(HwandazaCommand command)
        {
            var responseContent = "{}";

            var appServiceResponse = RequestAppServiceAsync(command).Result;
            if (appServiceResponse != null)
            {
                if (appServiceResponse.Status == AppServiceResponseStatus.Success)
                {
                    responseContent = appServiceResponse.Message["Response"] as string;
                }
                else
                {
                    responseContent = "{}";
                }
            }

            return responseContent;
        }

        public HttpResponse GetsHwandazaAutomationStatus()
        {
            //need to create app communication request to get data from HwandazaWebService
            var command = new HwandazaCommand()
            {
                Command = "Status",
            };

            return new HttpResponse(Windows.Web.Http.HttpStatusCode.Ok, GetResponseContent(command));
        }

        public HttpResponse ProcessPostRequest()
        {
            var command = ExtractRequestParameters();
            
            return new HttpResponse(Windows.Web.Http.HttpStatusCode.Ok, GetResponseContent(command));
        }

        private async Task<AppServiceResponse> RequestAppServiceAsync(HwandazaCommand command)
        {
            AppServiceResponse response = null;

            try
            {
                var hwandazaMessage = new ValueSet { { "HwandazaCommand", JsonConvert.SerializeObject(command) } };
#pragma warning disable CS4014
                response = await _appServiceConnection.SendMessageAsync(hwandazaMessage);
#pragma warning restore CS4014
            }
            catch (Exception ex)
            {
                Debug.WriteLine(ex.Message);
            }

            return response;
        }

    }
}
