import { MutableRefObject, useCallback } from 'react'

import type { CollisionDetection, UniqueIdentifier } from '@dnd-kit/core'
import { closestCenter, rectIntersection } from '@dnd-kit/core'

import { Cards } from '../types/board'

type CollisionDetectionArgs = {
  collisionDetectionArgs: {
    activeId: string | null
    items: Cards
    lastOverId: MutableRefObject<UniqueIdentifier | null>
    recentlyMovedToNewContainer: MutableRefObject<boolean>
  }
}
export const useCollisionDetection = ({
  collisionDetectionArgs,
}: CollisionDetectionArgs) => {
  const { activeId, items, lastOverId, recentlyMovedToNewContainer } =
    collisionDetectionArgs
  const collisionDetection: CollisionDetection = useCallback(
    (args) => {
      // Start by finding any intersecting droppable
      let overId = rectIntersection(args)

      if (activeId && activeId in items) {
        return closestCenter({
          ...args,
          droppableContainers: args.droppableContainers.filter(
            (container) => container.id in items
          ),
        })
      }

      if (overId != null) {
        if (overId in items) {
          const containerItems = items[overId]

          // If a container is matched and it contains items (columns 'A', 'B', 'C')
          if (containerItems.length > 0) {
            // Return the closest droppable within that container
            overId = closestCenter({
              ...args,
              droppableContainers: args.droppableContainers.filter(
                (container) =>
                  container.id !== overId &&
                  containerItems.includes(container.id)
              ),
            })
          }
        }

        lastOverId.current = overId

        return overId
      }

      // When a draggable item moves to a new container, the layout may shift
      // and the `overId` may become `null`. We manually set the cached `lastOverId`
      // to the id of the draggable item that was moved to the new container, otherwise
      // the previous `overId` will be returned which can cause items to incorrectly shift positions
      if (recentlyMovedToNewContainer.current) {
        lastOverId.current = activeId
      }
      return lastOverId.current
    },
    [activeId, items]
  )

  return collisionDetection
}
