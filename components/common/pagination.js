import React from 'react'
import { Pagination } from 'semantic-ui-react'
import _ from 'lodash'

export default function MPagination({
  count,
  onPageChange,
  pageSize,
  activePage,
}) {
  let totalPages = 0
  let div = count / pageSize
  let rDiv = _.round(count / pageSize, 0)
  let diff = div - rDiv <= 0 ? 0 : 1
  totalPages = _.round(count / pageSize, 0) + diff
  if (totalPages > 1) {
    return (
      <Pagination
        size="mini"
        siblingRange={3}
        boundaryRange={1}
        
        totalPages={totalPages}
        onPageChange={(e, data) => onPageChange(e, data)}
        activePage={activePage}
      />
    )
  } else {
    return null
  }
}
