import { rcFile } from 'rc-config-loader'
import { defaultConfigs, defaultConfigFileName } from './defaults'

export type Configs = typeof defaultConfigs

export const loadConfig = async (): Promise<Configs> => {
  const argv = require('minimist')(process.argv.slice(2))

  try {
    const results = await rcFile(argv?.config || defaultConfigFileName)
    if (!results) {
      return defaultConfigs
    }
    return { ...defaultConfigs, ...results.config }
  } catch (error) {
    return defaultConfigs
  }
}
