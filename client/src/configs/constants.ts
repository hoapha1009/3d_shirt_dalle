import { swatch, fileIcon, ai, logoShirt, stylishShirt } from '../assets'

export interface EditorTab {
  name: string
  icon: string
}

export const EditorTabs: EditorTab[] = [
  {
    name: 'colorpicker',
    icon: swatch
  },
  {
    name: 'filepicker',
    icon: fileIcon
  },
  {
    name: 'aipicker',
    icon: ai
  }
]

export interface FilterTab {
  name: string
  icon: string
}

export const FilterTabs: FilterTab[] = [
  {
    name: 'logoShirt',
    icon: logoShirt
  },
  {
    name: 'stylishShirt',
    icon: stylishShirt
  }
]

interface Item {
  stateProperty: string
  filterTab: string
}

export interface DecalTypes {
  logo: Item
  full: Item
}

export const DecalTypes: DecalTypes = {
  logo: {
    stateProperty: 'logoDecal',
    filterTab: 'logoShirt'
  },
  full: {
    stateProperty: 'fullDecal',
    filterTab: 'stylishShirt'
  }
}
