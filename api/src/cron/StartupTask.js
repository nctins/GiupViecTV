import cron from "node-cron";
import { NotScheduleConfig, ScheduleConfig } from "../config/cron.config";
import PostsService from "../services/posts.service";
import HelperService from "../services/helper_account.service";

const post_remind = cron.schedule(
    '0 0 23 * * *', // exceute on 23:00 everyday
    async () => {
        console.log("execute check overdue post daily");
        await PostsService.remindOverDuePost();
    },
    NotScheduleConfig
);

const check_helper_work_time_contraint = cron.schedule(
    '0 0 23 * * 7', // execute on 23:00 every sunday
    async () => {
        console.log("execute check helper work time contraint");
        await HelperService.checkTimeContraint({is_lock_user: true});
    },
    NotScheduleConfig
);

class StartupTask {
    constructor(){
        // list jobs
        this.jobs = [
            post_remind,
            check_helper_work_time_contraint
            // ,test_cron
        ]
    }
    run() {
        this.jobs.forEach(job=>job.start());
    }
}

export default new StartupTask()