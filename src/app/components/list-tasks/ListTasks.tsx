import React, { Component } from 'react';
import { ScrollView, ActivityIndicator, View, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { CustomHeader } from '../common/custom-header/CustomHeader';
import COLORS from '../../../constants/color';
import { StackNavigationProp } from '@react-navigation/stack';
import { ITask, SortDirectionEnum, SortFieldEnum } from '../../../utils/Api';
import { logout } from '../../../utils/auth-service';
import Utils from '../../../utils/utils';
import { connect } from 'react-redux';
import { IAppState } from '../../../store/app/app-reducer';
import { Icon } from 'react-native-elements';
import Task from './Task';
import ButtonPage from './ButtonPage';
import { styles } from './style';
import AuthModal from './AuthModal';
import SuccessModal from './SuccessModal';
import { Portal } from 'react-native-paper';
import { RootParamList } from '../../../navigation/StackNavigation';

interface IProps {
  navigation: StackNavigationProp<RootParamList, 'ListTasks'>;
  tasks: ITask[];
  totalTaskCount: number | null;
  isAuth: boolean;
}

interface IState {
  page: number;
  sortDirection?: SortDirectionEnum;
  sortField?: SortFieldEnum;
  loadingList: boolean;
  showAuthModal: boolean;
  showSuccessModal: boolean;
}

enum TextSortFieldEnum {
  NONE = 'без сортировки',
  USERNAME = 'по имени',
  EMAIL = 'по почте',
  STATUS = 'по статусу',
}

class ListTasks extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      page: 1,
      sortDirection: SortDirectionEnum.ASC,
      sortField: undefined,
      loadingList: true,
      showAuthModal: false,
      showSuccessModal: false,
    };
  }

  componentDidMount() {
    this.changeListTasks();
  }

  componentDidUpdate(prevProps: IProps, prevState: IState) {
    const { page, sortDirection, sortField } = this.state;
    if (
      prevState.page !== page ||
      prevState.sortDirection !== sortDirection ||
      prevState.sortField !== sortField
    ) {
      this.changeListTasks();
    }
  }

  private async changeListTasks() {
    !this.state.loadingList && this.setState({ loadingList: true });
    const { page, sortDirection, sortField } = this.state;
    const res = await Utils.saveList(page, sortField, sortDirection);
    this.setState({ loadingList: res });
  }

  private changePage = (newPage: number) =>
    newPage !== this.state.page && this.setState({ page: newPage });

  private hideAuthModal = () =>
    this.setState((prevState) => ({ showAuthModal: !prevState.showAuthModal }));

  private hideSuccessModal = () =>
    this.setState((prevState) => ({
      showSuccessModal: !prevState.showSuccessModal,
    }));

  render() {
    const { navigation, tasks, totalTaskCount, isAuth } = this.props;
    const {
      loadingList,
      page,
      sortField,
      sortDirection,
      showAuthModal,
      showSuccessModal,
    } = this.state;
    const countPages = totalTaskCount ? Math.ceil(totalTaskCount / 3) : null;
    const nextPage = page + 1;
    const prevPage = page - 1;
    return (
      <View style={styles.container}>
        <CustomHeader
          title="Список задач"
          rightIcon="add-outline"
          rightIconColor={COLORS.PRIMARY}
          additionalIcon={isAuth ? 'log-out-outline' : 'log-in-outline'}
          additionalIconColor={COLORS.PRIMARY}
          onRightPress={() =>
            navigation.navigate('CreateTask', {
              data: { page, sortField, sortDirection },
              hideSuccessModal: this.hideSuccessModal,
            })
          }
          onAdditionalPress={() => (isAuth ? logout() : this.setState({ showAuthModal: true }))}
        />
        <View style={styles.wrapper__content}>
          <View style={styles.wrapper__block}>
            <View style={styles.wrapper__filters}>
              <TouchableOpacity
                disabled={loadingList}
                onPress={() =>
                  this.setState((prevState) => ({
                    sortDirection:
                      prevState.sortDirection === SortDirectionEnum.ASC
                        ? SortDirectionEnum.DESC
                        : SortDirectionEnum.ASC,
                  }))
                }
              >
                <Icon
                  type="ionicon"
                  size={30}
                  name={
                    sortDirection === SortDirectionEnum.ASC
                      ? 'arrow-up-outline'
                      : 'arrow-down-outline'
                  }
                  color={COLORS.BLACK}
                />
              </TouchableOpacity>
              <View style={styles.wrapper__picker}>
                <Picker
                  enabled={!loadingList}
                  selectedValue={sortField}
                  onValueChange={(itemValue) => this.setState({ sortField: itemValue })}
                >
                  <Picker.Item label={TextSortFieldEnum.NONE} value={undefined} />
                  <Picker.Item label={TextSortFieldEnum.USERNAME} value={SortFieldEnum.USERNAME} />
                  <Picker.Item label={TextSortFieldEnum.EMAIL} value={SortFieldEnum.EMAIL} />
                  <Picker.Item label={TextSortFieldEnum.STATUS} value={SortFieldEnum.STATUS} />
                </Picker>
              </View>
            </View>
            <TouchableOpacity
              disabled={loadingList}
              onPress={() =>
                this.setState({
                  sortDirection: SortDirectionEnum.ASC,
                  sortField: undefined,
                  page: 1,
                })
              }
            >
              <Icon type="ionicon" size={30} name="close-outline" color={COLORS.BLACK} />
            </TouchableOpacity>
          </View>
          <ScrollView>
            {loadingList ? (
              <ActivityIndicator size={40} color={COLORS.PRIMARY} />
            ) : (
              tasks.map((task) => (
                <Task
                  data={{ page, sortField, sortDirection }}
                  isEdit={isAuth}
                  navigation={navigation}
                  key={task.id.toString()}
                  {...task}
                />
              ))
            )}
          </ScrollView>
          {tasks.length > 0 && countPages && (
            <View style={styles.wrapper__buttons_page}>
              <ButtonPage
                disabled={loadingList}
                currentPage={page}
                page={1}
                changePage={this.changePage}
              />
              {prevPage > 0 && prevPage !== 1 && (
                <ButtonPage
                  disabled={loadingList}
                  currentPage={page}
                  page={prevPage}
                  changePage={this.changePage}
                />
              )}
              {page !== 1 && page !== countPages && (
                <ButtonPage
                  disabled={loadingList}
                  currentPage={page}
                  page={page}
                  changePage={this.changePage}
                />
              )}
              {nextPage < countPages && nextPage !== countPages && (
                <ButtonPage
                  disabled={loadingList}
                  currentPage={page}
                  page={nextPage}
                  changePage={this.changePage}
                />
              )}
              <ButtonPage
                disabled={loadingList}
                currentPage={page}
                page={countPages}
                changePage={this.changePage}
              />
            </View>
          )}
        </View>
        <AuthModal visible={showAuthModal} closeModal={this.hideAuthModal} />
        <Portal>
          <SuccessModal visible={showSuccessModal} closeModal={this.hideSuccessModal} />
        </Portal>
      </View>
    );
  }
}

const mapStateToProps = ({ tasks, totalTaskCount, isAuth }: IAppState) => ({
  tasks,
  totalTaskCount,
  isAuth,
});

export default connect(mapStateToProps, {})(ListTasks);
