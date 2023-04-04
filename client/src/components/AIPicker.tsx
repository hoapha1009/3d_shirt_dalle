import CustomButton from './CustomButton'

type Props = {
  prompt: string
  setPrompt: (prompt: string) => void
  generatingImg: boolean
  handleSubmit: (type: any) => void
}

export default function AIPicker({ prompt, setPrompt, generatingImg, handleSubmit }: Props) {
  return (
    <div className='aipicker-container'>
      <textarea
        value={prompt}
        rows={5}
        placeholder='Ask AI...'
        className='aipicker-textarea'
        onChange={(e) => setPrompt(e.target.value)}
      />
      <div className='flex flex-wrap gap-3'>
        {generatingImg ? (
          <CustomButton type='ouline' title='Asking AI...' customStyles='text-xs' />
        ) : (
          <>
            <CustomButton
              type='ouline'
              title='AI Logo'
              customStyles='text-xs'
              handleClick={() => handleSubmit('logo')}
            />

            <CustomButton
              type='filled'
              title='AI Full'
              customStyles='text-xs'
              handleClick={() => handleSubmit('full')}
            />
          </>
        )}
      </div>
    </div>
  )
}
