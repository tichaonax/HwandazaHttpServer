using HwandazaHttpServer.ServerUtils;
using Newtonsoft.Json;
using System;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Windows.ApplicationModel.Background;
using Windows.ApplicationModel.Core;
using Windows.System.Threading;

namespace HwandazaHttpServer
{
    public sealed class StartupTask : IBackgroundTask
    {

        private const int FiveSecondDelayMs = 10000;
        private const string SystemsHeartbeatIsRunning = "systemsheartbeatisrunning";
        private const string Uri = "127.0.0.1";
        private const int ServerPort = 8100;
        private const string HomeDirectory = "build";

        private BackgroundTaskDeferral _backgroundTaskDeferral;
        private HwandazaHttpServer _hwandazaHttpServer;
        private ThreadPoolTimer _poolTimerHeartBeat;
        private static readonly Windows.Web.Http.HttpClient _httpClient = new Windows.Web.Http.HttpClient();

        public void Run(IBackgroundTaskInstance taskInstance)
        {
            //var installedLocation = Windows.ApplicationModel.Package.Current.InstalledLocation;
            var path = HomeDirectory;

            // Get the deferral object from the task instance
            _backgroundTaskDeferral = taskInstance.GetDeferral();
            //create a reference point to clean  up method that will be called in the event an application is cancelled
            taskInstance.Canceled += TaskInstanceCanceled;
            _hwandazaHttpServer = new HwandazaHttpServer(ServerPort, path);
            _hwandazaHttpServer.StartServer();

            //create a system heart beat check that pings the service applicaation and check that every thing is good.
            _poolTimerHeartBeat = ThreadPoolTimer.CreatePeriodicTimer(SystemHeartBeatControlAsync, period: TimeSpan.FromMilliseconds(FiveSecondDelayMs));
        }


        private void SystemHeartBeatControlAsync(ThreadPoolTimer timer)
        {
            var request = new HwandazaCommand { Command = SystemsHeartbeatIsRunning };
            Uri requestUri = new Uri($"http://{Uri}:{ServerPort}/hwandazaautomation/status");
            //SystemsHeartbeat systemStatus = new SystemsHeartbeat() { IsRunning = false };

            //Send the GET request asynchronously and retrieve the response as a string.
            Windows.Web.Http.HttpResponseMessage httpResponse = new Windows.Web.Http.HttpResponseMessage();
            string httpResponseBody = "";
            try
            {
                //using Windows.UI.Core;
                
                 Task.Run(async () =>
                 {
                     //Send the GET request
                    //Logger.WriteDebugLog($"SystemsHeartbeat URi => {requestUri.AbsoluteUri}");
                    httpResponse = await _httpClient.GetAsync(requestUri);
                    httpResponse.EnsureSuccessStatusCode();
                    httpResponseBody = await httpResponse.Content.ReadAsStringAsync();
                    Logger.WriteDebugLog($"SystemsHeartbeat SystemStatus *****=> {httpResponseBody}");
                });
                // Task.Run(() => { systemStatus = PostData<SystemsHeartbeat, HwandazaCommand>(request, uri, path); });
                //Task.Run(() => Logger.WriteDebugLog($"SystemsHeartbeat SystemStatus => {JsonConvert.SerializeObject(systemStatus)}"));
            }
            catch (Exception ex)
            {
                //systemStatus.IsRunning = false;
                Task.Run(() => Logger.WriteDebugLog($"Error checking SystemsHeartbeat => {ex.Message} ==Trace== {ex.StackTrace}"));
            }

            //Task.Run(() => Logger.WriteDebugLog($"SystemsHeartbeat SystemStatus *****=> {httpResponseBody}"));

            //AppRestartFailureReason restartResult;
            //if (!systemStatus.IsRunning)
            //{
            //    //reset the webserver
            //    //System.Diagnostics.Debug.WriteLine("System Heat Beat Down Restarting the Web Server");
            //    Task.Run(() => Logger.WriteDebugLog("System Heat Beat Down Restarting the Web Server"));
            //    try
            //    {
            //        Task.Run(async () => { restartResult = await CoreApplication.RequestRestartAsync("Server Restarting"); });
            //    }
            //    catch (Exception exception)
            //    {
            //        Task.Run(() => Logger.WriteDebugLog($"System Restarting Exception: {exception.Message}"));
            //    }
                
            //}
        }

        private void TaskInstanceCanceled(IBackgroundTaskInstance sender, BackgroundTaskCancellationReason reason)
        {
            //gracefully stop modules so that we do not leave peripherals like waterpump running after the control application is terminated

            Task.Run(() => Logger.WriteDebugLog("System TaskInstanceCanceled reason: " + reason.ToString()));
            //a few reasons that you may be interested in.
            switch (reason)
            {
                case BackgroundTaskCancellationReason.Abort:
                    //app unregistered background task (amoung other reasons).
                    _hwandazaHttpServer.StopServer();
                    _backgroundTaskDeferral.Complete();
                    break;
                case BackgroundTaskCancellationReason.Terminating:
                    //system shutdown
                    _hwandazaHttpServer.StopServer();
                    _backgroundTaskDeferral.Complete();
                    break;
                case BackgroundTaskCancellationReason.ConditionLoss:
                    _backgroundTaskDeferral.Complete();
                    break;
                case BackgroundTaskCancellationReason.SystemPolicy:
                    _backgroundTaskDeferral.Complete();
                    break;
                default:
                    _backgroundTaskDeferral.Complete();
                    break;
            }
        }
        

        //private static T PostData<T, P>(P postData, string uri, string path)
        //{
        //    var ret = default(T);
        //    try
        //    {
        //        using (var client = new HttpClient())
        //        {
        //            client.BaseAddress = new Uri(uri);
        //            client.DefaultRequestHeaders.Accept.Clear();
        //            client.DefaultRequestHeaders.Accept.Add(
        //                new MediaTypeWithQualityHeaderValue("application/json"));

        //            Task.Run(() => Logger.WriteDebugLog($"SystemsHeartbeat URL => {client.BaseAddress}"));//
        //            var respHttpClientonse = client.PostAsJsonAsync(path, postData);

        //            Task.Run(() => Logger.WriteDebugLog("SystemsHeartbeat SystemStatus Response => " + JsonConvert.SerializeObject(response)));
        //            //var response = client.PostAsJsonAsync(path, postData).Result; if your endpoint accepts json content
        //            var data = response.Result;
        //            Task.Run(() => Logger.WriteDebugLog($"SystemsHeartbeat SystemStatus Response Result {data}"));
        //            ret = data.Content.ReadAsAsync<T>(new[] { new JsonMediaTypeFormatter()}).Result;
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        Task.Run(() => Logger.WriteDebugLog("SystemsHeartbeat SystemStatus Exception => " + ex.Message + " Trace " + ex.StackTrace));
        //    }
        //    return ret;
        //}
    }
}
