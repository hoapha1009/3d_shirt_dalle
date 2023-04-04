import { useAppSelector } from '../app/hooks'
import { EditorTab } from '../configs/constants'

type Props = {
  tab: EditorTab
  handleClick: () => void
  isActiveTab?: string
  isFilterTab?: boolean
}

export default function Tab({ tab, isActiveTab, isFilterTab, handleClick }: Props) {
  const appState = useAppSelector((state) => state.app)

  const activeStyles =
    isFilterTab && isActiveTab
      ? { backgroundColor: appState.color as string, opacity: 0.5 }
      : { backgroundColor: 'transparent', opacity: 1 }

  return (
    <div
      key={tab.name}
      style={activeStyles}
      className={`tab-btn ${isFilterTab ? 'glassmorhism rounded-full' : 'rounded-4'}`}
      onClick={handleClick}
    >
      <img
        src={tab.icon}
        alt={tab.name}
        className={`
      ${isFilterTab ? 'h-2/3 w-2/3' : 'h-11/12 w-11/12 object-contain'}
      `}
      />
    </div>
  )
}
