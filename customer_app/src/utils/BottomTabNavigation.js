/**
 * navigation with navigation.reset()
 * @param navigation: react navigation
 * @param tabName: bottom tab label
 * @param tabParams: bottom tab params
 * @param screenName: screen name of bottom tab
 * @param screenParams: screen params
 */
const BottomTabNavigaton = ({
  navigation,
  tabName,
  tabParams = null,
  screenName = null,
  screenParams = null
}) => {
  if (!screenName) {
    return navigation.reset({index:0, routes:[{name: tabName}]});
  }
  return navigation.reset({
    index: 0,
    routes: [{
        name: tabName,
        state: {
            index: 0,
            routes: [{name: screenName, params: screenParams}]
        }
    }],
    params: tabParams,
  })
}

export default BottomTabNavigaton;