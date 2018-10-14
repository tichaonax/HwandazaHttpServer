using System;
using System.Diagnostics;
using System.Threading.Tasks;
using Windows.ApplicationModel.AppService;
using Windows.Foundation.Collections;
using Windows.Networking.Sockets;
using Newtonsoft.Json;
using System.Text;
using System.Collections.Generic;

namespace HwandazaHttpServer.ServerUtils
{
    class RestHandler
    { 
        private readonly StreamSocket _streamSocket;
        private AppServiceConnection _appServiceConnection;
        private readonly Request _request;
        private const uint BufferSize = 8192;

        public RestHandler(StreamSocket socket, Request request)
        {
            _appServiceConnection = AppServiceInstance.Instance.GetAppServiceConnection();
            _streamSocket = socket;
            _request = request;
        }

        private HwandazaCommand ExtractRequestParameters()
        {
            var hwandazaCommand =
                JsonConvert.DeserializeObject<HwandazaCommand>(_request.Content);
            return hwandazaCommand;
        }

        private async Task<string> GetResponseContentAsync(HwandazaCommand command)
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
                    //attempt a reconnections and resubmit the command the
                    responseContent = await ResubmitRequestAppServiceAsync(command);
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

            byte[] responseData = Encoding.UTF8.GetBytes(GetResponseContentAsync(command).Result);
            return new HttpResponse(Windows.Web.Http.HttpStatusCode.Ok, responseData);
        }

        public HttpResponse GetRandomaGalleryFileList(List<string> fileList)
        {
            var cloneList = fileList.GetRange(0, fileList.Count);
            var rnd = new Random();
            var randomList = new List<string>();
            int rndIndex = 0;
            while (cloneList.Count > 0)
            {
                rndIndex = rnd.Next(0, cloneList.Count);
                randomList.Add(cloneList[rndIndex]);
                cloneList.RemoveAt(rndIndex);
            }

            byte[] responseData = Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(randomList));
            return new HttpResponse(Windows.Web.Http.HttpStatusCode.Ok, responseData);
        }

        public HttpResponse ProcessPostRequest()
        {
            var command = ExtractRequestParameters();
            byte[] responseData = Encoding.UTF8.GetBytes(GetResponseContentAsync(command).Result);
            return new HttpResponse(Windows.Web.Http.HttpStatusCode.Ok, responseData);
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

        private async Task<string> ResubmitRequestAppServiceAsync(HwandazaCommand command)
        {
            //re-establish appservice connection
            await AppServiceInstance.SetAppServiceConnection();

            _appServiceConnection = AppServiceInstance.Instance.GetAppServiceConnection();

            var responseContent = "{}";

            var appServiceResponse = RequestAppServiceAsync(command).Result;
            if (appServiceResponse != null)
            {
                if (appServiceResponse.Status == AppServiceResponseStatus.Success)
                {
                    responseContent = appServiceResponse.Message["Response"] as string;
                }
            }

            return (responseContent);
        }
    }
}
