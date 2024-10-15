module.exports = {
  software: {
    node: '^20.x',
    dotnet: {
      semver: '^8.x',
      flag: '--version', // custom flag to print version
      installMessage: 'https://dotnet.microsoft.com/download/dotnet/8.0', // custom message when binary is not found
      updateMessage: 'https://dotnet.microsoft.com/download/dotnet/8.0', // custom message when binary has wrong version
    },
    tsc: '^5',
  },
};
