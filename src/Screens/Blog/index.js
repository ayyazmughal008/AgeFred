import React from 'react'
import { View, ScrollView, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux';
import { Header } from 'react-native-elements'
import { getBlogs } from '../../Redux/action'
import HeaderImage from '../../Component/Header'
import MenuImage from '../../Component/MenuImage'
import { styles } from './styles';
import { darkBlue } from '../../Component/ColorCode'
import { data } from './data'
import BlogCard from '../../Component/MyCard'

class Blog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        this.props.getBlogs();
    }
    render() {
        const { AuthLoading, getBlogs } = this.props.user
        return (
            <View style={styles.container}>
                <Header
                    leftComponent={
                        <MenuImage
                            leftClick={() => this.props.navigation.goBack()}
                            rightIcon="chevron-thin-left"
                        />
                    }
                    centerComponent={
                        <HeaderImage
                            isText={true}
                            title="NOTICIAS"
                        />
                    }
                    containerStyle={{
                        backgroundColor: darkBlue,
                    }}
                />
                <View style={styles.listView}>
                    <ScrollView
                        contentContainerStyle={{ flexGrow: 1 }}
                        showsVerticalScrollIndicator={false}
                    >
                        {!getBlogs ?
                            <View />
                            : getBlogs.data.map((item, index) => {
                                return (
                                    <BlogCard
                                        key={"unique" + index}
                                        description={item.description}
                                        title={item.title}
                                        urlImag={item.imagePath}
                                        date={item.date}
                                        clickHandler={() =>
                                            this.props.navigation.navigate('DetailPage', {
                                                img: item.imagePath,
                                                title: item.title,
                                                description: item.description2
                                            })
                                        }
                                    />
                                )
                            })}
                    </ScrollView>
                    {AuthLoading &&
                        <ActivityIndicator
                            size="large"
                            color="orange"
                            style={styles.loading}
                        />
                    }
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
});
export default connect(mapStateToProps, { getBlogs })(Blog);