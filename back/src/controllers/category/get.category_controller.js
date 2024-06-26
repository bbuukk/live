import * as categoryService from '#src/services/category/get.category_service.js'
import { asyncErrorHandler } from '#src/utils/async_error_handler.js'
import _Error from '#src/utils/error.js'

export const getCategories = asyncErrorHandler(async (req, res, next) => {
  const categories = await categoryService.getCategories()

  res.status(200).json(categories)
})

export const getRootCategories = asyncErrorHandler(async (req, res, next) => {
  const rootCategories = await categoryService.getRootCategories()

  res.status(200).json(rootCategories)
})

export const getCategoryByPath = asyncErrorHandler(async (req, res, next) => {
  const { path: slugPath } = req.params

  const category = await categoryService.getCategoryBySlugPath(slugPath)

  if (!category)
    return next(new _Error(`Category with path ${slugPath} not found.`, 404))

  res.status(200).json(category)
})

export const getDirectSubcategoriesByPath = asyncErrorHandler(
  async (req, res, next) => {
    const { path: slugPath } = req.params

    const parentCategory = await categoryService.getCategoryBySlugPath(slugPath)

    if (!parentCategory)
      return next(new _Error(`Category with path ${slugPath} not found.`, 404))

    const ONE_LEVEL_NESTED_DEEP = 1
    const categories = await categoryService.getSubcategories(
      parentCategory,
      ONE_LEVEL_NESTED_DEEP,
    )
    res.status(200).json(categories)
  },
)

// export const getNestedCategories = asyncErrorHandler(async (req, res, next) => {
//   const { id, nestLevel } = req.params
//   console.log('🚀 ~ nestLevel:', nestLevel)
//   console.log('🚀 ~ id:', id)

//   const nested = await categoryService.getCategoriesNestedAt(id, nestLevel)

//   return res.status(200).json(nested)
//   // return res.status(200).json([])

//   // const parentCategory = await categoryService.getCategoryBySlugPath(slugPath)

//   // if (!parentCategory)
//   //   return next(new _Error(`Category with path ${slugPath} not found.`, 404))

//   // const ONE_LEVEL_NESTED_DEEP = 0
//   // const categories = await categoryService.getSubcategories(
//   //   parentCategory,
//   //   ONE_LEVEL_NESTED_DEEP,
//   // )
//   // res.status(200).json(categories)
// })
