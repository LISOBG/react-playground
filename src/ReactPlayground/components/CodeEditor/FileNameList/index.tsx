import { useContext, useEffect, useState } from 'react'
import { PlaygroundContext } from '../../../PlaygroundContext'

import styles from './index.module.scss'
import { FileNameItem } from './FileNameItem'
import { APP_COMPONENT_FILE_NAME, ENTRY_FILE_NAME, IMPORT_MAP_FILE_NAME } from '../../../files'
export default function FileNameList() {
  const {
    files,
    removeFile,
    addFile,
    updateFileName,
    selectedFileName,
    setSelectedFileName
  } = useContext(PlaygroundContext)
  const [tabs, setTabs] = useState([''])
  const [creating, setCreating] = useState(false);
  function handleEditComplete(name: string, prevName: string) {
    updateFileName(prevName, name)
    setSelectedFileName(name)

    setCreating(false)
  }
  useEffect(() => {
    setTabs(Object.keys(files))
  }, [files])
  function addTab() {
    addFile('Comp' + Math.random().toString().slice(2,8) + '.tsx')
    setCreating(true)
  }
  const handleRemove = (name: string) => {
    removeFile(name)
    setSelectedFileName(ENTRY_FILE_NAME)
  }
  const readonlyFileNames = [ENTRY_FILE_NAME, IMPORT_MAP_FILE_NAME, APP_COMPONENT_FILE_NAME];
  return <div className={styles.tabs}>
    {
      tabs.map((item, index,arr) => (
        <FileNameItem 
          key={item + index} 
          value={item} 
          creating = {creating && index === arr.length - 1}
          actived={selectedFileName === item} 
          readonly={readonlyFileNames.includes(item)}
          onClick={() => setSelectedFileName(item)} 
          onEditComplete={(name: string) => handleEditComplete(name,item)}
          onRemove={(e) => {
            handleRemove(item)
          }}
          ></FileNameItem>
        ))
    }
    <div className={styles.add} onClick={addTab}>
      +
    </div>
  </div>
}