import ApplicationsService, { Application } from './applications.service';
import { Component, Inject, Prop, Vue } from 'vue-property-decorator';

@Component
export default class JhiApplicationsModal extends Vue {
  public activeProfiles: any = null;
  @Prop() currentApplication!: Application;
  @Prop() currentRoute!: any;
  @Inject('applicationsService') private applicationsService: () => ApplicationsService;

  public mounted(): void {
    this.refreshProfile();
  }

  /** Update profile of current application */
  public refreshProfile(): void {
    /* istanbul ignore else */
    if (this.currentApplication.serviceId !== 'consul') {
      this.applicationsService()
        .findActiveProfiles(this.currentRoute)
        .then(res => {
          this.activeProfiles = res.data;
        })
        .catch(error => {
          this.activeProfiles = error.error;
        });
    } else {
      this.activeProfiles = {};
    }
  }
}
