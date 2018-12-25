using HwandazaHttpServer.ServerUtils;
using Newtonsoft.Json;
using System;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using Windows.ApplicationModel.Background;
using Windows.System.Threading;

namespace HwandazaHttpServer
{
    public sealed class StartupTask : IBackgroundTask
    {
        private const int OneMinutesDelay = 1;
        private const int Timeout = 60000;
        private const int ServerPort = 8300;
        private const string HomeDirectory = "build";
        private const string Domain = "127.0.0.1";
        private const string SystemStatusPage = "hwandazaautomation/status";

        private BackgroundTaskDeferral _backgroundTaskDeferral;
        private HwandazaHttpServer _hwandazaHttpServer;
        private ThreadPoolTimer _poolTimerHeartBeat;
        private IBackgroundTaskInstance _taskInstance;

        public void Run(IBackgroundTaskInstance taskInstance)
        {
            //var installedLocation = Windows.ApplicationModel.Package.Current.InstalledLocation;
            var path = HomeDirectory;

            // Get the deferral object from the task instance
            _backgroundTaskDeferral = taskInstance.GetDeferral();
            //Task.Run(() => Logger.WriteDebugLog("System IBackgroundTaskInstance Started"));
            _taskInstance = taskInstance;
            //create a reference point to clean  up method that will be called in the event an application is cancelled
            _taskInstance.Canceled += TaskInstanceCanceled;
            _hwandazaHttpServer = new HwandazaHttpServer(ServerPort, path);
            _hwandazaHttpServer.StartServer();

            //create a system heart beat check that pings the service applicaation and check that everything is good.
            _poolTimerHeartBeat = ThreadPoolTimer.CreatePeriodicTimer(SystemHeartBeatServerControlAsync, period: TimeSpan.FromMinutes(OneMinutesDelay));
        }

        private void SystemHeartBeatServerControlAsync(ThreadPoolTimer timer)
        {
            var status = IsSystemUpAsync($"http://{Domain}:{ServerPort}/{SystemStatusPage}");
            if(status.Result == false)
            {
                //system unresponsive for whatever reason restart the process
                _backgroundTaskDeferral.Complete();
                Windows.ApplicationModel.Core.CoreApplication.Exit();
            }
        }

        private WebRequest GetWebRequestWithDefaultAccountCredentials(string address)
        {
            Uri uri = new Uri(address);
            var request = WebRequest.Create(uri);
            // Add default authentication to request   
            NetworkCredential c = new NetworkCredential($"{Domain}\\DefaultAccount", "");
            CredentialCache credentialCache = new CredentialCache();
            credentialCache.Add(uri, "NTLM", c);
            request.Credentials = c;
            request.Timeout = Timeout;    //consider timeout if no response in time
            return request;
        }

        private async Task<bool> IsSystemUpAsync(string address)
        {
            bool isAvailble = false;
            WebRequest request = null;
            HttpWebResponse response = null;
            try
            {
                request = GetWebRequestWithDefaultAccountCredentials(address);
                response = (HttpWebResponse)request.GetResponse();
                if (response.StatusCode == HttpStatusCode.OK)
                {
                    using (var reader = new System.IO.StreamReader(response.GetResponseStream(), Encoding.ASCII))
                    {
                        var status = JsonConvert.DeserializeObject<HwandazaAutomation>(reader.ReadToEnd());
                        if (status.isRunning)
                        {
                            isAvailble = true;
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                var msg = ex.Message;
                isAvailble = false;
                //await Logger.WriteDebugLog($"System ****** Failed => {msg}");
            }
            finally
            {
                request = null;
                response = null;
            }

            return isAvailble;
        }


        private void TaskInstanceCanceled(IBackgroundTaskInstance sender, BackgroundTaskCancellationReason reason)
        {
            //gracefully stop modules so that we do not leave peripherals like waterpump running after the control application is terminated

            //Task.Run(async () =>
            //{
            //    await Logger.WriteDebugLog($"BackgroundTaskCancellationReason => {reason}");
            //});

            _backgroundTaskDeferral.Complete();
            Windows.ApplicationModel.Core.CoreApplication.Exit();
        }
    }
}
