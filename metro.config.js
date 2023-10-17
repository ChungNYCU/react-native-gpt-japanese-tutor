const { getDefaultConfig } = require('expo/metro-config')

const config = getDefaultConfig(__dirname)
// Adds support for `mjs` files
config.resolver.sourceExts.push('mjs')

module.exports = config
