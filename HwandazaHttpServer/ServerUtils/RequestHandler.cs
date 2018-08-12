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
        private readonly AppServiceConnection _appServiceConnection;
        private readonly Request _request;
        private readonly RequestParser _requestParser;
        private readonly StaticFileHandler _staticFileHandler;

        public RequestHandler(StreamSocket socket, AppServiceConnection appServiceConnection, Request request, StaticFileHandler staticFileHandler, RequestParser requestParser)
        {
            _streamSocket = socket;
            _appServiceConnection = appServiceConnection;
            _request = request;
            _staticFileHandler = staticFileHandler;
            _requestParser = requestParser;
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
                ProcessPostRequest();
                return;
            }

            await ProcessBadRequestAsync();
        }

        //private async Task ProcessRequestAsync()
        //{
        //    if (_request.Method.Method == HttpMethod.Get.Method)
        //    {
        //        HttpResponse response;
        //        try
        //        {
        //            response = await _staticFileHandler.HandleRequest(_request);
        //        }
        //        catch (Exception ex)
        //        {
        //            await RequestUtils.WriteInternalServerErrorResponse(_streamSocket, ex);
        //            return;
        //        }
        //        await RequestUtils.WriteResponse(response, _streamSocket);
        //    }
        //    else
        //    {
        //        if (_request.Method.Method == HttpMethod.Post.Method)
        //        {
        //            var restResponse = new RestResponse(_streamSocket, _appServiceConnection, _request);
        //            restResponse.ProcessRequest();
        //        }
        //    }
        //}

        private async Task ProcessBadRequestAsync()
        {
            await RequestUtils.WriteMethodNotAllowedRequest(_streamSocket);
        }

        private async Task ProcessGetRequestAsync()
        {
            HttpResponse response;
            try
            {
                response = await _staticFileHandler.HandleRequest(_request);
            }
            catch (Exception ex)
            {
                await RequestUtils.WriteInternalServerErrorResponse(_streamSocket, ex);
                return;
            }
            await RequestUtils.WriteResponse(response, _streamSocket);
        }

        private void ProcessPostRequest()
        {
            var restResponse = new RestResponse(_streamSocket, _appServiceConnection, _request);
            restResponse.ProcessRequest();
        }
    }
}
