export const environment = {
  ip() {
    const host = location.protocol.concat("//").concat(window.location.hostname);

    // return 'http://localhost:5000'
    return host.concat(":5000")
    // return 'http://192.168.90.90:5000'
    // return 'http://192.2.27.69:3000'
  }, production: true
};
