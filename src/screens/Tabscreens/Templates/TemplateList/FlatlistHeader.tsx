import React from 'react';
import { View, Text ,StyleSheet} from 'react-native';
import { styles } from "./styles";
import HeadingCard from "./HeadingCard";
import labels from "../../../../utils/ProjectLabels.json";

const FlatlistHeader = (props: any) => {
    return (
        <View>
            <View style={styles.Flatlistviewone}>
                <HeadingCard template={props?.template} />
            </View>
            <View style={styles.recentlistview}>
                <View>
                    <Text style={styles.listext}>{labels.Templatelistlabel.Listtxt}</Text>
                </View>
                <View style={styles.space}></View>
                <View>
                    <Text style={styles.viewalltext}>
                        {labels.Templatelistlabel.ViewAll}
                    </Text>
                </View>
            </View>
        </View>
    )
}

export default FlatlistHeader;
