module.exports = {
  software: {
    node: '^14.x',
    dotnet: {
      semver: '^5.x',
      flag: '--version', // custom flag to print version
      installMessage: 'https://dotnet.microsoft.com/download/dotnet/5.0', // custom message when binary is not found
      updateMessage: 'https://dotnet.microsoft.com/download/dotnet/5.0', // custom message when binary has wrong version
    },
    tsc: '^4.4',
  },
};
