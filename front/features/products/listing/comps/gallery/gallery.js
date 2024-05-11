import useLocalStorage from '#root/hooks/useLocalStorage.js'
import { useDispatch, useSelector } from 'react-redux'
import ListingProductCard from './card/listing_card'

import s from './gallery.module.scss'

import {
  AutoSizer,
  InfiniteLoader,
  WindowScroller,
  Grid,
} from 'react-virtualized'
import { useWishList } from '#root/hooks/useWishList.js'

const MIN_COLUMNS = 2 // Minimum number of columns
const MIN_COLUMN_WIDTH = 250 // Minimum width for a column

const ProductGallery = ({
  activeProducts: products,
  activeCategory: category,
}) => {
  const [wishList, like] = useWishList()

  const cellRenderer = ({ columnIndex, rowIndex, key, style, columnCount }) => {
    const index = rowIndex * columnCount + columnIndex
    const product = products[index]

    if (!product) return null

    product.isLiked = wishList.includes(product._id)
    product.like = like

    return (
      <div key={key} style={style}>
        <ListingProductCard product={product} priority={index < columnCount} />
      </div>
    )
  }

  return (
    <div className={`${s.g}`}>
      <InfiniteLoader
        isRowLoaded={({ index }) => !!products[index]}
        loadMoreRows={({ startIndex, stopIndex }) => {
          // Load more products when the user scrolls
        }}
        rowCount={products.length}
      >
        {({ onRowsRendered, registerChild }) => (
          <WindowScroller>
            {({ height, isScrolling, onChildScroll, scrollTop }) => (
              <AutoSizer disableHeight>
                {({ width }) => {
                  let columnCount = Math.floor(width / MIN_COLUMN_WIDTH)
                  columnCount =
                    columnCount < MIN_COLUMNS ? MIN_COLUMNS : columnCount

                  return (
                    <Grid
                      autoHeight
                      cellRenderer={({ columnIndex, rowIndex, key, style }) =>
                        cellRenderer({
                          columnIndex,
                          rowIndex,
                          key,
                          style,
                          columnCount,
                        })
                      }
                      columnCount={columnCount}
                      columnWidth={width / columnCount}
                      height={height}
                      isScrolling={isScrolling}
                      onScroll={onChildScroll}
                      overscanColumnCount={0}
                      overscanRowCount={0}
                      rowCount={Math.ceil(products.length / columnCount)}
                      rowHeight={400}
                      scrollTop={scrollTop}
                      width={width}
                    />
                  )
                }}
              </AutoSizer>
            )}
          </WindowScroller>
        )}
      </InfiniteLoader>
    </div>
  )
}

export default ProductGallery
