import React , { PropTypes }from 'react';
import TextField from 'material-ui/TextField';
import {Card, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import {Dialog, FlatButton} from "material-ui";
import AutoComplete from 'material-ui/AutoComplete';

const cropNames = [
    'Asparagus',
    'Almonds',
    'Adzuki beans',
    'Einkorn',
    'Emmer',
    'Corn',
    'Garbanzo beans',
    'Indian corn',
    'Jerusalem artichokes',
    'Kamut',
    'Lentils',
    'Malting barley',
    'Mung beans',
    'Oatmeal',
    'Peanuts',
    'Pearl millet',
    'Psyllium ',
    'Spelt',
    'Triticale',
    'Wheatgrass',
    'Wild rice',
    'Wheat'
];
const customContentStyle = {
    width: '100%',
    maxWidth: 'none',
    padding: "40px"
};
const AddCropDialog = ({
    OpenDialog,
    SubmitForm,
    onClose,
    open,
    onChangeCropName
}) => (
    <div>
            <div className="homeBlock">
                <div className="homeBlockHeadingBig">
                    <p>My crops</p>
                </div>
                <div className="addCropBtn">
                <RaisedButton backgroundColor="#ffb347" label="Add crop" onClick={OpenDialog} />
                </div>
                <Dialog
                    title="Add a new crop"
                    actions={[
                        <FlatButton
                            label="Cancel"
                            primary={true}
                            onClick={onClose}
                        />,
                        <FlatButton
                            label="Submit"
                            primary={true}
                            onClick={SubmitForm}
                        />
                    ]}
                    modal={false}
                    open={open}
                    onRequestClose={onClose}
                >
                    <p>Choose a crop name</p>
                    <AutoComplete
                        floatingLabelText="Crop name"
                        name="cropName"
                        onUpdateInput={onChangeCropName}
                        dataSource={cropNames}
                    />

                    <h4>Your id will be: As78z9Pi87901</h4>
                </Dialog>
            </div>
    </div>
);

AddCropDialog.propTypes = {
    onOpen: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    cropNames: PropTypes.object.isRequired
};

export default AddCropDialog;
