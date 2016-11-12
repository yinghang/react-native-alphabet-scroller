import React, { PropTypes, Component } from 'react'
import { getWidthPercent, getHeightPercent } from '../utils/ratio'
import _ from 'underscore'

import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity
} from 'react-native'

class AlphabeticalScrollList extends Component {
  _generateLetters (contacts) {
    let keys = []
    // check if '#' has been pushed into array before
    let shouldPush = true

    _.each( contacts, ( val, key ) => {
      // check if key is an alphabet
      if (/^[a-zA-Z]/.test(key)) keys.push(key)

      // if not push '#'
      else {
        if (shouldPush) {
          keys.push('#')
          shouldPush = false
        }
      }
    })
    // return array
    return keys
  }

  _renderLetters (letter, index) {
    return (
      <TouchableOpacity
        key={index}
        onPress={() => this._scrollTo(letter, index)}
        activeOpacity={0.6}
      >
        <View style={styles.letter}>
          <Text style={styles.letterText}>{letter}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  _scrollTo (letter, index) {
    let temp = this.props.data

    let arr = []

    _.each(temp, (val, key) => {
      if (/^[a-zA-Z]/.test(key)) arr.push(val.length)
    })

    let sum = _.reduce(arr, (memo, num, list) => {
      if (list < index) return memo + num
      else return memo
    }, 0)

    let position = getHeightPercent(15) + index * getHeightPercent(3) + sum * getHeightPercent(9.975)

    // scroll action
    this.props.scroll(position)
  }

  render () {
    let letters = this._generateLetters(this.props.data)
    return (
      <View style={styles.letters}>
        {letters.map((letter, index) => this._renderLetters(letter, index))}
      </View>
    )
  }
}

AlphabeticalScrollList.propTypes = {
  data: PropTypes.object,
  scroll: PropTypes.func
}

const styles = StyleSheet.create({
  letters: {
    position: 'absolute',
    height: getHeightPercent(100),
    top: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center'
  },
  letter: {
    height: getHeightPercent(3.3),
    width: getWidthPercent(4),
    justifyContent: 'center',
    alignItems: 'center'
  },
  letterText: {
    textAlign: 'center',
    fontSize: getHeightPercent(2.2)
  }
})

export default AlphabeticalScrollList
