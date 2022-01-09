import React from 'react'
import {connect} from "react-redux";
import { useTranslation } from 'react-i18next'
import "../../i18n/i18n";

const SellingChart = (props) => {

    const {t, i18n} = useTranslation();
    
    return(
        <div>
            <h2 id='selling_chart'>{t("chart")}</h2>
        </div>
    )
}

export default SellingChart