import { environment } from '../environments/environment';

export class Config {
  serverAddress = environment.serverAddress;
  getServerAddress() {
    return this.serverAddress;
  }
}
