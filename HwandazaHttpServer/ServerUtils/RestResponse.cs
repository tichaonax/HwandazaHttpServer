using System;
using System.Diagnostics;
using System.IO;
using System.Runtime.InteropServices.WindowsRuntime;
using System.Text;
using System.Threading.Tasks;
using System.Xml;
using Windows.ApplicationModel.AppService;
using Windows.Foundation;
using Windows.Foundation.Collections;
using Windows.Networking.Sockets;
using Windows.Storage.Streams;
using Newtonsoft.Json;

namespace HwandazaHttpServer.ServerUtils
{
    class RestResponse
    { 
        private readonly StreamSocket _streamSocket;
        private readonly AppServiceConnection _appServiceConnection;
        private readonly Request _request;
        private HwandazaCommand _hwandazaCommand;
        private const uint BufferSize = 8192;
        private bool _isCommandValid;

        public RestResponse(StreamSocket socket, AppServiceConnection appServiceConnection, Request request)
        {
            _isCommandValid = false;
            _appServiceConnection = appServiceConnection;
            _streamSocket = socket;
            _request = request;
            ExtractRequestParameters();
        }

        private void ExtractRequestParameters()
        {
            _hwandazaCommand =
                JsonConvert.DeserializeObject<HwandazaCommand>(_request.Content);
            _hwandazaCommand.Method = _request.Method.ToString();
            _isCommandValid = true;
        }

        private void GetGutuAutomationStatus()
        {
            
        }

        public void ProcessRequest()
        {
            if (_isCommandValid)
            {
                ServiceGoodRequest();
            }
            else
            {
                ServiceBadRequest();
            }
        }

        private void ServiceBadRequest()
        {
            
        }


        private void ServiceGoodRequest()
        {
            switch (_hwandazaCommand.Method.ToLower())
            {
                case "post":
                    ServicePostResponse();
                    break;
                case "get":
                    ServiceGetResponse();
                    break;
                default:
                    break;
            }
        }

        private async void ServicePostResponse()
        {
            try
            {
                var hwandazaMessage = new ValueSet {{"HwandazaCommand", JsonConvert.SerializeObject(_hwandazaCommand)}};
#pragma warning disable CS4014
               var response= await _appServiceConnection.SendMessageAsync(hwandazaMessage);
#pragma warning restore CS4014
              

                if (response.Status== AppServiceResponseStatus.Success)
                {
                    var result = response.Message["Result"] as string;
                    //optionally log result from client
                    Send200OK(result);
                }
                else
                {
                    Send200OK(JsonConvert.SerializeObject(response));
                }
                
            }
            catch (Exception ex)
            {
                Debug.WriteLine(ex.Message);

            }
        }


        private void ServiceGetResponse()
        {
            
        }


        
        private void Send200OK(string systemstatus)
        {

            byte[] bodyArray = Encoding.UTF8.GetBytes(systemstatus);


            using (var outputStream = _streamSocket.OutputStream)
            {
                using (Stream resp = outputStream.AsStreamForWrite())
                {
                    using (MemoryStream stream = new MemoryStream(bodyArray))
                    {
                        string header = String.Format("HTTP/1.1 200 OK\r\n" +
                                            "Content-Length: {0}\r\n" +
                                            "Connection: close\r\n\r\n",
                                            stream.Length);
                        byte[] headerArray = Encoding.UTF8.GetBytes(header);
                        resp.Write(headerArray, 0, headerArray.Length);
                        stream.CopyTo(resp);
                        resp.Flush();
                    }
                }
            }
        }
    }
}
