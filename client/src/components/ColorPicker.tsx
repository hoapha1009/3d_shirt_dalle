import { SketchPicker } from 'react-color'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { setColor } from './appSlice'

type Props = {}

export default function ColorPicker({}: Props) {
  const dispatch = useAppDispatch()
  const appState = useAppSelector((state) => state.app)

  const handleChange = (color: any) => {
    const action = setColor(color.hex)
    dispatch(action)
  }

  return (
    <div className='absolute left-full ml-3'>
      <SketchPicker disableAlpha color={appState.color as string} onChange={handleChange} />
    </div>
  )
}
