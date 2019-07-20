const DOMAIN = 'http://discovery.hubsvc.itv.com/platform/itvonline/ctv/programmes';
const ACCEPT_HEADER = 'application/vnd.itv.hubsvc.progamme.v3+hal+json';
const headers = {
  'Content-Type': ACCEPT_HEADER
};

class ProgrammeService {
  get(channel) {
    return axios.get(
      `http://discovery.hubsvc.itv.com/platform/itvonline/ctv/programmes?channelId=${channel}&broadcaster=itv&features=hls,aes`,
      {
        headers: {
          Accept: 'application/vnd.itv.hubsvc.programme.v3+hal+json'
        }
      }
    );
  }
}

export default ProgrammeService;
