'use client'

import { size } from 'lodash/fp'
import { Plus } from 'lucide-react'
import { useFieldArray, useFormContext } from 'react-hook-form'

import { Button } from '@/components/ui/button'

import { CollectionGroupStand } from './CollectionGroupStand'
import { CollectionType } from './formSchema'

interface Props {
  groupIndex: number
}

export function CollectionGroup({ groupIndex }: Props) {
  const form = useFormContext<CollectionType>()

  const stands = useFieldArray({
    control: form.control,
    name: `groups.${groupIndex}.stands`,
  })

  return (
    <div className={`flex`}>
      {stands.fields.map((stand, index) => (
        <CollectionGroupStand
          key={stand.id}
          groupIndex={groupIndex}
          standIndex={index}
          stands={stands}
        />
      ))}
      {!size(stands.fields) && (
        <Button
          className="my-auto mx-8"
          variant="outline"
          size="icon"
          onClick={() =>
            stands.append({
              width: '100',
              shelves: [{ amount: 3, depth: '37' }],
            })
          }>
          <Plus />
        </Button>
      )}
    </div>
  )
}