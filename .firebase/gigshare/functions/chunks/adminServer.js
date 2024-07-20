import admin from "firebase-admin";
function getFirebaseServer() {
  try {
    if (!admin.apps.length) {
      const serviceAccount = JSON.parse('{\n  "type": "service_account",\n  "project_id": "robert-kraut-1234",\n  "private_key_id": "526b83609ebed912e5bd2888b98b4bb1cb91c218",\n  "private_key": "-----BEGIN PRIVATE KEY-----\\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCUk28zNCGcw5w+\\nZqtGaKeAetyyOS/xSAwUNECYiWZ/Avz4+sO92V1IDGxzU77G2B+Ml0lJDNtccpEf\\nK+QTswDXu0GfQfp67hjUvBCMNgN4AVqOE/Yh4W59MWB+nyalYT6i8Z3KzjdV7zJ/\\nPXl+ag9bcM7v+2dm/IgJ6h4oaZxfoFaxOKa7DmszEoz7wAXVGiCoX5m/VLFXxB5t\\n5r8RLH14qQrJUtOtroGdCsGiCIvo+bIgj0lf75xTxSkBY35Y4AJQX2K6RYuFt+Iy\\nExTJuFQWHSMgfuS/izncWllIwMIrX5+g3McM3uWbudBW408/riSLAAAJmyv/UUwc\\niS/noO0XAgMBAAECggEAQhBwsK7shz0/e0vButQMLwfynFjrZXkozc8SLgFijvVw\\nMPGoGgHOBZxomLtTKC2vkZ8vmgjafXf/6YFlsBC3PjXojv0SeJjod6eMIBxgXHsV\\nnfloR1Zq/8X15zezQnREGsYe6K/bUR3EMWnPXROh8oHtsi3yo4uEngv5DvUu8CG4\\nxp5GdB7AR4aAy/HSNvLs6BdA+5TS6/DfsMjMlkatRPhpP4Bh8PaUj5/HWnApTyBe\\nTZo37m1m0md26zHMsNGW/wBuEd/AZNy2xA2XSeAhgSncL+/fcR+C1CfXlOtl++zA\\n5XhhDq+wP3amhRtcami31UWdcN6F6173dJ1lk7GJuQKBgQDPWtnT4i/RQYAlhVZK\\nzh6mWbxuMt/pdaK0z9WNc/IGNliPRxZKPNUVNKk0NLv9CK9GgZxqAA4jSS8/Yn7R\\nJGjtwX8aHw7tRwr2sCdf6L6bJxcNcpRS8ydZH+iyFQdH1ZUN8wur8S23yqNUCAqv\\nLFq5fNNvBON1Rv8O55RQOkIdcwKBgQC3bnwD3z7cy0oREXOqNM2RvH2mNppyJ1/r\\nkPkwtWtrTlE8bOI5eBVd6TDQbWHj10V/QV4fVN7RTf+KABUySlQHwNu5QIdXCbyj\\nrPamRjVryoc4IGr1BglyYioqBQq4onWM9aO39iXVeYenB+1M4D/aJiKiIIomAfmB\\nLdnSzD1IzQKBgGWc6+o9iZlOM/IvKV53K+XxS7nlDH1nvFhHESvEifIpZ7Su7Wlr\\n7i/6IoEG5qjVPK+cjH4VkNgR4Sl6pxLueM0qaZLvbW0xx1mkcWc6s01tForsf2s2\\n5S1zyaCbVXoKXIT9edbE1dafYvKnDjVR0xPa6/IXvy+VnyA6tB+srQGpAoGASntH\\nSf81NEwreADBGYS1UA7cakhTsDSCw1Erjfasdnbnj4Sa20ECVA6i7o7rp6s6ofB1\\n+nzouM5WC7/621/I/Rj3XyJvkgz3FvLdeCib+nfTLhwjsfhQj6yCeGtxrgTxfFol\\nr0X4mNTvGwih94w7ASZo+7IAxmwY1rY6c1jRLaUCgYBQDVKKctUMjA8/mKgSpx1W\\nQqAUyWutrjQWC7T7e8BTHOVPp+kAfnOHkuGIPvfC2b2mgluYSIWVxF62xXNyB7W4\\nvS7gNBlo20lI9M0yOZoTSuDxjWLgoXZE9Oj3gtp7I2+0/tDEEsGkR3cezudqFES0\\nbmcHNoCmtZzcBpgHGHe6WQ==\\n-----END PRIVATE KEY-----\\n",\n  "client_email": "firebase-adminsdk-yugjn@robert-kraut-1234.iam.gserviceaccount.com",\n  "client_id": "117258167615254766399",\n  "auth_uri": "https://accounts.google.com/o/oauth2/auth",\n  "token_uri": "https://oauth2.googleapis.com/token",\n  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",\n  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-yugjn%40robert-kraut-1234.iam.gserviceaccount.com",\n  "universe_domain": "googleapis.com"\n}');
      const cert = admin.credential.cert(serviceAccount);
      admin.initializeApp({ credential: cert });
    }
    return { error: false, data: admin, app: admin.apps[0] };
  } catch (error) {
    console.error(error);
    return { error: true, msg: "Error initializing firebase server" };
  }
}
export {
  getFirebaseServer as g
};
