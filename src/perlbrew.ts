const getAvailablePerls: Fig.Generator = {
  script: "perlbrew list",
  postProcess: (output) => {
    return output.split("\n").map((line) => {
      /* We ignore the already set Perl version */
      if (line.startsWith("*")) {
        return {};
      }
      const perl = line.trim();
      return {
        name: perl,
      };
    });
  },
};

const completionSpec: Fig.Spec = {
  name: "perlbrew",
  description: "",
  subcommands: [
    {
      name: "list",
      description: "List installed Perl versions",
    },
    {
      name: "use",
      description: "Set Perl version to use temporarily for this shell",
      args: {
        isOptional: true,
        generators: getAvailablePerls,
      },
    },
    {
      name: "switch",
      description: "Set Perl version to use permanently",
      args: {
        isOptional: true,
        generators: getAvailablePerls,
      },
    },
  ],
  options: [
    {
      name: ["--help", "-h"],
      description: "Show help for perlbrew",
    },
  ],
  // Only uncomment if perlbrew takes an argument
  // args: {}
};
export default completionSpec;
