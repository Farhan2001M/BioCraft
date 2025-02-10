import React from 'react'
import {Badge} from '@/components/ui/badge'
import { BorderBeam } from '../magicui/borderBeam'

const Output = () => {
  return (
    <div className='relative flex min-h-[50vh] mt-2 flex-col rounded-xl bg-muted/50 backdrop-blur-sm overflow-hidden border border-primary/5'>
      <BorderBeam className='absolute inset-0 z-10' size={400} borderWidth={1.5} duration={4} />
      <Badge variant="outline" className='absolute top-3 right-3 z-50'>Output</Badge>
    </div>
  )
}

export default Output