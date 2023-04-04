import type { CSSProperties } from 'react'
import { useAppSelector } from '../app/hooks'
import { getContrastingColor } from '../configs/helpers'

type Props = {
  type: string
  title: string
  handleClick?: () => void
  customStyles: string
}

export default function CustomButton({ type, title, handleClick, customStyles }: Props) {
  const appState = useAppSelector((state) => state.app)

  const generateStyle = (type: string) => {
    if (type === 'filled') {
      return {
        backgroundColor: appState.color,
        color: getContrastingColor(appState.color as string)
      }
    } else if (type === 'outline') {
      return {
        borderWidth: '1px',
        borderColor: appState.color,
        color: appState.color
      }
    }
  }

  return (
    <button
      className={`flex-1 rounded-md px-2 py-1.5 ${customStyles}`}
      style={generateStyle(type) as CSSProperties}
      onClick={handleClick}
    >
      {title}
    </button>
  )
}
