import {useTranslation} from "react-i18next";

export const getLang = (): string => {
    const {t} = useTranslation();

    return (t('interceptor.interceptor_lang'));
}