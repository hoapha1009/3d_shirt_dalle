import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import config from '../configs/config'
import { download } from '../assets'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { fadeAnimation, slideAnimation } from '../configs/motion'
import { EditorTabs, FilterTabs } from '../configs/constants'
import { CustomButton, Tab } from '../components'
import { setIntro } from '../components/appSlice'

type Props = {}

export default function Customizer({}: Props) {
  const appState = useAppSelector((state) => state.app)
  const dispatch = useAppDispatch()

  const handleClick = () => {
    const action = setIntro(true)
    dispatch(action)
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
                      return
                    }}
                  />
                ))}
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
                isActiveTab=''
                handleClick={() => {
                  return
                }}
              />
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
