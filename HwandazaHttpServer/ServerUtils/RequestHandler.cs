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
        private readonly List<string> _imageGalleryList;
        private readonly List<string> _mp3MusicList;

        public RequestHandler(
            StreamSocket socket, 
            Request request, 
            StaticFileHandler staticFileHandler, 
            RequestParser requestParser, 
            List<string> imageGalleryList,
            List<string> mp3MusicList)
        {
            _streamSocket = socket;
            _request = request;
            _staticFileHandler = staticFileHandler;
            _requestParser = requestParser;
            _restHandler = new RestHandler(socket, request);
            _imageGalleryList = imageGalleryList;
            _mp3MusicList = mp3MusicList;
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
                    case "status":
                    case "settings":
                    case "lights":
                    case "control":
                    case "music":
                    case "gallery":
                    case "about":
                        response = await _staticFileHandler.HandleRequest("index.html");
                        break;
                    case "hwandazaautomation/status":
                        response = GetsHwandazaAutomationStatus();
                        response.Headers.Add("Content-Type", ContentTypeMapper.JSON);
                        break;
                    case "gallery/filelist":
                        response = GetRandomaGalleryFileList();
                        response.Headers.Add("Content-Type", ContentTypeMapper.JSON);
                        break;
                    case "music/filelist":
                        response = GetRandomaMusicFileList();
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

        private HttpResponse GetRandomaGalleryFileList()
        {
            return _restHandler.GetRandomaGalleryFileList(_imageGalleryList);
        }

        private HttpResponse GetRandomaMusicFileList()
        {
            return _restHandler.GetRandomaMusicFileList(_mp3MusicList);
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
