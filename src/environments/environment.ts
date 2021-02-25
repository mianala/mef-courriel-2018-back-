// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  ip() {
    const host = location.protocol.concat("//").concat(window.location.hostname);

    // return 'http://localhost:5000'
    // return host.concat(":5000")
    return 'http://192.168.90.90:5000'
    // return 'http://192.2.27.69:3000'
  },
  production: false
};
