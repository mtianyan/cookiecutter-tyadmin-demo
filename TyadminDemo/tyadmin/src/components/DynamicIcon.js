import loadable from "@loadable/component";
var fistLetterUpper = function(str) {
  return str.charAt(0).toUpperCase()+str.slice(1);
};
const DynamicIcon = loadable(props =>{
  console.log(props)
  console.log(props.type)
  let iconType = ""
  if(props.type.includes("Outlined")){
    iconType = props.type
  }else {
    console.log(props.type)
    iconType = fistLetterUpper(props.type) + "Outlined"
    console.log("iconType", iconType)
    // iconType = "VideoCameraOutlined"
  }
  // alert(iconType)
  // let iconType = fistLetterUpper(props.type)
  return import(`@ant-design/icons/es/icons/${iconType}.js`)
    .catch(err => import(`@ant-design/icons/es/icons/WarningOutlined.js`))
})

export default DynamicIcon;
