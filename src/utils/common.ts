import _camelCase from 'lodash/camelCase'

export const camelCase = <T extends string>(str: T) => _camelCase(str) as Uncapitalize<T>
