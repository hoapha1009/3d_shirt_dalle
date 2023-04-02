import React from 'react'
import { EditorTab } from '../configs/constants'

type Props = {
  tab: EditorTab
  handleClick: () => void
  isActiveTab?: string
  isFilterTab?: boolean
}

export default function Tab({}: Props) {
  return <div>Tab</div>
}
