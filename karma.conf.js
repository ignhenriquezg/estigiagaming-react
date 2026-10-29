module.exports = function (config) {
  config.set({
    frameworks: ["jasmine"],
    files: [
      "src/**/*.js",
      "test/**/*.js"
    ],
    reporters: ["progress", "coverage"],
    preprocessors: {
      "src/**/*.js": ["coverage"]
    },
    coverageReporter: {
      type: "html",
      dir: "coverage/"
    },
    browsers: ["ChromeHeadless"],
    singleRun: true,
    concurrency: 2
  });
};