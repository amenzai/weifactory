//  添加饿了么没有的ui组件
import {
  Grid,
  Row,
  Menu,
  Submenu,
  MenuItem,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Icon
} from 'iview'
const ui = {}

ui.install = function (Vue) {
  Vue.component('Grid', Grid)
  Vue.component('Row', Row)
  Vue.component('Menu', Menu)
  Vue.component('Submenu', Submenu)
  Vue.component('Menu-item', MenuItem)
  Vue.component('Dropdown', Dropdown)
  Vue.component('Dropdown-menu', DropdownMenu)
  Vue.component('Dropdown-item', DropdownItem)
  Vue.component('Icon', Icon)
}

export default ui
