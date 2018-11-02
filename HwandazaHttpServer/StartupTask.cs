using System;
using Windows.ApplicationModel.Background;
using Windows.System.Threading;

namespace HwandazaHttpServer
{
    public sealed class StartupTask : IBackgroundTask
    {
        private const int SixtySecondDelayMs = 60000;
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
            _poolTimerHeartBeat = ThreadPoolTimer.CreatePeriodicTimer(SystemHeartBeatServerControlAsync, period: TimeSpan.FromMilliseconds(SixtySecondDelayMs));
        }

        private void SystemHeartBeatServerControlAsync(ThreadPoolTimer timer)
        {
            try
            {
                _hwandazaHttpServer.StopServer();
                _hwandazaHttpServer.StartServer();
            }
            catch (Exception ex)
            {
                //Do nothing
            }
        }

        private void TaskInstanceCanceled(IBackgroundTaskInstance sender, BackgroundTaskCancellationReason reason)
        {
            //gracefully stop modules so that we do not leave peripherals like waterpump running after the control application is terminated

            //Task.Run(() => Logger.WriteDebugLog("System TaskInstanceCanceled reason: " + reason.ToString()));
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
    }
}
