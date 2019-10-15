
import { StyleSheet,  Dimensions} from 'react-native';

export default styles = StyleSheet.create ({
  mainContainer: {
    height: Dimensions.get('window').height,
    justifyContent:'center',
    alignItems: 'center'
  },
  cell: {
    height: 100,
    width: 100,
    borderWidth: 2,
    borderColor: 'gray',
    alignItems: 'center',
  },
  XIcon: {
    height: 100,
    fontSize: 80,
    color: 'red'
  },
  OIcon: {
    height: 100,
    fontSize: 80,
    color: 'blue'
  },
  winnerContainer: {
    justifyContent:'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  winnerPlaceHolder: {
    marginTop: 40,
    height: 100,
  },
  restartButton: {
    height:40,
    width: 100,
    margin: 20,
    backgroundColor: 'goldenrod',
    borderRadius: 20,
  },
  scoreContainer: {
    height: 100,
    alignItems: 'center',
  },
  winnerButton: {
    marginTop: 20,
    height:40,
    width: 300,
    backgroundColor: 'lightgrey',
    borderRadius: 20,
    borderColor: 'transparent',
    borderWidth: 2,
  }
})