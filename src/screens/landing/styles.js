import metrics from '../../../theme/config/metrics'
import commonColor from "../../../theme/commonColor";

export default {

    view: {
        marginHorizontal: metrics.DEVICE_WIDTH * 0.05,
        marginVertical: 5,
    },

    textInput: {
        paddingVertical: 10,
        fontSize: 20,
        color: commonColor.textColor
    },

    btn: {
        backgroundColor: commonColor.buttonColor,
    },

    text: {
        padding: 10,        
        fontSize: 20,
        color: commonColor.brandColor,
        textAlign: 'center',
    },
    touchable: {
        backgroundColor: 'red',
        color: 'white'
    }
    

}