using System;
using System.Threading.Tasks;
using Windows.Networking.Sockets;
using Windows.Web.Http;

namespace HwandazaHttpServer.ServerUtils
{
    class RequestHandler
    {
        public class Const
        {
            public const string DefaultAccountMusicFolder = "C:\\Data\\Users\\DefaultAccount\\Music";
            public const string DefaultAccountPictureFolder = "C:\\Data\\Users\\DefaultAccount\\Pictures";
            public const string DefaultAccountVideoFolder = "C:\\Data\\Users\\DefaultAccount\\Videos";
        }

        private readonly StreamSocket _streamSocket;
        private readonly Request _request;
        private readonly RequestParser _requestParser;
        private readonly StaticFileHandler _staticFileHandler;
        private readonly RestHandler _restHandler;

        public RequestHandler(
            StreamSocket socket, 
            Request request, 
            StaticFileHandler staticFileHandler, 
            RequestParser requestParser)
        {
            _streamSocket = socket;
            _request = request;
            _staticFileHandler = staticFileHandler;
            _requestParser = requestParser;
            _restHandler = new RestHandler(socket, request);
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
                        response = GetHwandazaAutomationStatus();
                        response.Headers.Add("Content-Type", ContentTypeMapper.JSON);
                        break;
                    case "hwandazaautomation/songs":
                        response = GetHwandazaAutomationSongList();
                        response.Headers.Add("Content-Type", ContentTypeMapper.JSON);
                        break;
                    case "hwandazaautomation/videos":
                        response = GetHwandazaAutomationVideoList();
                        response.Headers.Add("Content-Type", ContentTypeMapper.JSON);
                        break;
                    case "hwandazaautomation/pictures":
                        response = GetHwandazaAutomationPictureList();
                        response.Headers.Add("Content-Type", ContentTypeMapper.JSON);
                        break;
                    default:
                        response = await StaticFileHandlerAsync(localpath);
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

        private string GetNewLocalPath(string mediaFilter, string localpath)
        {
            string returnString = "";

            try
            {
                returnString = localpath.Split(new string[] { mediaFilter }, StringSplitOptions.None)[1];
            }
            catch (Exception)
            {
                //do nothing
            }

            return returnString;
        }

        private async Task<HttpResponse> StaticFileHandlerAsync(string localpath)
        {
            HttpResponse response;

            var choice = localpath.Split('/');

            switch (choice[0].ToLower())
            {
                case "picture":
                    response = await _staticFileHandler.HandleRequest(Const.DefaultAccountPictureFolder, GetNewLocalPath("picture/", localpath));
                    break;
                case "video":
                    response = await _staticFileHandler.HandleRequest(Const.DefaultAccountVideoFolder, GetNewLocalPath("video/", localpath));
                    break;
                case "song":
                    response = await _staticFileHandler.HandleRequest(Const.DefaultAccountMusicFolder, GetNewLocalPath("song/", localpath));
                    break;
                default:
                    response = await _staticFileHandler.HandleRequest(localpath);
                    break;
            }

            return response;
        }

        private HttpResponse GetHwandazaAutomationStatus()
        {
            return _restHandler.GetHwandazaAutomationStatus();
        }

        private HttpResponse GetHwandazaAutomationSongList()
        {
            return _restHandler.GetHwandazaAutomationSongList();
        }

        private HttpResponse GetHwandazaAutomationVideoList()
        {
            return _restHandler.GetHwandazaAutomationVideoList();
        }

        private HttpResponse GetHwandazaAutomationPictureList()
        {
            return _restHandler.GetHwandazaAutomationPictureList();
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
