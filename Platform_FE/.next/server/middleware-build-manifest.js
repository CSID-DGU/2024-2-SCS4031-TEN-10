self.__BUILD_MANIFEST = {
  "polyfillFiles": [
    "static/chunks/polyfills.js"
  ],
  "devFiles": [
    "static/chunks/react-refresh.js"
  ],
  "ampDevFiles": [],
  "lowPriorityFiles": [],
  "rootMainFiles": [],
  "pages": {
    "/_app": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/_app.js"
    ],
    "/_error": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/_error.js"
    ],
    "/auth/sign-in": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/auth/sign-in.js"
    ],
    "/auth/sign-up": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/auth/sign-up.js"
    ],
    "/festival/[festivalIndex]": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/festival/[festivalIndex].js"
    ],
    "/main": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/main.js"
    ],
    "/search": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/search.js"
    ]
  },
  "ampFirstPages": []
};
self.__BUILD_MANIFEST.lowPriorityFiles = [
"/static/" + process.env.__NEXT_BUILD_ID + "/_buildManifest.js",
,"/static/" + process.env.__NEXT_BUILD_ID + "/_ssgManifest.js",

];