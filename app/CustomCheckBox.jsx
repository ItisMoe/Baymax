import { View, TouchableOpacity, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const CustomCheckbox = ({ isChecked, onCheck }) => {
    return (
        <TouchableOpacity onPress={onCheck} style={{ flexDirection: 'row', alignItems: 'center' }}>
            <MaterialCommunityIcons
                name={isChecked ? 'checkbox-marked' : 'checkbox-blank-outline'}
                size={24}
                color="black"
            />
            <Text style={{ marginLeft: 8 }}></Text>
        </TouchableOpacity>
    );
};

export default CustomCheckbox;
