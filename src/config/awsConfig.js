export const awsConfig = {
  Auth: {
    // identityPoolId: 'XX-XXXX-X:XXXXXXXX-XXXX-1234-abcd-1234567890ab',

    // REQUIRED - Amazon Cognito Region
    region: "ap-south-1",

    // OPTIONAL - Amazon Cognito Federated Identity Pool Region
    // Required only if it's different from Amazon Cognito Region
    identityPoolRegion: "ap-south-1",

    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: "ap-south-1_4mgy1IT7I",

    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: "7r06etnpnuljs26upd12ts4jsi",
  },
};
