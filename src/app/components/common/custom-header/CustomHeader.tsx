import React, { FC } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Text, ActivityIndicator } from 'react-native-paper';
import { Icon } from 'react-native-elements';
import { styles } from './style';
import COLORS from '../../../../constants/color';

interface IProps {
  title: string;
  rightIcon?: string;
  rightIconColor?: string;
  rightButtonLoading?: boolean;
  rightButtonDisabled?: boolean;
  additionalIcon?: string;
  additionalIconColor?: string;
  leftIcon?: string;
  leftIconColor?: string;
  iconColor?: string;
  transparent?: boolean;
  onRightPress?: () => void;
  onLeftPress?: () => void;
  onAdditionalPress?: () => void;
  noShadow?: boolean;
}
/**
 * @param title string
 * @param rightIcon string
 * @param rightIconColor string
 * @param additionalIcon: string
 * @param additionalIconColor: string
 * @param leftIcon string
 * @param leftIconColor string
 * @param iconColor string
 * @param transparent boolean
 * @param onRightPress () => void
 * @param onLeftPress () => void
 * @param onAdditionalPress () => void
 */

export const CustomHeader: FC<IProps> = ({
  title,
  leftIcon,
  leftIconColor,
  additionalIcon,
  additionalIconColor,
  rightIcon,
  rightButtonLoading,
  rightButtonDisabled,
  rightIconColor,
  iconColor,
  onLeftPress,
  onRightPress,
  onAdditionalPress,
}) => {
  return (
    <View style={styles.header}>
      {!!leftIcon && (
        <TouchableOpacity
          style={[styles.header__button, styles.header__buttonLeft]}
          activeOpacity={0.5}
          onPress={onLeftPress}
        >
          <Icon
            type="ionicon"
            name={leftIcon}
            size={20}
            color={iconColor && !leftIconColor ? iconColor : leftIconColor || COLORS.BLACK}
          />
        </TouchableOpacity>
      )}
      <View style={[styles.header__wrapperText, !!additionalIcon && styles.header__additionalIcon]}>
        <Text style={styles.header__text} ellipsizeMode="tail" numberOfLines={1}>
          {title}
        </Text>
      </View>
      {!!additionalIcon && (
        <TouchableOpacity
          style={[styles.header__button, styles.header__buttonAdditional]}
          activeOpacity={0.5}
          onPress={onAdditionalPress}
        >
          <Icon
            type="ionicon"
            name={additionalIcon}
            size={22}
            color={
              iconColor && !additionalIconColor ? iconColor : additionalIconColor || COLORS.BLACK
            }
          />
        </TouchableOpacity>
      )}
      {!!rightIcon && rightButtonLoading ? (
        <View style={[styles.header__button, styles.header__buttonRight]}>
          <ActivityIndicator size={24} color={rightIconColor} />
        </View>
      ) : (
        rightIcon && (
          <TouchableOpacity
            style={[styles.header__button, styles.header__buttonRight]}
            disabled={rightButtonDisabled}
            activeOpacity={0.5}
            onPress={onRightPress}
          >
            <Icon
              type="ionicon"
              name={rightIcon}
              size={22}
              color={iconColor && !rightIconColor ? iconColor : rightIconColor || COLORS.BLACK}
            />
          </TouchableOpacity>
        )
      )}
    </View>
  );
};
