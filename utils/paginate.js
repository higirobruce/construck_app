import _ from 'lodash'

export function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize
  return {
    pagedData: _(items).slice(startIndex).take(pageSize).value(),
    startIndex,
  }
}
