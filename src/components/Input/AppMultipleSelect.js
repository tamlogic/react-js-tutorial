import PropTypes from 'prop-types';
import React, {useState} from 'react';
import { useTranslation } from 'react-i18next';
import {Checkbox, FormControl, Input, ListItemText, makeStyles, MenuItem, Select} from "@material-ui/core";
import classNames from 'classnames';
import AppColor from "../../utilities/AppColor";
import { getIn } from "formik";
import MultiSelect from "react-multi-select-component";
import {FormGroup} from "reactstrap";

const useStyles = makeStyles(() => ({
    input: {

        '&>div': {
            border: `1px solid ${AppColor.selectBox}`,
            boxSizing: 'border-box',
            boxShadow: 'none',
            borderRadius: '11px',
            '&:focus': {
                border: `1px solid ${AppColor.orange}`,
                boxSizing: 'border-box',
                boxShadow: 'none',
                borderRadius: '11px',
            },
            '&:focus-within': {
                boxShadow: 'none',
                borderColor: AppColor.orange
            },
            '&.dropdown-container>div.dropdown-content>div.panel-content>div.select-panel': {
                '&>label.select-item': {
                    '&>div': {
                        display: 'inline-flex',
                        '&>span': {
                            marginTop: -2
                        }
                    }
                },
                '&>ul>li>label.select-item': {
                    '&>div': {
                        display: 'inline-flex',
                        '&>span': {
                            marginTop: -2
                        }
                    }
                }
            }
        }
    },
    label: {
        fontSize: 14,
        color: AppColor.black,
        fontWeight: '500'
    },
    strongText: {
        fontWeight: 700
    }
}))

const AppMultipleSelect = (props) => {
    const {
        field, form, options, disableSearch, className, inputContainerClass,
        placeholder, selectChange
    } = props;
    const classes = useStyles();
    const { name, value = [], ...rest } = field;
    const { errors, touched, isValid, handleChange, handleBlur } = form;
    const error = getIn(errors, name);
    const touch = getIn(touched, name);
    let showError = error && touch;
    const { t } = useTranslation();

    const _handleChange = (selected) => {
        handleChange({
            target: {
                name,
                value: selected
            }
        });
        selectChange && selectChange({
            target: {
                name,
                value: selected
            }
        });
    };

    return (
        <FormGroup className={className}>
            <MultiSelect
                options={options}
                value={value}
                onChange={_handleChange}
                labelledBy="Select"
                selectAllLabel={t('label.all')}
                disableSearch={disableSearch}
                className={classNames([classes.input, inputContainerClass])}
                overrideStrings={{
                    "allItemsAreSelected": t("label.all_items_are_selected"),
                    "clearSearch": t('label.clear'),
                    "noOptions": t('label.no_options'),
                    "search": t('label.search'),
                    "selectAll": t('label.select_all'),
                    "selectSomeItems": placeholder ? placeholder : t('label.select')
                }}
            />
        </FormGroup>
    );
}

AppMultipleSelect.propTypes = {
    field: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,

    options: PropTypes.array,
    selectChange: PropTypes.func
};

AppMultipleSelect.defaultProps = {
    options: []
};

export default AppMultipleSelect;
