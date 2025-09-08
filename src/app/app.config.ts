import { environment } from '../ENVIRONMENTS/environment';

export class Config {
  serverAddress = environment.serverAddress;
  getServerAddress() {
    return this.serverAddress;
  }
}
