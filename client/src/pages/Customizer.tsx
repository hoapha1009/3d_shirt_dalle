import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { download } from '../assets'
import { AIPicker, ColorPicker, CustomButton, FilePicker, Tab } from '../components'
import { setFullDecal, setFullTexture, setIntro, setLogoDecal, setLogoTexture } from '../components/appSlice'
import { DecalTypes, EditorTabs, FilterTabs } from '../configs/constants'
import { downloadCanvasToImage, reader } from '../configs/helpers'
import { fadeAnimation, slideAnimation } from '../configs/motion'

type Props = {}

export default function Customizer({}: Props) {
  const appState = useAppSelector((state) => state.app)
  const dispatch = useAppDispatch()
  const [file, setFile] = useState<File | null>(null)
  const [prompt, setPrompt] = useState<string>('')
  const [generatingImg, setGeneratingImg] = useState(false)
  const [activeEditorTab, setActiveEditorTab] = useState<string>('')
  const [activeFilterTab, setActiveFilterTab] = useState<any>({
    logoShirt: true,
    stylishShirt: false
  })

  const handleClick = () => {
    const action = setIntro(true)
    dispatch(action)
  }

  const handleSubmit = async (type: any) => {
    if (!prompt) return alert('Please enter a prompt')

    try {
      setGeneratingImg(true)

      const response = await fetch('http://localhost:8080/api/v1/dalle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt
        })
      })

      const data = await response.json()
      if (data?.photo) {
        handleDecals(type, `data:image/png;base64,${data.photo}`)
      }
    } catch (error) {
      alert(error)
    } finally {
      setGeneratingImg(false)
      setActiveEditorTab('')
    }
  }

  // show tab content depending on the activeTab
  const generateTabContent = () => {
    switch (activeEditorTab) {
      case 'colorpicker':
        return <ColorPicker />
      case 'filepicker':
        return <FilePicker file={file} setFile={setFile} readFile={readFile} />
      case 'aipicker':
        return (
          <AIPicker prompt={prompt} setPrompt={setPrompt} generatingImg={generatingImg} handleSubmit={handleSubmit} />
        )
      default:
        return <></>
    }
  }

  const readFile = (type: 'logo' | 'full') => {
    if (file) {
      reader(file).then((result) => {
        handleDecals(type, result)
        setActiveEditorTab('')
      })
    }
  }

  const handleDecals = (type: 'logo' | 'full', result: any) => {
    const decalType = DecalTypes[type]

    if (decalType.stateProperty === 'logoDecal') {
      const action = setLogoDecal(result)
      dispatch(action)
    }

    if (decalType.stateProperty === 'fullDecal') {
      const action = setFullDecal(result)
      dispatch(action)
    }

    if (!activeFilterTab[decalType.filterTab]) {
      handleActiveFilterTab(decalType.filterTab)
    }
  }

  const handleActiveFilterTab = (tabName: string) => {
    let action: any

    switch (tabName) {
      case 'logoShirt':
        action = setLogoTexture(!activeFilterTab[tabName])
        dispatch(action)
        break
      case 'stylishShirt':
        action = setFullTexture(!activeFilterTab[tabName])
        dispatch(action)
        break
      default:
        dispatch(setLogoTexture(true))
        dispatch(setFullTexture(false))
        break
    }

    setActiveFilterTab((prevState: { [x: string]: any }) => ({ ...prevState, [tabName]: !prevState[tabName] }))
  }

  return (
    <AnimatePresence>
      {!appState.intro && (
        <>
          <motion.div key='custom' className='absolute inset-0 z-10' {...slideAnimation('left')}>
            <div className='flex min-h-screen items-center'>
              <div className='editortabs-container tabs'>
                {EditorTabs.map((tab) => (
                  <Tab
                    key={tab.name}
                    tab={tab}
                    handleClick={() => {
                      setActiveEditorTab(tab.name)
                    }}
                  />
                ))}

                {generateTabContent()}
              </div>
            </div>
          </motion.div>

          <motion.div className='absolute right-5 top-5 z-10' {...fadeAnimation}>
            <CustomButton
              type='filled'
              title='Go Back'
              handleClick={handleClick}
              customStyles='w-fit px-4 py-2.5 font-bold text-sm'
            />
          </motion.div>

          <motion.div className='filtertabs-container' {...slideAnimation('up')}>
            {FilterTabs.map((tab) => (
              <Tab
                key={tab.name}
                tab={tab}
                isFilterTab
                isActiveTab={activeFilterTab[tab.name]}
                handleClick={() => handleActiveFilterTab(tab.name)}
              />
            ))}
            <button className='rounded-full bg-white/30 p-3 hover:bg-gray-100' onClick={downloadCanvasToImage}>
              <img src={download} alt='download_image' className='h-8 object-contain' />
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
