import { Platform } from 'react-native'
const FONTS = {
  SFRegular: Platform.OS == "android" ? 'SF Pro Display Regular' : "System",
  SFMedium: Platform.OS == "android" ? 'SF Pro Display Medium' : "System",
  SFSemiBold: Platform.OS == "android" ? 'SF Pro Display Semibold' : "System",
  SFBold: Platform.OS == "android" ? 'SF Pro Display Bold' : 'System',
  SFBold: Platform.OS == "android" ? 'SF Pro Display Bold' : 'System',
  HNMedium: Platform.OS == "android" ? 'HelveticaNeue Medium' : 'System',
  HNRegular: Platform.OS == "android" ? 'HelveticaNeue Regular' : 'System',
};

export { FONTS };
