export class Config {
	serverAddress: string = 'http://roc5sh:8090';
	
	getServerAddress() {
		return this.serverAddress;
	}
}