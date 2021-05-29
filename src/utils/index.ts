import * as fs from 'fs'
import fg from 'fast-glob'
import { parse } from 'comment-parser/lib'
import { loadConfig, Configs } from '../config'

const traverseFileNames = async (configs: Configs) =>
  await fg([...configs.filePaths], {
    dot: true,
    ignore: [...configs.ignorePaths],
  })

const filterTags = (content: any, configs: Configs) =>
  content.reduce((acc, item) => {
    if (item) {
      const tags = item?.tags?.filter(tag => configs.tags.includes(tag.tag))
      acc.push({
        description: item?.description,
        tags,
      })
    }
    return acc
  }, [])

const parseFiles = (locations: string[], configs: Configs) => {
  let data = []

  locations.forEach(file => {
    const fileContent = parse(fs.readFileSync(file, { encoding: 'utf8' }))
    const content = filterTags(fileContent, configs)

    data.push({
      fileName: file,
      content,
    })
  })

  return data
}

const generateFile = (data: any[], configs: Configs) => {
  const tokenJson = JSON.stringify(data)

  fs.promises
    .mkdir(configs.outputDir, { recursive: true })
    .then(() => {
      fs.writeFileSync(
        `${configs.outputDir}/${configs.outputFileName}`,
        tokenJson
      )
    })
    .catch(error => {
      console.error(error)
      return
    })
}

export const generateDocs = async () => {
  const configs = await loadConfig()
  const locations = await traverseFileNames(configs)
  const content = parseFiles(locations, configs)
  generateFile(content, configs)
}
