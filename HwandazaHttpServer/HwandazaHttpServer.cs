using System;
using System.Threading.Tasks;
using Windows.Foundation.Collections;
using Windows.Networking.Sockets;
using HwandazaHttpServer.ServerUtils;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.IO;
using Windows.ApplicationModel;

namespace HwandazaHttpServer
{
    public sealed class HwandazaHttpServer : IDisposable
    {
        private readonly int _httpServerPort; // = 8100;
        private readonly StreamSocketListener _streamSocketListener;
        private readonly RequestParser _requestParser;
        private readonly StaticFileHandler _staticFileHandler;
        private readonly List<string> _imageGalleryList;

        public HwandazaHttpServer(int httpServerPort, string staticFilesFolder)
        {
            _streamSocketListener = new StreamSocketListener();
            _streamSocketListener.Control.KeepAlive = true;
            _streamSocketListener.Control.NoDelay = true;
            _httpServerPort = httpServerPort;
            _staticFileHandler = new StaticFileHandler(staticFilesFolder);
            _requestParser = new RequestParser();
            _imageGalleryList = new List<string>();
            LoadGalleryImages(GetAbsoluteBasePathUri(staticFilesFolder + "/gallery"));
            _streamSocketListener.ConnectionReceived += async (s, e) => { await ProcessRequestAsync(e.Socket); };
        }

        private void LoadGalleryImages(string path)
        {
            ProcessDirectory(path);
        }

        private void ProcessDirectory(string targetDirectory)
        {
            // Process the list of files found in the directory.
            string[] fileEntries = Directory.GetFiles(targetDirectory);
            foreach (string fileName in fileEntries)
            {
                var gallerImage = fileName.Split(new string[] { "build/" }, StringSplitOptions.None)[1]
                    .Replace("/", "").Replace("\\", "/");
                var cleanString = Uri.EscapeUriString(gallerImage);
                _imageGalleryList.Add(cleanString);
            }

            // Recurse into subdirectories of this directory.
            string[] subdirectoryEntries = Directory.GetDirectories(targetDirectory);
            foreach (string subdirectory in subdirectoryEntries)
                ProcessDirectory(subdirectory);
        }

        private string GetAbsoluteBasePathUri(string relativeOrAbsoluteBasePath)
        {
            var basePathUri = new Uri(relativeOrAbsoluteBasePath, UriKind.RelativeOrAbsolute);
            if (basePathUri.IsAbsoluteUri)
                return relativeOrAbsoluteBasePath;
            else
                return Path.Combine(Package.Current.InstalledLocation.Path, relativeOrAbsoluteBasePath);
        }

        public async void Dispose()
        {
            await _streamSocketListener.CancelIOAsync();
            _streamSocketListener.Dispose();
        }

        public void StartServer()
        {
            Task.Run(async () =>
                           {
                               await _streamSocketListener.BindServiceNameAsync(_httpServerPort.ToString());

                               // Initialize the AppServiceConnection
                               await AppServiceInstance.SetAppServiceConnection();

                           });
        }

        public void StopServer()
        {
            var stopCommand = new HwandazaCommand()
                              {
                                  Command = "Stop",
                                  Module = "Operations"
                              };
            var hwandazaMessage = new ValueSet {{"HwandazaCommand", JsonConvert.SerializeObject(stopCommand)}};
#pragma warning disable CS4014
            AppServiceInstance.Instance.GetAppServiceConnection().SendMessageAsync(hwandazaMessage);
#pragma warning restore CS4014
        }

        private async Task ProcessRequestAsync(StreamSocket socket)
        {
            Request request;
            try
            {
                var requestText = await RequestUtils.ReadRequest(socket);
                request = _requestParser.ParseRequestText(requestText, socket.Information.LocalAddress, socket.Information.LocalPort);
                var requestHandler = new RequestHandler(socket, request, _staticFileHandler, _requestParser, _imageGalleryList);
                await requestHandler.HandleRequestAsync();
                return;
            }
            catch (Exception ex)
            {
                await RequestUtils.WriteInternalServerErrorResponse(socket, ex);
                return;
            }
        }
    }
}
