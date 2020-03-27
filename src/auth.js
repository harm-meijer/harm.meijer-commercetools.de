import SdkAuth, {
  TokenProvider
} from "@commercetools/sdk-auth";

const tokenProvider = new TokenProvider({
  sdkAuth: new SdkAuth({
    host: "https://auth.europe-west1.gcp.commercetools.com",
    projectKey: "sunrise-spa",
    credentials: {
      clientId: "jFVHj0-tO-THQt9evnGTJ2fD",
      clientSecret: "eUQgmtanysDpYxlOePOhcFklrwa5X8Sj"
    },
    scopes: [
      "manage_my_profile:sunrise-spa create_anonymous_token:sunrise-spa"
    ]
  }),
  onTokenInfoChanged: tokenInfo => {
    console.log("token info changed", tokenInfo);
  }
});

export default () => {
  tokenProvider.fetchTokenInfo = sdkAuth =>
    sdkAuth.refreshTokenFlow(
      encodeURIComponent("invalid refresh token")
    );
  tokenProvider.invalidateTokenInfo();
  return tokenProvider.getTokenInfo().catch(error => {
    console.log("expected this error:", error);
    // refresh token did not work, get a brand new token
    tokenProvider.fetchTokenInfo = sdkAuth =>
      sdkAuth.anonymousFlow();
    tokenProvider.invalidateTokenInfo();
    // this makes no xhr and just fails with previous error
    return tokenProvider.getTokenInfo();
  });
};
