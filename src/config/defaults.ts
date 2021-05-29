export const defaultConfigFileName = 'eventconfig'

export const defaultConfigs = {
  filePaths: ['./**/*.{js,ts}'],
  ignorePaths: ['node_modules'],
  tags: ['route', 'owner'],
  outputDir: './out',
  outputFileName: 'index.json',
} as const
