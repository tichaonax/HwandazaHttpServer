using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Windows.ApplicationModel.AppService;
using Windows.Networking.Sockets;
using Windows.Web.Http;

namespace HwandazaHttpServer.ServerUtils
{
    class RequestHandler
    {
        private readonly StreamSocket _streamSocket;
        private readonly Request _request;
        private readonly RequestParser _requestParser;
        private readonly StaticFileHandler _staticFileHandler;
        private readonly RestHandler _restHandler;

        public RequestHandler(StreamSocket socket, AppServiceConnection appServiceConnection, Request request, StaticFileHandler staticFileHandler, RequestParser requestParser)
        {
            _streamSocket = socket;
            _request = request;
            _staticFileHandler = staticFileHandler;
            _requestParser = requestParser;
            _restHandler = new RestHandler(socket, appServiceConnection, request);
        }

        public async Task HandleRequestAsync()
        {
            if (_request.Method.Method == HttpMethod.Get.Method)
            {
                await ProcessGetRequestAsync();
                return;
            }

            if (_request.Method.Method == HttpMethod.Post.Method)
            {
                await ProcessPostRequestAsync();
                return;
            }

            await ProcessBadRequestAsync();
        }

        private async Task ProcessBadRequestAsync()
        {
            await RequestUtils.WriteMethodNotAllowedRequest(_streamSocket);
        }

        private async Task ProcessGetRequestAsync()
        {
            HttpResponse response;
            try
            {
                var localpath = RequestUtils.ParseLocalPath(_request.Uri.LocalPath);

                switch (localpath)
                {
                    case "index.html":
                    case "hwandazaautomation":
                    case "hwandazaautomation/index.html":
                        response = await _staticFileHandler.HandleRequest("index.html");
                        break;
                    case "hwandazaautomation/status":
                        response = GetsHwandazaAutomationStatus();
                        response.Headers.Add("Content-Type", ContentTypeMapper.JSON);
                        break;
                    default:
                        response = await _staticFileHandler.HandleRequest(localpath);
                        break;
                }
            }
            catch (Exception ex)
            {
                await RequestUtils.WriteInternalServerErrorResponse(_streamSocket, ex);
                return;
            }

            await RequestUtils.WriteResponse(response, _streamSocket);
        }

        private HttpResponse GetsHwandazaAutomationStatus()
        {

            return _restHandler.GetsHwandazaAutomationStatus();
        }

        private async Task ProcessPostRequestAsync()
        {
            HttpResponse response;
            try
            {
                response = _restHandler.ProcessPostRequest();
            }
            catch(Exception ex)
            {
                await RequestUtils.WriteInternalServerErrorResponse(_streamSocket, ex);
                return;
            }

            await RequestUtils.WriteResponse(response, _streamSocket);
        }
    }
}
