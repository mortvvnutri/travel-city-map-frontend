export interface ISubcategories {
  id: number
  name: string
}

export interface ICategoryList {
  id: number
  isSelect: boolean
  name: string
  subcategories: ISubcategories[]
}

export interface ISettingState {
  initialProject: boolean
  categories: any[],
  pos: any,
  geo: any
  catloading: any
}
