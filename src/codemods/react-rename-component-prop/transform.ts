import type { API, FileInfo, Options } from 'jscodeshift'
import { renameProps } from '../../utils/jsx'

export default function transformer(
  file: FileInfo,
  { jscodeshift: j }: API,
  options: Options,
) {
  if (!options.componentName || !options.from || !options.to) {
    throw new Error('Missing required options: componentName, from, to')
  }

  const source = j(file.source)
  const componentName = options.componentName
  const props = { [options.from]: options.to }

  renameProps(j, source, componentName, props)

  return source.toSource()
}
