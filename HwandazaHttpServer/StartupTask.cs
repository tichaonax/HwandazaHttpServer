using HwandazaHttpServer.ServerUtils;
using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Windows.ApplicationModel.Background;
using Windows.System.Threading;

namespace HwandazaHttpServer
{
    public sealed class StartupTask : IBackgroundTask
    {

        private const int FiveSecondDelayMs = 5000;
        private const string SystemsHeartbeatIsRunning = "systemsheartbeatisrunning";
        private const string Uri = "localhost";
        private const int ServerPort = 8100;
        private const string HomeDirectory = "build";

        private BackgroundTaskDeferral _backgroundTaskDeferral;
        private HwandazaHttpServer _hwandazaHttpServer;
        private ThreadPoolTimer _poolTimerHeartBeat;

        public void Run(IBackgroundTaskInstance taskInstance)
        {
            //var installedLocation = Windows.ApplicationModel.Package.Current.InstalledLocation;
            var path = HomeDirectory;
           
            // Get the deferral object from the task instance
            _backgroundTaskDeferral = taskInstance.GetDeferral();
            //create a reference point to clean up method that will be called in the event an application is cancelled
            taskInstance.Canceled += TaskInstanceCanceled;
            _hwandazaHttpServer = new HwandazaHttpServer(ServerPort, path);
            _hwandazaHttpServer.StartServer();

            //create a system heart beat check that pings the service applicaation and check that every thing is good.
            _poolTimerHeartBeat = ThreadPoolTimer.CreatePeriodicTimer(SystemHeartBeatControlAsync, period: TimeSpan.FromMilliseconds(FiveSecondDelayMs));
        }


        private void SystemHeartBeatControlAsync(ThreadPoolTimer timer)
        {
            var request = new HwandazaCommand { Command = SystemsHeartbeatIsRunning };
            string uri = "http://" + Uri + ":" + ServerPort;
            var path = "";
            SystemsHeartbeat systemStatus = new SystemsHeartbeat() { IsRunning = false };

            try
            {
                systemStatus = PostData<SystemsHeartbeat, HwandazaCommand>(request, uri, path);
            }
            catch (Exception)
            {
                systemStatus.IsRunning = false;
            }

            if (!systemStatus.IsRunning)
            {
                //reset the webserver
                //System.Diagnostics.Debug.WriteLine("System Heat Beat Down Restarting the Web Server");
                Task.Run(() => Windows.ApplicationModel.Core.CoreApplication.RequestRestartAsync(null));
            }
        }
        
        private void TaskInstanceCanceled(IBackgroundTaskInstance sender, BackgroundTaskCancellationReason reason)
        {
            //gracefully stop modules so that we do not leave peripherals like waterpump running after the control application is terminated

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
                    break;
                case BackgroundTaskCancellationReason.SystemPolicy:
                    break;
            }
        }

        private static T PostData<T, P>(P postData, string uri, string path)
    {
        var ret = default(T);
        try
        {
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(uri);
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                var response = client.PostAsXmlAsync(path, postData).Result;
                //var response = client.PostAsJsonAsync(path, postData).Result; if your endpoint accepts json content
                ret = response.Content.ReadAsAsync<T>().Result;
            }
        }
        catch (Exception ex)
        {
            //Do something
        }

        return ret;
    }
    }
}
