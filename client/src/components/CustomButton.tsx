import React from 'react'
import { useAppSelector } from '../app/hooks'

type Props = {
  type: string
  title: string
  handleClick: () => void
  customStyles: string
}

export default function CustomButton({ type, title, handleClick, customStyles }: Props) {
  const appState = useAppSelector((state) => state.app)

  const generateStyle = (type: string) => {
    if (type === 'filled') {
      return {
        backgroundColor: appState.color,
        color: '#fff'
      }
    }
  }

  return (
    <button
      className={`flex-1 rounded-md px-2 py-1.5 ${customStyles}`}
      style={generateStyle(type)}
      onClick={handleClick}
    >
      {title}
    </button>
  )
}
