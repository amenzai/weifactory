import {
  Pagination,
  Dialog,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Input,
  InputNumber,
  Radio,
  RadioGroup,
  RadioButton,
  Checkbox,
  CheckboxButton,
  CheckboxGroup,
  Switch,
  Select,
  Option,
  OptionGroup,
  Button,
  ButtonGroup,
  Table,
  TableColumn,
  DatePicker,
  TimeSelect,
  TimePicker,
  Breadcrumb,
  BreadcrumbItem,
  Form,
  FormItem,
  Icon,
  Row,
  Col,
  MessageBox,
  Message,
  Notification
} from 'element-ui';

export default {
  install(Vue) {
    Vue.prototype.$ELEMENT = { size: 'small' };
    Vue.component(Pagination.name, Pagination);
    Vue.component(Dialog.name, Dialog);
    Vue.component(Dropdown.name, Dropdown);
    Vue.component(DropdownMenu.name, DropdownMenu);
    Vue.component(DropdownItem.name, DropdownItem);
    Vue.component(Menu.name, Menu);
    Vue.component(Submenu.name, Submenu);
    Vue.component(MenuItem.name, MenuItem);
    Vue.component(MenuItemGroup.name, MenuItemGroup);
    Vue.component(Input.name, Input);
    Vue.component(InputNumber.name, InputNumber);
    Vue.component(Radio.name, Radio);
    Vue.component(RadioGroup.name, RadioGroup);
    Vue.component(RadioButton.name, RadioButton);
    Vue.component(Checkbox.name, Checkbox);
    Vue.component(CheckboxButton.name, CheckboxButton);
    Vue.component(CheckboxGroup.name, CheckboxGroup);
    Vue.component(Switch.name, Switch);
    Vue.component(Select.name, Select);
    Vue.component(Option.name, Option);
    Vue.component(OptionGroup.name, OptionGroup);
    Vue.component(Button.name, Button);
    Vue.component(ButtonGroup.name, ButtonGroup);
    Vue.component(Table.name, Table);
    Vue.component(TableColumn.name, TableColumn);
    Vue.component(DatePicker.name, DatePicker);
    Vue.component(TimeSelect.name, TimeSelect);
    Vue.component(TimePicker.name, TimePicker);
    Vue.component(Breadcrumb.name, Breadcrumb);
    Vue.component(BreadcrumbItem.name, BreadcrumbItem);
    Vue.component(Form.name, Form);
    Vue.component(FormItem.name, FormItem);
    Vue.component(Icon.name, Icon);
    Vue.component(Row.name, Row);
    Vue.component(Col.name, Col);

    Vue.prototype.$msgbox = MessageBox;
    Vue.prototype.$alert = MessageBox.alert;
    Vue.prototype.$confirm = MessageBox.confirm;
    Vue.prototype.$prompt = MessageBox.prompt;
    Vue.prototype.$notify = Notification;
    Vue.prototype.$message = Message;
  }
}

