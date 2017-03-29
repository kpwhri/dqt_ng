export class Config {
	serverAddress: string = 'http://127.0.0.1:8090';

	getServerAddress() {
		return this.serverAddress;
	}
}
