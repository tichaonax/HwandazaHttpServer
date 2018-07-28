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
        private const string okHtmlString = "<html><head><title>Hwandaza Automation</title></head><body>Hi There</body></html>";

        private readonly StreamSocket _streamSocket;
        private readonly AppServiceConnection _appServiceConnection;
        private readonly StringBuilder _request;
        private HwandazaCommand _hwandazaCommand;
        private const uint BufferSize = 8192;
        private string[] _splitRequestAsString;
        private bool _isCommandValid;

        public RestResponse(StreamSocket socket, AppServiceConnection appServiceConnection, StringBuilder request)
        {
            _isCommandValid = false;
            _appServiceConnection = appServiceConnection;
            _streamSocket = socket;
            _request = request;
            ExtractRequestParameters();
        }

        private void ExtractRequestParameters()
        {
            var requestAsString = _request.ToString();
            _splitRequestAsString = requestAsString.Split('\n');

            if (_splitRequestAsString.Length != 0)
            {
                string requestMethod = _splitRequestAsString[0]; //{POST /HwandazaAutoMation/ HTTP/1.1
                string[] requestParts = requestMethod.Split(' ');
                if (requestParts.Length > 1)
                {
                    if (requestParts[1].ToLower().Contains("hwandazaautomation"))
                    {
                        var jsonString = requestAsString.Substring(requestAsString.LastIndexOf('{'));
                        jsonString = jsonString.Substring(0, jsonString.IndexOf('}') + 1);
                        jsonString = jsonString.Replace("\r\n", "").Replace("\n", "").Replace("\r", "");
                        _hwandazaCommand =
                            JsonConvert.DeserializeObject<HwandazaCommand>(jsonString);
                        _hwandazaCommand.Method = requestParts[0];
                        _isCommandValid = true;
                    }
                }
            }
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
            XmlDocument xmlDoc = new XmlDocument();
            xmlDoc.LoadXml(okHtmlString);
            XmlNodeList elemList = xmlDoc.GetElementsByTagName("body");
            elemList[0].InnerText = systemstatus;
            Debug.WriteLine(xmlDoc.OuterXml);
           // string html = okHtmlString;
            byte[] bodyArray = Encoding.UTF8.GetBytes(xmlDoc.OuterXml);
            xmlDoc = null;
            // Show the html 
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
